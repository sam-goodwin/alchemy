/**
 * Type definitions for Cloudflare Worker bindings
 * Based on Cloudflare API documentation:
 * https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/
 */
import type { DurableObjectNamespace } from "./durable-object-namespace";
import type { KVNamespace } from "./kv-namespace";
import type { Worker } from "./worker";
import type { Workflow } from "./workflow";

export type WorkerBindings = {
  [bindingName: string]: WorkerBinding;
};

/**
 * Union type for all Worker binding types (Alchemy abstraction)
 */
export type WorkerBinding =
  | DurableObjectNamespace
  | KVNamespace
  | Worker
  | Workflow;

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
  | WorkerBindingPlainText
  | WorkerBindingQueue
  | WorkerBindingR2Bucket
  | WorkerBindingSecretText
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
  type: "browser_rendering";
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
  json: any;
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
  /** Type identifier for Workflow binding */
  type: "workflow";
  /** The name of the binding in the worker */
  name: string;
  /** The name of the workflow */
  workflow_name: string;
  /** The name of the workflow script */
  script_name: string;
  /** The class name of the workflow */
  class_name: string;
}
