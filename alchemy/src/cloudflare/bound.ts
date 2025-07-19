import type { Pipeline } from "cloudflare:pipelines";
import type { WorkflowEntrypoint } from "cloudflare:workers";
import type { Secret } from "../secret.ts";
import type { AiGatewayResource as _AiGateway } from "./ai-gateway.ts";
import type { Ai as _Ai } from "./ai.ts";
import type { AnalyticsEngineDataset as _AnalyticsEngineDataset } from "./analytics-engine.ts";
import type { Assets } from "./assets.ts";
import type { Binding, Json, Self } from "./bindings.ts";
import type { BrowserRendering } from "./browser-rendering.ts";
import type { R2BucketResource as _R2Bucket } from "./bucket.ts";
import type { Container as _Container } from "./container.ts";
import type { D1DatabaseResource } from "./d1-database.ts";
import type { DispatchNamespaceResource } from "./dispatch-namespace.ts";
import type { DurableObjectNamespace as _DurableObjectNamespace } from "./durable-object-namespace.ts";
import type { HyperdriveResource as _Hyperdrive } from "./hyperdrive.ts";
import type { Images as _Images } from "./images.ts";
import type { PipelineResource as _Pipeline } from "./pipeline.ts";
import type { QueueResource as _Queue } from "./queue.ts";
import type { RateLimit } from "./rate-limit.ts";
import type { SecretKey } from "./secret-key.ts";
import type { Secret as CloudflareSecret } from "./secret.ts";
import type { VectorizeIndexResource as _VectorizeIndex } from "./vectorize-index.ts";
import type { VersionMetadata as _VersionMetadata } from "./version-metadata.ts";
import type { WorkerStub } from "./worker-stub.ts";
import type { Worker as _Worker, WorkerRef } from "./worker.ts";
import type { Workflow as _Workflow } from "./workflow.ts";

type BoundWorker<
  RPC extends Rpc.WorkerEntrypointBranded = Rpc.WorkerEntrypointBranded,
> = Service<RPC> & {
  // cloudflare's Rpc.Provider type loses mapping between properties (jump to definition)
  // we fix that using Pick to re-connect mappings
  [property in keyof Pick<
    RPC,
    Extract<keyof Rpc.Provider<RPC, "fetch" | "connect">, keyof RPC>
  >]: Rpc.Provider<RPC, "fetch" | "connect">[property];
};

export type Bound<T extends Binding> = T extends _DurableObjectNamespace<
  infer O
>
  ? DurableObjectNamespace<O & Rpc.DurableObjectBranded>
  : T extends { type: "kv_namespace" }
    ? KVNamespace
    : T extends WorkerStub<infer RPC>
      ? BoundWorker<RPC>
      : T extends _Worker<any, infer RPC> | WorkerRef<infer RPC>
        ? BoundWorker<RPC>
        : T extends { type: "service" }
          ? Service
          : T extends _R2Bucket
            ? R2Bucket
            : T extends _AiGateway
              ? AiGateway
              : T extends _Hyperdrive
                ? Hyperdrive
                : T extends Secret
                  ? string
                  : T extends CloudflareSecret
                    ? SecretsStoreSecret
                    : T extends SecretKey
                      ? CryptoKey
                      : T extends Assets
                        ? Service
                        : T extends _Workflow<infer WF>
                          ? WF extends WorkflowEntrypoint<any, infer Params>
                            ? Workflow<Params>
                            : never
                          : T extends D1DatabaseResource
                            ? D1Database
                            : T extends DispatchNamespaceResource
                              ? { get(name: string): Fetcher }
                              : T extends _VectorizeIndex
                                ? VectorizeIndex
                                : T extends _Queue<infer Body>
                                  ? Queue<Body>
                                  : T extends _AnalyticsEngineDataset
                                    ? AnalyticsEngineDataset
                                    : T extends _Pipeline<infer R>
                                      ? Pipeline<R>
                                      : T extends RateLimit
                                        ? {
                                            limit(options: {
                                              key: string;
                                            }): Promise<{ success: boolean }>;
                                          }
                                        : T extends string
                                          ? string
                                          : T extends BrowserRendering
                                            ? Fetcher
                                            : T extends _Ai<infer M>
                                              ? Ai<M>
                                              : T extends _Images
                                                ? ImagesBinding
                                                : T extends _VersionMetadata
                                                  ? WorkerVersionMetadata
                                                  : T extends Self
                                                    ? Service
                                                    : T extends Json<infer T>
                                                      ? T
                                                      : T extends _Container<
                                                            infer Obj
                                                          >
                                                        ? DurableObjectNamespace<
                                                            Obj &
                                                              Rpc.DurableObjectBranded
                                                          >
                                                        : Service;
