import * as fs from "fs/promises";
import { apply } from "../apply";
import { Bundle, type BundleProps } from "../esbuild";
import type { Resolved } from "../output";
import { type Context, Resource } from "../resource";
import { type CloudflareApi, createCloudflareApi } from "./api";
import type {
  WorkerBinding,
  WorkerBindingSpec,
  WorkerBindings,
} from "./bindings";
import type { DurableObjectNamespace } from "./durable-object-namespace";
import { isDurableObjectNamespace } from "./durable-object-namespace";
import { isKVNamespace } from "./kv-namespace";
import type { WorkerScriptMetadata } from "./worker-metadata";
import type { SingleStepMigration } from "./worker-migration";
import { isWorkflow } from "./workflow";
/**
 * Properties for creating or updating a Worker
 */
export interface WorkerProps {
  /**
   * The worker script content (JavaScript or WASM)
   * One of script, entryPoint, or bundle must be provided
   */
  script?: string;

  /**
   * Path to the entry point file
   * Will be bundled using esbuild
   * One of script, entryPoint, or bundle must be provided
   */
  entrypoint?: string;

  /**
   * Bundle options when using entryPoint
   * Ignored if bundle is provided
   */
  bundle?: Omit<BundleProps, "entryPoint">;

  /**
   * Module format for the worker script
   * 'esm' - ECMAScript modules (default)
   * 'cjs' - CommonJS modules
   * @default 'esm'
   */
  format?: "esm" | "cjs";

  /**
   * Name for the worker
   * This is mandatory - must be explicitly specified
   */
  name: string;

  /**
   * Routes to associate with this worker
   * Format: example.com/* or *.example.com/*
   */
  routes?: string[];

  /**
   * Bindings to attach to the worker
   */
  bindings?: WorkerBindings;

  /**
   * Environment variables to attach to the worker
   * These will be converted to plain_text bindings
   */
  env?: {
    [key: string]: string;
  };

  /**
   * Whether to enable a workers.dev URL for this worker
   * If true, the worker will be available at {name}.{subdomain}.workers.dev
   * @default false
   */
  url?: boolean;

  /**
   * Observability configuration for the worker
   * Controls whether worker logs are enabled
   * @default { enabled: true }
   */
  observability?: {
    /**
     * Whether to enable worker logs
     * @default true
     */
    enabled?: boolean;
  };

  /**
   * Migrations to apply to the worker
   */
  migrations?: SingleStepMigration;
}

/**
 * Output returned after Worker creation/update
 */
export interface WorkerOutput extends Omit<WorkerProps, "url" | "bindings"> {
  /**
   * The ID of the worker
   */
  id: string;

  /**
   * Time at which the worker was created
   */
  createdAt: number;

  /**
   * Time at which the worker was last updated
   */
  updatedAt: number;

  /**
   * The worker's URL if enabled
   * Format: {name}.{subdomain}.workers.dev
   */
  url?: string;

  /**
   * The bindings that were created
   */
  bindings: WorkerBindingSpec[];
}

export class Worker extends Resource(
  "cloudflare::Worker",
  {
    alwaysUpdate: true,
  },
  async (ctx: Context<WorkerOutput>, props: WorkerProps) => {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi();

    // Use the provided name
    const workerName = props.name;

    // Validate input - we need either script, entryPoint, or bundle
    if (!props.script && !props.entrypoint) {
      throw new Error("One of script or entryPoint must be provided");
    }

    if (ctx.event === "delete") {
      return deleteWorker(ctx, api, workerName);
    } else if (ctx.event === "create") {
      await assertWorkerDoesNotExist(ctx, api, workerName);
    }

    const oldBindings = await ctx.get<Resolved<WorkerBinding>[]>("bindings");

    const scriptMetadata = await prepareWorkerMetadata(ctx, oldBindings, props);

    // Get the script content - either from props.script, or by bundling
    const scriptContent =
      props.script ?? (await bundleWorkerScript(ctx, props));

    // Upload the worker script
    await putWorker(api, workerName, scriptContent, scriptMetadata);

    // TODO: it is less than ideal that this can fail, resulting in state problem
    await ctx.set("bindings", props.bindings);

    // Handle routes if requested
    await setupRoutes(api, workerName, props.routes || []);

    // Handle worker URL if requested
    const workerUrl = await configureURL(
      ctx,
      api,
      workerName,
      props.url ?? false,
    );

    // Get current timestamp
    const now = Date.now();

    // Construct the output
    const output: WorkerOutput = {
      id: workerName,
      name: workerName,
      script: scriptContent,
      format: props.format || "esm", // Include format in the output
      routes: props.routes || [],
      bindings: scriptMetadata.bindings,
      env: props.env,
      observability: scriptMetadata.observability,
      createdAt: now,
      updatedAt: now,
      url: workerUrl,
    };

    return output;
  },
) {
  public readonly type = "worker" as const;
}

async function deleteWorker(
  ctx: Context<WorkerOutput>,
  api: CloudflareApi,
  workerName: string,
) {
  // Delete worker
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
  );

  // Check for success (2xx status code)
  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse
      .json()
      .catch(() => ({ errors: [{ message: deleteResponse.statusText }] }));
    console.error(
      "Error deleting worker:",
      errorData.errors?.[0]?.message || deleteResponse.statusText,
    );
  }

  // Also remove any associated routes if they exist
  if (ctx.output?.routes && ctx.output.routes.length > 0 && api.zoneId) {
    // First get existing routes to find their IDs
    const routesResponse = await api.get(`/zones/${api.zoneId}/workers/routes`);

    if (!routesResponse.ok) {
      throw new Error(
        `Could not fetch routes for cleanup: ${routesResponse.status} ${routesResponse.statusText}`,
      );
    }
    const routesData: any = await routesResponse.json();
    const existingRoutes = routesData.result || [];

    for (const route of existingRoutes) {
      if (ctx.output.routes.includes(route.pattern)) {
        // Delete the route
        const routeDeleteResponse = await api.delete(
          `/zones/${api.zoneId}/workers/routes/${route.id}`,
        );

        if (!routeDeleteResponse.ok) {
          console.warn(
            `Failed to delete route ${route.pattern}: ${routeDeleteResponse.status} ${routeDeleteResponse.statusText}`,
          );
        }
      }
    }
  }

  // Disable the URL if it was enabled
  if (ctx.output?.url) {
    try {
      await api.post(
        `/accounts/${api.accountId}/workers/scripts/${workerName}/subdomain`,
        JSON.stringify({ enabled: false }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.warn("Failed to disable worker URL during deletion:", error);
    }
  }

  // Return minimal output for deleted state
  return;
}

async function putWorker(
  api: CloudflareApi,
  workerName: string,
  scriptContent: string,
  scriptMetadata: WorkerMetadata,
) {
  const scriptName = scriptMetadata.main_module ?? scriptMetadata.body_part!;

  // Create FormData for the upload
  const formData = new FormData();

  // Add the actual script content as a named file part
  formData.append(
    scriptName,
    new Blob([scriptContent], {
      type: scriptMetadata.main_module
        ? "application/javascript+module"
        : "application/javascript",
    }),
    scriptName,
  );

  // console.log("Script Metadata:", JSON.stringify(scriptMetadata, null, 2));

  // Add metadata as JSON
  formData.append(
    "metadata",
    new Blob([JSON.stringify(scriptMetadata)], {
      type: "application/json",
    }),
  );

  // Upload worker script with bindings
  const uploadResponse = await api.put(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  // Check if the upload was successful
  if (!uploadResponse.ok) {
    const errorData: any = await uploadResponse
      .json()
      .catch(() => ({ errors: [{ message: uploadResponse.statusText }] }));
    throw new Error(
      `Error uploading worker script '${workerName}': ${errorData.errors?.[0]?.message || uploadResponse.statusText}`,
    );
  }

  return formData;
}

interface WorkerMetadata {
  bindings: WorkerBindingSpec[];
  observability: {
    enabled: boolean;
  };
  migrations?: SingleStepMigration;
  main_module?: string;
  body_part?: string;
  tags?: string[];
}

async function prepareWorkerMetadata(
  ctx: Context<WorkerOutput>,
  oldBindings: Resolved<WorkerBinding>[] | undefined,
  props: WorkerProps,
): Promise<WorkerMetadata> {
  // Prepare metadata with bindings
  const meta: WorkerMetadata = {
    bindings: [] as WorkerBindingSpec[],
    observability: {
      enabled: props.observability?.enabled !== false,
    },
    tags: [`alchemy:id:${ctx.resourceFQN}`],
    migrations: {
      new_classes: props.migrations?.new_classes ?? [],
      deleted_classes: props.migrations?.deleted_classes ?? [],
      renamed_classes: props.migrations?.renamed_classes ?? [],
      transferred_classes: props.migrations?.transferred_classes ?? [],
      new_sqlite_classes: props.migrations?.new_sqlite_classes ?? [],
    },
  };

  for (const [key, text] of Object.entries(props.env ?? {})) {
    meta.bindings.push({
      type: "plain_text",
      name: key,
      text,
    });
  }

  // Convert bindings to the format expected by the API
  for (const [bindingName, binding] of Object.entries(props.bindings ?? {})) {
    // Create a copy of the binding to avoid modifying the original
    const bindingData: any = { ...binding };

    if (isDurableObjectNamespace(bindingData)) {
      const stableId = bindingData.id;
      const className = bindingData.className;

      meta.bindings.push({
        type: "durable_object_namespace",
        name: bindingName,
        class_name: className,
        script_name: bindingData.scriptName,
        environment: bindingData.environment,
        namespace_id: bindingData.namespaceId,
      });

      const oldBinding: DurableObjectNamespace | undefined = Object.values(
        oldBindings ?? {},
      )
        .filter(isDurableObjectNamespace)
        .find((b) => b.id === stableId);

      if (!oldBinding) {
        if (bindingData.sqlite) {
          meta.migrations!.new_sqlite_classes!.push(className);
        } else {
          meta.migrations!.new_classes!.push(className);
        }
      } else if (oldBinding.className !== className) {
        meta.migrations!.renamed_classes!.push({
          from: oldBinding.className,
          to: className,
        });
      }
    } else if (isWorkflow(bindingData)) {
      console.log("Workflow binding:", bindingData);
      meta.bindings.push({
        type: "workflow",
        name: bindingName,
        workflow_name: bindingData.workflowName,
        class_name: bindingData.className,
        script_name: bindingData.scriptName ?? bindingData.workflowName,
      });

      const oldBinding = Object.values(oldBindings ?? {})
        .filter(isWorkflow)
        .find((b) => b.id === bindingData.id);

      if (!oldBinding) {
        meta.migrations!.new_classes!.push(bindingData.className);
      } else if (oldBinding.className !== bindingData.className) {
        meta.migrations!.renamed_classes!.push({
          from: oldBinding.className,
          to: bindingData.className,
        });
      }
    } else if (isKVNamespace(bindingData)) {
      meta.bindings.push({
        type: "kv_namespace",
        name: bindingName,
        namespace_id: bindingData.id,
      });
    } else {
      throw new Error(`Unknown binding type: ${bindingData.type}`);
    }
  }

  // Determine if we're using ESM or service worker format
  const isEsModule = props.format !== "cjs"; // Default to ESM unless CJS is specified
  const scriptName = isEsModule ? "worker.js" : "script";

  if (isEsModule) {
    // For ES modules format
    meta.main_module = scriptName;
  } else {
    // For service worker format (CJS)
    meta.body_part = scriptName;
  }
  return meta;
}

async function assertWorkerDoesNotExist(
  ctx: Context<WorkerOutput>,
  api: CloudflareApi,
  workerName: string,
) {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
  );
  if (response.status === 404) {
    return true;
  }
  if (response.status === 200) {
    const metadata = await getWorkerScriptMetadata(api, workerName);

    if (!metadata) {
      throw new Error(
        `Worker exists but failed to fetch metadata: ${response.status} ${response.statusText}`,
      );
    }

    if (
      metadata.default_environment?.script.tags.includes(
        `alchemy:id:${ctx.resourceFQN}`,
      )
    ) {
      return true;
    }

    throw new Error(
      `Worker with name '${workerName}' already exists. Please use a unique name.`,
    );
  } else {
    throw new Error(
      `Error checking if worker exists: ${response.status} ${response.statusText}`,
    );
  }
}

async function bundleWorkerScript(
  ctx: Context<WorkerOutput>,
  props: WorkerProps,
) {
  // Get the script content - either from props.script, or by bundling

  // Create and use a Bundle resource with worker-optimized configuration
  const defaultBundleOptions: Omit<BundleProps, "entryPoint"> = {
    format: props.format === "cjs" ? "cjs" : "esm", // Use the specified format or default to ESM
    target: "es2020",
    platform: "browser",
    minify: true,
    options: {
      keepNames: true, // Important for Durable Object classes
    },
  };

  // Merge with user-provided options
  const bundleOptions = {
    ...defaultBundleOptions,
    ...(props.bundle || {}),
  };

  // Create the bundle
  const bundle = new Bundle("bundle", {
    entryPoint: props.entrypoint!,
    ...bundleOptions,
    external: [...(bundleOptions.external ?? []), "cloudflare:workers"],
  });

  // Get the bundled content
  const bundleOutput = await apply(bundle, {
    quiet: ctx.quiet,
  });
  try {
    return await fs.readFile(bundleOutput.path, "utf-8");
  } catch (error) {
    console.error("Error reading bundle:", error);
    throw new Error("Error reading bundle");
  }
}

async function setupRoutes(
  api: CloudflareApi,
  workerName: string,
  routes: string[],
) {
  // Set up routes if provided
  if (routes && routes.length > 0 && api.zoneId) {
    // First get existing routes
    const routesResponse = await api.get(`/zones/${api.zoneId}/workers/routes`);

    if (!routesResponse.ok) {
      throw new Error(
        `Could not fetch routes: ${routesResponse.status} ${routesResponse.statusText}`,
      );
    }
    const routesData: any = await routesResponse.json();
    const existingRoutes = routesData.result || [];

    // For each desired route
    for (const pattern of routes) {
      const existingRoute = existingRoutes.find(
        (r: any) => r.pattern === pattern,
      );

      if (existingRoute) {
        // Update if script name doesn't match
        if (existingRoute.script !== workerName) {
          const updateRouteResponse = await api.put(
            `/zones/${api.zoneId}/workers/routes/${existingRoute.id}`,
            {
              pattern,
              script: workerName,
            },
          );

          if (!updateRouteResponse.ok) {
            console.warn(
              `Failed to update route ${pattern}: ${updateRouteResponse.status} ${updateRouteResponse.statusText}`,
            );
          }
        }
      } else {
        // Create new route
        const createRouteResponse = await api.post(
          `/zones/${api.zoneId}/workers/routes`,
          {
            pattern,
            script: workerName,
          },
        );

        if (!createRouteResponse.ok) {
          throw new Error(
            `Failed to create route ${pattern}: ${createRouteResponse.status} ${createRouteResponse.statusText}`,
          );
        }
      }
    }
  }
}

async function configureURL(
  ctx: Context<WorkerOutput>,
  api: CloudflareApi,
  workerName: string,
  url: boolean,
) {
  let workerUrl;
  if (url) {
    // Enable the workers.dev subdomain for this worker
    await api.post(
      `/accounts/${api.accountId}/workers/scripts/${workerName}/subdomain`,
      { enabled: true, previews_enabled: true },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    // Get the account's workers.dev subdomain
    const subdomainResponse = await api.get(
      `/accounts/${api.accountId}/workers/subdomain`,
    );

    if (!subdomainResponse.ok) {
      throw new Error(
        `Could not fetch workers.dev subdomain: ${subdomainResponse.status} ${subdomainResponse.statusText}`,
      );
    }
    const subdomainData: {
      result: {
        subdomain: string;
      };
    } = await subdomainResponse.json();
    const subdomain = subdomainData.result?.subdomain;

    if (subdomain) {
      workerUrl = `https://${workerName}.${subdomain}.workers.dev`;

      // Add a delay when the subdomain is first created.
      // This is to prevent an issue where a negative cache-hit
      // causes the subdomain to be unavailable for 30 seconds.
      if (ctx.event === "create" || !ctx.output?.url) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  } else if (url === false && ctx.output?.url) {
    // Explicitly disable URL if it was previously enabled
    const response = await api.post(
      `/accounts/${api.accountId}/workers/scripts/${workerName}/subdomain`,
      JSON.stringify({ enabled: false }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to disable worker URL: ${response.status} ${response.statusText}`,
      );
    }
  }
  return workerUrl;
}

async function getWorkerScriptMetadata(
  api: CloudflareApi,
  workerName: string,
): Promise<WorkerScriptMetadata | undefined> {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/services/${workerName}`,
  );
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error(
      `Error getting worker script metadata: ${response.status} ${response.statusText}`,
    );
  }
  return ((await response.json()) as any).result as WorkerScriptMetadata;
}

async function getWorkerBindings(
  api: CloudflareApi,
  workerName: string,
  environment = "production",
) {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/services/${workerName}/environments/${environment}/bindings`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch bindings: ${response.status} ${response.statusText}`,
    );
  }

  const data: any = await response.json();

  return data.result;
}
