import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { CloudflareApiError, handleApiError } from "./api-error.js";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.js";
import type { VectorizeIndexResource } from "./vectorize-index.js";

/**
 * Properties for creating or deleting a Vectorize Metadata Index
 */
export interface VectorizeMetadataIndexProps extends CloudflareApiOptions {
  /**
   * Parent Vectorize Index
   */
  index: VectorizeIndexResource;

  /**
   * Name of the property in the metadata to create an index for
   */
  propertyName: string;

  /**
   * Type of the metadata index
   */
  indexType: "string" | "number" | "boolean";
}

/**
 * Output returned after Vectorize Metadata Index creation/deletion
 */
export interface VectorizeMetadataIndex
  extends Resource<"cloudflare::VectorizeMetadataIndex">,
    VectorizeMetadataIndexProps {
  /**
   * ID of this metadata index (derived from propertyName)
   */
  id: string;

  /**
   * Mutation ID returned by the API after creation
   */
  mutationId?: string;
}

/**
 * Creates and manages Cloudflare Vectorize Metadata Indexes.
 *
 * Vectorize Metadata Indexes enable filtering based on metadata properties when querying vectors.
 * Each Vectorize Index can have up to 10 metadata indexes.
 *
 * @example
 * // First create a Vectorize Index
 * const vectorIndex = await VectorizeIndex("documents", {
 *   name: "documents",
 *   config: {
 *     dimensions: 768,
 *     metric: "cosine"
 *   }
 * });
 *
 * // Then create a metadata index for the "category" property
 * const categoryIndex = await VectorizeMetadataIndex("category-index", {
 *   index: vectorIndex,
 *   propertyName: "category",
 *   indexType: "string"
 * });
 *
 * @example
 * // Create a metadata index for a numeric property
 * const yearIndex = await VectorizeMetadataIndex("year-index", {
 *   index: vectorIndex,
 *   propertyName: "year",
 *   indexType: "number"
 * });
 *
 * @see https://developers.cloudflare.com/vectorize/
 */
export const VectorizeMetadataIndex = Resource(
  "cloudflare::VectorizeMetadataIndex",
  async function (
    this: Context<VectorizeMetadataIndex>,
    _id: string,
    props: VectorizeMetadataIndexProps,
  ): Promise<VectorizeMetadataIndex> {
    const api = await createCloudflareApi(props);
    const indexName = props.index.name;
    const propertyName = props.propertyName;

    if (this.phase === "delete") {
      // Delete metadata index
      try {
        await deleteMetadataIndex(api, indexName, propertyName);
      } catch (error) {
        if (
          error instanceof CloudflareApiError &&
          error.status === 400 &&
          error.message.includes("does not exist")
        ) {
          // Index doesn't exist, which is what we want
        } else {
          throw error;
        }
      }
      return this.destroy();
    }
    if (this.phase === "update") {
      // Update operation is not supported
      throw new Error(
        "Updating Vectorize metadata indexes is not supported by the Cloudflare API. " +
          "To change a metadata index, delete it and create a new one with the desired configuration.",
      );
    }
    const indexData = await createMetadataIndex(api, indexName, props);

    return this({
      id: propertyName, // Use propertyName as ID
      index: props.index,
      propertyName: props.propertyName,
      indexType: props.indexType,
      accountId: api.accountId,
      mutationId: indexData.result.mutationId,
    });
  },
);

interface CloudflareMetadataIndexResponse {
  result: {
    mutationId: string;
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

interface CloudflareMetadataIndexListResponse {
  result: {
    metadataIndexes: Array<{
      propertyName: string;
      indexType: "string" | "number" | "boolean";
    }>;
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Create a new Vectorize metadata index
 */
export async function createMetadataIndex(
  api: CloudflareApi,
  indexName: string,
  props: VectorizeMetadataIndexProps,
): Promise<CloudflareMetadataIndexResponse> {
  // Create new metadata index
  const createPayload = {
    propertyName: props.propertyName,
    indexType: props.indexType,
  };

  const createResponse = await api.post(
    `/accounts/${api.accountId}/vectorize/v2/indexes/${indexName}/metadata_index/create`,
    createPayload,
  );

  if (!createResponse.ok) {
    return await handleApiError(
      createResponse,
      "creating",
      "Vectorize metadata index",
      props.propertyName,
    );
  }

  return (await createResponse.json()) as CloudflareMetadataIndexResponse;
}

/**
 * Delete a Vectorize metadata index
 */
export async function deleteMetadataIndex(
  api: CloudflareApi,
  indexName: string,
  propertyName: string,
): Promise<void> {
  const deleteResponse = await api.post(
    `/accounts/${api.accountId}/vectorize/v2/indexes/${indexName}/metadata_index/delete`,
    {
      propertyName,
    },
  );

  if (!deleteResponse.ok) {
    await handleApiError(
      deleteResponse,
      "deleting",
      "Vectorize metadata index",
      propertyName,
    );
  }
}

/**
 * List all metadata indexes for a Vectorize index
 */
export async function listMetadataIndexes(
  api: CloudflareApi,
  indexName: string,
): Promise<
  { propertyName: string; indexType: "string" | "number" | "boolean" }[]
> {
  const response = await api.get(
    `/accounts/${api.accountId}/vectorize/v2/indexes/${indexName}/metadata_index/list`,
  );

  if (response.status === 410) {
    // Gone
    return [];
  }

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list metadata indexes: ${response.statusText}`,
      response,
    );
  }

  const data = (await response.json()) as CloudflareMetadataIndexListResponse;

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list metadata indexes: ${errorMessage}`);
  }

  return data.result.metadataIndexes;
}
