import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { bind } from "../runtime/bind.ts";
import { logger } from "../util/logger.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Bound } from "./bound.ts";

/**
 * Properties for creating or updating a Vectorize Index
 */
export interface VectorizeIndexProps extends CloudflareApiOptions {
  /**
   * Name of the index
   */
  name: string;

  /**
   * Optional description of the index
   */
  description?: string;

  /**
   * Dimensions of the vectors
   */
  dimensions: number;

  /**
   * Distance metric used for vector similarity
   */
  metric: "cosine" | "euclidean" | "dot_product";

  /**
   * Whether to delete the index if removed
   * If set to false, the index will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;

  /**
   * Whether to adopt an existing index with the same name if it exists
   * If true and an index with the same name exists, it will be adopted rather than creating a new one
   *
   * @default false
   */
  adopt?: boolean;
}

export function isVectorizeIndex(
  resource: Resource,
): resource is VectorizeIndexResource {
  return resource[ResourceKind] === "cloudflare::VectorizeIndex";
}

/**
 * Output returned after Vectorize Index creation/update
 */
export interface VectorizeIndexResource
  extends Resource<"cloudflare::VectorizeIndex">,
    VectorizeIndexProps {
  type: "vectorize";

  /**
   * The unique identifier for the index (same as name)
   */
  id: string;

  /**
   * Time at which the index was created
   */
  createdAt?: number;
}

export type VectorizeIndex = VectorizeIndexResource &
  Bound<VectorizeIndexResource>;

/**
 * Creates and manages Cloudflare Vectorize Indexes.
 *
 * Vectorize is Cloudflare's vector database that enables vector search within Cloudflare Workers.
 *
 * @example
 * // Create a basic vector index for text embeddings
 * const basicIndex = await VectorizeIndex("text-embeddings", {
 *   name: "text-embeddings",
 *   config: {
 *     dimensions: 768,
 *     metric: "cosine"
 *   }
 * });
 *
 * @example
 * // Create a vector index with a description
 * const descIndex = await VectorizeIndex("image-embeddings", {
 *   name: "image-embeddings",
 *   description: "Vector index for image embeddings using CLIP model",
 *   config: {
 *     dimensions: 512,
 *     metric: "cosine"
 *   }
 * });
 *
 * @example
 * // Adopt an existing index if it already exists instead of failing
 * const existingIndex = await VectorizeIndex("existing-index", {
 *   name: "existing-index",
 *   adopt: true,
 *   config: {
 *     dimensions: 1024,
 *     metric: "euclidean"
 *   }
 * });
 *
 * @see https://developers.cloudflare.com/vectorize/
 */
export async function VectorizeIndex(
  name: string,
  props: VectorizeIndexProps,
): Promise<VectorizeIndex> {
  const index = await _VectorizeIndex(name, props);
  const binding = await bind(index);
  return {
    ...index,
    describe: binding.describe,
    query: binding.query,
    insert: binding.insert,
    upsert: binding.upsert,
    deleteByIds: binding.deleteByIds,
    getByIds: binding.getByIds,
  };
}

const _VectorizeIndex = Resource(
  "cloudflare::VectorizeIndex",
  async function (
    this: Context<VectorizeIndexResource>,
    id: string,
    props: VectorizeIndexProps,
  ): Promise<VectorizeIndexResource> {
    const api = await createCloudflareApi(props);
    const indexName = props.name || id;

    if (this.phase === "delete") {
      logger.log("Deleting Vectorize index:", indexName);
      if (props.delete !== false) {
        // Delete Vectorize index
        await deleteIndex(api, indexName);
      }

      // Return void (a deleted index has no content)
      return this.destroy();
    }
    let indexData: CloudflareVectorizeResponse;

    if (this.phase === "create") {
      logger.log("Creating Vectorize index:", indexName);
      try {
        indexData = await createIndex(api, indexName, {
          ...props,
          name: indexName,
        });
      } catch (error) {
        // Check if this is a "index already exists" error and adopt is enabled
        if (
          props.adopt &&
          error instanceof CloudflareApiError &&
          error.message.includes("vectorize.index.duplicate_name")
        ) {
          logger.log(`Index ${indexName} already exists, adopting it`);
          // Find the existing index
          indexData = await getIndex(api, indexName);
        } else {
          // Re-throw the error if adopt is false or it's not a "index already exists" error
          throw error;
        }
      }
    } else {
      if (props.delete !== this.props.delete) {
        // Only allow changing the delete property
        if (!this.quiet) {
          logger.warn(
            `Attempted to update Vectorize index ${indexName} but only the delete property can be changed.`,
          );
        }
        return this({
          ...this.output,
          delete: props.delete,
        });
      }

      // Check if this is a no-op update
      if (
        props.name === this.props.name &&
        props.description === this.props.description &&
        props.dimensions === this.props.dimensions &&
        props.metric === this.props.metric
      ) {
        if (!this.quiet) {
          logger.warn(
            `Attempted to update Vectorize index ${indexName} but it was a no-op.`,
          );
        }
        return this(this.output);
      }

      // Update operation is not supported by Vectorize API
      throw new Error(
        "Updating Vectorize indexes is not supported by the Cloudflare API. " +
          "To change an index, delete it and create a new one with the desired configuration.",
      );
    }

    return this({
      type: "vectorize",
      id: indexName,
      name: indexName,
      description: props.description,
      dimensions: indexData.result.config.dimensions,
      metric: indexData.result.config.metric as
        | "cosine"
        | "euclidean"
        | "dot_product",
      accountId: api.accountId,
      createdAt: indexData.result.created_on
        ? new Date(indexData.result.created_on).getTime()
        : undefined,
    });
  },
);

interface CloudflareVectorizeResponse {
  result: {
    name: string;
    description?: string;
    created_on?: string;
    config: {
      dimensions: number;
      metric: string;
    };
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Create a new Vectorize index
 */
export async function createIndex(
  api: CloudflareApi,
  indexName: string,
  props: VectorizeIndexProps,
): Promise<CloudflareVectorizeResponse> {
  // Create new Vectorize index
  const createPayload: any = {
    name: indexName,
    config: {
      dimensions: props.dimensions,
      metric: props.metric,
    },
  };

  if (props.description) {
    createPayload.description = props.description;
  }

  const createResponse = await api.post(
    `/accounts/${api.accountId}/vectorize/v2/indexes`,
    createPayload,
  );

  if (!createResponse.ok) {
    return await handleApiError(
      createResponse,
      "creating",
      "Vectorize index",
      indexName,
    );
  }

  return (await createResponse.json()) as CloudflareVectorizeResponse;
}

/**
 * Get a Vectorize index
 */
export async function getIndex(
  api: CloudflareApi,
  indexName: string,
): Promise<CloudflareVectorizeResponse> {
  const response = await api.get(
    `/accounts/${api.accountId}/vectorize/v2/indexes/${indexName}`,
  );

  if (!response.ok) {
    return await handleApiError(
      response,
      "getting",
      "Vectorize index",
      indexName,
    );
  }

  return (await response.json()) as CloudflareVectorizeResponse;
}

/**
 * Delete a Vectorize index
 */
export async function deleteIndex(
  api: CloudflareApi,
  indexName: string,
): Promise<void> {
  // Delete Vectorize index
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/vectorize/v2/indexes/${indexName}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));
    throw new CloudflareApiError(
      `Error deleting Vectorize index '${indexName}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse,
    );
  }
}

/**
 * List all Vectorize indexes in an account
 */
export async function listIndexes(
  api: CloudflareApi,
): Promise<{ name: string; description?: string }[]> {
  const response = await api.get(
    `/accounts/${api.accountId}/vectorize/v2/indexes`,
  );

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list indexes: ${response.statusText}`,
      response,
    );
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    result?: Array<{
      name: string;
      description?: string;
    }>;
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list indexes: ${errorMessage}`);
  }

  // Transform API response
  return (data.result || []).map((index) => ({
    name: index.name,
    description: index.description,
  }));
}

/**
 * Update a Vectorize index
 *
 * Note: The Cloudflare Vectorize API does not support updating indexes.
 * This function will always throw an error.
 */
export async function updateIndex(
  _api: CloudflareApi,
  _indexName: string,
  _props: VectorizeIndexProps,
): Promise<CloudflareVectorizeResponse> {
  throw new Error(
    "Updating Vectorize indexes is not supported by the Cloudflare API. To change an index, delete it and create a new one.",
  );
}
