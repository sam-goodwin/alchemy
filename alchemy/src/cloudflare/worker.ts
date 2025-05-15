import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getBindKey } from "../bootstrap/bind.js";
import { isRuntime } from "../bootstrap/env.js";
import type { Context } from "../context.js";
import type { BundleProps } from "../esbuild/bundle.js";
import { Resource } from "../resource.js";
import { Scope, walkScope } from "../scope.js";
import { getContentType } from "../util/content-type.js";
import { withExponentialBackoff } from "../util/retry.js";
import { slugify } from "../util/slugify.js";
import { CloudflareApiError, handleApiError } from "./api-error.js";
import {
  type CloudflareApi,
  type CloudflareApiOptions,
  createCloudflareApi,
} from "./api.js";
import type { Assets } from "./assets.js";
import {
  type Binding,
  type Bindings,
  Self,
  type WorkerBindingSpec,
} from "./bindings.js";
import type { Bound } from "./bound.js";
import { bundleWorkerScript } from "./bundle/bundle-worker.js";
import type { DurableObjectNamespace } from "./durable-object-namespace.js";
import { type EventSource, isQueueEventSource } from "./event-source.js";
import {
  QueueConsumer,
  deleteQueueConsumer,
  listQueueConsumers,
} from "./queue-consumer.js";
import { isQueue } from "./queue.js";
import type { WorkerScriptMetadata } from "./worker-metadata.js";
import type { SingleStepMigration } from "./worker-migration.js";
import { WorkerStub, isWorkerStub } from "./worker-stub.js";
import { type Workflow, upsertWorkflow } from "./workflow.js";

/**
 * Configuration options for static assets
 */
export interface AssetsConfig {
  /**
   * The contents of a _headers file (used to attach custom headers on asset responses)
   */
  _headers?: string;

  /**
   * The contents of a _redirects file (used to apply redirects or proxy paths ahead of asset serving)
   */
  _redirects?: string;

  /**
   * Determines the redirects and rewrites of requests for HTML content
   * @default "auto-trailing-slash"
   */
  html_handling?:
    | "auto-trailing-slash"
    | "force-trailing-slash"
    | "drop-trailing-slash"
    | "none";

  /**
   * Determines the response when a request does not match a static asset, and there is no Worker script
   */
  not_found_handling?: "none" | "404-page" | "single-page-application";

  /**
   * When true, requests will always invoke the Worker script.
   * Otherwise, attempt to serve an asset matching the request, falling back to the Worker script.
   */
  run_worker_first?: boolean;

  /**
   * When true and the incoming request matches an asset, that will be served instead of invoking the Worker script.
   * When false, requests will always invoke the Worker script.
   * @default true
   * @deprecated
   */
  serve_directly?: boolean;
}

export interface BaseWorkerProps<B extends Bindings = Bindings>
  extends CloudflareApiOptions {
  /**
   * Bundle options when using entryPoint
   *
   * Ignored if bundle is provided
   */
  bundle?: Omit<BundleProps, "entryPoint">;

  /**
   * The root directory of the project
   */
  projectRoot?: string;

  /**
   * Module format for the worker script
   * - 'esm' - ECMAScript modules (default)
   * - 'cjs' - CommonJS modules
   * @default 'esm'
   */
  format?: "esm" | "cjs";

  /**
   * Name for the worker
   *
   * @default id
   */
  name?: string;

  /**
   * Bindings to attach to the worker
   */
  bindings?: B;

  /**
   * Environment variables to attach to the worker
   *
   * These will be converted to plain_text bindings
   */
  env?: {
    [key: string]: string;
  };

  /**
   * Whether to enable a workers.dev URL for this worker
   *
   * If true, the worker will be available at {name}.{subdomain}.workers.dev
   * @default false
   */
  url?: boolean;

  /**
   * Observability configuration for the worker
   *
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

  /**
   * Whether to adopt the Worker if it already exists when creating
   */
  adopt?: boolean;

  /**
   * The compatibility date for the worker
   * @default "2025-04-26"
   */
  compatibilityDate?: string;

  /**
   * The compatibility flags for the worker
   */
  compatibilityFlags?: string[];

  /**
   * Configuration for static assets
   */
  assets?: AssetsConfig;

  /**
   * Cron expressions for the trigger.
   *
   * Uses standard cron syntax (e.g. "0 0 * * *" for daily at midnight)
   *
   * To clear all cron triggers, pass an empty array.
   *
   * @see https://developers.cloudflare.com/workers/configuration/cron-triggers/#examples
   */
  crons?: string[];

  /**
   * Event sources that this worker will consume.
   *
   * Can include queues, streams, or other event sources.
   */
  eventSources?: EventSource[];
}

export interface InlineWorkerProps<B extends Bindings = Bindings>
  extends BaseWorkerProps<B> {
  script: string;

  // never
  entrypoint?: undefined;
  meta?: undefined;
  fetch?: undefined;
}

export interface EntrypointWorkerProps<B extends Bindings = Bindings>
  extends BaseWorkerProps<B> {
  entrypoint: string;

  // never
  script?: undefined;
  meta?: undefined;
  fetch?: undefined;
}

export interface ImportMetaWorkerProps<B extends Bindings = Bindings>
  extends BaseWorkerProps<B> {
  meta?: ImportMeta;
  fetch: (request: Request) => Promise<Response>;

  // never
  script?: undefined;
  entrypoint?: undefined;
}

/**
 * Properties for creating or updating a Worker
 */
export type WorkerProps<B extends Bindings = Bindings> =
  | InlineWorkerProps<B>
  | EntrypointWorkerProps<B>
  | ImportMetaWorkerProps<B>;

/**
 * Output returned after Worker creation/update
 */
export type Worker<B extends Bindings = Bindings> =
  Resource<"cloudflare::Worker"> &
    Omit<WorkerProps<B>, "url" | "script"> & {
      type: "service";

      /**
       * The ID of the worker
       */
      id: string;

      /**
       * The name of the worker
       */
      name: string;

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
      bindings: B | undefined;

      /**
       * Configuration for static assets
       */
      assets?: AssetsConfig;

      // phantom property (for typeof myWorker.Env)
      Env: {
        [bindingName in keyof B]: Bound<B[bindingName]>;
      };

      /**
       * The compatibility date for the worker
       */
      compatibilityDate: string;

      /**
       * The compatibility flags for the worker
       */
      compatibilityFlags: string[];
    };

/**
 * A Cloudflare Worker is a serverless function that can be deployed to the Cloudflare network.
 *
 * @example
 * // Create a basic HTTP handler worker with custom domain routing
 * // and workers.dev URL:
 * const api = await Worker("api", {
 *   name: "api-worker",
 *   entrypoint: "./src/api.ts",
 *   routes: ["api.example.com/*"],
 *   url: true
 * });
 *
 * await Route("route", {
 *   zoneId: zone.zoneId,
 *   worker: api,
 *   pattern: "api.example.com/*",
 * });
 *
 * @example
 * // Create a real-time chat worker using Durable Objects
 * // for state management:
 * const chatRooms = new DurableObjectNamespace("chat-rooms");
 * const userStore = new DurableObjectNamespace("user-store");
 *
 * const chat = await Worker("chat", {
 *   name: "chat-worker",
 *   entrypoint: "./src/chat.ts",
 *   bindings: {
 *     ROOMS: chatRooms,
 *     USERS: userStore
 *   },
 * });
 *
 * @example
 * // Create a worker with KV namespace for caching and data storage:
 * const cache = await KVNamespace("cache-store");
 * const settings = await KVNamespace("user-settings");
 *
 * const cacheWorker = await Worker("cache", {
 *   name: "cache-worker",
 *   entrypoint: "./src/cache.ts",
 *   bindings: {
 *     CACHE: cache,
 *     SETTINGS: settings
 *   }
 * });
 *
 * @example
 * // Create a worker with R2 bucket for object storage:
 * const uploads = await R2Bucket("uploads", {
 *   name: "user-uploads"
 * });
 * const assets = await R2Bucket("assets", {
 *   name: "static-assets",
 *   allowPublicAccess: true
 * });
 *
 * const storageWorker = await Worker("storage", {
 *   name: "storage-worker",
 *   entrypoint: "./src/storage.ts",
 *   bindings: {
 *     UPLOADS: uploads,
 *     ASSETS: assets
 *   }
 * });
 *
 * @example
 * // Create a worker with static assets:
 * const staticAssets = await Assets("static", {
 *   path: "./src/assets"
 * });
 *
 * const frontendWorker = await Worker("frontend", {
 *   name: "frontend-worker",
 *   entrypoint: "./src/worker.ts",
 *   bindings: {
 *     ASSETS: staticAssets
 *   }
 * });
 *
 * @example
 * // Create a worker with scheduled cron triggers:
 * const cronWorker = await Worker("scheduled-tasks", {
 *   name: "cron-worker",
 *   entrypoint: "./src/scheduled.ts",
 *   crons: ['* 15 * * *', '0 0 * * *', '0 12 * * MON']
 * })
 *
 * @see
 * https://developers.cloudflare.com/workers/
 */
export function Worker<const B extends Bindings>(
  id: string,
  props: WorkerProps<B>,
): Promise<Worker<B>>;
export function Worker<const B extends Bindings>(
  id: string,
  meta: ImportMeta,
  props: WorkerProps<B>,
): Promise<Worker<B>>;
export function Worker<const B extends Bindings>(
  ...args:
    | [id: string, props: WorkerProps<B>]
    | [id: string, meta: ImportMeta, props: WorkerProps<B>]
): Promise<Worker<B>> {
  const [id, meta, props] =
    args.length === 2 ? [args[0], undefined, args[1]] : args;
  if (props.fetch) {
    const scope = Scope.current;

    const workerName = props.name ?? id;

    // we need to make sure the worker exists
    const stub = WorkerStub(`${id}/stub`, {
      name: workerName,
      accountId: props.accountId,
      apiKey: props.apiKey,
      apiToken: props.apiToken,
      baseUrl: props.baseUrl,
      email: props.email,
    });

    const deferred = scope.defer(async () => {
      const autoBindings: Record<string, Binding> = {};
      for await (const pendingResource of walkScope(scope)) {
        const resource: Resource = await pendingResource;
        if (isQueue(resource)) {
          autoBindings[getBindKey(resource)] = resource;
        } else if (isWorkerStub(resource)) {
          autoBindings[getBindKey(resource)] = resource;
        } // else if (isPipeline(...))
        // TODO(sam): make this generic/pluggable
      }

      // TODO(sam): now find all secretrs

      return _Worker(id, {
        meta,
        ...(props as ImportMetaWorkerProps<B>),
        name: workerName,
        bindings: {
          ...props.bindings,
          __ALCHEMY_WORKER_NAME__: workerName,
          // TODO(sam): prune un-needed bindings
          ...autoBindings,
        },
      });
    }) as Promise<Worker<B>>;

    // defer construction of this worker until the app is about to finaloze
    // this ensures that the Worker's dependencies are instantiated before we bundle
    // it is then safe to bundle and import the Worker to detect which resources need to be auto-bound
    const promise = Promise.all([deferred, stub]).then(
      ([worker]) => worker,
    ) as Promise<Worker<B>> & {
      fetch: (request: Request) => Promise<Response>;
    };

    if (isRuntime) {
      promise.fetch = props.fetch;
    } else {
      promise.fetch = async (request: Request) => {
        console.log(request);
        const worker = await promise;
        if (worker.url === undefined) {
          throw new Error("Worker URL is not available in runtime");
        }
        const workerURL = new URL(worker.url);
        const requestURL = new URL(request.url);
        requestURL.host = workerURL.host;
        return fetch(requestURL, request);
      };
    }
    return promise;
  }
  return _Worker(id, props);
}

export const _Worker = Resource(
  "cloudflare::Worker",
  {
    alwaysUpdate: true,
  },
  async function <const B extends Bindings>(
    this: Context<Worker<NoInfer<B>>>,
    id: string,
    props: WorkerProps<B>,
  ): Promise<Worker<B>> {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    // Use the provided name
    const workerName = props.name ?? id;

    const oldBindings = await this.get<Bindings>("bindings");

    const compatibilityDate = props.compatibilityDate ?? "2025-04-20";
    const compatibilityFlags = props.compatibilityFlags ?? [];

    const uploadWorkerScript = async (props: WorkerProps<B>) => {
      // Get the script content - either from props.script, or by bundling
      const scriptContent =
        props.script ??
        (await bundleWorkerScript({
          ...props,
          compatibilityDate,
          compatibilityFlags,
        }));

      // Find any assets bindings
      const assetsBindings: { name: string; assets: Assets }[] = [];
      const workflowsBindings: Workflow[] = [];

      if (props.bindings) {
        for (const [bindingName, binding] of Object.entries(props.bindings)) {
          if (typeof binding === "object") {
            if (binding.type === "assets") {
              assetsBindings.push({ name: bindingName, assets: binding });
            } else if (binding.type === "workflow") {
              workflowsBindings.push(binding);
            }
          }
        }
      }

      // Upload any assets and get completion tokens
      let assetUploadResult: AssetUploadResult | undefined;
      if (assetsBindings.length > 0) {
        // We'll use the first asset binding for now
        // In the future, we might want to support multiple asset bindings
        const assetBinding = assetsBindings[0];

        // Upload the assets and get the completion token
        assetUploadResult = await uploadAssets(
          api,
          workerName,
          assetBinding.assets,
          props.assets,
        );
      }

      // Prepare metadata with bindings
      const scriptMetadata = await prepareWorkerMetadata(
        this,
        oldBindings,
        {
          ...props,
          compatibilityDate,
          compatibilityFlags,
          workerName,
        },
        assetUploadResult,
      );

      await putWorker(api, workerName, scriptContent, scriptMetadata);

      for (const workflow of workflowsBindings) {
        await upsertWorkflow(api, {
          workflowName: workflow.workflowName,
          className: workflow.className,
          scriptName: workerName,
        });
      }

      await Promise.all(
        props.eventSources?.map((eventSource) => {
          if (isQueue(eventSource) || isQueueEventSource(eventSource)) {
            const queue = isQueue(eventSource)
              ? eventSource
              : eventSource.queue;
            return QueueConsumer(`${queue.id}-consumer`, {
              queue,
              scriptName: workerName,
              accountId: api.accountId,
              settings: isQueueEventSource(eventSource)
                ? eventSource.settings
                : undefined,
            });
          }
          throw new Error(`Unsupported event source type: ${eventSource}`);
        }) ?? [],
      );

      // TODO: it is less than ideal that this can fail, resulting in state problem
      await this.set("bindings", props.bindings);

      // Handle worker URL if requested
      const workerUrl = await configureURL(
        this,
        api,
        workerName,
        props.url ?? false,
      );

      // Get current timestamp
      const now = Date.now();

      // Update cron triggers
      if (props.crons) {
        const res = await api.put(
          `/accounts/${api.accountId}/workers/scripts/${workerName}/schedules`,
          props.crons.map((cron) => ({ cron })),
        );

        if (!res.ok) {
          await handleApiError(
            res,
            "updating cron triggers",
            "worker",
            workerName,
          );
        }
      }

      return { scriptMetadata, workerUrl, now };
    };

    if (this.phase === "delete") {
      if (
        Object.values(props.bindings ?? {}).some((binding) => binding === Self)
      ) {
        // remove the Self bindings or else we can't remove (LOL)
        await uploadWorkerScript({
          ...props,
          bindings: Object.fromEntries(
            Object.entries(props.bindings ?? {}).filter(
              ([_, binding]) => binding !== Self,
            ),
          ) as B,
        });
      }

      await withExponentialBackoff(
        () =>
          deleteWorker(this, api, {
            ...props,
            workerName,
          }),
        (err) =>
          (err.status === 400 &&
            err.message.includes(
              "is still referenced by service bindings in Workers",
            )) ||
          err.status === 500 ||
          err.status === 503,
        10,
        100,
      );

      return this.destroy();
    }
    // Validate input - we need either script, entryPoint, or bundle
    if (!props.script && !props.entrypoint && !props.fetch) {
      throw new Error("One of script, entryPoint or fetch must be provided");
    }
    if (props.fetch && !props.meta) {
      throw new Error("meta is required when using fetch");
    }

    if (this.phase === "create") {
      if (!props.adopt) {
        await assertWorkerDoesNotExist(this, api, workerName);
      }
    }

    const { scriptMetadata, workerUrl, now } = await uploadWorkerScript(props);

    // Construct the output
    return this({
      ...props,
      type: "service",
      id,
      entrypoint: props.entrypoint,
      name: workerName,
      compatibilityDate,
      compatibilityFlags,
      format: props.format || "esm", // Include format in the output
      bindings: props.bindings ?? ({} as B),
      env: props.env,
      observability: scriptMetadata.observability,
      createdAt: now,
      updatedAt: now,
      eventSources: props.eventSources,
      url: workerUrl,
      // Include assets configuration in the output
      assets: props.assets,
      // Include cron triggers in the output
      crons: props.crons,
      // phantom property
      Env: undefined!,
    });
  },
);

async function deleteWorker<B extends Bindings>(
  ctx: Context<Worker<B>>,
  api: CloudflareApi,
  props: WorkerProps<B> & { workerName: string },
) {
  const workerName = props.workerName;
  // Delete any queue consumers attached to this worker first
  await deleteQueueConsumers(ctx, api, workerName);

  // Delete worker
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/workers/scripts/${workerName}`,
  );

  // Check for success (2xx status code)
  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    await handleApiError(deleteResponse, "delete", "worker", workerName);
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
  return withExponentialBackoff(
    async () => {
      const scriptName =
        scriptMetadata.main_module ?? scriptMetadata.body_part!;

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
        await handleApiError(
          uploadResponse,
          "uploading worker script",
          "worker",
          workerName,
        );
      }

      return formData;
    },
    (err) => err.status === 404 || err.status === 500 || err.status === 503,
    10,
    100,
  );
}

interface WorkerMetadata {
  compatibility_date: string;
  compatibility_flags?: string[];
  bindings: WorkerBindingSpec[];
  observability: {
    enabled: boolean;
  };
  migrations?: SingleStepMigration;
  main_module?: string;
  body_part?: string;
  tags?: string[];
  assets?: {
    jwt?: string;
    keep_assets?: boolean;
    config?: AssetsConfig;
  };
  cron_triggers?: {
    cron: string;
    suspended: boolean;
  }[];
}

interface AssetUploadResult {
  completionToken: string;
  assetConfig?: AssetsConfig;
}

/**
 * Creates asset configuration object from provided config or defaults
 */
function createAssetConfig(config?: AssetsConfig): AssetsConfig {
  const assetConfig: AssetsConfig = {
    html_handling: "auto-trailing-slash",
  };

  if (config) {
    if (config._headers !== undefined) {
      assetConfig._headers = config._headers;
    }

    if (config._redirects !== undefined) {
      assetConfig._redirects = config._redirects;
    }

    if (config.html_handling !== undefined) {
      assetConfig.html_handling = config.html_handling;
    }

    if (config.not_found_handling !== undefined) {
      assetConfig.not_found_handling = config.not_found_handling;
    }

    if (config.run_worker_first !== undefined) {
      assetConfig.run_worker_first = config.run_worker_first;
    }

    if (config.serve_directly !== undefined) {
      assetConfig.serve_directly = config.serve_directly;
    }
  }

  return assetConfig;
}

async function prepareWorkerMetadata<B extends Bindings>(
  ctx: Context<Worker<B>>,
  oldBindings: Bindings | undefined,
  props: WorkerProps & {
    compatibilityDate: string;
    compatibilityFlags: string[];
    workerName: string;
  },
  assetUploadResult?: AssetUploadResult,
): Promise<WorkerMetadata> {
  // Prepare metadata with bindings
  const meta: WorkerMetadata = {
    compatibility_date: props.compatibilityDate,
    compatibility_flags: props.compatibilityFlags,
    bindings: [],
    observability: {
      enabled: props.observability?.enabled !== false,
    },
    // TODO(sam): base64 encode instead? 0 collision risk vs readability.
    tags: [`alchemy:id:${slugify(ctx.fqn)}`],
    migrations: {
      new_classes: props.migrations?.new_classes ?? [],
      deleted_classes: props.migrations?.deleted_classes ?? [],
      renamed_classes: props.migrations?.renamed_classes ?? [],
      transferred_classes: props.migrations?.transferred_classes ?? [],
      new_sqlite_classes: props.migrations?.new_sqlite_classes ?? [],
    },
  };

  // If we have asset upload results, add them to the metadata
  if (assetUploadResult) {
    meta.assets = {
      jwt: assetUploadResult.completionToken,
    };

    // Initialize config from assetUploadResult if it exists
    if (assetUploadResult.assetConfig) {
      meta.assets.config = {
        ...assetUploadResult.assetConfig,
      };
    }

    // If there's no config from assetUploadResult but we have props.assets,
    // we need to create the config ourselves (this handles the case when no assets were uploaded)
    if (!meta.assets.config && props.assets) {
      meta.assets.config = createAssetConfig(props.assets);
    }
  }

  const bindings = (props.bindings ?? {}) as Bindings;

  // Convert bindings to the format expected by the API
  for (const [bindingName, binding] of Object.entries(bindings)) {
    // Create a copy of the binding to avoid modifying the original

    if (typeof binding === "string") {
      meta.bindings.push({
        type: "plain_text",
        name: bindingName,
        text: binding,
      });
    } else if (binding === Self) {
      meta.bindings.push({
        type: "service",
        name: bindingName,
        service: props.workerName,
      });
    } else if (binding.type === "d1") {
      meta.bindings.push({
        type: "d1",
        name: bindingName,
        id: binding.id,
      });
    } else if (binding.type === "kv_namespace") {
      meta.bindings.push({
        type: "kv_namespace",
        name: bindingName,
        namespace_id: binding.namespaceId,
      });
    } else if (binding.type === "service") {
      meta.bindings.push({
        type: "service",
        name: bindingName,
        service: binding.name,
      });
    } else if (binding.type === "durable_object_namespace") {
      meta.bindings.push({
        type: "durable_object_namespace",
        name: bindingName,
        class_name: binding.className,
        script_name: binding.scriptName,
        environment: binding.environment,
        namespace_id: binding.namespaceId,
      });
      configureClassMigration(binding, binding.id, binding.className);
    } else if (binding.type === "r2_bucket") {
      meta.bindings.push({
        type: "r2_bucket",
        name: bindingName,
        bucket_name: binding.name,
      });
    } else if (binding.type === "assets") {
      meta.bindings.push({
        type: "assets",
        name: bindingName,
      });
    } else if (binding.type === "secret") {
      meta.bindings.push({
        type: "secret_text",
        name: bindingName,
        text: binding.unencrypted,
      });
    } else if (binding.type === "workflow") {
      meta.bindings.push({
        type: "workflow",
        name: bindingName,
        workflow_name: binding.workflowName,
        class_name: binding.className,
        // this should be set if the Workflow is in another script ...
        // script_name: ??,
      });
      // it's unclear whether this is needed, but it works both ways
      // configureClassMigration(binding, binding.id, binding.className);
    } else if (binding.type === "queue") {
      meta.bindings.push({
        type: "queue",
        name: bindingName,
        queue_name: binding.name,
      });
    } else if (binding.type === "pipeline") {
      meta.bindings.push({
        type: "pipelines",
        name: bindingName,
        pipeline: binding.name,
      });
    } else if (binding.type === "vectorize") {
      meta.bindings.push({
        type: "vectorize",
        name: bindingName,
        index_name: binding.name,
      });
    } else if (binding.type === "ai_gateway") {
      // AI Gateway binding - just needs the name property
      meta.bindings.push({
        type: "ai",
        name: bindingName,
      });
    } else if (binding.type === "hyperdrive") {
      // Hyperdrive binding
      meta.bindings.push({
        type: "hyperdrive",
        name: bindingName,
        id: binding.hyperdriveId,
      });
    } else if (binding.type === "browser") {
      meta.bindings.push({
        type: "browser",
        name: bindingName,
      });
    } else if (binding.type === "ai") {
      meta.bindings.push({
        type: "ai",
        name: bindingName,
      });
    } else {
      // @ts-expect-error - we should never reach here
      throw new Error(`Unsupported binding type: ${binding.type}`);
    }
  }

  function configureClassMigration(
    binding: DurableObjectNamespace | Workflow,
    stableId: string,
    className: string,
  ) {
    const oldBinding: DurableObjectNamespace | Workflow | undefined =
      Object.values(oldBindings ?? {})
        ?.filter(
          (b) =>
            typeof b === "object" &&
            (b.type === "durable_object_namespace" || b.type === "workflow"),
        )
        ?.find((b) => b.id === stableId);

    if (!oldBinding) {
      if (binding.type === "durable_object_namespace" && binding.sqlite) {
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
  }

  // Convert env variables to plain_text bindings
  // TODO(sam): remove Worker.env in favor of always bindings
  if (props.env) {
    for (const [key, value] of Object.entries(props.env)) {
      meta.bindings.push({
        name: key,
        type: "plain_text",
        text: value,
      });
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
  if (process.env.DEBUG) {
    console.log(meta);
  }
  return meta;
}

async function assertWorkerDoesNotExist<B extends Bindings>(
  ctx: Context<Worker<B>>,
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
        `alchemy:id:${slugify(ctx.fqn)}`,
      )
    ) {
      return true;
    }

    throw new Error(
      `Worker with name '${workerName}' already exists. Please use a unique name.`,
    );
  }
  throw new Error(
    `Error checking if worker exists: ${response.status} ${response.statusText} ${await response.text()}`,
  );
}

async function configureURL<B extends Bindings>(
  ctx: Context<Worker<B>>,
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
      if (ctx.phase === "create" || !ctx.output?.url) {
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

async function _getWorkerBindings(
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

/**
 * Interface for a file's metadata to be uploaded
 */
interface FileMetadata {
  hash: string;
  size: number;
}

/**
 * Response from the assets upload session API
 */
interface UploadSessionResponse {
  result: {
    jwt: string;
    buckets: string[][];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

/**
 * Response from the file upload API
 */
interface UploadResponse {
  result: {
    jwt: string;
    buckets?: string[][];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

/**
 * Uploads assets to Cloudflare and returns a completion token
 *
 * @param api CloudflareApi instance
 * @param workerName Name of the worker
 * @param assets Assets resource containing files to upload
 * @param assetConfig Configuration for the assets
 * @returns Completion token for the assets upload
 */
async function uploadAssets(
  api: CloudflareApi,
  workerName: string,
  assets: Assets,
  assetConfig?: WorkerProps["assets"],
): Promise<AssetUploadResult> {
  // Process the assets configuration once at the beginning
  const processedConfig = createAssetConfig(assetConfig);

  // Generate the file manifest
  const fileMetadata: Record<string, FileMetadata> = {};

  // Process each file in the assets
  for (const file of assets.files) {
    const { hash, size } = await calculateFileMetadata(file.filePath);
    // Use the relative path as the key, ensuring it starts with a slash
    const key = file.path.startsWith("/") ? file.path : `/${file.path}`;
    fileMetadata[key] = { hash, size };
  }

  // Start the upload session
  const uploadSessionUrl = `/accounts/${api.accountId}/workers/scripts/${workerName}/assets-upload-session`;
  const uploadSessionResponse = await api.post(
    uploadSessionUrl,
    JSON.stringify({ manifest: fileMetadata }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!uploadSessionResponse.ok) {
    throw new Error(
      `Failed to start assets upload session: ${uploadSessionResponse.status} ${uploadSessionResponse.statusText}`,
    );
  }

  const sessionData =
    (await uploadSessionResponse.json()) as UploadSessionResponse;

  // If there are no buckets, assets are already uploaded or empty
  if (!sessionData.result.buckets || sessionData.result.buckets.length === 0) {
    return {
      completionToken: sessionData.result.jwt,
      assetConfig: processedConfig,
    };
  }

  // Upload the files in batches as specified by the API
  let completionToken = sessionData.result.jwt;
  const buckets = sessionData.result.buckets;

  // Process each bucket of files
  for (const bucket of buckets) {
    const formData = new FormData();

    // Add each file in the bucket to the form
    for (const fileHash of bucket) {
      // Find the file with this hash
      const file = assets.files.find((f) => {
        const filePath = f.path.startsWith("/") ? f.path : `/${f.path}`;
        return fileMetadata[filePath]?.hash === fileHash;
      });

      if (!file) {
        throw new Error(`Could not find file with hash ${fileHash}`);
      }

      // Read the file content
      const fileContent = await fs.readFile(file.filePath);

      // Convert to base64 as required by the API when using base64=true
      const base64Content = fileContent.toString("base64");

      // Add the file to the form with the hash as the key and set the correct content type
      const blob = new Blob([base64Content], {
        // if you set application/octet-stream, you get weird `-1` errors with a message to contact support
        type: getContentType(file.filePath) ?? "application/null",
      });
      formData.append(fileHash, blob, fileHash);
    }

    // Upload this batch of files
    const uploadResponse = await api.post(
      `/accounts/${api.accountId}/workers/assets/upload?base64=true`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${completionToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (!uploadResponse.ok) {
      throw new Error(
        `Failed to upload asset files: ${uploadResponse.status} ${uploadResponse.statusText}`,
      );
    }

    const uploadData = (await uploadResponse.json()) as UploadResponse;
    if (!uploadData.success) {
      const error = uploadData.errors[0];
      const message = error.message;
      const code = error.code;
      throw new Error(
        `Failed to upload asset files: ${message} (Code: ${code})`,
      );
    }

    // Update the completion token for the next batch
    if (uploadData.result.jwt) {
      completionToken = uploadData.result.jwt;
    }
  }

  // Return the final completion token with asset configuration
  return {
    completionToken,
    assetConfig: processedConfig,
  };
}

/**
 * Calculate the SHA-256 hash and size of a file
 *
 * @param filePath Path to the file
 * @returns Hash (first 32 chars of SHA-256) and size of the file
 */
async function calculateFileMetadata(
  filePath: string,
): Promise<{ hash: string; size: number }> {
  const contents = await fs.readFile(filePath);

  const hash = crypto.createHash("sha256");
  hash.update(contents);

  const extension = path.extname(filePath).substring(1);
  hash.update(extension);

  return {
    hash: hash.digest("hex").slice(0, 32),
    size: contents.length,
  };
}

/**
 * Lists and deletes all queue consumers for a specific worker
 * @param ctx Worker context containing eventSources
 * @param api CloudflareApi instance
 * @param workerName Name of the worker script
 */
async function deleteQueueConsumers<B extends Bindings>(
  ctx: Context<Worker<B>>,
  api: CloudflareApi,
  workerName: string,
): Promise<void> {
  const eventSources = ctx.output?.eventSources || [];

  // Extract queue IDs from event sources
  const queueIds = eventSources.flatMap((eventSource) => {
    if (isQueue(eventSource)) {
      return [eventSource.id];
    }
    if (isQueueEventSource(eventSource)) {
      return [eventSource.queue.id];
    }
    return [];
  });

  // Process each queue associated with this worker
  await Promise.all(
    queueIds.map(async (queueId) => {
      try {
        // List all consumers for this queue
        const consumers = await listQueueConsumers(api, queueId);

        // Filter consumers by worker name
        const workerConsumers = consumers.filter(
          (consumer) => consumer.scriptName === workerName,
        );

        // Delete all consumers for this worker in parallel
        await Promise.all(
          workerConsumers.map(async (consumer) => {
            console.log(
              `Deleting queue consumer ${consumer.id} for worker ${workerName}`,
            );
            // Use the deleteQueueConsumer function from queue-consumer.ts
            await deleteQueueConsumer(api, consumer.queueId, consumer.id);
          }),
        );
      } catch (err) {
        if (err instanceof CloudflareApiError && err.status === 404) {
          // this is OK
        } else {
          throw err;
        }
      }
    }),
  );
}
