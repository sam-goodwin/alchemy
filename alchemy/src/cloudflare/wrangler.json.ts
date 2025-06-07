import fs from "node:fs/promises";
import path from "node:path";
import type { Context } from "../context.ts";
import { formatJson } from "../fs/static-json-file.ts";
import { Resource } from "../resource.ts";
import { assertNever } from "../util/assert-never.ts";
import { Self, type Bindings } from "./bindings.ts";
import type { DurableObjectNamespace } from "./durable-object-namespace.ts";
import type { EventSource } from "./event-source.ts";
import { isQueueEventSource } from "./event-source.ts";
import { isQueue } from "./queue.ts";
import type { Worker, WorkerProps } from "./worker.ts";

/**
 * Properties for wrangler.json configuration file
 */
export interface WranglerJsonProps {
  name?: string;
  /**
   * The worker to generate the wrangler.json file for
   */
  worker:
    | Worker
    | (WorkerProps<any> & {
        name: string;
      });
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

  /**
   * Path to the assets directory
   *
   * @default inferred from the worker's Asset bindings
   */
  assets?: {
    binding: string;
    directory: string;
  };
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
  {
    alwaysUpdate: true,
  },
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
      assets: props.assets,
    };

    // Process bindings if they exist
    if (worker.bindings) {
      processBindings(spec, worker.bindings, worker.eventSources, worker.name);
    }

    // Add environment variables as vars
    if (worker.env) {
      spec.vars = { ...worker.env };
    }

    if (worker.crons && worker.crons.length > 0) {
      spec.triggers = { crons: worker.crons };
    }

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, await formatJson(spec));

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
   * Scheduled triggers for the worker
   */
  triggers?: {
    crons: string[];
  };

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
    script_name?: string;
  }[];

  /**
   * Vectorize index bindings
   */
  vectorize?: {
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

  /**
   * Analytics Engine datasets
   */
  analytics_engine_datasets?: { binding: string; dataset: string }[];

  /**
   * Hyperdrive bindings
   */
  hyperdrive?: { binding: string; id: string; localConnectionString: string }[];

  /**
   * Pipelines
   */
  pipelines?: { binding: string; pipeline: string }[];

  /**
   * Secrets Store bindings
   */
  secrets_store_secrets?: {
    binding: string;
    store_id: string;
    secret_name: string;
  }[];

  /**
   * Version metadata bindings
   */
  version_metadata?: {
    binding: string;
  };
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
  const workflows: {
    name: string;
    binding: string;
    class_name: string;
    script_name?: string;
  }[] = [];
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
  const analyticsEngineDatasets: { binding: string; dataset: string }[] = [];
  const hyperdrive: {
    binding: string;
    id: string;
    localConnectionString: string;
  }[] = [];
  const pipelines: { binding: string; pipeline: string }[] = [];
  const secretsStoreSecrets: {
    binding: string;
    store_id: string;
    secret_name: string;
  }[] = [];

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
    if (typeof binding === "function") {
      // this is only reachable in the
      throw new Error(`Invalid binding ${bindingName} is a function`);
    }
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
        service: "name" in binding ? binding.name : binding.service,
      });
    } else if (binding.type === "kv_namespace") {
      // KV Namespace binding
      kvNamespaces.push({
        binding: bindingName,
        id: "namespaceId" in binding ? binding.namespaceId : binding.id,
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
        script_name: binding.scriptName,
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
    } else if (binding.type === "analytics_engine") {
      analyticsEngineDatasets.push({
        binding: bindingName,
        dataset: binding.dataset,
      });
    } else if (binding.type === "ai_gateway") {
      // no-op
    } else if (binding.type === "version_metadata") {
      if (spec.version_metadata) {
        throw new Error(
          `Version metadata already bound to ${spec.version_metadata.binding}`,
        );
      }
      spec.version_metadata = {
        binding: bindingName,
      };
    } else if (binding.type === "hyperdrive") {
      const password =
        "password" in binding.origin
          ? binding.origin.password.unencrypted
          : binding.origin.access_client_secret.unencrypted;
      hyperdrive.push({
        binding: bindingName,
        id: binding.hyperdriveId,
        localConnectionString: `${binding.origin.scheme || "postgres"}://${binding.origin.user}:${password}@${binding.origin.host}:${binding.origin.port || 5432}/${binding.origin.database}`,
      });
    } else if (binding.type === "pipeline") {
      pipelines.push({
        binding: bindingName,
        pipeline: binding.name,
      });
    } else if (binding.type === "json") {
      // TODO(sam): anything to do here? not sure wrangler.json supports this
    } else if (binding.type === "secrets_store") {
      if (binding.secrets) {
        for (const [secretName, _secret] of Object.entries(binding.secrets)) {
          secretsStoreSecrets.push({
            binding: bindingName,
            store_id: binding.id,
            secret_name: secretName,
          });
        }
      }
    } else {
      // biome-ignore lint/correctness/noVoidTypeReturn: it returns never
      return assertNever(binding);
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
    spec.vectorize = vectorizeIndexes;
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

  if (analyticsEngineDatasets.length > 0) {
    spec.analytics_engine_datasets = analyticsEngineDatasets;
  }

  if (hyperdrive.length > 0) {
    spec.hyperdrive = hyperdrive;
  }

  if (pipelines.length > 0) {
    spec.pipelines = pipelines;
  }

  if (secretsStoreSecrets.length > 0) {
    spec.secrets_store_secrets = secretsStoreSecrets;
  }
}
