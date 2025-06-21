import { AwsClient } from "aws4fetch";
import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { bind } from "../runtime/bind.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { CloudflareApiError, handleApiError } from "./api-error.ts";
import { type CloudflareApi, createCloudflareApi } from "./api.ts";
import type { Bound } from "./bound.ts";

/**
 * Properties for creating or updating an R2 Bucket
 */
export interface BucketProps {
  /**
   * Name of the bucket
   * Names can only contain lowercase letters (a-z), numbers (0-9), and hyphens (-)
   * Cannot begin or end with a hyphen
   *
   * @default - the id of the resource
   */
  name?: string;

  /**
   * Optional location hint for the bucket
   * Indicates the primary geographical location data will be accessed from
   */
  locationHint?: string;

  /**
   * Optional jurisdiction for the bucket
   * Determines the regulatory jurisdiction the bucket data falls under
   */
  jurisdiction?: "default" | "eu" | "fedramp";

  /**
   * Whether to allow public access through the r2.dev subdomain
   * Only for development purposes - use custom domains for production
   */
  allowPublicAccess?: boolean;

  /**
   * Whether to delete the bucket.
   * If set to false, the bucket will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;

  /**
   * Whether to empty the bucket and delete all objects during resource deletion
   * @default false
   */
  empty?: boolean;

  /**
   * API Token to use for the bucket
   */
  apiToken?: Secret;

  /**
   * API Key to use for the bucket
   */
  apiKey?: Secret;

  /**
   * Email to use for the bucket
   */
  email?: string;

  /**
   * Account ID to use for the bucket
   */
  accountId?: string;

  /**
   * Access Key to use for the bucket
   */
  accessKey?: Secret;

  /**
   * Secret Access Key to use for the bucket
   */
  secretAccessKey?: Secret;

  /**
   * Whether to adopt an existing bucket
   */
  adopt?: boolean;

  /**
   * Whether to emulate the bucket locally when Alchemy is running in watch mode.
   */
  dev?: {
    /**
     * Whether to run the bucket remotely instead of locally
     * @default false
     */
    remote?: boolean;
  };
}

/**
 * Output returned after R2 Bucket creation/update
 */
export type R2BucketResource = Resource<"cloudflare::R2Bucket"> &
  Omit<BucketProps, "delete"> & {
    /**
     * Resource type identifier
     */
    type: "r2_bucket";

    /**
     * The name of the bucket
     */
    name: string;

    /**
     * Location of the bucket
     */
    location: string;

    /**
     * Time at which the bucket was created
     */
    creationDate: Date;
  };

export function isBucket(resource: Resource): resource is R2BucketResource {
  return resource[ResourceKind] === "cloudflare::R2Bucket";
}

export type R2Bucket = R2BucketResource & Bound<R2BucketResource>;

/**
 * Creates and manages Cloudflare R2 Buckets for object storage.
 *
 * R2 Buckets provide S3-compatible object storage with automatic data replication
 * across multiple regions for high availability and durability.
 *
 * @example
 * // Create a basic R2 bucket with default settings
 * const basicBucket = await R2Bucket("my-app-data", {
 *   name: "my-app-data"
 * });
 *
 * @example
 * // Create a bucket with location hint for optimal performance
 * const euBucket = await R2Bucket("eu-user-data", {
 *   name: "eu-user-data",
 *   locationHint: "eu",
 *   jurisdiction: "eu"
 * });
 *
 * @example
 * // Create a development bucket with public access enabled
 * const publicBucket = await R2Bucket("public-assets", {
 *   name: "public-assets",
 *   allowPublicAccess: true
 * });
 *
 * @example
 * // Create a FedRAMP compliant bucket for government workloads
 * const fedRampBucket = await R2Bucket("gov-data", {
 *   name: "gov-data",
 *   jurisdiction: "fedramp"
 * });
 *
 * @example
 * // Create a bucket that will be automatically emptied when deleted
 * // This will delete all objects in the bucket before deleting the bucket itself
 * const temporaryBucket = await R2Bucket("temp-storage", {
 *   name: "temp-storage",
 *   empty: true  // All objects will be deleted when this resource is destroyed
 * });
 *
 * @see https://developers.cloudflare.com/r2/buckets/
 */
export async function R2Bucket(
  name: string,
  props: BucketProps = {},
): Promise<R2Bucket> {
  const bucket = await R2BucketResource(name, props);
  const binding = await bind(bucket);
  return {
    ...bucket,
    createMultipartUpload: binding.createMultipartUpload,
    delete: binding.delete,
    get: binding.get,
    list: binding.list,
    put: binding.put,
    head: binding.head,
    resumeMultipartUpload: binding.resumeMultipartUpload,
  };
}

const R2BucketResource = Resource(
  "cloudflare::R2Bucket",
  async function (
    this: Context<R2BucketResource>,
    _id: string,
    props: BucketProps = {},
  ): Promise<R2BucketResource> {
    const api = await createCloudflareApi(props);
    const bucketName = props.name || this.id;

    if (this.phase === "delete") {
      if (props.delete !== false) {
        if (props.empty) {
          logger.log("Emptying R2 bucket:", bucketName);
          const r2Client = await createR2Client({
            ...props,
            accountId: api.accountId,
            accessKeyId: props.accessKey ?? this.output.accessKey,
            secretAccessKey:
              props.secretAccessKey ?? this.output.secretAccessKey,
          });
          // Empty the bucket first by deleting all objects
          await emptyBucket(r2Client, bucketName, props.jurisdiction);
        }

        await deleteBucket(api, bucketName, props);
      }

      // Return void (a deleted bucket has no content)
      return this.destroy();
    }
    if (this.phase === "create") {
      try {
        await createBucket(api, bucketName, props);
      } catch (err) {
        if (err instanceof CloudflareApiError && err.status === 409) {
          if (!props.adopt) {
            throw err;
          }
        } else {
          throw err;
        }
      }
    }

    if (this.phase === "update" && bucketName !== this.output.name) {
      throw new Error(
        `Cannot update R2Bucket name after creation. Bucket name is immutable. Before: ${this.output.name}, After: ${bucketName}`,
      );
    }

    await updatePublicAccess(
      api,
      bucketName,
      props.allowPublicAccess === true,
      props.jurisdiction,
    );

    return this({
      name: bucketName,
      location: props.locationHint || "default",
      creationDate: new Date(),
      jurisdiction: props.jurisdiction || "default",
      type: "r2_bucket",
      accountId: api.accountId,
      dev: props.dev,
    });
  },
);

/**
 * Configuration for R2 client to connect to Cloudflare R2
 */
export interface R2ClientConfig {
  accountId: string;
  accessKeyId?: Secret;
  secretAccessKey?: Secret;
  jurisdiction?: string;
}

type R2Client = AwsClient & { accountId: string };

/**
 * Creates an aws4fetch client configured for Cloudflare R2
 *
 * @see https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
 */
export function createR2Client(config?: R2ClientConfig): Promise<R2Client> {
  const accountId = config?.accountId ?? process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId =
    config?.accessKeyId?.unencrypted || process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey =
    config?.secretAccessKey?.unencrypted || process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID environment variable is required");
  }

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY environment variables are required",
    );
  }

  // Create aws4fetch client with Cloudflare R2 endpoint
  const client: any = new AwsClient({
    accessKeyId,
    secretAccessKey,
    service: "s3",
    region: "auto",
  });
  client.accountId = accountId;
  return client;
}

interface CloudflareBucketResponse {
  /**
   * The bucket information returned from the Cloudflare REST API
   * @see https://developers.cloudflare.com/api/node/resources/r2/subresources/buckets/models/bucket/#(schema)
   */
  result: {
    creation_date: string;
    location?: "apac" | "eeur" | "enam" | "weur" | "wnam" | "oc";
    name: string;
    storage_class?: "Standard" | "InfrequentAccess";
  };
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Adds jurisdiction header to the headers object if specified in props
 *
 * @param headers Headers object to modify
 * @param props Props or jurisdiction string
 * @returns Modified headers object
 */
export function withJurisdiction(
  headers: Record<string, string>,
  props: BucketProps | { jurisdiction?: string } | string | undefined,
): Record<string, string> {
  // Clone the headers object to avoid modifying the original
  const result = { ...headers };

  let jurisdiction: string | undefined;
  if (typeof props === "string") {
    jurisdiction = props;
  } else if (props && "jurisdiction" in props) {
    jurisdiction = props.jurisdiction;
  }

  if (jurisdiction && jurisdiction !== "default") {
    result["cf-r2-jurisdiction"] = jurisdiction;
  }

  return result;
}

/**
 * Get a bucket
 */
export async function getBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<CloudflareBucketResponse> {
  const headers = withJurisdiction({}, props);
  const getResponse = await api.get(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}`,
    { headers },
  );

  if (!getResponse.ok) {
    return await handleApiError(getResponse, "get", "R2 bucket", bucketName);
  }

  if (getResponse.status === 200) {
    return (await getResponse.json()) as CloudflareBucketResponse;
  }

  const errorData: any = await getResponse.json().catch(() => ({
    errors: [{ message: getResponse.statusText }],
  }));

  throw new CloudflareApiError(
    `Error getting R2 bucket '${bucketName}': ${errorData.errors?.[0]?.message || getResponse.statusText}`,
    getResponse,
  );
}

/**
 * Create a new bucket
 */
export async function createBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<CloudflareBucketResponse> {
  // Create new R2 bucket
  const createPayload: any = {
    name: bucketName,
  };

  if (props.locationHint) {
    createPayload.location_hint = props.locationHint;
  }

  const headers = withJurisdiction({}, props);

  const createResponse = await api.post(
    `/accounts/${api.accountId}/r2/buckets`,
    createPayload,
    { headers },
  );

  if (!createResponse.ok) {
    return await handleApiError(
      createResponse,
      "creating",
      "R2 bucket",
      bucketName,
    );
  }

  return (await createResponse.json()) as CloudflareBucketResponse;
}

/**
 * Delete a bucket
 */
export async function deleteBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
): Promise<void> {
  // Delete R2 bucket
  const headers = withJurisdiction({}, props);

  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}`,
    { headers },
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    const errorData: any = await deleteResponse.json().catch(() => ({
      errors: [{ message: deleteResponse.statusText }],
    }));
    throw new CloudflareApiError(
      `Error deleting R2 bucket '${bucketName}': ${errorData.errors?.[0]?.message || deleteResponse.statusText}`,
      deleteResponse,
    );
  }
}

/**
 * List objects in an R2 bucket
 *
 * @param r2 R2Client instance
 * @param bucketName Name of the bucket
 * @param continuationToken Optional token for pagination
 * @param jurisdiction Optional jurisdiction for the bucket
 * @returns Object containing the list of objects and the next continuation token
 */
export async function listObjects(
  r2: R2Client,
  bucketName: string,
  continuationToken?: string,
  jurisdiction?: string,
): Promise<{ objects: { Key: string }[]; continuationToken?: string }> {
  // List objects in the bucket
  const url = new URL(
    `https://${r2.accountId}.r2.cloudflarestorage.com/${bucketName}`,
  );
  if (continuationToken) {
    url.searchParams.set("continuation-token", continuationToken);
  }
  url.searchParams.set("list-type", "2");

  const headers = withJurisdiction({}, jurisdiction);

  const listResponse = await r2.fetch(url.toString(), { headers });
  if (!listResponse.ok) {
    throw new CloudflareApiError(
      `Failed to list objects: ${listResponse.statusText}`,
      listResponse,
    );
  }

  const responseText = await listResponse.text();

  // Extract objects from XML response using regex
  const keyRegex = /<Key>([^<]+)<\/Key>/g;
  const objects: { Key: string }[] = [];
  let match;
  while ((match = keyRegex.exec(responseText)) !== null) {
    objects.push({ Key: match[1] });
  }

  // Get continuation token if present using regex
  const tokenMatch =
    /<NextContinuationToken>([^<]+)<\/NextContinuationToken>/.exec(
      responseText,
    );
  const nextContinuationToken = tokenMatch ? tokenMatch[1] : undefined;

  return { objects, continuationToken: nextContinuationToken };
}

/**
 * Helper function to empty a bucket by deleting all objects
 */
export async function emptyBucket(
  r2: R2Client,
  bucketName: string,
  jurisdiction?: string,
): Promise<void> {
  let continuationToken: string | undefined;
  let totalDeleted = 0;

  try {
    do {
      logger.log(`Listing objects in bucket ${bucketName}`);
      // List objects in the bucket
      const { objects, continuationToken: nextToken } = await listObjects(
        r2,
        bucketName,
        continuationToken,
        jurisdiction,
      );

      continuationToken = nextToken;

      logger.log(`Found ${objects.length} objects in bucket ${bucketName}`);

      // Delete objects in batches
      if (objects.length > 0) {
        // Process delete in batches of 1000 (S3 limit)
        for (let i = 0; i < objects.length; i += 1000) {
          const batch = objects.slice(i, i + 1000);

          // Create DeleteObjects request XML
          const deleteXml = `
            <Delete>
              ${batch.map((obj) => `<Object><Key>${obj.Key}</Key></Object>`).join("")}
            </Delete>
          `;

          const deleteUrl = new URL(
            `https://${r2.accountId}.r2.cloudflarestorage.com/${bucketName}?delete`,
          );

          logger.log(
            `Deleting ${batch.length} objects from bucket ${bucketName}`,
          );

          const headers = withJurisdiction(
            { "Content-Type": "application/xml" },
            jurisdiction,
          );

          const deleteResponse = await r2.fetch(deleteUrl.toString(), {
            method: "POST",
            body: deleteXml,
            headers,
          });

          if (!deleteResponse.ok) {
            throw new CloudflareApiError(
              `Failed to delete objects: ${deleteResponse.statusText}`,
              deleteResponse,
            );
          }

          totalDeleted += batch.length;
        }
      }
    } while (continuationToken);

    logger.log(
      `Successfully emptied bucket ${bucketName}, deleted ${totalDeleted} objects total`,
    );
  } catch (error) {
    if (error instanceof CloudflareApiError && error.status === 404) {
      // the bucket was not found
      return;
    }
    logger.error(`Failed to empty bucket ${bucketName}:`, error);
    throw error;
  }
}

/**
 * Update public access setting for a bucket
 *
 * This operation is not available through the S3 API for R2,
 * so we still use the Cloudflare API directly.
 */
export async function updatePublicAccess(
  api: CloudflareApi,
  bucketName: string,
  allowPublicAccess: boolean,
  jurisdiction?: string,
): Promise<void> {
  const headers = withJurisdiction({}, jurisdiction);

  const response = await api.put(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}/domains/managed`,
    {
      enabled: allowPublicAccess,
    },
    { headers },
  );

  if (!response.ok) {
    await handleApiError(
      response,
      "updating public access for",
      "R2 bucket",
      bucketName,
    );
  }
}

/**
 * Set CORS configuration for a bucket using aws4fetch
 */
export async function setCorsConfiguration(
  r2: R2Client,
  bucketName: string,
  allowedOrigins: string[] = ["*"],
  allowedMethods: string[] = ["GET", "HEAD", "PUT", "POST", "DELETE"],
  allowedHeaders: string[] = ["*"],
  maxAgeSeconds = 3600,
  jurisdiction?: string,
): Promise<void> {
  try {
    // Construct CORS XML configuration
    const corsXml = `
      <CORSConfiguration>
        <CORSRule>
          ${allowedOrigins.map((origin) => `<AllowedOrigin>${origin}</AllowedOrigin>`).join("")}
          ${allowedMethods.map((method) => `<AllowedMethod>${method}</AllowedMethod>`).join("")}
          ${allowedHeaders.map((header) => `<AllowedHeader>${header}</AllowedHeader>`).join("")}
          <ExposeHeader>ETag</ExposeHeader>
          <MaxAgeSeconds>${maxAgeSeconds}</MaxAgeSeconds>
        </CORSRule>
      </CORSConfiguration>
    `;

    const url = new URL(
      `https://${r2.accountId}.r2.cloudflarestorage.com/${bucketName}?cors`,
    );

    const headers = withJurisdiction(
      { "Content-Type": "application/xml" },
      jurisdiction,
    );

    const response = await r2.fetch(url.toString(), {
      method: "PUT",
      body: corsXml,
      headers,
    });

    if (!response.ok) {
      throw new CloudflareApiError(
        `Failed to set CORS configuration: ${response.statusText}`,
        response,
      );
    }

    logger.log(`Successfully set CORS configuration for bucket ${bucketName}`);
  } catch (error) {
    logger.error(
      `Failed to set CORS configuration for bucket ${bucketName}:`,
      error,
    );
    throw error;
  }
}

/**
 * Information about an R2 bucket returned by list operations
 */
export interface R2BucketInfo {
  /**
   * Name of the bucket
   */
  Name: string;

  /**
   * Creation date of the bucket
   */
  CreationDate: Date;
}

/**
 * List all R2 buckets in an account
 *
 * @param api CloudflareApi instance
 * @param options Optional listing options
 * @returns Array of bucket information
 */
export async function listBuckets(
  api: CloudflareApi,
  options: {
    nameContains?: string;
    perPage?: number;
    cursor?: string;
    direction?: "asc" | "desc";
    jurisdiction?: string;
  } = {},
): Promise<R2BucketInfo[]> {
  // Build query parameters
  const params = new URLSearchParams();

  if (options.nameContains) {
    params.append("name_contains", options.nameContains);
  }

  if (options.perPage) {
    params.append("per_page", options.perPage.toString());
  }

  if (options.cursor) {
    params.append("cursor", options.cursor);
  }

  if (options.direction) {
    params.append("direction", options.direction);
  }

  // Build URL with query parameters
  const path = `/accounts/${api.accountId}/r2/buckets${params.toString() ? `?${params.toString()}` : ""}`;

  // Set jurisdiction header if provided
  const headers = withJurisdiction({}, options.jurisdiction);

  // Make the API request
  const response = await api.get(path, { headers });

  if (!response.ok) {
    throw new CloudflareApiError(
      `Failed to list buckets: ${response.statusText}`,
      response,
    );
  }

  const data = (await response.json()) as {
    success: boolean;
    errors?: Array<{ code: number; message: string }>;
    result?: {
      buckets: Array<{
        name: string;
        creation_date: string;
        location?: string;
      }>;
    };
  };

  if (!data.success) {
    const errorMessage = data.errors?.[0]?.message || "Unknown error";
    throw new Error(`Failed to list buckets: ${errorMessage}`);
  }

  // Transform API response to R2BucketInfo objects
  return (data.result?.buckets || []).map((bucket) => ({
    Name: bucket.name,
    CreationDate: new Date(bucket.creation_date),
  }));
}
