import path from "node:path";
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
import { getContentType } from "../util/content-type.ts";
import { logger } from "../util/logger.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { slugify } from "../util/slugify.ts";
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
  type WorkerBindingService,
  type WorkerBindingSpec,
} from "./bindings.ts";
import type { Bound } from "./bound.ts";
import { isBucket } from "./bucket.ts";
import {
  type NoBundleResult,
  bundleWorkerScript,
} from "./bundle/bundle-worker.ts";
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
import { isPipeline } from "./pipeline.ts";
import {
  QueueConsumer,
  deleteQueueConsumer,
  listQueueConsumersForWorker,
} from "./queue-consumer.ts";
import { type QueueResource, isQueue } from "./queue.ts";
import { Route } from "./route.ts";
import { isVectorizeIndex } from "./vectorize-index.ts";
import { type AssetUploadResult, uploadAssets } from "./worker-assets.ts";
import {
  type WorkerMetadata,
  type WorkerScriptMetadata,
  prepareWorkerMetadata,
} from "./worker-metadata.ts";
import type { SingleStepMigration } from "./worker-migration.ts";
import { WorkerStub, isWorkerStub } from "./worker-stub.ts";
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

  /**
   * Routes to create for this worker.
   *
   * Each route maps a URL pattern to this worker script.
   */
  routes?: Array<{
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
     * Whether this is a custom domain route
     */
    customDomain?: boolean;
    /**
     * Whether to adopt an existing route with the same pattern if it exists
     * @default false
     */
    adopt?: boolean;
  }>;

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
  Omit<WorkerProps<B>, "url" | "script" | "routes"> &
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
 * @see
 * https://developers.cloudflare.com/workers/
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
          isKVNamespace(resource) ||
          resource instanceof Secret
        ) {
          // TODO(sam): make this generic/pluggable
          autoBindings[getBindKey(resource)] = resource;
        }
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

export const DEFAULT_COMPATIBILITY_DATE = "2025-04-20";

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
    if (props.noBundle && !props.entrypoint) {
      throw new Error("entrypoint must be provided when noBundle is true");
    }

    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi(props);

    // Use the provided name
    const workerName = props.name ?? id;

    const compatibilityDate =
      props.compatibilityDate ?? DEFAULT_COMPATIBILITY_DATE;
    const compatibilityFlags = props.compatibilityFlags ?? [];

    const uploadWorkerScript = async (props: WorkerProps<B>) => {
      const [oldBindings, oldMetadata] = await Promise.all([
        getWorkerBindings(api, workerName),
        getWorkerScriptMetadata(api, workerName),
      ]);
      const oldTags = oldMetadata?.default_environment?.script?.tags;

      // Get the script content - either from props.script, or by bundling
      const scriptBundle =
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
        oldTags,
        {
          ...props,
          compatibilityDate,
          compatibilityFlags,
          workerName,
        },
        assetUploadResult,
      );

      // Get dispatch namespace if specified
      const dispatchNamespace = props.namespace
        ? typeof props.namespace === "string"
          ? props.namespace
          : props.namespace.namespace
        : undefined;

      await putWorker(
        api,
        workerName,
        scriptBundle,
        scriptMetadata,
        dispatchNamespace,
      );

      for (const workflow of workflowsBindings) {
        if (
          workflow.scriptName === undefined ||
          workflow.scriptName === workerName
        ) {
          await upsertWorkflow(api, {
            workflowName: workflow.workflowName,
            className: workflow.className,
            scriptName: workflow.scriptName ?? workerName,
          });
        }
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
                : queue.dlq
                  ? { deadLetterQueue: queue.dlq }
                  : undefined,
            });
          }
          throw new Error(`Unsupported event source type: ${eventSource}`);
        }) ?? [],
      );

      // Handle worker URL if requested
      const workerUrl = await configureURL(
        this,
        api,
        workerName,
        props.url ?? true,
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

      return { scriptBundle, scriptMetadata, workerUrl, now };
    };

    if (this.phase === "delete") {
      // Delete any queue consumers attached to this worker first
      await deleteQueueConsumers(api, workerName);

      // @ts-ignore
      await uploadWorkerScript({
        ...props,
        entrypoint: undefined,
        noBundle: false,
        script:
          props.format === "cjs"
            ? "addEventListener('fetch', event => { event.respondWith(new Response('hello world')); });"
            : "export default { fetch(request) { return new Response('hello world'); }, queue: () => {} }",
        bindings: {} as B,
        // we are writing a stub worker (to remove binding/event source dependencies)
        // queue consumers will no longer exist by this point
        eventSources: undefined,
        // stub worker doesn't need dispatch namespace
        namespace: undefined,
      });

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
    if (!props.script && !props.entrypoint) {
      throw new Error("One of script or entrypoint must be provided");
    }

    if (this.phase === "create") {
      if (!props.adopt) {
        await assertWorkerDoesNotExist(this, api, workerName);
      }
    }

    const { scriptMetadata, workerUrl, now } = await uploadWorkerScript(props);

    // Create routes if provided and capture their outputs
    let createdRoutes: Route[] = [];
    if (props.routes && props.routes.length > 0) {
      // Validate for duplicate patterns
      const patterns = props.routes.map((route) => route.pattern);
      const duplicates = patterns.filter(
        (pattern, index) => patterns.indexOf(pattern) !== index,
      );
      if (duplicates.length > 0) {
        throw new Error(
          `Duplicate route patterns found: ${duplicates.join(", ")}`,
        );
      }

      // Create Route resources for each route and capture their outputs
      createdRoutes = await Promise.all(
        props.routes.map(async (routeConfig) => {
          return await Route(routeConfig.pattern, {
            pattern: routeConfig.pattern,
            script: workerName,
            zoneId: routeConfig.zoneId, // Route resource will handle inference if not provided
            adopt: routeConfig.adopt ?? false,
            accountId: props.accountId,
            apiKey: props.apiKey,
            apiToken: props.apiToken,
            baseUrl: props.baseUrl,
            email: props.email,
          });
        }),
      );
    }

    function exportBindings() {
      return Object.fromEntries(
        Object.entries(props.bindings ?? ({} as B)).map(
          ([bindingName, binding]) => [
            bindingName,
            isDurableObjectNamespace(binding) &&
            binding.scriptName === undefined
              ? new DurableObjectNamespace(binding.id, {
                  ...binding,
                  // re-export this binding mapping to the host worker (this worker)
                  scriptName: workerName,
                })
              : isWorkflow(binding) && binding.scriptName === undefined
                ? new Workflow(binding.id, {
                    ...binding,
                    // re-export this binding mapping to the host worker (this worker)
                    scriptName: workerName,
                  })
                : binding,
          ],
        ),
      );
    }

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
      bindings: exportBindings(),
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
      // Include the created routes in the output
      routes: createdRoutes.length > 0 ? createdRoutes : undefined,
      // Include the dispatch namespace in the output
      namespace: props.namespace,
      // phantom property
      Env: undefined!,
    } as unknown as Worker<B>);
  },
);

export async function deleteWorker<B extends Bindings>(
  ctx: Context<Worker<B>>,
  api: CloudflareApi,
  props: WorkerProps<B> & { workerName: string },
) {
  const workerName = props.workerName;

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
      logger.warn("Failed to disable worker URL during deletion:", error);
    }
  }

  // Return minimal output for deleted state
  return;
}

export async function putWorker(
  api: CloudflareApi,
  workerName: string,
  scriptBundle: string | NoBundleResult,
  scriptMetadata: WorkerMetadata,
  dispatchNamespace?: string,
) {
  return withExponentialBackoff(
    async () => {
      const scriptName =
        scriptMetadata.main_module ?? scriptMetadata.body_part!;

      // Create FormData for the upload
      const formData = new FormData();

      function addFile(fileName: string, content: Buffer | string) {
        const contentType = getContentType(fileName) ?? "application/null";
        formData.append(
          fileName,
          new Blob([content], {
            type:
              contentType === "application/javascript" &&
              scriptMetadata.main_module
                ? "application/javascript+module"
                : contentType,
          }),
          fileName,
        );
      }

      if (typeof scriptBundle === "string") {
        addFile(scriptName, scriptBundle);
      } else {
        for (const [fileName, content] of Object.entries(scriptBundle)) {
          // Add the actual script content as a named file part
          addFile(fileName, content);
        }
      }

      // Add metadata as JSON
      formData.append(
        "metadata",
        new Blob([JSON.stringify(scriptMetadata)], {
          type: "application/json",
        }),
      );

      // Upload worker script with bindings
      const endpoint = dispatchNamespace
        ? `/accounts/${api.accountId}/workers/dispatch/namespaces/${dispatchNamespace}/scripts/${workerName}`
        : `/accounts/${api.accountId}/workers/scripts/${workerName}`;

      const uploadResponse = await api.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    (err) =>
      err.status === 404 ||
      err.status === 500 ||
      err.status === 503 ||
      // this is a tranient error that cloudflare throws randomly
      (err instanceof CloudflareApiError &&
        err.status === 400 &&
        err.message.match(/binding.*failed to generate/)),
    10,
    100,
  );
}

export async function assertWorkerDoesNotExist<B extends Bindings>(
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

export async function configureURL<B extends Bindings>(
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

export async function getWorkerScriptMetadata(
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

async function getWorkerBindings(api: CloudflareApi, workerName: string) {
  // Fetch the bindings for a worker by calling the Cloudflare API endpoint:
  // GET /accounts/:account_id/workers/scripts/:script_name/bindings
  // See: https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/script_and_version_settings/methods/get/
  const response = await api.get(
    `/accounts/${api.accountId}/workers/scripts/${workerName}/settings`,
  );
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error(
      `Error getting worker bindings: ${response.status} ${response.statusText}`,
    );
  }
  // The result is an object with a "result" property containing the bindings array
  const { result, success, errors } = (await response.json()) as {
    result: {
      bindings: WorkerBindingSpec[];
      compatibility_date: string;
      compatibility_flags: string[];
      [key: string]: any;
    };
    success: boolean;
    errors: Array<{
      code: number;
      message: string;
      documentation_url: string;
      [key: string]: any;
    }>;
    messages: Array<{
      code: number;
      message: string;
      documentation_url: string;
      [key: string]: any;
    }>;
  };
  if (!success) {
    throw new Error(
      `Error getting worker bindings: ${response.status} ${response.statusText}\nErrors:\n${errors.map((e) => `- [${e.code}] ${e.message} (${e.documentation_url})`).join("\n")}`,
    );
  }
  return result.bindings;
}

/**
 * Lists and deletes all queue consumers for a specific worker
 * @param ctx Worker context containing eventSources
 * @param api CloudflareApi instance
 * @param workerName Name of the worker script
 */
async function deleteQueueConsumers(
  api: CloudflareApi,
  workerName: string,
): Promise<void> {
  const consumers = await listQueueConsumersForWorker(api, workerName);

  await Promise.all(
    consumers.map(async (consumer) => {
      await deleteQueueConsumer(api, consumer.queueId, consumer.consumerId);
    }),
  );
}
