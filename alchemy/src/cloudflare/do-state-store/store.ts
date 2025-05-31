import * as path from "node:path";
import { alchemy } from "../../alchemy.js";
import { ResourceScope } from "../../resource.js";
import type { Scope } from "../../scope.js";
import { serialize } from "../../serde.js";
import { deserializeState, type State, type StateStore } from "../../state.js";
import { withExponentialBackoff } from "../../util/retry.js";
import { CloudflareApiError } from "../api-error.js";
import {
  type CloudflareApi,
  createCloudflareApi
} from "../api.js";
import { DurableObjectNamespace } from "../durable-object-namespace.js";
import { Worker } from "../worker.js";

/**
 * Options for DOFSStateStore
 */
export interface DOFSStateStoreOptions {
  /**
   * The URL of the Durable Object Worker
   * If not provided, a worker will be auto-deployed
   */
  url?: string;

  /**
   * Authentication token for requests to the worker
   * This will be set as DOFS_API_KEY secret binding in the worker
   */
  apiKey?: string;

  /**
   * Base path in the DOFS filesystem for storing state files
   */
  basePath?: string;

  /**
   * Auto-deploy the worker if it doesn't exist
   * @default true
   */
  autoDeploy?: boolean;

  /**
   * Name for the auto-deployed worker
   * @default "alchemy-dofs-state-store"
   */
  workerName?: string;

  /**
   * Whether to enable a workers.dev URL for the auto-deployed worker
   * @default true
   */
  workerUrl?: boolean;
}

/**
 * State store implementation using Cloudflare Durable Objects with DOFS (Durable Object File System)
 */
export class DOFSStateStore implements StateStore {
  private readonly basePath: string;
  private readonly fullPath: string;
  private api: CloudflareApi | null = null;
  private initialized = false;
  private readonly autoDeploy: boolean;
  private readonly workerName: string;
  private readonly workerUrl: boolean;
  private readonly apiKey?: string;
  private deployedWorkerUrl?: string;
  private isInitializing = false; // Add flag to prevent recursive initialization
  private worker?: any; // Will store the deployed Worker resource

  constructor(
    public readonly scope: Scope,
    private readonly options: DOFSStateStoreOptions,
  ) {
    // Create a hierarchical path based on scope chain
    this.basePath = options.basePath || "/alchemy";
    const scopePath = scope.chain.join("/");
    this.fullPath = `${this.basePath}/${scopePath}`;
    
    // Auto-deployment configuration
    this.autoDeploy = options.autoDeploy !== false; // Default to true
    this.workerName = options.workerName || "alchemy-dofs-state-store";
    this.workerUrl = options.workerUrl !== false; // Default to true
    this.apiKey = options.apiKey;
  }

  async init(): Promise<void> {
    if (this.initialized) {
      console.log("🔄 Already initialized, skipping...");
      return;
    }
    
    if (this.isInitializing) {
      console.log("⚠️  Init already in progress, waiting...");
      // Wait for the other initialization to complete
      while (this.isInitializing && !this.initialized) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    this.isInitializing = true;
    console.log("🚀 Starting DOFS state store initialization...");

    try {
      // If URL is provided, use it directly
      if (this.options.url) {
        console.log(`📍 Using provided worker URL: ${this.options.url}`);
        this.deployedWorkerUrl = this.options.url;
        this.initialized = true;
        console.log("✅ Initialization complete (using provided URL)");
        return;
      }

      // Auto-deploy worker if enabled and no URL provided
      if (this.autoDeploy) {
        try {
          console.log("🔧 Auto-deployment enabled, setting up API client...");
          
          // Create Cloudflare API client
          this.api = await createCloudflareApi();
          console.log(`✅ API client created for account: ${this.api.accountId}`);
          
          // Check if worker already exists
          console.log(`🔍 Checking if worker '${this.workerName}' already exists...`);
          const existingWorker = await this.checkWorkerExists();
          
          if (existingWorker) {
            console.log(`♻️  Found existing worker: ${existingWorker}`);
            this.deployedWorkerUrl = existingWorker;
          } else {
            console.log("🏗️  Worker not found, deploying new worker...");
            // Deploy the worker
            this.deployedWorkerUrl = await this.deployWorker();
          }
          
          // Mark as initialized BEFORE making directory creation request
          this.initialized = true;
          console.log("✅ Worker deployment complete, marked as initialized");
          
        } catch (error) {
          console.error("💥 Failed to auto-deploy DOFS state store worker:", error);
          throw new Error(`Failed to initialize DOFS state store: ${error}`);
        }
      } else {
        throw new Error("No worker URL provided and auto-deployment is disabled");
      }

      console.log("📁 Creating directory structure...");
      
      // Create the directory structure if it doesn't exist (now that we're marked as initialized)
      const directoryResponse = await this.fetchWithoutInit("/mkdir", {
        method: "POST",
        body: JSON.stringify({ path: this.fullPath, recursive: true }),
      });
      
      if (directoryResponse.ok) {
        console.log("✅ Directory structure created successfully");
      } else {
        console.log(`⚠️  Directory creation returned ${directoryResponse.status}: ${directoryResponse.statusText}`);
      }

      console.log("🎉 DOFS state store initialization complete!");
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Check if the worker already exists and return its URL
   */
  private async checkWorkerExists(): Promise<string | null> {
    if (!this.api) return null;

    try {
      const response = await this.api.get(
        `/accounts/${this.api.accountId}/workers/scripts/${this.workerName}`,
      );
      
      if (response.status === 404) {
        return null; // Worker doesn't exist
      }
      
      if (response.status === 200) {
        // Worker exists, get its URL
        if (this.workerUrl) {
          const subdomainResponse = await this.api.get(
            `/accounts/${this.api.accountId}/workers/subdomain`,
          );
          
          if (subdomainResponse.ok) {
            const subdomainData: any = await subdomainResponse.json();
            const subdomain = subdomainData.result?.subdomain;
            
            if (subdomain) {
              return `https://${this.workerName}.${subdomain}.workers.dev`;
            }
          }
        }
        
        // Fallback to account subdomain format
        return `https://${this.workerName}.${this.api.accountId}.workers.dev`;
      }
      
      throw new Error(`Unexpected response when checking worker: ${response.status}`);
    } catch (error) {
      console.error("Error checking if worker exists:", error);
      return null;
    }
  }

  /**
   * Deploy the worker using Alchemy's Worker resource with bundling.
   * This method uses `this.scope.run()` to ensure the Worker resource is
   * created within the context of the `Scope` instance held by `DOFSStateStore`.
   */
  private async deployWorker(): Promise<string> {
    try {
      console.log("🏗️  Deploying DOFS worker with bundling...");

      // Create the Durable Object Namespace
      const dofsNamespace = new DurableObjectNamespace("ALCHEMY_DOFS_STATE_STORE", {
        className: "AlchemyDOFSStateStore",
        sqlite: true, // Required for DOFS filesystem storage
      });

      // Create secret binding for API key if provided
      const bindings: Record<string, any> = {
        ALCHEMY_DOFS_STATE_STORE: dofsNamespace, // This binding matches the worker code
      };
      
      if (this.apiKey) {
        bindings.DOFS_API_KEY = alchemy.secret(this.apiKey);
      }

      // Use this.scope.run() to explicitly run the Worker creation within this state store's scope.
      // This is the correct pattern to ensure the Worker resource is properly registered
      // and tracked by the parent Alchemy application's state.
      this.worker = await this.scope.run(async () => {
        return Worker(this.workerName, {
          name: this.workerName,
          entrypoint: path.join(__dirname, "dofs-worker.ts"), // Point to the actual TypeScript file
          bindings,
          url: this.workerUrl,
          compatibilityDate: "2024-09-23", // Required for nodejs_compat
          compatibilityFlags: ["nodejs_compat"], // Required for dofs
        });
      });

      const workerUrl = this.worker.url || `https://${this.workerName}.workers.dev`;
      console.log(`✅ Successfully deployed DOFS worker with bundling: ${workerUrl}`);
      
      return workerUrl;
    } catch (error) {
      console.error("Failed to deploy worker with bundling:", error);
      throw error;
    }
  }

  async deinit(): Promise<void> {
    // Optionally clean up the directory
    try {
      await this.fetch("/rmdir", {
        method: "POST",
        body: JSON.stringify({ path: this.fullPath, recursive: true }),
      });
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  async list(): Promise<string[]> {
    try {
      const response = await this.fetch(`/listDir`, {
        method: "POST",
        body: JSON.stringify({ path: this.fullPath }),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(`Failed to list: ${response.statusText}`);
      }
      
      const files: string[] = await response.json();
      
      // Filter out non-json files and convert filenames back to keys
      return files
        .filter((file) => file.endsWith(".json") && file !== "." && file !== "..")
        .map((file) => file.replace(/\.json$/, ""))
        .map((key) => this.deserializeKey(key));
    } catch (error: any) {
      if (error.message?.includes("ENOENT")) {
        return [];
      }
      throw error;
    }
  }

  async count(): Promise<number> {
    return (await this.list()).length;
  }

  async get(key: string): Promise<State | undefined> {
    try {
      const filePath = this.getFilePath(key);
      const response = await this.fetch(`/readFile`, {
        method: "POST",
        body: JSON.stringify({ path: filePath }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return undefined;
        }
        throw new Error(`Failed to get state: ${response.statusText}`);
      }

      const content = await response.text();
      const state = await deserializeState(this.scope, content);
      
      // Ensure output has the scope set
      if (state.output === undefined) {
        state.output = {} as any;
      }
      state.output[ResourceScope] = this.scope;
      
      return state;
    } catch (error: any) {
      if (error.message?.includes("ENOENT")) {
        return undefined;
      }
      throw error;
    }
  }

  async set(key: string, value: State): Promise<void> {
    // Ensure directory exists
    await this.init();
    
    const filePath = this.getFilePath(key);
    const serializedData = JSON.stringify(await serialize(this.scope, value), null, 2);
    
    const response = await this.fetch("/writeFile", {
      method: "POST",
      body: JSON.stringify({ 
        path: filePath,
        data: serializedData 
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to set state: ${response.statusText}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const filePath = this.getFilePath(key);
      const response = await this.fetch("/unlink", {
        method: "POST",
        body: JSON.stringify({ path: filePath }),
      });

      // Ignore 404 errors - file already doesn't exist
      if (!response.ok && response.status !== 404) {
        throw new Error(`Failed to delete state: ${response.statusText}`);
      }
    } catch (error: any) {
      // Ignore ENOENT errors - file doesn't exist
      if (!error.message?.includes("ENOENT") && !error.message?.includes("404")) {
        throw error;
      }
    }
  }

  async all(): Promise<Record<string, State>> {
    const keys = await this.list();
    const result: Record<string, State> = {};
    
    // Get all states in parallel
    const states = await Promise.all(
      keys.map(async (key) => {
        const state = await this.get(key);
        return { key, state };
      })
    );
    
    // Build result object
    for (const { key, state } of states) {
      if (state) {
        result[key] = state;
      }
    }
    
    return result;
  }

  async getBatch(ids: string[]): Promise<Record<string, State>> {
    const result: Record<string, State> = {};
    
    // Get all states in parallel
    const states = await Promise.all(
      ids.map(async (id) => {
        const state = await this.get(id);
        return { id, state };
      })
    );
    
    // Build result object
    for (const { id, state } of states) {
      if (state) {
        result[id] = state;
      }
    }
    
    return result;
  }

  private async fetch(url: string, init?: RequestInit): Promise<Response> {
    await this.ensureInitialized();
    return this.fetchWithoutInit(url, init);
  }

  private async fetchWithoutInit(url: string, init?: RequestInit): Promise<Response> {
    if (!this.deployedWorkerUrl) {
      throw new Error("Worker URL not available");
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string> || {}),
    };

    // Add authentication header if API key is configured
    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    return await withExponentialBackoff(
      async () => {
        const response = await fetch(`${this.deployedWorkerUrl}${url}`, {
          ...init,
          headers,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`DOFS State Store request failed: ${response.status} ${response.statusText}: ${errorText}`);
          
          // Convert some common errors to CloudflareApiError for consistency
          // NOTE: 404 is NOT an error condition - it's handled by get() method
          if (response.status >= 500) {
            throw new CloudflareApiError(
              `DOFS State Store server error: ${response.statusText}`, 
              response,
              { error: errorText }
            );
          }
        }

        return response;
      },
      (error: any) => isRetryableError(error),
      3,
      1000,
    );
  }

  private getFilePath(key: string): string {
    return `${this.fullPath}/${this.serializeKey(key)}.json`;
  }

  private serializeKey(key: string): string {
    // Replace problematic characters for filesystem
    return key.replaceAll("/", ":");
  }

  private deserializeKey(key: string): string {
    // Convert back from filesystem-safe format
    return key.replaceAll(":", "/");
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.init();
    }
  }
}

/**
 * Check if an error is retryable
 */
function isRetryableError(error: any): boolean {
  if (error instanceof CloudflareApiError) {
    return (
      error.status === 500 ||
      error.status === 502 ||
      error.status === 503 ||
      error.message.includes("timeout") ||
      error.message.includes("internal error")
    );
  }
  return false;
} 