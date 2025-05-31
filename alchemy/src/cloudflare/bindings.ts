/**
 * Type definitions for Cloudflare Worker bindings
 * Based on Cloudflare API documentation:
 * https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/
 */
import type { Secret } from "../secret.ts";
import type { AiGatewayResource } from "./ai-gateway.ts";
import type { Ai } from "./ai.ts";
import type { AnalyticsEngineDataset } from "./analytics-engine.ts";
import type { Assets } from "./assets.ts";
import type { Bound } from "./bound.ts";
import type { BrowserRendering } from "./browser-rendering.ts";
import type { R2BucketResource } from "./bucket.ts";
import type { D1DatabaseResource } from "./d1-database.ts";
import type { SecretsStoreResource } from "./secrets-store.ts";
import type { DurableObjectNamespace } from "./durable-object-namespace.ts";
import type { HyperdriveResource } from "./hyperdrive.ts";
import type { KVNamespaceResource } from "./kv-namespace.ts";
import type { PipelineResource } from "./pipeline.ts";
import type { QueueResource } from "./queue.ts";
import type { VectorizeIndexResource } from "./vectorize-index.ts";
import type { WorkerStub } from "./worker-stub.ts";
import type { Worker } from "./worker.ts";
import type { Workflow } from "./workflow.ts";

export type Bindings = {
  [bindingName: string]: Binding;
};

export declare namespace Bindings {
  export type Runtime<B extends Bindings> = {
    [bindingName in keyof B]: Bound<B[bindingName]>;
  };
}

/**
 * L2 Binding Resources.
 */
export type Binding =
  | Ai
  | AiGatewayResource
  | Assets
  | D1DatabaseResource
  | AnalyticsEngineDataset
  | DurableObjectNamespace<Rpc.DurableObjectBranded | undefined>
  | HyperdriveResource
  | KVNamespaceResource
  | PipelineResource
  | QueueResource
  | R2BucketResource
  | SecretsStoreResource
  | {
      type: "kv_namespace";
      id: string;
    }
  | Secret
  | string
  | VectorizeIndexResource
  | Worker
  | WorkerStub
  | Workflow
  | BrowserRendering
  | Self
  | Json;

export type Self = typeof Self;
export const Self = Symbol.for("Self");

export type Json<T = any> = {
  type: "json";
  json: T;
};

export function Json<const T>(value: T): Json<T> {
  return {
    type: "json",
    json: value,
  };
}

/**
 * Union type for all Worker binding types (API spec)
 */
export type WorkerBindingSpec =
  | WorkerBindingAI
  | WorkerBindingAnalyticsEngine
  | WorkerBindingAssets
  | WorkerBindingBrowserRendering
  | WorkerBindingD1
  | WorkerBindingDispatchNamespace
  | WorkerBindingDurableObjectNamespace
  | WorkerBindingHyperdrive
  | WorkerBindingJson
  | WorkerBindingKVNamespace
  | WorkerBindingMTLSCertificate
  | WorkerBindingPipeline
  | WorkerBindingPlainText
  | WorkerBindingQueue
  | WorkerBindingR2Bucket
  | WorkerBindingSecretText
  | WorkerBindingSecretsStore
  | WorkerBindingService
  | WorkerBindingStaticContent
  | WorkerBindingTailConsumer
  | WorkerBindingVectorize
  | WorkerBindingVersionMetadata
  | WorkerBindingWasmModule
  | WorkerBindingWorkflow;

/**
 * AI binding type
 */
export interface WorkerBindingAI {
  /** The name of the binding */
  name: string;
  /** Type identifier for AI binding */
  type: "ai";
}

/**
 * Analytics Engine binding type
 */
export interface WorkerBindingAnalyticsEngine {
  /** The name of the binding */
  name: string;
  /** Type identifier for Analytics Engine binding */
  type: "analytics_engine";
  /** Dataset name */
  dataset: string;
}

/**
 * Assets binding type
 */
export interface WorkerBindingAssets {
  /** The name of the binding */
  name: string;
  /** Type identifier for Assets binding */
  type: "assets";
}

/**
 * Browser Rendering binding type
 */
export interface WorkerBindingBrowserRendering {
  /** The name of the binding */
  name: string;
  /** Type identifier for Browser Rendering binding */
  type: "browser";
}

/**
 * D1 database binding type
 */
export interface WorkerBindingD1 {
  /** The name of the binding */
  name: string;
  /** Type identifier for D1 binding */
  type: "d1";
  /** D1 database ID */
  id: string;
}

/**
 * Dispatch Namespace binding type
 */
export interface WorkerBindingDispatchNamespace {
  /** The name of the binding */
  name: string;
  /** Type identifier for Dispatch Namespace binding */
  type: "dispatch_namespace";
  /** Namespace identifier */
  namespace: string;
  /** Optional outbound service */
  outbound?: any; // Documentation doesn't specify the exact type
}

/**
 * Durable Object Namespace binding type
 */
export interface WorkerBindingDurableObjectNamespace {
  /**
   * The stable ID of the binding
   * @internal
   */
  stableId?: string;
  /** The name of the binding */
  name: string;
  /** Type identifier for Durable Object Namespace binding */
  type: "durable_object_namespace";
  /** Durable Object class name */
  class_name: string;
  /** Script name that contains the Durable Object */
  script_name?: string;
  /** Environment */
  environment?: string;
  /** Namespace ID */
  namespace_id?: string;
}

/**
 * Hyperdrive binding type
 */
export interface WorkerBindingHyperdrive {
  /** The name of the binding */
  name: string;
  /** Type identifier for Hyperdrive binding */
  type: "hyperdrive";
  /** Hyperdrive ID */
  id: string;
}

/**
 * JSON binding type
 */
export interface WorkerBindingJson {
  /** The name of the binding */
  name: string;
  /** Type identifier for JSON binding */
  type: "json";
  /** JSON value */
  json: string;
}

/**
 * KV Namespace binding type
 */
export interface WorkerBindingKVNamespace {
  /** The name of the binding */
  name: string;
  /** Type identifier for KV Namespace binding */
  type: "kv_namespace";
  /** KV Namespace ID */
  namespace_id: string;
}

/**
 * MTLS Certificate binding type
 */
export interface WorkerBindingMTLSCertificate {
  /** The name of the binding */
  name: string;
  /** Type identifier for MTLS Certificate binding */
  type: "mtls_certificate";
  /** Certificate ID */
  certificate_id: string;
}

/**
 * Plain Text binding type
 */
export interface WorkerBindingPlainText {
  /** The name of the binding */
  name: string;
  /** Type identifier for Plain Text binding */
  type: "plain_text";
  /** Text content */
  text: string;
}

/**
 * Queue binding type
 */
export interface WorkerBindingQueue {
  /** The name of the binding */
  name: string;
  /** Type identifier for Queue binding */
  type: "queue";
  /** Queue name */
  queue_name: string;
}

/**
 * R2 Bucket binding type
 */
export interface WorkerBindingR2Bucket {
  /** The name of the binding */
  name: string;
  /** Type identifier for R2 Bucket binding */
  type: "r2_bucket";
  /** Bucket name */
  bucket_name: string;
}

/**
 * Secret Text binding type
 */
export interface WorkerBindingSecretText {
  /** The name of the binding */
  name: string;
  /** Type identifier for Secret Text binding */
  type: "secret_text";
  /** Secret value */
  text: string;
}

export interface WorkerBindingSecretsStore {
  /** The name of the binding */
  name: string;
  /** Type identifier for Secrets Store binding */
  type: "secrets_store";
  /** Store ID */
  store_id: string;
  /** Secret name */
  secret_name: string;
}

/**
 * Service binding type
 */
export interface WorkerBindingService {
  /** The name of the binding */
  name: string;
  /** Type identifier for Service binding */
  type: "service";
  /** Service name */
  service: string;
  /** Environment */
  environment?: string;
  /** Service namespace */
  namespace?: string;
}

/**
 * Tail Consumer binding type
 */
export interface WorkerBindingTailConsumer {
  /** The name of the binding */
  name: string;
  /** Type identifier for Tail Consumer binding */
  type: "tail_consumer";
  /** Service name */
  service: string;
}

/**
 * Vectorize binding type
 */
export interface WorkerBindingVectorize {
  /** The name of the binding */
  name: string;
  /** Type identifier for Vectorize binding */
  type: "vectorize";
  /** Index name */
  index_name: string;
}

/**
 * Version Metadata binding type
 */
export interface WorkerBindingVersionMetadata {
  /** The name of the binding */
  name: string;
  /** Type identifier for Version Metadata binding */
  type: "version_metadata";
}

/**
 * WASM Module binding type
 */
export interface WorkerBindingWasmModule {
  /** The name of the binding */
  name: string;
  /** Type identifier for WASM Module binding */
  type: "wasm_module";
  /** Module name */
  module: string;
}

/**
 * Static content binding for Cloudflare Workers
 * Used for Workers Sites and static assets
 */
export interface WorkerBindingStaticContent {
  /** The name of the binding */
  name: string;
  /** Type identifier for Static Content binding */
  type: "static_content";
}

export interface WorkerBindingWorkflow {
  /** The name of the binding */
  name: string;
  /** Type identifier for Workflow binding */
  type: "workflow";
  /** Workflow name */
  workflow_name: string;
  /** Workflow class name */
  class_name: string;
  /**
   * Workflow script name
   *
   * @default - the name of the script it is bound to
   */
  script_name?: string;
}

/**
 * Pipeline binding type
 */
export interface WorkerBindingPipeline {
  /** The name of the binding */
  name: string;
  /** Type identifier for Pipeline binding */
  type: "pipelines";
  /** Pipeline name */
  pipeline: string;
}
