import type esbuild from "esbuild";
import kleur from "kleur";
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { BUILD_DATE } from "../build-date.ts";
import type { Context } from "../context.ts";
import type { BundleProps } from "../esbuild/bundle.ts";
import { InnerResourceScope, Resource, ResourceKind } from "../resource.ts";
import { getBindKey, tryGetBinding } from "../runtime/bind.ts";
import { isRuntime } from "../runtime/global.ts";
import { bootstrapPlugin } from "../runtime/plugin.ts";
import { Scope } from "../scope.ts";
import { Secret, secret } from "../secret.ts";
import { serializeScope } from "../serde.ts";
import type { type } from "../type.ts";
import { DeferredPromise } from "../util/deferred-promise.ts";
import { logger } from "../util/logger.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import {
  type CloudflareApi,
  type CloudflareApiOptions,
  createCloudflareApi,
} from "./api.ts";
import type { Assets } from "./assets.ts";
import {
  type Binding,
  type Bindings,
  Json,
  type WorkerBindingDurableObjectNamespace,
  type WorkerBindingService,
  type WorkerBindingSpec,
} from "./bindings.ts";
import type { Bound } from "./bound.ts";
import { isBucket } from "./bucket.ts";
import {
  type WorkerBundle,
  type WorkerBundleChunk,
  type WorkerBundleProvider,
  normalizeWorkerBundle,
} from "./bundle/index.ts";
import { type Container, ContainerApplication } from "./container.ts";
import { CustomDomain } from "./custom-domain.ts";
import { isD1Database } from "./d1-database.ts";
import type { DispatchNamespaceResource } from "./dispatch-namespace.ts";
import {
  DurableObjectNamespace,
  isDurableObjectNamespace,
} from "./durable-object-namespace.ts";
import {
  type EventSource,
  type QueueEventSource,
  isQueueEventSource,
} from "./event-source.ts";
import { isKVNamespace } from "./kv-namespace.ts";
import type { MiniflareWorkerOptions } from "./miniflare/miniflare-worker-options.ts";
import { miniflareServer } from "./miniflare/miniflare.ts";
import { isPipeline } from "./pipeline.ts";
import {
  QueueConsumer,
  deleteQueueConsumer,
  listQueueConsumersForWorker,
} from "./queue-consumer.ts";
import { type QueueResource, isQueue } from "./queue.ts";
import { Route } from "./route.ts";
import { isVectorizeIndex } from "./vectorize-index.ts";
import { uploadAssets } from "./worker-assets.ts";
import {
  type WorkerScriptMetadata,
  bumpMigrationTagVersion,
  prepareWorkerMetadata,
} from "./worker-metadata.ts";
import { WorkerStub, isWorkerStub } from "./worker-stub.ts";
import { WorkerSubdomain } from "./worker-subdomain.ts";
import { createTail } from "./worker/tail.ts";
import { Workflow, isWorkflow, upsertWorkflow } from "./workflow.ts";

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
   * @default BUILD_DATE - automatically pinned to the package build date
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
  namespace?: string | DispatchNamespaceResource;

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
    | boolean
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
      }
    | {
        command: string;
        url: string;
        cwd?: string;
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
   * @default false
   */
  uploadSourceMaps?: boolean;

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

export type FetchWorkerProps<
  B extends Bindings = Bindings,
  E extends EventSource[] = EventSource[],
> = Omit<WorkerProps<B>, "entrypoint" | "eventSources"> & {
  /**
   * A function that will be used to fetch the worker script.
   *
   * This is only used when using the fetch property.
   */
  fetch?(
    request: Request,
    env: Bindings.Runtime<B>,
    ctx: ExecutionContext,
  ): Promise<Response>;
  /**
   * Event sources that this worker will consume.
   *
   * Can include queues, streams, or other event sources.
   */
  eventSources?: E;

  /**
   * A function that will be used to queue the worker script.
   *
   * This is only used when using the queue property.
   */
  queue?(
    batch: QueueBatch<E>,
    env: Bindings.Runtime<B>,
    ctx: ExecutionContext,
  ): Promise<void>;
};

type QueueBatch<E extends EventSource[]> = E[number] extends QueueEventSource
  ? any
  : E[number] extends QueueResource<infer Body>
    ? MessageBatch<Body>
    : MessageBatch<unknown>;

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
  Omit<WorkerProps<B>, "url" | "script" | "routes" | "domains"> &
  globalThis.Service & {
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
    namespace?: string | DispatchNamespaceResource;

    /**
     * Version label for this worker deployment
     */
    version?: string;
  };

/**
 * Represents a reference to a Cloudflare Worker service.
 *
 * @template RPC - The type of the worker's RPC entrypoint, defaults to Rpc.WorkerEntrypointBranded.
 *
 * This interface extends all properties of WorkerBindingService except for "name".
 * It also includes an optional __rpc__ property for type branding.
 */
export type WorkerRef<
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> = Omit<WorkerBindingService, "name"> & {
  /**
   * Optional type branding for the worker's RPC entrypoint.
   */
  __rpc__?: RPC;
};

/**
 * Creates a reference to a Cloudflare Worker service.
 *
 * @example
 * // Create a reference to a Cloudflare Worker service:
 * const ref = WorkerRef({
 *   service: "my-worker",
 *   environment: "production",
 *   namespace: "main"
 * });
 *
 * // Optionally, you can specify only the service:
 * const ref2 = WorkerRef({ service: "my-worker" });
 *
 * // You can also specify the RPC type for stronger typing:
 * interface MyWorkerRPC extends Rpc.WorkerEntrypointBranded {
 *   myMethod(arg: string): Promise<number>;
 * }
 * const typedRef = WorkerRef<MyWorkerRPC>({ service: "my-worker" });
 */
export function WorkerRef<
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
>(options?: {
  service: string;
  environment?: string;
  namespace?: string;
}): WorkerRef<RPC> {
  return {
    ...options,
    type: "service",
  } as WorkerRef<RPC>;
}

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
 * @example
 * // Create cross-script durable object binding where one worker
 * // defines the durable object and another worker accesses it:
 * const dataWorker = await Worker("data-worker", {
 *   name: "data-worker",
 *   entrypoint: "./src/data.ts",
 *   bindings: {
 *     // Bind to its own durable object
 *     STORAGE: new DurableObjectNamespace("storage", {
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
export function Worker<const B extends Bindings, const E extends EventSource[]>(
  id: string,
  meta: ImportMeta,
  props: FetchWorkerProps<B, E>,
): Promise<Worker<B>> & globalThis.Service;
export function Worker<const B extends Bindings>(
  ...args:
    | [id: string, props: WorkerProps<B>]
    | [id: string, meta: ImportMeta, props: FetchWorkerProps<B>]
): Promise<Worker<B>> {
  const [id, meta, props] =
    args.length === 2 ? [args[0], undefined, args[1]] : args;

  if (("fetch" in props && props.fetch) || ("queue" in props && props.queue)) {
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

    async function collectResources(
      scope: Scope | undefined,
    ): Promise<Resource[]> {
      if (!scope) {
        return [];
      }
      return (
        await Promise.all(
          Array.from(scope.resources.values()).map(async (resource) => [
            (await resource) as Resource,
            ...(await collectResources(await resource[InnerResourceScope])),
          ]),
        )
      ).flat();
    }

    const deferred = scope.defer(async () => {
      const autoBindings: Record<string, Binding> = {};
      for (const resource of await collectResources(Scope.root)) {
        if (
          isQueue(resource) ||
          isWorkerStub(resource) ||
          isWorker(resource) ||
          isD1Database(resource) ||
          isBucket(resource) ||
          isPipeline(resource) ||
          isVectorizeIndex(resource) ||
          isKVNamespace(resource)
        ) {
          // TODO(sam): make this generic/pluggable
          autoBindings[getBindKey(resource)] = resource;
        }
      }

      // TODO(sam): prune to only needed secrets
      for (const secret of Secret.all()) {
        autoBindings[secret.name] = secret;
      }

      const bindings = {
        ...props.bindings,
        __ALCHEMY_WORKER_NAME__: workerName,
        __ALCHEMY_SERIALIZED_SCOPE__: Json(await serializeScope(scope)),
        ALCHEMY_STAGE: scope.stage,
        ALCHEMY_PASSWORD: secret(scope.password),
        // TODO(sam): prune un-needed bindings
        ...autoBindings,
      };

      return _Worker(id, {
        ...(props as any),
        url: true,
        compatibilityFlags: Array.from(
          new Set(["nodejs_compat", ...(props.compatibilityFlags ?? [])]),
        ),
        entrypoint: meta!.filename,
        name: workerName,
        // adopt because the stub guarnatees that the worker exists
        adopt: true,
        bindings,
        bundle: {
          ...props.bundle,
          plugins: [bootstrapPlugin],
          external: [
            // for alchemy
            "libsodium*",
            "@swc/*",
            "esbuild",
            // TODO(sam): this is for fetch, why is it a package?
            "undici",
            "miniflare",
            "@iarna/toml",
            "cli-*",
            "react*",
          ],
          banner: {
            js: "var __ALCHEMY_RUNTIME__ = true;",
          },
          inject: [
            ...(props.bundle?.inject ?? []),
            path.resolve(import.meta.dirname, "..", "runtime", "shims.js"),
          ],
        },
      });
    }) as Promise<Worker<B>>;

    // defer construction of this worker until the app is about to finaloze
    // this ensures that the Worker's dependencies are instantiated before we bundle
    // it is then safe to bundle and import the Worker to detect which resources need to be auto-bound
    const promise = Promise.all([deferred, stub]).then(
      ([worker]) => worker,
    ) as Promise<Worker<B>> & {
      fetch?: (...args: any[]) => Promise<Response>;
      queue?: (
        batch: QueueBatch<any>,
        env: Bindings.Runtime<B>,
        ctx: ExecutionContext,
      ) => Promise<void>;
    };

    if (isRuntime) {
      if (props.fetch) {
        promise.fetch = async (
          request: Request,
          env: Bindings.Runtime<B>,
          ctx: ExecutionContext,
        ) => {
          try {
            return await props.fetch!(request, env as any, ctx);
          } catch (err: any) {
            return new Response(err.message + err.stack, {
              status: 500,
            });
          }
        };
      }
      if (props.queue) {
        promise.queue = async (
          batch: QueueBatch<any>,
          env: Bindings.Runtime<B>,
          ctx: ExecutionContext,
        ) => {
          return await props.queue!(batch, env, ctx);
        };
      }
    } else {
      promise.fetch = async (
        request: string | URL | Request,
        init?: RequestInit,
      ) => {
        const worker = await promise;
        if (!worker.url) {
          throw new Error("Worker URL is not available in runtime");
        }
        if (request instanceof Request) {
          const origin = new URL(worker.url);
          const incoming = request.url.startsWith("/")
            ? new URL(`${worker.url}${request.url}`)
            : new URL(request.url);
          logger.log(incoming);
          const proxyURL = new URL(
            `${incoming.pathname}${incoming.search}${incoming.hash}`,
            origin,
          );

          const headers = new Headers(request.headers);
          headers.set("host", origin.host);

          try {
            return await fetch(
              new Request(proxyURL, {
                method: request.method,
                body: request.body,
                headers,
                // TODO(sam): do we need this? GPT added it ...
                // redirect: "manual",
              }),
            );
          } catch (err: any) {
            return new Response(err.message ?? "proxy error", { status: 500 });
          }
        } else {
          if (typeof request === "string" && request.startsWith("/")) {
            request = new URL(`${worker.url}${request}`);
          }
          return await fetch(request, init);
        }
      };
    }
    return promise;
  }
  return _Worker(id, props as WorkerProps<B>).then(async (worker) => {
    const binding = await tryGetBinding(worker);
    if (binding) {
      worker.fetch = (request: Request) => binding.fetch(request);
      worker.connect = (address: SocketAddress, options: SocketOptions) =>
        binding.connect(address, options);
    }
    return worker;
  });
}

export const DEFAULT_COMPATIBILITY_DATE = BUILD_DATE;

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
    if (props.projectRoot) {
      logger.warn("projectRoot is deprecated, use cwd instead");
      props.cwd = props.projectRoot;
    }

    const cwd = props.cwd ? path.resolve(props.cwd) : process.cwd();
    const relativeCwd =
      cwd === process.cwd() ? undefined : path.relative(process.cwd(), cwd);

    const workerName = props.name ?? id;
    const compatibilityDate =
      props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE;
    const compatibilityFlags = props.compatibilityFlags ?? [];

    const bundle = normalizeWorkerBundle({
      entrypoint: props.entrypoint,
      script: props.script,
      format: props.format,
      noBundle: props.noBundle,
      rules: "rules" in props ? props.rules : undefined,
      bundle: props.bundle,
      cwd,
      compatibilityDate,
      compatibilityFlags,
      outdir: path.join(process.cwd(), ".alchemy", ...this.scope.chain, id),
    });

    const dev = normalizeDev(this, props.dev);

    if (dev.local) {
      let url: string | undefined;

      switch (dev.type) {
        case "command":
          createDevCommand({
            id,
            command: dev.command,
            cwd: dev.cwd ?? process.cwd(),
            env: props.env ?? {},
          });
          url = dev.url;
          break;
        case "miniflare": {
          url = await createMiniflare({
            id,
            workerName,
            compatibilityDate,
            compatibilityFlags,
            bindings: props.bindings,
            bundle,
            port: dev.port,
          });
          break;
        }
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
        // phantom property
        Env: undefined!,
      } as unknown as Worker<B>);
    }

    // Create Cloudflare API client with automatic account discovery
    const apiOptions: CloudflareApiOptions = {
      accountId: props.accountId,
      apiKey: props.apiKey,
      apiToken: props.apiToken,
      baseUrl: props.baseUrl,
      email: props.email,
    };
    const api = await createCloudflareApi(apiOptions);
    const dispatchNamespace =
      typeof props.namespace === "string"
        ? props.namespace
        : props.namespace?.namespaceId;

    if (this.phase === "delete") {
      await bundle.delete?.();
      if (!props.version) {
        await deleteQueueConsumers(api, workerName);
        await deleteWorker(api, workerName, dispatchNamespace);
      }
      return this.destroy();
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
          await putWorkerWithAssets(baseWorkerProps, await bundle.create());
        }
        // We always "adopt" when publishing versions
      } else if (!props.adopt) {
        await assertWorkerDoesNotExist(api, workerName);
      }
    }

    let putWorkerResult: PutWorkerResult;
    if (dev.type === "remote") {
      // todo(john): clean this up and add log tail
      const controller = new AbortController();
      cleanups.push(() => controller.abort());
      const watcher = await bundle.watch(controller.signal);
      const promise = new DeferredPromise<PutWorkerResult>();
      void watcher.pipeTo(
        new WritableStream({
          async write(chunk) {
            switch (chunk.type) {
              case "start":
                logger.task("", {
                  message: "start",
                  status: "pending",
                  resource: id,
                  prefix: "build",
                  prefixColor: "cyanBright",
                });
                break;
              case "end": {
                if (promise.status === "pending") {
                  await putWorkerWithAssets(props, chunk.result)
                    .then((result) => promise.resolve(result))
                    .catch((error) => {
                      controller.abort();
                      promise.reject(error);
                    });
                  return;
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
                  scriptBundle: chunk.result,
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
                });
                logger.task("", {
                  message: "updated",
                  status: "success",
                  resource: id,
                  prefix: "build",
                  prefixColor: "greenBright",
                });
                break;
              }
              case "error":
                logger.task("", {
                  message: "error",
                  status: "failure",
                  resource: id,
                  prefix: "build",
                  prefixColor: "redBright",
                });
                logger.error(chunk.errors);
                break;
            }
          },
        }),
      );
      putWorkerResult = await promise.value;
      const tail = await createTail(api, id, workerName);
      cleanups.push(() => tail.close());
    } else {
      putWorkerResult = await putWorkerWithAssets(props, await bundle.create());
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
            provisionContainers({
              scriptName: workerName,
              containers: containersBindings,
              bindings: versionMetadata.resources.bindings,
              apiOptions,
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
      provisionEventSources({
        scriptName: workerName,
        eventSources: props.eventSources,
        apiOptions,
      }),
    );

    const [domains, routes, subdomain] = await Promise.all([
      // TODO: can you provision domains and routes in parallel, or is there a dependency?
      provisionDomains({
        scriptName: workerName,
        adopt: props.adopt,
        domains: props.domains,
        apiOptions,
      }),
      provisionRoutes({
        scriptName: workerName,
        adopt: props.adopt,
        routes: props.routes,
        apiOptions,
      }),
      provisionSubdomain({
        scriptName: workerName,
        enable: props.url ?? dispatchNamespace === undefined,
        isVersion: !!props.version,
        putWorkerResult,
        apiOptions,
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
      // phantom property
      Env: undefined!,
    } as unknown as Worker<B>);
  },
);

const cleanups: (() => any)[] = [];
let exiting = false;

process.on("SIGINT", async () => {
  if (cleanups.length > 0) {
    if (!exiting) {
      exiting = true;
      logger.log(`\n${kleur.gray("Exiting...")}`);
    }
    // TODO: for some reason this runs twice...
    // and this whole thing feels hacky anyway
    await Promise.allSettled(cleanups.map((cleanup) => cleanup()));
  }
  process.exit(0);
});

type Dev =
  | {
      type: "none";
      local: false;
    }
  | {
      type: "miniflare";
      port?: number;
      local: true;
    }
  | {
      type: "command";
      command: string;
      url: string;
      cwd?: string;
      local: true;
    }
  | {
      type: "remote";
      local: false;
    };

const normalizeDev = (ctx: Context<any>, dev: WorkerProps["dev"]): Dev => {
  if (!ctx.scope.dev || ctx.phase === "delete" || dev === false) {
    return {
      type: "none",
      local: false,
    };
  }
  if (typeof dev !== "object") {
    return {
      type: "miniflare",
      local: true,
    };
  }
  if ("command" in dev) {
    return {
      type: "command",
      ...dev,
      local: true,
    };
  }
  if (dev.remote) {
    return {
      type: "remote",
      local: false,
    };
  }
  return {
    type: "miniflare",
    port: dev.port,
    local: true,
  };
};

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
        ? new DurableObjectNamespace(binding.id, {
            ...binding,
            // re-export this binding mapping to the host worker (this worker)
            scriptName,
          })
        : isWorkflow(binding) && binding.scriptName === undefined
          ? new Workflow(binding.id, {
              ...binding,
              // re-export this binding mapping to the host worker (this worker)
              scriptName,
            })
          : binding,
    ]),
  );
};

async function provisionContainers(props: {
  scriptName: string;
  containers?: Container[];
  bindings: WorkerBindingSpec[];
  apiOptions: CloudflareApiOptions;
}): Promise<ContainerApplication[] | undefined> {
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
        name: container.id,
        instanceType: container.instanceType,
        observability: container.observability,
        durableObjects: {
          namespaceId,
        },
        schedulingPolicy: container.schedulingPolicy,
        ...props.apiOptions,
      });
    }),
  );
}

async function provisionEventSources(props: {
  scriptName: string;
  eventSources?: EventSource[];
  apiOptions: CloudflareApiOptions;
}): Promise<QueueConsumer[] | undefined> {
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
          ...props.apiOptions,
        });
      }
      if (isQueueEventSource(eventSource)) {
        return QueueConsumer(`${eventSource.queue.id}-consumer`, {
          queue: eventSource.queue,
          scriptName: props.scriptName,
          settings: eventSource.settings,
          ...props.apiOptions,
        });
      }
      throw new Error(`Unsupported event source: ${eventSource}`);
    }),
  );
}

async function provisionDomains(props: {
  scriptName: string;
  adopt?: boolean;
  domains?: WorkerProps["domains"];
  apiOptions: CloudflareApiOptions;
}): Promise<CustomDomain[] | undefined> {
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
        ...props.apiOptions,
      });
    }),
  );
}

async function provisionRoutes(props: {
  scriptName: string;
  adopt?: boolean;
  routes?: WorkerProps["routes"];
  apiOptions: CloudflareApiOptions;
}): Promise<Route[] | undefined> {
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
        ...props.apiOptions,
      });
    }),
  );
}

async function provisionSubdomain(props: {
  scriptName: string;
  enable: boolean;
  isVersion: boolean;
  putWorkerResult: PutWorkerResult;
  apiOptions: CloudflareApiOptions;
}): Promise<WorkerSubdomain | undefined> {
  if (props.enable) {
    return await WorkerSubdomain("url", {
      scriptName: props.scriptName,
      previewVersionId:
        props.isVersion && props.putWorkerResult.metadata.has_preview
          ? props.putWorkerResult.id
          : undefined,
      retain: props.isVersion,
      ...props.apiOptions,
    });
  }
}

async function createMiniflare(props: {
  id: string;
  workerName: string;
  compatibilityDate: string;
  compatibilityFlags: string[];
  bindings: Bindings | undefined;
  port: number | undefined;
  bundle: WorkerBundleProvider;
}) {
  const sharedOptions: Omit<MiniflareWorkerOptions, "bundle"> = {
    name: props.workerName,
    compatibilityDate: props.compatibilityDate,
    compatibilityFlags: props.compatibilityFlags,
    bindings: props.bindings,
    port: props.port,
  };

  const startPromise = new DeferredPromise<string>();
  // todo(john): streamline and share logging logic with remote dev
  type Events =
    | {
        type: "build-start" | "build-end";
      }
    | {
        type: "build-error";
        errors: esbuild.Message[];
      }
    | {
        type: "miniflare-ready";
        url: string;
      }
    | {
        type: "miniflare-error";
        error: Error;
      };
  const controller = new AbortController();
  cleanups.push(() => controller.abort());
  (await props.bundle.watch(controller.signal))
    .pipeThrough(
      new TransformStream<WorkerBundleChunk, Events>({
        async transform(chunk, controller) {
          switch (chunk.type) {
            case "start": {
              controller.enqueue({ type: "build-start" });
              break;
            }
            case "end": {
              controller.enqueue({ type: "build-end" });
              try {
                const server = await miniflareServer.push({
                  ...sharedOptions,
                  bundle: chunk.result,
                });
                controller.enqueue({
                  type: "miniflare-ready",
                  url: server.url,
                });
              } catch (error) {
                controller.enqueue({
                  type: "miniflare-error",
                  error: error as Error,
                });
              }
              break;
            }
            case "error": {
              controller.enqueue({
                type: "build-error",
                errors: chunk.errors,
              });
              break;
            }
          }
        },
      }),
    )
    .pipeTo(
      new WritableStream({
        write: async (chunk) => {
          switch (chunk.type) {
            case "build-start": {
              logger.task("", {
                message: "start",
                status: "pending",
                resource: props.id,
                prefix: "build",
                prefixColor: "cyanBright",
              });
              break;
            }
            case "build-end": {
              logger.task("", {
                message: startPromise.status === "pending" ? "load" : "reload",
                status: "success",
                resource: props.id,
                prefix: "build",
                prefixColor: "greenBright",
              });
              break;
            }
            case "build-error": {
              logger.task("", {
                message: "error",
                status: "failure",
                resource: props.id,
                prefix: "build",
                prefixColor: "redBright",
              });
              if (startPromise.status === "pending") {
                controller.abort();
                startPromise.reject(chunk.errors);
              } else {
                logger.error(chunk.errors);
              }
              break;
            }
            case "miniflare-ready": {
              logger.task("", {
                message: `ready at ${chunk.url}`,
                status: "success",
                resource: props.id,
                prefix: "miniflare",
                prefixColor: "greenBright",
              });
              if (startPromise.status === "pending") {
                startPromise.resolve(chunk.url);
              }
              break;
            }
            case "miniflare-error": {
              logger.task("", {
                message: "error",
                status: "failure",
                resource: props.id,
                prefix: "miniflare",
                prefixColor: "redBright",
              });
              if (startPromise.status === "pending") {
                startPromise.reject(chunk.error);
              } else {
                logger.error(chunk.error);
              }
              break;
            }
          }
        },
      }),
    );

  return await startPromise.value;
}

function createDevCommand(props: {
  id: string;
  command: string;
  cwd: string;
  env: Record<string, string>;
}) {
  const persistFile = path.join(process.cwd(), ".alchemy", `${props.id}.pid`);
  if (existsSync(persistFile)) {
    const pid = Number.parseInt(readFileSync(persistFile, "utf8"));
    try {
      // Actually kill the process if it's alive
      process.kill(pid, "SIGTERM");
    } catch {
      // ignore
    }
    try {
      unlinkSync(persistFile);
    } catch {
      // ignore
    }
  }
  const command = props.command.split(" ");
  const proc = spawn(command[0], command.slice(1), {
    env: {
      ...process.env,
      ...props.env,
      ALCHEMY_CLOUDFLARE_PERSIST_PATH: path.join(
        process.cwd(),
        ".alchemy",
        "miniflare",
      ),
    },
    stdio: ["inherit", "inherit", "inherit"],
  });
  cleanups.push(() => {
    try {
      unlinkSync(persistFile);
    } catch {
      // ignore
    }
    proc.kill();
  });
  if (proc.pid) {
    mkdirSync(path.dirname(persistFile), { recursive: true });
    writeFileSync(persistFile, proc.pid.toString());
  }
}

type PutWorkerOptions = WorkerProps & {
  dispatchNamespace?: string;
  migrationTag?: string;
  workerName: string;
  scriptBundle: WorkerBundle;
  version: string | undefined;
  compatibilityDate: string;
  compatibilityFlags: string[];
  assetUploadResult:
    | {
        completionToken?: string;
        keepAssets?: boolean;
        assetConfig?: AssetsConfig;
      }
    | undefined;
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
  const body = new FormData();

  for await (const file of props.scriptBundle.files) {
    body.append(file.name, file);
  }

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
    `/accounts/${api.accountId}/workers/scripts/${scriptName}`,
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

async function deleteWorker(
  api: CloudflareApi,
  scriptName: string,
  dispatchNamespace: string | undefined,
) {
  await withExponentialBackoff(
    async () => {
      const deleteResponse = await api.delete(
        dispatchNamespace
          ? `/accounts/${api.accountId}/workers/dispatch/namespaces/${dispatchNamespace}/scripts/${scriptName}?force=true`
          : `/accounts/${api.accountId}/workers/scripts/${scriptName}?force=true`,
      );

      if (!deleteResponse.ok && deleteResponse.status !== 404) {
        await handleApiError(deleteResponse, "delete", "worker", scriptName);
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
