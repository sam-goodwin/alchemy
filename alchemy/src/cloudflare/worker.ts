import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import path from "pathe";
import type { Context } from "../context.ts";
import type { BundleProps } from "../esbuild/bundle.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { isSecret } from "../secret.ts";
import type { type } from "../type.ts";
import { DeferredPromise } from "../util/deferred-promise.ts";
import { exists } from "../util/exists.ts";
import { logger } from "../util/logger.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import {
  type CloudflareApi,
  type CloudflareApiOptions,
  type InternalCloudflareApiOptions,
  createCloudflareApi,
} from "./api.ts";
import type { Assets } from "./assets.ts";
import type {
  Bindings,
  WorkerBindingDurableObjectNamespace,
  WorkerBindingSpec,
} from "./bindings.ts";
import type { Bound } from "./bound.ts";
import { DEFAULT_COMPATIBILITY_DATE } from "./compatibility-date.gen.ts";
import {
  type CompatibilityPreset,
  unionCompatibilityFlags,
} from "./compatibility-presets.ts";
import { type Container, ContainerApplication } from "./container.ts";
import { CustomDomain } from "./custom-domain.ts";
import type { DispatchNamespace } from "./dispatch-namespace.ts";
import {
  DurableObjectNamespace,
  isDurableObjectNamespace,
} from "./durable-object-namespace.ts";
import { type EventSource, isQueueEventSource } from "./event-source.ts";
import {
  QueueConsumer,
  deleteQueueConsumer,
  listQueueConsumersForWorker,
} from "./queue-consumer.ts";
import { isQueue } from "./queue.ts";
import { Route } from "./route.ts";
import { uploadAssets } from "./worker-assets.ts";
import { WorkerBundle, normalizeWorkerBundle } from "./worker-bundle.ts";
import {
  type WorkerScriptMetadata,
  bumpMigrationTagVersion,
  prepareWorkerMetadata,
} from "./worker-metadata.ts";
import { WorkerSubdomain, disableWorkerSubdomain } from "./worker-subdomain.ts";
import { createTail } from "./worker-tail.ts";
import { Workflow, isWorkflow, upsertWorkflow } from "./workflow.ts";

// Previous versions of `Worker` used the `Bundle` resource.
// This import is here to avoid errors when destroying the `Bundle` resource.
import "../esbuild/bundle.ts";

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
   *
   * @default auto-trailing-slash
   */
  html_handling?:
    | "auto-trailing-slash"
    | "force-trailing-slash"
    | "drop-trailing-slash"
    | "none";

  /**
   * Determines the response when a request does not match a static asset, and there is no Worker script
   *
   * @default none
   */
  not_found_handling?: "none" | "404-page" | "single-page-application";

  /**
   * When true, requests will always invoke the Worker script.
   * If an array is passed, the worker will be invoked for matching requests.
   * Otherwise, attempt to serve an asset matching the request, falling back to the Worker script.
   *
   * @default false
   */
  run_worker_first?: boolean | string[];
}

export interface BaseWorkerProps<
  B extends Bindings | undefined = undefined,
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> extends CloudflareApiOptions {
  /**
   * Bundle options when using entryPoint
   *
   * Ignored if bundle is provided
   */
  bundle?: Omit<BundleProps, "entryPoint">;

  /**
   * The root directory of the project
   */
  cwd?: string;

  /**
   * The root directory of the project
   * @deprecated Use `cwd` instead
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
   *
   * @deprecated - use `bindings` instead
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
   * Whether to adopt the Worker if it already exists when creating
   */
  adopt?: boolean;

  /**
   * The compatibility date for the worker
   * @default DEFAULT_WORKER_COMPATIBILITY_DATE - automatically pinned to the latest Workers release
   */
  compatibilityDate?: string;

  /**
   * The compatibility flags for the worker
   */
  compatibilityFlags?: string[];

  /**
   * Compatibility preset to automatically include common compatibility flags
   *
   * - "node": Includes nodejs_compat flag for Node.js compatibility
   *
   * @default undefined (no preset)
   */
  compatibility?: CompatibilityPreset;

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

  /**
   * Routes to create for this worker.
   *
   * Each route maps a URL pattern to this worker script.
   *
   * @example
   * await Worker("my-worker", {
   *   routes: [
   *     "sub.example.com/*",
   *     { pattern: "sub.example.com/*", zoneId: "1234567890" },
   *   ],
   * });
   */
  routes?: (
    | string
    | {
        /**
         * URL pattern for the route
         * @example "sub.example.com/*"
         */
        pattern: string;
        /**
         * Zone ID for the route. If not provided, will be automatically inferred from the route pattern.
         */
        zoneId?: string;
        /**
         * Whether to adopt an existing route with the same pattern if it exists
         * @default false
         */
        adopt?: boolean;
      }
  )[];

  /**
   * Custom domains to bind to the worker
   *
   * @example
   * await Worker("my-worker", {
   *   domains: [
   *     "example.com",
   *     { name: "example.com", zoneId: "1234567890" },
   *   ],
   * });
   */
  domains?: (
    | string
    | {
        /**
         * The domain name to bind to the worker
         */
        domainName: string;
        /**
         * Zone ID for the domain.
         *
         * @default - If not provided, will be automatically inferred from the domain name.
         */
        zoneId?: string;
        /**
         * Whether to adopt an existing domain if it exists
         * @default false
         */
        adopt?: boolean;
      }
  )[];

  /**
   * The RPC class to use for the worker.
   *
   * This is only used when using the rpc property.
   */
  rpc?: (new (...args: any[]) => RPC) | type<RPC>;

  /**
   * Deploy this worker to a dispatch namespace
   *
   * This allows workers to be routed to via dispatch namespace routing rules
   */
  namespace?: string | DispatchNamespace;

  /**
   * Version label for this worker deployment
   *
   * When specified, the worker will be published as a version with this label
   * instead of updating the live deployment. This creates a preview URL that
   * can be tested before promoting to production.
   *
   * @example "pr-123"
   */
  version?: string;

  /**
   * Configuration for local development. By default, when Alchemy is running in development mode,
   * the worker will be emulated locally and available at a randomly selected port.
   */
  dev?:
    | {
        /**
         * Port to use for local development
         */
        port?: number;
        /**
         * Whether to run the worker remotely instead of locally.
         *
         * @default false
         */
        remote?: boolean;
        /** @internal */
        command?: undefined;
      }
    | {
        command: string;
        cwd?: string;
        /** @internal */
        port?: undefined;
        /** @internal */
        remote?: undefined;
      };

  /**
   * Smart placement configuration for the worker.
   *
   * Controls how Cloudflare places the worker across its network for optimal performance.
   *
   * When omitted, smart placement is disabled (default behavior).
   */
  placement?: {
    /**
     * The placement mode for the worker.
     *
     * - "smart": Automatically optimize placement based on performance metrics
     *
     * @default undefined (smart placement disabled)
     */
    mode: "smart";
  };

  limits?: {
    /**
     * The maximum CPU time in milliseconds that the worker can use.
     *
     * @see https://developers.cloudflare.com/workers/platform/limits/#cpu-time
     * @default 30_000 (30 seconds)
     */
    cpu_ms?: number;
  };
}

export interface InlineWorkerProps<
  B extends Bindings | undefined = Bindings,
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> extends BaseWorkerProps<B, RPC> {
  script: string;
  entrypoint?: undefined;
  noBundle?: false;
}

export interface EntrypointWorkerProps<
  B extends Bindings | undefined = Bindings,
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> extends BaseWorkerProps<B, RPC> {
  script?: undefined;
  /**
   * The entrypoint for the worker script.
   */
  entrypoint: string;

  /**
   * Whether to disable bundling of the worker script.
   *
   * If true, the worker script and any files it imports will be deployed in the Worker.
   *
   * @default false
   */
  noBundle?: boolean;

  /**
   * Whether to upload source maps for the worker script.
   *
   * @default true
   */
  sourceMap?: boolean;

  /**
   * Rules for adding additional files to the bundle.
   *
   * If {@link noBundle} is false | undefined, this will be ignored.
   *
   * @default - all .js, .mjs, and .wasm files under the entrypoint directory
   */
  rules?: {
    globs: string[];
  }[];
}

/**
 * Properties for creating or updating a Worker
 */
export type WorkerProps<
  B extends Bindings | undefined = Bindings,
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> = InlineWorkerProps<B, RPC> | EntrypointWorkerProps<B, RPC>;

export function isWorker(resource: Resource): resource is Worker<any> {
  return resource[ResourceKind] === "cloudflare::Worker";
}

/**
 * Output returned after Worker creation/update
 */
export type Worker<
  B extends Bindings | undefined = Bindings | undefined,
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> = Resource<"cloudflare::Worker"> &
  Omit<WorkerProps<B>, "url" | "script" | "routes" | "domains"> & {
    /** @internal phantom property */
    __rpc__?: RPC;

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
     * The root directory of the project
     * @default process.cwd()
     */
    cwd: string;

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
     *
     * @default true
     */
    url?: string;

    /**
     * The bindings that were created
     */
    bindings: B;

    /**
     * Configuration for static assets
     */
    assets?: AssetsConfig;

    /**
     * The routes that were created for this worker
     */
    routes?: Route[];

    /**
     * The custom domains that were created for this worker
     */
    domains?: CustomDomain[];

    // phantom property (for typeof myWorker.Env)
    Env: B extends Bindings
      ? {
          [bindingName in keyof B]: Bound<B[bindingName]>;
        }
      : undefined;

    /**
     * The compatibility date for the worker
     */
    compatibilityDate: string;

    /**
     * The compatibility flags for the worker
     */
    compatibilityFlags: string[];

    /**
     * The dispatch namespace this worker is deployed to
     */
    namespace?: string | DispatchNamespace;

    /**
     * Version label for this worker deployment
     */
    version?: string;

    /**
     * Smart placement configuration for the worker
     */
    placement?: {
      mode: "smart";
    };
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
 * const chatRooms = DurableObjectNamespace("chat-rooms");
 * const userStore = DurableObjectNamespace("user-store");
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
 * @example
 * // Create cross-script durable object binding where one worker
 * // defines the durable object and another worker accesses it:
 * const dataWorker = await Worker("data-worker", {
 *   name: "data-worker",
 *   entrypoint: "./src/data.ts",
 *   bindings: {
 *     // Bind to its own durable object
 *     STORAGE: DurableObjectNamespace("storage", {
 *       className: "DataStorage"
 *     })
 *   }
 * });
 *
 * const apiWorker = await Worker("api-worker", {
 *   name: "api-worker",
 *   entrypoint: "./src/api.ts",
 *   bindings: {
 *     // Cross-script binding to the data worker's durable object
 *     SHARED_STORAGE: dataWorker.bindings.STORAGE
 *   }
 * });
 *
 * @example
 * // Create a worker with queue event sources and custom consumer settings:
 * const taskQueue = await Queue("task-queue", {
 *   name: "task-queue"
 * });
 *
 * const dlq = await Queue("failed-tasks", {
 *   name: "failed-tasks"
 * });
 *
 * const queueWorker = await Worker("queue-processor", {
 *   name: "queue-processor",
 *   entrypoint: "./src/processor.ts",
 *   bindings: {
 *     TASK_QUEUE: taskQueue  // Producer: bind queue for sending messages
 *   },
 *   eventSources: [{  // Consumer: configure processing settings
 *     queue: taskQueue,
 *     settings: {
 *       batchSize: 15,           // Process 15 messages at once
 *       maxConcurrency: 3,       // Allow 3 concurrent invocations
 *       maxRetries: 5,           // Retry failed messages up to 5 times
 *       maxWaitTimeMs: 2500,     // Wait up to 2.5 seconds to fill a batch
 *       retryDelay: 60,          // Wait 60 seconds before retrying failed messages
 *       deadLetterQueue: dlq     // Send failed messages to dead letter queue
 *     }
 *   }]
 * });
 *
 * @example
 * // Create a worker version for testing with a preview URL:
 * const previewWorker = await Worker("my-worker", {
 *   name: "my-worker",
 *   entrypoint: "./src/worker.ts",
 *   version: "pr-123"
 * });
 *
 * // The worker will have a preview URL for testing:
 * console.log(`Preview URL: ${previewWorker.url}`);
 * // Output: Preview URL: https://pr-123-my-worker.subdomain.workers.dev
 */
export function Worker<
  const B extends Bindings,
  RPC extends Rpc.WorkerEntrypointBranded,
>(id: string, props: WorkerProps<B, RPC>): Promise<Worker<B, RPC>>;

export function Worker<const B extends Bindings>(
  id: string,
  props: WorkerProps<B>,
): Promise<Worker<B>> {
  return _Worker(id, props as WorkerProps<B>);
}

const _Worker = Resource(
  "cloudflare::Worker",
  {
    alwaysUpdate: true,
  },
  async function <const B extends Bindings>(
    this: Context<Worker<NoInfer<B>>>,
    id: string,
    props: WorkerProps<B>,
  ): Promise<Worker<B>> {
    if (props.projectRoot) {
      logger.warn("projectRoot is deprecated, use cwd instead");
      props.cwd = props.projectRoot;
    }

    const cwd = path.resolve(props.cwd ?? process.cwd());
    const relativeCwd =
      cwd === process.cwd() ? undefined : path.relative(process.cwd(), cwd);

    const workerName = props.name ?? id;
    const compatibilityDate =
      props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE;
    const compatibilityFlags = unionCompatibilityFlags(
      props.compatibility,
      props.compatibilityFlags,
    );
    const dispatchNamespace =
      typeof props.namespace === "string"
        ? props.namespace
        : props.namespace?.namespaceName;

    const bundleSourceResult = normalizeWorkerBundle({
      id,
      entrypoint: props.entrypoint,
      script: props.script,
      format: props.format,
      noBundle: props.noBundle,
      rules: "rules" in props ? props.rules : undefined,
      bundle: props.bundle,
      cwd,
      compatibilityDate,
      compatibilityFlags,
      outdir:
        props.bundle?.outdir ?? path.join(cwd, ".alchemy", "out", workerName),
      sourceMap: "sourceMap" in props ? props.sourceMap : undefined,
    });

    // run locally if
    const local = this.scope.local && !props.dev?.remote;
    const watch = this.scope.watch;

    if (local) {
      let url: string | undefined;
      if (bundleSourceResult.isErr()) {
        throw bundleSourceResult.error;
      }

      if (props.dev?.command) {
        const result = await createDevCommand({
          id,
          command: props.dev.command,
          cwd: props.dev.cwd || props.cwd || process.cwd(),
          env: {
            ...(process.env ?? {}),
            ...props.env,
            ...Object.fromEntries(
              Object.entries(props.bindings ?? {}).flatMap(([key, value]) =>
                typeof value === "string"
                  ? [[key, value]]
                  : isSecret(value)
                    ? [[key, value.unencrypted]]
                    : [],
              ),
            ),
          },
        });
        url = result.url;
        this.onCleanup(() => result.cleanup());
      } else {
        const { MiniflareController } = await import(
          "./miniflare/miniflare-controller.ts"
        );
        const controller = MiniflareController.singleton;
        url = await controller.add({
          id,
          name: workerName,
          compatibilityDate,
          compatibilityFlags,
          bindings: props.bindings,
          eventSources: props.eventSources,
          assets: props.assets,
          bundle: bundleSourceResult.value,
          port: props.dev?.port,
        });
        this.onCleanup(() => controller.dispose());
      }

      return this({
        type: "service",
        id,
        entrypoint: props.entrypoint,
        name: workerName,
        cwd: relativeCwd,
        compatibilityDate,
        compatibilityFlags,
        format: props.format || "esm", // Include format in the output
        bindings: normalizeExportBindings(workerName, props.bindings),
        env: props.env,
        observability: props.observability,
        createdAt: this.output?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
        eventSources: props.eventSources,
        url,
        dev: props.dev,
        // Include assets configuration in the output
        assets: props.assets,
        // Include cron triggers in the output
        crons: props.crons,
        // Include placement configuration in the output
        placement: props.placement,
        // Include limits configuration in the output
        limits: props.limits,
        // phantom property
        Env: undefined!,
      } as unknown as Worker<B>);
    }

    const api = await createCloudflareApi(props);

    if (this.phase === "delete") {
      if (bundleSourceResult.isOk()) {
        await bundleSourceResult.value.delete?.();
      }
      if (!props.version) {
        await deleteQueueConsumers(api, workerName);
        await deleteWorker(api, {
          scriptName: workerName,
          dispatchNamespace,
        });
      }
      return this.destroy();
    } else if (bundleSourceResult.isErr()) {
      throw new Error(bundleSourceResult.error);
    }

    const bundleSource = bundleSourceResult.value;

    if (this.phase === "update") {
      const oldName = this.output.name ?? this.output.id;
      const newName = workerName;

      if (oldName !== newName) {
        if (dispatchNamespace) {
          this.replace(true);
        } else {
          const renameResponse = await api.patch(
            `/accounts/${api.accountId}/workers/services/${oldName}`,
            { id: newName },
          );

          if (!renameResponse.ok) {
            await handleApiError(renameResponse, "rename", "worker", oldName);
          }
        }
      }
    }

    let assetsBinding: Assets | undefined;
    const workflowsBindings: Workflow[] = [];
    const containersBindings: Container[] = [];

    for (const binding of Object.values(props.bindings ?? {})) {
      if (typeof binding === "object") {
        if (binding.type === "assets") {
          assetsBinding = binding;
        } else if (binding.type === "workflow") {
          workflowsBindings.push(binding);
        } else if (binding.type === "container") {
          containersBindings.push(binding);
        }
      }
    }

    const putWorkerWithAssets = async (
      props: WorkerProps<B>,
      scriptBundle: WorkerBundle,
    ) => {
      const assetUploadResult = assetsBinding
        ? await uploadAssets(api, {
            workerName,
            assets: assetsBinding,
            assetConfig: props.assets,
            namespace: dispatchNamespace,
          })
        : undefined;

      // Deploy worker (either as version or live worker)
      return await putWorker(api, {
        ...props,
        workerName,
        scriptBundle,
        dispatchNamespace,
        version: props.version,
        compatibilityDate,
        compatibilityFlags,
        assetUploadResult,
      });
    };

    if (this.phase === "create") {
      if (props.version) {
        // When version is specified, we adopt existing workers or create them if they don't exist
        if (!(await workerExists(api, workerName))) {
          // Create the base worker first if it doesn't exist
          const baseWorkerProps = { ...props, version: undefined };
          await putWorkerWithAssets(
            baseWorkerProps,
            await bundleSource.create(),
          );
        }
        // We always "adopt" when publishing versions
      } else if (!props.adopt) {
        await assertWorkerDoesNotExist(api, workerName);
      }
    }

    let putWorkerResult: PutWorkerResult;
    if (watch) {
      const controller = new AbortController();
      const promise = new DeferredPromise<PutWorkerResult>();
      const runWatch = async () => {
        for await (const bundle of bundleSource.watch(controller.signal)) {
          if (promise.status === "pending") {
            await putWorkerWithAssets(props, bundle)
              .then((result) => promise.resolve(result))
              .catch((error) => {
                controller.abort();
                promise.reject(error);
              });
            continue;
          }

          logger.task("", {
            message: "reload",
            status: "success",
            resource: id,
            prefix: "build",
            prefixColor: "cyanBright",
          });
          await putWorker(api, {
            ...props,
            workerName,
            scriptBundle: bundle,
            dispatchNamespace,
            version: props.version,
            compatibilityDate,
            compatibilityFlags,
            assetUploadResult: assetsBinding
              ? {
                  keepAssets: true,
                  assetConfig: props.assets,
                }
              : undefined,
            unstable_cacheWorkerSettings: true,
          });
          logger.task("", {
            message: "updated",
            status: "success",
            resource: id,
            prefix: "build",
            prefixColor: "greenBright",
          });
        }
      };
      void runWatch(); // this is not awaited because it's an ongoing process
      this.onCleanup(() => controller.abort());
      putWorkerResult = await promise.value;
      const tail = await createTail(api, id, workerName).catch((error) => {
        logger.error(`Failed to create tail for ${workerName}`, error);
      });
      this.onCleanup(() => tail?.close());
    } else {
      const scriptBundle = await bundleSource.create();
      putWorkerResult = await putWorkerWithAssets(props, scriptBundle);
    }

    const tasks: Promise<unknown>[] = [];

    for (const workflow of workflowsBindings) {
      if (
        workflow.scriptName === undefined ||
        workflow.scriptName === workerName
      ) {
        tasks.push(
          upsertWorkflow(api, {
            workflowName: workflow.workflowName,
            className: workflow.className,
            scriptName: workflow.scriptName ?? workerName,
          }),
        );
      }
    }

    if (containersBindings.length > 0) {
      tasks.push(
        getVersionMetadata(api, workerName, putWorkerResult.deployment_id).then(
          (versionMetadata) =>
            provisionContainers(api, {
              scriptName: workerName,
              containers: containersBindings,
              bindings: versionMetadata.resources.bindings,
            }),
        ),
      );
    }

    if (!isDeepStrictEqual(props.crons, this.output?.crons)) {
      tasks.push(
        api.put(
          `/accounts/${api.accountId}/workers/scripts/${workerName}/schedules`,
          props.crons?.map((cron) => ({ cron })) ?? [],
        ),
      );
    }

    tasks.push(
      provisionEventSources(api, {
        scriptName: workerName,
        eventSources: props.eventSources,
        adopt: props.adopt,
      }),
    );

    const [domains, routes, subdomain] = await Promise.all([
      // TODO: can you provision domains and routes in parallel, or is there a dependency?
      provisionDomains(api, {
        scriptName: workerName,
        adopt: props.adopt,
        domains: props.domains,
      }),
      provisionRoutes(api, {
        scriptName: workerName,
        adopt: props.adopt,
        routes: props.routes,
      }),
      provisionSubdomain(api, {
        scriptName: workerName,
        enable: props.url ?? dispatchNamespace === undefined,
        previewVersionId:
          props.version && putWorkerResult.metadata.has_preview
            ? putWorkerResult.id
            : undefined,
        retain: !!props.version,
        forceDelete:
          this.phase === "create" && !!props.adopt && props.url === false,
      }),
      ...tasks,
    ]);

    const now = Date.now();

    // Construct the output
    return this({
      ...props,
      type: "service",
      id,
      entrypoint: props.entrypoint,
      name: workerName,
      cwd: relativeCwd,
      compatibilityDate,
      compatibilityFlags,
      format: props.format || "esm", // Include format in the output
      bindings: normalizeExportBindings(workerName, props.bindings),
      env: props.env,
      observability: props.observability,
      createdAt: this.output?.createdAt ?? now,
      updatedAt: now,
      eventSources: props.eventSources,
      url: subdomain?.url,
      dev: props.dev,
      // Include assets configuration in the output
      assets: props.assets,
      // Include cron triggers in the output
      crons: props.crons,
      // Include the created routes in the output
      routes,
      // Include the created domains in the output
      domains,
      // Include the dispatch namespace in the output
      namespace: props.namespace,
      // Include version information in the output
      version: props.version,
      // Include placement configuration in the output
      placement: props.placement,
      // Include limits configuration in the output
      limits: props.limits,
      // phantom property
      Env: undefined!,
    } as unknown as Worker<B>);
  },
);

const assertUnique = <T, Key extends keyof T>(
  inputs: T[],
  key: Key,
  message: string,
) => {
  const ids = inputs.map((input) => input[key]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    throw new Error(`Duplicate ${message} found: ${duplicates.join(", ")}`);
  }
};

const normalizeExportBindings = (
  scriptName: string,
  bindings: Bindings = {},
) => {
  return Object.fromEntries(
    Object.entries(bindings).map(([bindingName, binding]) => [
      bindingName,
      isDurableObjectNamespace(binding) && binding.scriptName === undefined
        ? DurableObjectNamespace(binding.id, {
            ...binding,
            // re-export this binding mapping to the host worker (this worker)
            scriptName,
          })
        : isWorkflow(binding) && binding.scriptName === undefined
          ? Workflow(binding.id, {
              ...binding,
              // re-export this binding mapping to the host worker (this worker)
              scriptName,
            })
          : binding,
    ]),
  );
};

const normalizeApiOptions = (
  api: CloudflareApi,
): InternalCloudflareApiOptions => ({
  accountId: api.accountId,
  baseUrl: api.baseUrl,
  ...api.authOptions,
});

async function provisionContainers(
  api: CloudflareApi,
  props: {
    scriptName: string;
    containers?: Container[];
    bindings: WorkerBindingSpec[];
  },
): Promise<ContainerApplication[] | undefined> {
  if (!props.containers?.length) {
    return;
  }
  return await Promise.all(
    props.containers.map((container) => {
      const namespaceId = props.bindings.find(
        (binding): binding is WorkerBindingDurableObjectNamespace =>
          binding.type === "durable_object_namespace" &&
          binding.class_name === container.className,
      )?.namespace_id;
      if (!namespaceId) {
        throw new Error(`Namespace ID not found for container ${container.id}`);
      }
      return ContainerApplication(container.id, {
        image: container.image,
        name: container.name,
        instanceType: container.instanceType,
        observability: container.observability,
        durableObjects: {
          namespaceId,
        },
        schedulingPolicy: container.schedulingPolicy,
        adopt: container.adopt,
        ...normalizeApiOptions(api),
      });
    }),
  );
}

async function provisionEventSources(
  api: CloudflareApi,
  props: {
    scriptName: string;
    eventSources?: EventSource[];
    adopt?: boolean;
  },
): Promise<QueueConsumer[] | undefined> {
  if (!props.eventSources?.length) {
    return;
  }
  return await Promise.all(
    props.eventSources.map((eventSource) => {
      if (isQueue(eventSource)) {
        return QueueConsumer(`${eventSource.id}-consumer`, {
          queue: eventSource,
          scriptName: props.scriptName,
          settings: eventSource.dlq
            ? { deadLetterQueue: eventSource.dlq }
            : undefined,
          adopt: props.adopt,
          ...normalizeApiOptions(api),
        });
      }
      if (isQueueEventSource(eventSource)) {
        return QueueConsumer(`${eventSource.queue.id}-consumer`, {
          queue: eventSource.queue,
          scriptName: props.scriptName,
          settings: eventSource.settings,
          adopt: props.adopt,
          ...normalizeApiOptions(api),
        });
      }
      throw new Error(`Unsupported event source: ${eventSource}`);
    }),
  );
}

async function provisionDomains(
  api: CloudflareApi,
  props: {
    scriptName: string;
    adopt?: boolean;
    domains?: WorkerProps["domains"];
  },
): Promise<CustomDomain[] | undefined> {
  if (!props.domains?.length) {
    return;
  }
  const domains = props.domains.map((domain) => {
    if (typeof domain === "string") {
      return {
        name: domain,
        zoneId: undefined,
        adopt: props.adopt,
      };
    }
    return {
      name: domain.domainName,
      zoneId: domain.zoneId,
      adopt: domain.adopt ?? props.adopt,
    };
  });
  assertUnique(domains, "name", "Custom Domain");
  return await Promise.all(
    domains.map(async (domain) => {
      return await CustomDomain(domain.name, {
        workerName: props.scriptName,
        name: domain.name,
        zoneId: domain.zoneId,
        adopt: domain.adopt,
        ...normalizeApiOptions(api),
      });
    }),
  );
}

async function provisionRoutes(
  api: CloudflareApi,
  props: {
    scriptName: string;
    adopt?: boolean;
    routes?: WorkerProps["routes"];
  },
): Promise<Route[] | undefined> {
  if (!props.routes?.length) {
    return;
  }
  const routes = props.routes.map((route) => {
    if (typeof route === "string") {
      return {
        pattern: route,
        adopt: props.adopt,
      };
    }
    return {
      pattern: route.pattern,
      zoneId: route.zoneId,
      adopt: route.adopt ?? props.adopt,
    };
  });
  assertUnique(routes, "pattern", "Route");
  return await Promise.all(
    routes.map(async (route) => {
      return await Route(route.pattern, {
        pattern: route.pattern,
        script: props.scriptName,
        zoneId: route.zoneId,
        adopt: route.adopt,
        ...normalizeApiOptions(api),
      });
    }),
  );
}

async function provisionSubdomain(
  api: CloudflareApi,
  props: {
    scriptName: string;
    enable: boolean;
    previewVersionId: string | undefined;
    retain: boolean;
    forceDelete: boolean;
  },
): Promise<WorkerSubdomain | undefined> {
  if (props.enable) {
    return await WorkerSubdomain("url", {
      scriptName: props.scriptName,
      previewVersionId: props.previewVersionId,
      retain: props.retain,
      ...normalizeApiOptions(api),
    });
  }
  if (props.forceDelete) {
    await disableWorkerSubdomain(api, props.scriptName);
  }
}

async function createDevCommand(props: {
  id: string;
  command: string;
  cwd: string;
  env: Record<string, string | undefined>;
}) {
  const persistFile = path.join(process.cwd(), ".alchemy", `${props.id}.pid`);
  if (await exists(persistFile)) {
    const pid = Number.parseInt(await fs.readFile(persistFile, "utf8"));
    try {
      // Actually kill the process if it's alive
      process.kill(pid, "SIGTERM");
    } catch {
      // ignore
    }
    try {
      await fs.unlink(persistFile);
    } catch {
      // ignore
    }
  }
  const command = props.command.split(" ");
  const [cmd, ...args] = command;

  const promise = new DeferredPromise<string>();
  const childProcess = spawn(cmd, args, {
    cwd: props.cwd,
    shell: true,
    env: {
      ...process.env,
      ...props.env,
      ALCHEMY_CLOUDFLARE_PERSIST_PATH: path.join(
        process.cwd(),
        ".alchemy",
        "miniflare",
      ),
      // Force colors in the child process since we're piping output
      // FORCE_COLOR: "1",
    },
    stdio: ["inherit", "pipe", "pipe"],
  });

  // Clean up the pid file when the process exits
  childProcess.once("exit", async () => {
    try {
      await fs.unlink(persistFile);
    } catch {
      // ignore
    }
  });

  let urlFound = false;
  let stdout = "";
  let stderr = "";
  const urlRegex =
    /http:\/\/(?:(?:localhost|0\.0\.0\.0|127\.0\.0\.1)|(?:\d{1,3}\.){3}\d{1,3}):\d+(?:\/)?/;

  const parseOutput = (data: string) => {
    if (!urlFound) {
      const match = data.match(urlRegex);
      if (match) {
        urlFound = true;
        promise.resolve(match[0]);
      }
    }
  };

  // Handle stdout - parse for URL and write through with colors preserved
  childProcess.stdout?.on("data", (data) => {
    parseOutput(
      (stdout += data.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "")),
    );
    process.stdout.write(data);
  });

  childProcess.stderr?.on("data", (data) => {
    parseOutput(
      (stderr += data.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "")),
    );
    process.stderr.write(data);
  });

  childProcess.on("error", (error) => {
    promise.reject(error);
  });
  if (childProcess.pid) {
    await fs.mkdir(path.dirname(persistFile), { recursive: true });
    await fs.writeFile(persistFile, childProcess.pid.toString());
  }
  return {
    url: await promise.value,
    cleanup: async () => {
      try {
        await fs.unlink(persistFile);
      } catch {
        // ignore
      }
      if (!childProcess.killed) {
        childProcess.kill("SIGTERM");
        // Give it time to exit gracefully
        await new Promise<void>((resolve) => {
          const timeout = setTimeout(() => {
            if (!childProcess.killed) {
              childProcess.kill("SIGKILL");
            }
            resolve();
          }, 5000);

          childProcess.once("exit", () => {
            clearTimeout(timeout);
            resolve();
          });
        });
      }
    },
  };
}

type PutWorkerOptions = Omit<WorkerProps, "entrypoint"> & {
  dispatchNamespace?: string;
  migrationTag?: string;
  workerName: string;
  scriptBundle: WorkerBundle;
  version?: string;
  compatibilityDate: string;
  compatibilityFlags: string[];
  assetUploadResult?: {
    completionToken?: string;
    keepAssets?: boolean;
    assetConfig?: AssetsConfig;
  };
  tags?: string[];
  unstable_cacheWorkerSettings?: boolean;
};

async function prepareWorkerUpload(
  api: CloudflareApi,
  props: PutWorkerOptions,
) {
  const scriptMetadata = await prepareWorkerMetadata(api, props);

  if (props.format === "cjs") {
    scriptMetadata.body_part = props.scriptBundle.entrypoint;
  } else {
    scriptMetadata.main_module = props.scriptBundle.entrypoint;
  }
  const body = await WorkerBundle.toFormData(props.scriptBundle);
  // Prepare metadata - add version annotations if this is a version
  const finalMetadata = props.version
    ? {
        ...scriptMetadata,
        // Exclude migrations for worker versions - they're not allowed
        migrations: undefined,
        annotations: {
          "workers/tag": props.version,
          "workers/message": `Version ${props.version}`,
        },
      }
    : {
        ...scriptMetadata,
        migrations: scriptMetadata.migrations
          ? {
              ...scriptMetadata.migrations,
              old_tag: props.migrationTag,
              new_tag: bumpMigrationTagVersion(props.migrationTag),
            }
          : undefined,
      };

  body.append(
    "metadata",
    new Blob([JSON.stringify(finalMetadata)], {
      type: "application/json",
    }),
  );

  let endpoint: string;
  let method: "PUT" | "POST";
  if (props.version) {
    if (props.dispatchNamespace) {
      throw new Error(
        "Worker Preview Versions are not supported in Workers for Platforms",
      );
    }
    // Upload worker version using the versions API
    endpoint = `/accounts/${api.accountId}/workers/scripts/${props.workerName}/versions`;
    method = "POST";
  } else {
    // Upload worker script with bindings
    endpoint = props.dispatchNamespace
      ? `/accounts/${api.accountId}/workers/dispatch/namespaces/${props.dispatchNamespace}/scripts/${props.workerName}`
      : `/accounts/${api.accountId}/workers/scripts/${props.workerName}`;
    method = "PUT";
  }

  return {
    body,
    endpoint,
    method,
  };
}

interface PutWorkerResult {
  id: string;
  number: number;
  metadata: {
    has_preview: boolean;
  };
  annotations?: {
    "workers/tag"?: string;
  };
  deployment_id: string;
}

export async function putWorker(
  api: CloudflareApi,
  props: PutWorkerOptions,
): Promise<PutWorkerResult> {
  const {
    //
    workerName,
    version,
  } = props;

  return withExponentialBackoff(
    async () => {
      const { body, endpoint, method } = await prepareWorkerUpload(api, props);
      const uploadResponse = await api.fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body,
      });

      // Check if the upload was successful
      if (!uploadResponse.ok) {
        try {
          return await handleApiError(
            uploadResponse,
            version ? "uploading worker version" : "uploading worker script",
            "worker",
            workerName,
          );
        } catch (error) {
          if (error instanceof CloudflareApiError && error.status === 412) {
            // this happens when adopting a Worker managed with Wrangler
            // because wrangler includes a migration tag and we do not
            // currently, the only way to discover the old_tag is through the error message
            // Get Worker Script Settings is meant to return it (according to the docs)
            // but it doesn't work at runtime
            //
            // so, we catch the error and parse out the tag and then retry
            if (error.message.includes("when expected tag is")) {
              const newTag = error.message.match(
                /when expected tag is ['"]?(v\d+)['"]?/,
              )?.[1];
              if (newTag) {
                return await putWorker(api, {
                  ...props,
                  migrationTag: newTag,
                });
              }
            } else {
              throw error;
            }
          } else {
            throw error;
          }
        }
      }
      const responseData = (await uploadResponse.json()) as {
        result: PutWorkerResult;
      };
      return responseData.result;
    },
    (err) =>
      err.status === 404 ||
      err.status === 500 ||
      err.status === 503 ||
      // this is a transient error that cloudflare throws randomly
      (err instanceof CloudflareApiError &&
        err.status === 400 &&
        err.message.match(/binding.*failed to generate/)),
    10,
    100,
  );
}

async function workerExists(api: CloudflareApi, scriptName: string) {
  const res = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${scriptName}`,
  );
  return res.status === 200;
}

async function assertWorkerDoesNotExist(
  api: CloudflareApi,
  scriptName: string,
) {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${scriptName}`,
  );
  if (response.status === 404) {
    return true;
  }
  if (response.status === 200) {
    const metadata = await getScriptMetadata(api, scriptName);

    if (!metadata) {
      throw new Error(
        `Worker exists but failed to fetch metadata: ${response.status} ${response.statusText}`,
      );
    }

    throw new Error(
      `Worker with name '${scriptName}' already exists. Please use a unique name.`,
    );
  }
  throw new Error(
    `Error checking if worker exists: ${response.status} ${response.statusText} ${await response.text()}`,
  );
}

async function getScriptMetadata(
  api: CloudflareApi,
  scriptName: string,
): Promise<WorkerScriptMetadata | undefined> {
  const res = await api.get(
    `/accounts/${api.accountId}/workers/services/${scriptName}`,
  );
  if (res.status === 404) {
    return;
  }
  if (!res.ok) {
    throw new Error(
      `Error getting worker script metadata: ${res.status} ${res.statusText}`,
    );
  }
  const json = (await res.json()) as { result: WorkerScriptMetadata };
  return json.result;
}

async function deleteQueueConsumers(api: CloudflareApi, scriptName: string) {
  const consumers = await listQueueConsumersForWorker(api, scriptName);
  await Promise.all(
    consumers.map(async (consumer) => {
      await deleteQueueConsumer(api, consumer.queueId, consumer.consumerId);
    }),
  );
}

export async function deleteWorker(
  api: CloudflareApi,
  props: {
    scriptName: string;
    dispatchNamespace?: string;
  },
) {
  await withExponentialBackoff(
    async () => {
      const deleteResponse = await api.delete(
        props.dispatchNamespace
          ? `/accounts/${api.accountId}/workers/dispatch/namespaces/${props.dispatchNamespace}/scripts/${props.scriptName}?force=true`
          : `/accounts/${api.accountId}/workers/scripts/${props.scriptName}?force=true`,
      );

      if (!deleteResponse.ok && deleteResponse.status !== 404) {
        await handleApiError(
          deleteResponse,
          "delete",
          "worker",
          props.scriptName,
        );
      }
    },
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
}

async function getVersionMetadata(
  api: CloudflareApi,
  scriptName: string,
  deploymentId: string,
) {
  const response = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${scriptName}/versions/${deploymentId}`,
  );
  const result = (await response.json()) as {
    result: {
      resources: {
        bindings: WorkerBindingSpec[];
      };
    };
  };
  return result.result;
}
