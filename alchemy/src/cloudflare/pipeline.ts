import { bind } from "../bootstrap/bind.js";
import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import type { Secret } from "../secret.js";
import { CloudflareApiError, handleApiError } from "./api-error.js";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.js";
import type { Bound } from "./bound.js";

/**
 * Settings for compression of pipeline output
 */
export interface CompressionSettings {
  /**
   * Type of compression to use for pipeline output
   * @default "gzip"
   */
  type: "gzip" | "none";
}

/**
 * Settings for batching behavior of pipeline output
 */
export interface BatchSettings {
  /**
   * Maximum size of batch in megabytes before delivery (1-100 MB)
   * @default 100
   */
  maxMb?: number;

  /**
   * Maximum number of rows in a batch before delivery (1-10,000,000 rows)
   * @default 10000000
   */
  maxRows?: number;

  /**
   * Maximum duration of a batch in seconds before delivery (1-300 seconds)
   * @default 300
   */
  maxSeconds?: number;
}

/**
 * Configuration for a pipeline HTTP source
 */
export interface HttpSource {
  /**
   * Format of the source data
   * @default "json"
   */
  format: "json";

  /**
   * Type of source
   */
  type: "http";

  /**
   * Whether authentication is required
   * @default true
   */
  authentication?: boolean;

  /**
   * CORS configuration for HTTP endpoint source
   */
  cors?: {
    /**
     * Allowed origins for CORS requests
     * @default ["*"]
     */
    origins: string[];
  };
}

/**
 * Configuration for a pipeline binding source
 */
export interface BindingSource {
  /**
   * Format of the source data
   * @default "json"
   */
  format: "json";

  /**
   * Type of source
   */
  type: "binding";
}

/**
 * Configuration for a pipeline source
 */
export type PipelineSource = HttpSource | BindingSource;

/**
 * Configuration for an R2 destination
 */
export interface R2DestinationConfig {
  /**
   * Type of destination (R2)
   */
  type: "r2";

  /**
   * Format of the output data
   * @default "json"
   */
  format: "json" | "ndjson";

  /**
   * Path configuration for the R2 destination
   */
  path: {
    /**
     * R2 bucket name
     */
    bucket: string;

    /**
     * Optional prefix for files in the bucket
     */
    prefix?: string;

    /**
     * Optional filename pattern
     * @default "${slug}${extension}"
     */
    filename?: string;

    /**
     * Optional filepath pattern
     * @default "${date}/${hour}"
     */
    filepath?: string;
  };

  /**
   * Compression settings
   */
  compression?: CompressionSettings;

  /**
   * Batch settings
   */
  batch?: BatchSettings;

  /**
   * Credentials for the R2 bucket
   * Required for R2 destinations
   */
  credentials: {
    /**
     * Access key ID for the R2 bucket
     */
    accessKeyId: Secret;

    /**
     * Secret access key for the R2 bucket
     */
    secretAccessKey: Secret;

    /**
     * Endpoint for the R2 bucket
     */
    endpoint?: string;
  };
}

/**
 * Allowed destination types
 */
export type PipelineDestination = R2DestinationConfig;

/**
 * Properties for creating or updating a Pipeline
 */
export interface PipelineProps extends CloudflareApiOptions {
  /**
   * Name of the pipeline
   *
   * @default id
   */
  name?: string;

  /**
   * Source configuration for the pipeline
   */
  source: PipelineSource[];

  /**
   * Destination configuration for the pipeline
   */
  destination: PipelineDestination;

  /**
   * Compression settings for the pipeline
   * @default { type: "gzip" }
   */
  compression?: CompressionSettings;

  /**
   * Whether to delete the pipeline.
   * If set to false, the pipeline will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;
}

/**
 * Base type for pipeline records
 */
export interface PipelineRecord {
  [key: string]: any;
}

/**
 * Output returned after Pipeline creation/update
 */
export interface PipelineResource<_T extends PipelineRecord = PipelineRecord>
  extends Resource<"cloudflare::Pipeline">,
    PipelineProps {
  /**
   * Type identifier for the Pipeline resource
   */
  type: "pipeline";

  /**
   * The unique ID of the pipeline
   */
  id: string;

  /**
   * The name of the pipeline
   */
  name: string;

  /**
   * HTTP endpoint URL for the pipeline
   */
  endpoint: string;

  /**
   * Version of the pipeline
   */
  version: number;
}

export type Pipeline<T extends PipelineRecord = PipelineRecord> =
  PipelineResource<T> & Bound<PipelineResource<T>>;

/**
 * Creates and manages Cloudflare Pipelines.
 *
 * Pipelines provide a managed data pipeline service that lets you collect, transform,
 * and route data to various destinations like R2 buckets.
 *
 * @example
 * // Create a basic pipeline with an R2 bucket destination
 * const bucket = await R2Bucket("logs-bucket", {
 *   name: "logs-bucket"
 * });
 *
 * const accessKey = alchemy.secret(process.env.R2_ACCESS_KEY_ID!);
 * const secretKey = alchemy.secret(process.env.R2_SECRET_ACCESS_KEY!);
 *
 * const pipeline = await Pipeline("logs-pipeline", {
 *   name: "logs-pipeline",
 *   destination: {
 *     type: "r2",
 *     format: "json",
 *     path: {
 *       bucket: bucket.name,
 *       prefix: "app-logs",
 *     },
 *     credentials: {
 *       accessKeyId: accessKey,
 *       secretAccessKey: secretKey
 *     }
 *   },
 *   batch: {
 *     maxMb: 50,
 *     maxSeconds: 60
 *   }
 * });
 *
 * @example
 * // Create a pipeline with custom source configuration
 * const customPipeline = await Pipeline("custom-pipeline", {
 *   name: "custom-pipeline",
 *   source: [{
 *     type: "http",
 *     format: "json",
 *     authentication: true,
 *     cors: {
 *       origins: ["https://example.com"]
 *     }
 *   }],
 *   destination: {
 *     type: "r2",
 *     format: "json",
 *     path: {
 *       bucket: "my-bucket",
 *       prefix: "data"
 *     },
 *     credentials: {
 *       accessKeyId: alchemy.secret(process.env.R2_ACCESS_KEY_ID!),
 *       secretAccessKey: alchemy.secret(process.env.R2_SECRET_ACCESS_KEY!)
 *     },
 *     compression: {
 *       type: "gzip"
 *     }
 *   }
 * });
 *
 * @see https://developers.cloudflare.com/pipelines/
 */
export async function Pipeline<T extends PipelineRecord = PipelineRecord>(
  name: string,
  props: PipelineProps,
): Promise<Pipeline<T>> {
  const pipeline = await PipelineResource(name, props);
  const binding = await bind(pipeline);
  return {
    ...pipeline,
    send: binding.send,
  };
}

const PipelineResource = Resource("cloudflare::Pipeline", async function <
  T extends PipelineRecord = PipelineRecord,
>(this: Context<PipelineResource<T>>, id: string, props: PipelineProps): Promise<
  PipelineResource<T>
> {
  const api = await createCloudflareApi(props);
  const pipelineName = props.name ?? id;

  if (this.phase === "delete") {
    if (props.delete !== false) {
      // Delete Pipeline
      await deletePipeline(api, pipelineName);
    }

    // Return void (a deleted pipeline has no content)
    return this.destroy();
  }
  let pipelineData: CloudflarePipelineResponse;

  if (this.phase === "create") {
    pipelineData = await createPipeline(api, pipelineName, props);
  } else {
    // Update operation
    if (this.output?.id) {
      // Check if name is being changed, which is not allowed
      if (props.name !== this.output.name) {
        throw new Error(
          "Cannot update Pipeline name after creation. Pipeline name is immutable.",
        );
      }

      // Update the pipeline with new settings
      pipelineData = await updatePipeline(api, pipelineName, props);
    } else {
      // If no ID exists, fall back to creating a new pipeline
      console.log(
        "No existing Pipeline ID found, creating new Cloudflare Pipeline:",
        pipelineName,
      );
      pipelineData = await createPipeline(api, pipelineName, props);
    }
  }

  return this({
    type: "pipeline",
    id: pipelineData.result.id,
    name: pipelineName,
    endpoint: pipelineData.result.endpoint,
    version: pipelineData.result.version,
    source: pipelineData.result.source!.map((s) => ({
      type: s.type as "http" | "binding",
      format: s.format as "json",
      authentication: s.authentication,
      cors: s.cors,
    })),
    destination: props.destination, // Use the input destination, not the API response
    compression: props.compression,
    accountId: api.accountId,
  });
});

interface CloudflarePipelineResponse {
  result: {
    id: string;
    name: string;
    endpoint: string;
    version: number;
    source: Array<{
      type: "http" | "binding";
      format: string;
      authentication?: boolean;
      cors?: {
        origins: string[];
      };
    }>;
    destination: {
      type: string;
      format: string;
      path?: {
        bucket: string;
        prefix?: string;
        filename?: string;
        filepath?: string;
      };
      compression?: {
        type: string;
      };
      batch: {
        max_bytes?: number;
        max_rows?: number;
        max_duration_s?: number;
      };
    };
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Get a pipeline
 */
export async function getPipeline(
  api: CloudflareApi,
  pipelineName: string,
): Promise<CloudflarePipelineResponse> {
  const response = await api.get(
    `/accounts/${api.accountId}/pipelines/${pipelineName}`,
  );

  if (!response.ok) {
    return await handleApiError(response, "getting", "Pipeline", pipelineName);
  }

  return (await response.json()) as CloudflarePipelineResponse;
}

/**
 * Delete a pipeline
 */
export async function deletePipeline(
  api: CloudflareApi,
  pipelineName: string,
): Promise<void> {
  // Delete Pipeline
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/pipelines/${pipelineName}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));
    throw new CloudflareApiError(
      `Error deleting Cloudflare Pipeline '${pipelineName}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse,
    );
  }
}

/**
 * Create a new pipeline
 */
export async function createPipeline(
  api: CloudflareApi,
  pipelineName: string,
  props: PipelineProps,
): Promise<CloudflarePipelineResponse> {
  // Prepare the create payload
  const createPayload = preparePipelinePayload(api, pipelineName, props);

  const createResponse = await api.post(
    `/accounts/${api.accountId}/pipelines`,
    createPayload,
  );

  if (!createResponse.ok) {
    return await handleApiError(
      createResponse,
      "creating",
      "Pipeline",
      pipelineName,
    );
  }

  return (await createResponse.json()) as CloudflarePipelineResponse;
}

/**
 * Update a pipeline
 */
export async function updatePipeline(
  api: CloudflareApi,
  pipelineName: string,
  props: PipelineProps,
): Promise<CloudflarePipelineResponse> {
  // Get current pipeline to build update payload
  const currentPipeline = await getPipeline(api, pipelineName);

  // Prepare the update payload
  const updatePayload = preparePipelinePayload(
    api,
    pipelineName,
    props,
    currentPipeline,
  );

  const updateResponse = await api.put(
    `/accounts/${api.accountId}/pipelines/${pipelineName}`,
    updatePayload,
  );

  if (!updateResponse.ok) {
    return await handleApiError(
      updateResponse,
      "updating",
      "Pipeline",
      pipelineName,
    );
  }

  return (await updateResponse.json()) as CloudflarePipelineResponse;
}

/**
 * Helper function to prepare pipeline payload for create/update operations
 */
function preparePipelinePayload(
  api: CloudflareApi,
  pipelineName: string,
  props: PipelineProps,
  currentPipeline?: CloudflarePipelineResponse,
): any {
  // Prepare the payload with name and source
  const payload: any = {
    name: pipelineName,
    source: props.source ||
      currentPipeline?.result.source || [
        {
          type: "http",
          format: "json",
          authentication: true,
          cors: { origins: ["*"] },
        },
      ],
  };

  // Handle destination
  if (props.destination) {
    payload.destination = { ...props.destination };

    // Handle special formatting for R2 destination
    const r2Dest = props.destination as R2DestinationConfig;

    // Format credentials for API
    if (payload.destination.credentials) {
      payload.destination.credentials = {
        access_key_id: r2Dest.credentials.accessKeyId.unencrypted,
        secret_access_key: r2Dest.credentials.secretAccessKey.unencrypted,
        endpoint:
          r2Dest.credentials.endpoint ??
          `https://${api.accountId}.r2.cloudflarestorage.com`,
      };
    }

    // Format batch settings
    payload.destination.batch = convertBatchSettings(payload.destination.batch);
  } else if (currentPipeline?.result.destination) {
    payload.destination = currentPipeline.result.destination;
  } else if (!props.destination && !currentPipeline) {
    throw new Error(
      "An R2 destination is required for creating/updating a pipeline",
    );
  }

  // Add compression if not specified
  if (!payload.destination.compression) {
    payload.destination.compression = { type: "gzip" };
  }

  return payload;
}

/**
 * List all pipelines in an account
 */
export async function listPipelines(
  api: CloudflareApi,
): Promise<{ name: string; id: string }[]> {
  const response = await api.get(`/accounts/${api.accountId}/pipelines`);

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list pipelines: ${response.statusText}`,
      response,
    );
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    results?: Array<{
      name: string;
      id: string;
    }>;
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list pipelines: ${errorMessage}`);
  }

  // Transform API response
  return (data.results || []).map((pipeline) => ({
    name: pipeline.name,
    id: pipeline.id,
  }));
}

/**
 * Helper function to convert batch settings to the format expected by the API
 */
interface CloudflareBatchSettings {
  max_bytes?: number;
  max_rows?: number;
  max_duration_s?: number;
}

function convertBatchSettings(batch?: BatchSettings): CloudflareBatchSettings {
  const result: CloudflareBatchSettings = {};

  if (batch?.maxMb !== undefined) {
    // Convert MB to bytes
    result.max_bytes = batch.maxMb * 1024 * 1024;
  }

  if (batch?.maxRows !== undefined) {
    result.max_rows = batch.maxRows;
  }

  if (batch?.maxSeconds !== undefined) {
    result.max_duration_s = batch.maxSeconds;
  }

  return result;
}
