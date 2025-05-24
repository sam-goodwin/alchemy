import type { Context } from "../context.js";
import { slugify } from "../util/slugify.js";
import { Self, type Bindings, type WorkerBindingSpec } from "./bindings.js";
import type { DurableObjectNamespace } from "./durable-object-namespace.js";
import { createAssetConfig, type AssetUploadResult } from "./worker-assets.js";
import type { SingleStepMigration } from "./worker-migration.js";
import type { AssetsConfig, Worker, WorkerProps } from "./worker.js";
import type { Workflow } from "./workflow.js";

/**
 * Metadata returned by Cloudflare API for a worker script
 */
export interface WorkerScriptMetadata {
  /**
   * Worker ID
   */
  id: string;

  /**
   * Default environment information
   */
  default_environment?: WorkerDefaultEnvironment;

  /**
   * Worker creation timestamp
   */
  created_on: string;

  /**
   * Worker last modification timestamp
   */
  modified_on: string;

  /**
   * Worker usage model
   */
  usage_model: string;

  /**
   * Worker environments
   */
  environments?: WorkerEnvironment[];
}

/**
 * Worker script information
 */
export interface WorkerScriptInfo {
  /**
   * Script creation timestamp
   */
  created_on: string;

  /**
   * Script last modification timestamp
   */
  modified_on: string;

  /**
   * Script ID
   */
  id: string;

  /**
   * Script tag
   */
  tag: string;

  /**
   * Script tags
   */
  tags: string[];

  /**
   * Deployment ID
   */
  deployment_id: string;

  /**
   * Tail consumers
   */
  tail_consumers: any;

  /**
   * Whether logpush is enabled
   */
  logpush: boolean;

  /**
   * Observability settings
   */
  observability: {
    /**
     * Whether observability is enabled
     */
    enabled: boolean;

    /**
     * Head sampling rate
     */
    head_sampling_rate: number | null;
  };

  /**
   * Whether the script has assets
   */
  has_assets: boolean;

  /**
   * Whether the script has modules
   */
  has_modules: boolean;

  /**
   * Script etag
   */
  etag: string;

  /**
   * Script handlers
   */
  handlers: string[];

  /**
   * Where the script was last deployed from
   */
  last_deployed_from: string;

  /**
   * Script usage model
   */
  usage_model: string;
}

/**
 * Worker environment information
 */
export interface WorkerEnvironment {
  /**
   * Environment name
   */
  environment: string;

  /**
   * Environment creation timestamp
   */
  created_on: string;

  /**
   * Environment last modification timestamp
   */
  modified_on: string;
}

/**
 * Default environment with script information
 */
export interface WorkerDefaultEnvironment extends WorkerEnvironment {
  /**
   * Script information
   */
  script: WorkerScriptInfo;
}

export interface WorkerMetadata {
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
  dispatch_namespace?: string;
}

export async function prepareWorkerMetadata<B extends Bindings>(
  ctx: Context<Worker<B>>,
  oldBindings: Bindings | undefined,
  props: WorkerProps & {
    compatibilityDate: string;
    compatibilityFlags: string[];
    workerName: string;
  },
  assetUploadResult?: AssetUploadResult,
): Promise<WorkerMetadata> {
  const deletedClasses = Object.entries(oldBindings ?? {})
    .filter(([key]) => !props.bindings?.[key])
    .flatMap(([_, binding]) => {
      if (
        binding &&
        typeof binding === "object" &&
        binding.type === "durable_object_namespace"
      ) {
        return [binding.className];
      }
      return [];
    });

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
      deleted_classes: [
        ...deletedClasses,
        ...(props.migrations?.deleted_classes ?? []),
      ],
      renamed_classes: props.migrations?.renamed_classes ?? [],
      transferred_classes: props.migrations?.transferred_classes ?? [],
      new_sqlite_classes: props.migrations?.new_sqlite_classes ?? [],
    },
  };

  if (props.dispatchNamespace) {
    meta.dispatch_namespace = props.dispatchNamespace;
  }

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
        namespace_id:
          "namespaceId" in binding ? binding.namespaceId : binding.id,
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
    } else if (binding.type === "json") {
      meta.bindings.push({
        type: "json",
        name: bindingName,
        json: JSON.stringify(binding.json),
      });
    } else if (binding.type === "analytics_engine") {
      meta.bindings.push({
        type: "analytics_engine",
        name: bindingName,
        dataset: binding.dataset,
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
