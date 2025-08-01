import * as miniflare from "miniflare";
import { assertNever } from "../../util/assert-never.ts";
import type { HTTPServer } from "../../util/http.ts";
import {
  Self,
  type Binding,
  type Bindings,
  type WorkerBindingService,
  type WorkerBindingSpec,
} from "../bindings.ts";
import { isQueueEventSource, type EventSource } from "../event-source.ts";
import type { WorkerBundle, WorkerBundleSource } from "../worker-bundle.ts";
import type { AssetsConfig } from "../worker.ts";
import { createRemoteProxyWorker } from "./remote-binding-proxy.ts";

export interface MiniflareWorkerInput {
  id: string;
  name: string;
  compatibilityDate: string | undefined;
  compatibilityFlags: string[] | undefined;
  bindings: Bindings | undefined;
  eventSources: EventSource[] | undefined;
  assets: AssetsConfig | undefined;
  bundle: WorkerBundleSource;
  port: number | undefined;
}

type RemoteOnlyBindingType =
  | "ai"
  | "ai_gateway"
  | "browser"
  | "dispatch_namespace"
  | "mtls_certificate"
  | "vectorize";
type RemoteOptionalBindingType =
  | "d1"
  | "images"
  | "kv_namespace"
  | "queue"
  | "r2_bucket";

type RemoteBinding =
  | (Extract<
      WorkerBindingSpec,
      {
        type: RemoteOnlyBindingType | RemoteOptionalBindingType;
      }
    > & {
      raw: true;
    })
  | WorkerBindingService;

type BaseWorkerOptions = {
  [K in keyof miniflare.WorkerOptions]: K extends "compatibilityFlags"
    ? miniflare.WorkerOptions[K]
    : Exclude<miniflare.WorkerOptions[K], string[]>;
};

export const buildWorkerOptions = async (
  input: MiniflareWorkerInput,
): Promise<{
  watch: (signal: AbortSignal) => AsyncGenerator<miniflare.WorkerOptions>;
  remoteProxy: HTTPServer | undefined;
}> => {
  const remoteBindings: RemoteBinding[] = [];
  const options: Partial<BaseWorkerOptions> = {
    name: input.name,
    compatibilityDate: input.compatibilityDate,
    compatibilityFlags: input.compatibilityFlags,
    // TODO: Setting `proxy: true` here causes the following error when connecting via a websocket:
    // workerd/io/worker.c++:2164: info: uncaught exception; source = Uncaught (in promise); stack = TypeError: Invalid URL string.
    unsafeDirectSockets: [{ proxy: false }],
    containerEngine: {
      localDocker: {
        socketPath:
          process.platform === "win32"
            ? "//./pipe/docker_engine"
            : "unix:///var/run/docker.sock",
      },
    },
  };
  for (const [key, binding] of Object.entries(input.bindings ?? {})) {
    if (typeof binding === "string") {
      (options.bindings ??= {})[key] = binding;
      continue;
    }
    if (binding === Self) {
      (options.serviceBindings ??= {})[key] = miniflare.kCurrentWorker;
      continue;
    }
    switch (binding.type) {
      case "ai":
      case "ai_gateway": {
        remoteBindings.push({
          type: "ai",
          name: key,
          raw: true,
        });
        break;
      }
      case "analytics_engine": {
        (options.analyticsEngineDatasets ??= {})[key] = {
          dataset: binding.dataset,
        };
        break;
      }
      case "assets": {
        options.assets = {
          binding: key,
          directory: binding.path,
          assetConfig: {
            html_handling: input.assets?.html_handling,
            not_found_handling: input.assets?.not_found_handling,
          },
        };
        break;
      }
      case "browser": {
        remoteBindings.push({
          type: "browser",
          name: key,
          raw: true,
        });
        break;
      }
      case "container": {
        (options.durableObjects ??= {})[key] = {
          className: binding.className,
          scriptName: binding.scriptName,
          useSQLite: binding.sqlite,
          container: {
            imageName: binding.image.imageRef,
          },
        };
        break;
      }
      case "d1": {
        if (isRemoteBinding(binding)) {
          remoteBindings.push({
            type: "d1",
            name: key,
            id: binding.id,
            raw: true,
          });
        } else {
          (options.d1Databases ??= {})[key] = binding.id;
        }
        break;
      }
      case "dispatch_namespace": {
        remoteBindings.push({
          type: "dispatch_namespace",
          name: key,
          namespace: binding.namespace,
          raw: true,
        });
        break;
      }
      case "durable_object_namespace": {
        (options.durableObjects ??= {})[key] = {
          className: binding.className,
          scriptName: binding.scriptName,
          useSQLite: binding.sqlite,
        };
        break;
      }
      case "hyperdrive": {
        throw new Error("Hyperdrive bindings are not supported in local mode");
      }
      case "images": {
        if (isRemoteBinding(binding)) {
          remoteBindings.push({
            type: "images",
            name: key,
            raw: true,
          });
        } else {
          options.images = {
            binding: key,
          };
        }
        break;
      }
      case "kv_namespace": {
        const namespaceId =
          "namespaceId" in binding ? binding.namespaceId : binding.id;
        if (isRemoteBinding(binding)) {
          remoteBindings.push({
            type: "kv_namespace",
            name: key,
            namespace_id: namespaceId,
            raw: true,
          });
        } else {
          (options.kvNamespaces ??= {})[key] = namespaceId;
        }
        break;
      }
      case "json": {
        (options.bindings ??= {})[key] = binding.json;
        break;
      }
      case "queue": {
        if (isRemoteBinding(binding)) {
          remoteBindings.push({
            type: "queue",
            name: key,
            queue_name: binding.name,
            raw: true,
          });
        } else {
          (options.queueProducers ??= {})[key] = {
            queueName: binding.name,
            deliveryDelay: binding.settings?.deliveryDelay,
          };
        }
        break;
      }
      case "pipeline": {
        (options.pipelines ??= {})[key] = binding.id;
        break;
      }
      case "ratelimit": {
        (options.ratelimits ??= {})[key] = {
          simple: binding.simple,
        };
        break;
      }
      case "secret": {
        (options.bindings ??= {})[key] = binding.unencrypted;
        break;
      }
      case "secret_key": {
        throw new Error("Secret keys are not supported in local mode");
      }
      case "secrets_store_secret": {
        (options.secretsStoreSecrets ??= {})[key] = {
          store_id: binding.storeId,
          secret_name: binding.name,
        };
        break;
      }
      case "r2_bucket": {
        if (isRemoteBinding(binding)) {
          remoteBindings.push({
            type: "r2_bucket",
            name: key,
            bucket_name: binding.name,
            raw: true,
          });
        } else {
          (options.r2Buckets ??= {})[key] = binding.name;
        }
        break;
      }
      case "service": {
        const service = "service" in binding ? binding.service : binding.name;
        const normalized: WorkerBindingService = {
          type: "service",
          name: key,
          service,
          environment:
            "environment" in binding ? binding.environment : undefined,
        };
        if (isRemoteBinding(binding)) {
          remoteBindings.push(normalized);
        } else {
          (options.serviceBindings ??= {})[key] = service;
        }
        break;
      }
      case "vectorize": {
        remoteBindings.push({
          type: "vectorize",
          name: key,
          index_name: binding.name,
          raw: true,
        });
        break;
      }
      case "version_metadata": {
        (options.bindings ??= {})[key] = {
          id: crypto.randomUUID(),
          tag: "",
          timestamp: "0",
        };
        break;
      }
      case "workflow": {
        (options.workflows ??= {})[key] = {
          name: binding.workflowName,
          className: binding.className,
          scriptName: binding.scriptName,
        };
        break;
      }
      default: {
        assertNever(binding);
      }
    }
  }
  for (const eventSource of input.eventSources ?? []) {
    const queue = "queue" in eventSource ? eventSource.queue : eventSource;
    if (queue.dev?.remote) {
      throw new Error(
        `Locally emulated workers cannot consume remote queues. Worker "${input.name}" is locally emulated but is consuming remote queue "${queue.name}".`,
      );
    }
    if (isQueueEventSource(eventSource)) {
      (options.queueConsumers ??= {})[queue.name] = {
        maxBatchSize: eventSource.settings?.batchSize,
        maxBatchTimeout: eventSource.settings?.maxWaitTimeMs,
        maxRetries: eventSource.settings?.maxRetries,
        retryDelay: eventSource.settings?.retryDelay,
      };
    } else {
      (options.queueConsumers ??= {})[eventSource.name] = {};
    }
  }
  async function* watch(signal: AbortSignal) {
    for await (const bundle of input.bundle.watch(signal)) {
      const { modules, rootPath } = normalizeBundle(bundle);
      yield {
        ...options,
        modules,
        rootPath,
      };
    }
  }
  if (remoteBindings.length > 0) {
    const remoteProxy = await createRemoteProxyWorker({
      name: input.name,
      bindings: remoteBindings,
    });
    for (const binding of remoteBindings) {
      switch (binding.type) {
        case "ai":
          options.ai = {
            binding: binding.name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "browser":
          options.browserRendering = {
            binding: binding.name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "d1":
          (options.d1Databases ??= {})[binding.name] = {
            id: binding.id,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "dispatch_namespace":
          (options.dispatchNamespaces ??= {})[binding.name] = {
            namespace: binding.namespace,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "kv_namespace":
          (options.kvNamespaces ??= {})[binding.name] = {
            id: binding.namespace_id,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "images":
          options.images = {
            binding: binding.name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "mtls_certificate":
          (options.mtlsCertificates ??= {})[binding.name] = {
            certificate_id: binding.certificate_id,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "queue":
          (options.queueProducers ??= {})[binding.name] = {
            queueName: binding.queue_name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "r2_bucket":
          (options.r2Buckets ??= {})[binding.name] = {
            id: binding.bucket_name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "service":
          (options.serviceBindings ??= {})[binding.name] = {
            name: binding.name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        case "vectorize":
          (options.vectorize ??= {})[binding.name] = {
            index_name: binding.index_name,
            remoteProxyConnectionString: remoteProxy.connectionString,
          };
          break;
        default: {
          assertNever(binding);
        }
      }
    }
    return {
      watch,
      remoteProxy: remoteProxy.server,
    };
  }
  return {
    watch,
    remoteProxy: undefined,
  };
};

const moduleTypes = {
  esm: "ESModule",
  cjs: "CommonJS",
  text: "Text",
  data: "Data",
  wasm: "CompiledWasm",
  sourcemap: "Text",
} as const;

const normalizeBundle = (bundle: WorkerBundle) => {
  const modules = bundle.modules.map((module) => ({
    type: moduleTypes[module.type],
    path: module.path,
    contents: module.content,
  }));
  const entry = modules.find((module) => module.path === bundle.entrypoint);
  if (!entry) {
    throw new Error(`Entrypoint "${bundle.entrypoint}" not found in bundle.`);
  }
  return {
    modules: [entry, ...modules.filter((module) => module.path !== entry.path)],
    rootPath: bundle.root,
  };
};

const isRemoteBinding = (binding: Binding) => {
  if (typeof binding === "string" || binding === Self) {
    return false;
  }
  return (
    "dev" in binding &&
    typeof binding.dev === "object" &&
    "remote" in binding.dev &&
    !!binding.dev.remote
  );
};
