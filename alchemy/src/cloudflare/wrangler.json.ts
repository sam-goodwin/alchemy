import type { Context } from "../context.js";
import { StaticJsonFile } from "../fs/static-json-file.js";
import { Resource } from "../resource.js";
import { Self, type Bindings } from "./bindings.js";
import type { DurableObjectNamespace } from "./durable-object-namespace.js";
import type { EventSource } from "./event-source.js";
import { isQueueEventSource } from "./event-source.js";
import { isQueue } from "./queue.js";
import type { Worker } from "./worker.js";

/**
 * Properties for wrangler.json configuration file
 */
export interface WranglerJsonProps {
  name?: string;
  /**
   * The worker to generate the wrangler.json file for
   */
  worker: Worker;
  /**
   * Path to write the wrangler.json file to
   *
   * @default cwd/wrangler.json
   */
  path?: string;

  /**
   * The main entry point for the worker
   *
   * @default worker.entrypoint
   */
  main?: string;
}

/**
 * Output returned after WranglerJson creation/update
 */
export interface WranglerJson
  extends Resource<"cloudflare::WranglerJson">,
    WranglerJsonProps {
  /**
   * Time at which the file was created
   */
  createdAt: number;

  /**
   * Time at which the file was last updated
   */
  updatedAt: number;

  /**
   * Path to the wrangler.json file
   */
  path: string;

  /**
   * `wrangler.json` spec
   */
  spec: WranglerJsonSpec;
}

/**
 * Resource for managing wrangler.json configuration files
 */
export const WranglerJson = Resource(
  "cloudflare::WranglerJson",
  async function (
    this: Context<WranglerJson>,
    _id: string,
    props: WranglerJsonProps,
  ): Promise<WranglerJson> {
    // Default path is wrangler.json in current directory
    const filePath = props.path || "wrangler.jsonc";

    if (this.phase === "delete") {
      return this.destroy();
    }

    if (props.worker.entrypoint === undefined) {
      throw new Error(
        "Worker must have an entrypoint to generate a wrangler.json",
      );
    }

    const worker = props.worker;

    const spec: WranglerJsonSpec = {
      name: worker.name,
      // Use entrypoint as main if it exists
      main: props.main ?? worker.entrypoint,
      // see: https://developers.cloudflare.com/workers/configuration/compatibility-dates/
      compatibility_date: worker.compatibilityDate,
      compatibility_flags: props.worker.compatibilityFlags,
    };

    // Process bindings if they exist
    if (worker.bindings) {
      processBindings(spec, worker.bindings, worker.eventSources, worker.name);
    }

    // Add environment variables as vars
    if (worker.env) {
      spec.vars = { ...worker.env };
    }

    await StaticJsonFile(filePath, spec);

    // Return the resource
    return this({
      ...props,
      path: filePath,
      spec,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
);

/**
 * Wrangler.json configuration specification based on Cloudflare's schema
 */
export interface WranglerJsonSpec {
  /**
   * The name of the worker
   */
  name: string;

  /**
   * Main entry point for the worker
   */
  main?: string;

  /**
   * A date in the form yyyy-mm-dd used to determine Workers runtime version
   */
  compatibility_date?: string;

  /**
   * A list of flags that enable features from upcoming Workers runtime
   */
  compatibility_flags?: string[];

  /**
   * Whether to enable a workers.dev URL for this worker
   */
  workers_dev?: boolean;

  /**
   * Routes to attach to the worker
   */
  routes?: string[];

  /**
   * AI bindings
   */
  ai?: {
    binding: string;
  };

  /**
   * Browser bindings
   */
  browser?: {
    binding: string;
  };

  /**
   * KV Namespace bindings
   */
  kv_namespaces?: {
    binding: string;
    id: string;
    /**
     * The ID of the KV namespace used during `wrangler dev`
     */
    preview_id?: string;
  }[];

  /**
   * Durable Object bindings
   */
  durable_objects?: {
    bindings: {
      name: string;
      class_name: string;
      script_name?: string;
      environment?: string;
    }[];
  };

  /**
   * R2 bucket bindings
   */
  r2_buckets?: {
    binding: string;
    bucket_name: string;
    /**
     * The preview name of this R2 bucket at the edge.
     */
    preview_bucket_name?: string;
  }[];

  /**
   * Queue bindings
   */
  queues?: {
    producers: { queue: string; binding: string }[];
    consumers: {
      queue: string;
      max_batch_size?: number;
      max_concurrency?: number;
      max_retries?: number;
      max_wait_time_ms?: number;
      retry_delay?: number;
    }[];
  };

  /**
   * Service bindings
   */
  services?: {
    binding: string;
    service: string;
    environment?: string;
  }[];

  /**
   * Workflow bindings
   */
  workflows?: {
    name: string;
    binding: string;
    class_name: string;
  }[];

  /**
   * Vectorize index bindings
   */
  vectorize_indexes?: {
    binding: string;
    index_name: string;
  }[];

  /**
   * Plain text bindings (vars)
   */
  vars?: Record<string, string>;

  /**
   * D1 database bindings
   */
  d1_databases?: {
    binding: string;
    database_id: string;
    database_name: string;
    migrations_dir?: string;
    /**
     * The ID of the D1 database used during `wrangler dev`
     */
    preview_database_id?: string;
  }[];

  /**
   * Assets bindings
   */
  assets?: {
    directory: string;
    binding: string;
  };

  /**
   * Migrations
   */
  migrations?: {
    tag: string;
    new_sqlite_classes?: string[];
    new_classes?: string[];
  }[];

  /**
   * Workflow bindings
   */
  wasm_modules?: Record<string, string>;

  /**
   * Safe mode configuration
   */
  node_compat?: boolean;

  /**
   * Whether to minify the worker script
   */
  minify?: boolean;
}

/**
 * Process worker bindings into wrangler.json format
 */
function processBindings(
  spec: WranglerJsonSpec,
  bindings: Bindings,
  eventSources: EventSource[] | undefined,
  workerName: string,
): void {
  // Arrays to collect different binding types
  const kvNamespaces: { binding: string; id: string }[] = [];
  const durableObjects: {
    name: string;
    class_name: string;
    script_name?: string;
    environment?: string;
  }[] = [];
  const r2Buckets: { binding: string; bucket_name: string }[] = [];
  const services: { binding: string; service: string; environment?: string }[] =
    [];
  const secrets: string[] = [];
  const workflows: { name: string; binding: string; class_name: string }[] = [];
  const d1Databases: {
    binding: string;
    database_id: string;
    database_name: string;
    migrations_dir?: string;
  }[] = [];
  const queues: {
    producers: { queue: string; binding: string }[];
    consumers: {
      queue: string;
      max_batch_size?: number;
      max_concurrency?: number;
      max_retries?: number;
      max_wait_time_ms?: number;
      retry_delay?: number;
    }[];
  } = {
    producers: [],
    consumers: [],
  };

  const new_sqlite_classes: string[] = [];
  const new_classes: string[] = [];

  const vectorizeIndexes: { binding: string; index_name: string }[] = [];

  for (const eventSource of eventSources ?? []) {
    if (isQueueEventSource(eventSource)) {
      queues.consumers.push({
        queue: eventSource.queue.id,
        max_batch_size: eventSource.settings?.batchSize,
        max_concurrency: eventSource.settings?.maxConcurrency,
        max_retries: eventSource.settings?.maxRetries,
        max_wait_time_ms: eventSource.settings?.maxWaitTimeMs,
        retry_delay: eventSource.settings?.retryDelay,
      });
    } else if (isQueue(eventSource)) {
      queues.consumers.push({
        queue: eventSource.id,
      });
    }
  }
  // Process each binding
  for (const [bindingName, binding] of Object.entries(bindings)) {
    if (typeof binding === "string") {
      // Plain text binding - add to vars
      if (!spec.vars) {
        spec.vars = {};
      }
      spec.vars[bindingName] = binding;
    } else if (binding === Self) {
      // Self(service) binding
      services.push({
        binding: bindingName,
        service: workerName,
      });
    } else if (binding.type === "service") {
      // Service binding
      services.push({
        binding: bindingName,
        service: binding.id,
      });
    } else if (binding.type === "kv_namespace") {
      // KV Namespace binding
      kvNamespaces.push({
        binding: bindingName,
        id: binding.namespaceId,
      });
    } else if (
      typeof binding === "object" &&
      binding.type === "durable_object_namespace"
    ) {
      // Durable Object binding
      const doBinding = binding as DurableObjectNamespace;
      durableObjects.push({
        name: bindingName,
        class_name: doBinding.className,
        script_name: doBinding.scriptName,
        environment: doBinding.environment,
      });
      if (doBinding.sqlite) {
        new_sqlite_classes.push(doBinding.className);
      } else {
        new_classes.push(doBinding.className);
      }
    } else if (binding.type === "r2_bucket") {
      r2Buckets.push({
        binding: bindingName,
        bucket_name: binding.name,
      });
    } else if (binding.type === "secret") {
      // Secret binding
      secrets.push(bindingName);
    } else if (binding.type === "assets") {
      spec.assets = {
        directory: binding.path,
        binding: bindingName,
      };
    } else if (binding.type === "workflow") {
      workflows.push({
        name: binding.workflowName,
        binding: bindingName,
        class_name: binding.className,
      });
    } else if (binding.type === "d1") {
      d1Databases.push({
        binding: bindingName,
        database_id: binding.id,
        database_name: binding.name,
        migrations_dir: binding.migrationsDir,
      });
    } else if (binding.type === "queue") {
      queues.producers.push({
        binding: bindingName,
        queue: binding.name,
      });
    } else if (binding.type === "vectorize") {
      vectorizeIndexes.push({
        binding: bindingName,
        index_name: binding.name,
      });
    } else if (binding.type === "browser") {
      if (spec.browser) {
        throw new Error(`Browser already bound to ${spec.browser.binding}`);
      }
      spec.browser = {
        binding: bindingName,
      };
    } else if (binding.type === "ai") {
      if (spec.ai) {
        throw new Error(`AI already bound to ${spec.ai.binding}`);
      }
      spec.ai = {
        binding: bindingName,
      };
    }
  }

  // Add collected bindings to the spec
  if (kvNamespaces.length > 0) {
    spec.kv_namespaces = kvNamespaces;
  }

  if (durableObjects.length > 0) {
    spec.durable_objects = {
      bindings: durableObjects,
    };
  }

  if (r2Buckets.length > 0) {
    spec.r2_buckets = r2Buckets;
  }

  if (services.length > 0) {
    spec.services = services;
  }

  if (d1Databases.length > 0) {
    spec.d1_databases = d1Databases;
  }

  if (queues.consumers.length > 0) {
    spec.queues = queues;
  }

  if (vectorizeIndexes.length > 0) {
    spec.vectorize_indexes = vectorizeIndexes;
  }

  if (new_sqlite_classes.length > 0 || new_classes.length > 0) {
    spec.migrations = [
      {
        tag: "v1",
        new_sqlite_classes,
        new_classes,
      },
    ];
  }

  if (workflows.length > 0) {
    spec.workflows = workflows;
  }
}
