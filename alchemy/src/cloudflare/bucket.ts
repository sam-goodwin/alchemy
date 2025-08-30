import { isDeepStrictEqual } from "node:util";
import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { Scope } from "../scope.ts";
import { withExponentialBackoff } from "../util/retry.ts";
import { CloudflareApiError } from "./api-error.ts";
import {
  extractCloudflareResult,
  type CloudflareApiErrorPayload,
} from "./api-response.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import { deleteMiniflareBinding } from "./miniflare/delete.ts";

/**
 * Properties for creating or updating an R2 Bucket
 */
export interface BucketProps extends CloudflareApiOptions {
  /**
   * Name of the bucket
   * Names can only contain lowercase letters (a-z), numbers (0-9), and hyphens (-)
   * Cannot begin or end with a hyphen
   *
   * @default ${app.name}-${app.stage}-${id}
   */
  name?: string;

  /**
   * Optional location hint for the bucket
   * Indicates the primary geographical location data will be accessed from
   */
  locationHint?: string;

  /**
   * Optional storage class for the bucket
   * Indicates the storage class for the bucket
   */
  storageClass?: "Standard" | "InfrequentAccess";

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
   * Whether to adopt an existing bucket
   */
  adopt?: boolean;

  /**
   * CORS rules for the bucket
   */
  cors?: R2BucketCORSRule[];

  /**
   * Lifecycle rules for the bucket
   */
  lifecycle?: R2BucketLifecycleRule[];

  /**
   * Lock rules for the bucket
   */
  lock?: R2BucketLockRule[];

  /**
   * Whether to emulate the bucket locally when Alchemy is running in watch mode.
   */
  dev?: {
    /**
     * Whether to run the bucket remotely instead of locally
     * @default false
     */
    remote?: boolean;

    /**
     * Set when `Scope.local` is true to force update to the bucket even if it was already deployed live.
     * @internal
     */
    force?: boolean;
  };
}

interface R2BucketLifecycleRule {
  /**
   * Unique identifier for this rule.
   */
  id?: string;

  /**
   * Conditions that apply to all transitions of this rule.
   */
  conditions?: {
    /**
     * Transitions will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.
     */
    prefix: string;
  };

  /**
   * Whether or not this rule is in effect.
   * @default true
   */
  enabled?: boolean;

  /**
   * Transition to abort ongoing multipart uploads.
   */
  abortMultipartUploadsTransition?: {
    /**
     * Condition for lifecycle transitions to apply after an object reaches an age in   seconds.
     */
    condition: {
      /**
       
      /**
       * Maximum age of the object in seconds.
       */
      maxAge: number;

      /**
       * Type of condition.
       */
      type: "Age";
    };
  };

  /**
   * Transition to delete objects.
   */
  deleteObjectsTransition?: {
    /**
     * Condition for lifecycle transitions to apply after an object reaches an age in seconds.
     */
    condition: { maxAge: number; type: "Age" } | { date: string; type: "Date" };
  };

  /**
   * Transition to change the storage class of objects.
   */
  storageClassTransitions?: {
    /**
     * Condition for lifecycle transitions to apply after an object reaches an age in seconds.
     */
    condition: { maxAge: number; type: "Age" } | { date: string; type: "Date" };

    /**
     * Storage class for the bucket.
     */
    storageClass: "InfrequentAccess";
  }[];
}

interface R2BucketLockRule {
  /**
   * Unique identifier for this rule.
   */
  id?: string;

  /**
   * Condition to apply a lock rule to an object for how long in seconds.
   */
  condition:
    | { maxAgeSeconds: number; type: "Age" }
    | { date: string; type: "Date" }
    | { type: "Indefinite" };

  /**
   * Whether or not this rule is in effect.
   * @default true
   */
  enabled?: boolean;

  /**
   * Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.
   */
  prefix?: string;
}

interface R2BucketCORSRule {
  /**
   * Identifier for this rule.
   */
  id?: string;

  /**
   * Object specifying allowed origins, methods and headers for this CORS rule.
   */
  allowed: {
    /**
     * Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.
     */
    methods: ("GET" | "PUT" | "POST" | "DELETE" | "HEAD")[];

    /**
     * Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.
     */
    origins: string[];

    /**
     * Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.
     */
    headers?: string[];
  };

  /**
   * Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.
   */
  exposeHeaders?: string[];

  /**
   * Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.
   */
  maxAgeSeconds?: number;
}

/**
 * Output returned after R2 Bucket creation/update
 */
export type R2Bucket = Resource<"cloudflare::R2Bucket"> &
  Omit<BucketProps, "delete" | "dev"> & {
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

    /**
     * The `r2.dev` subdomain for the bucket, if `allowPublicAccess` is true
     */
    domain: string | undefined;

    /**
     * Development mode properties
     * @internal
     */
    dev: {
      /**
       * The ID of the bucket in development mode
       */
      id: string;

      /**
       * Whether the bucket is running remotely
       */
      remote: boolean;
    };
  };

export function isBucket(resource: Resource): resource is R2Bucket {
  return resource[ResourceKind] === "cloudflare::R2Bucket";
}

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
  id: string,
  props: BucketProps = {},
): Promise<R2Bucket> {
  return await _R2Bucket(id, {
    ...props,
    dev: {
      ...(props.dev ?? {}),
      force: Scope.current.local,
    },
  });
}

const _R2Bucket = Resource(
  "cloudflare::R2Bucket",
  async function (
    this: Context<R2Bucket>,
    id: string,
    props: BucketProps = {},
  ): Promise<R2Bucket> {
    const bucketName =
      props.name ?? this.output?.name ?? this.scope.createPhysicalName(id);

    if (this.phase === "update" && this.output?.name !== bucketName) {
      this.replace();
    }

    const allowPublicAccess = props.allowPublicAccess === true;
    const dev = {
      id: this.output?.dev?.id ?? bucketName,
      remote: props.dev?.remote ?? false,
    };
    const adopt = props.adopt ?? this.scope.adopt;

    if (this.scope.local && !props.dev?.remote) {
      return this({
        name: this.output?.name ?? "",
        location: this.output?.location ?? "",
        creationDate: this.output?.creationDate ?? new Date(),
        jurisdiction: this.output?.jurisdiction ?? "default",
        allowPublicAccess,
        domain: this.output?.domain,
        type: "r2_bucket",
        accountId: this.output?.accountId ?? "",
        cors: props.cors,
        dev,
      });
    }

    const api = await createCloudflareApi(props);

    if (this.phase === "delete") {
      if (props.delete !== false) {
        if (this.output.dev?.id) {
          await deleteMiniflareBinding("r2", this.output.dev.id);
        }
        if (props.empty) {
          await emptyBucket(api, bucketName, props);
        }
        await deleteBucket(api, bucketName, props);
      }
      return this.destroy();
    }

    if (this.phase === "create" || !this.output?.name) {
      const bucket = await createBucket(api, bucketName, props).catch(
        async (err) => {
          if (
            err instanceof CloudflareApiError &&
            err.status === 409 &&
            adopt
          ) {
            return await getBucket(api, bucketName, props);
          }
          throw err;
        },
      );
      const domain = await putManagedDomain(
        api,
        bucketName,
        allowPublicAccess,
        props.jurisdiction,
      );
      if (props.cors?.length) {
        await putBucketCORS(api, bucketName, props);
      }
      if (props.lifecycle?.length) {
        await putBucketLifecycleRules(api, bucketName, props);
      }
      if (props.lock?.length) {
        await putBucketLockRules(api, bucketName, props);
      }
      return this({
        name: bucketName,
        location: bucket.location,
        creationDate: new Date(bucket.creation_date),
        jurisdiction: bucket.jurisdiction,
        allowPublicAccess,
        domain,
        type: "r2_bucket",
        accountId: api.accountId,
        lifecycle: props.lifecycle,
        lock: props.lock,
        cors: props.cors,
        dev,
      });
    } else {
      if (bucketName !== this.output.name) {
        throw new Error(
          `Cannot update R2Bucket name after creation. Bucket name is immutable. Before: ${this.output.name}, After: ${bucketName}`,
        );
      }
      let domain = this.output.domain;
      if (!!domain !== allowPublicAccess) {
        domain = await putManagedDomain(
          api,
          bucketName,
          allowPublicAccess,
          props.jurisdiction,
        );
      }
      if (!isDeepStrictEqual(this.output.cors ?? [], props.cors ?? [])) {
        await putBucketCORS(api, bucketName, props);
      }
      if (
        !isDeepStrictEqual(this.output.lifecycle ?? [], props.lifecycle ?? [])
      ) {
        await putBucketLifecycleRules(api, bucketName, props);
      }
      if (!isDeepStrictEqual(this.output.lock ?? [], props.lock ?? [])) {
        await putBucketLockRules(api, bucketName, props);
      }
      return this({
        ...this.output,
        allowPublicAccess,
        dev,
        cors: props.cors,
        lifecycle: props.lifecycle,
        lock: props.lock,
        domain,
      });
    }
  },
);

/**
 * The bucket information returned from the Cloudflare REST API
 * @see https://developers.cloudflare.com/api/node/resources/r2/subresources/buckets/models/bucket/#(schema)
 */
interface R2BucketResult {
  creation_date: string;
  location: "apac" | "eeur" | "enam" | "weur" | "wnam" | "oc";
  name: string;
  storage_class: "Standard" | "InfrequentAccess";
  jurisdiction: "default" | "eu" | "fedramp";
}

/**
 * Adds jurisdiction header to the headers object if specified in props
 *
 * @param headers Headers object to modify
 * @param props Props or jurisdiction string
 * @returns Modified headers object
 */
export function withJurisdiction(
  props: { jurisdiction?: string },
  headers: Record<string, string> = {},
): Record<string, string> {
  if (props.jurisdiction && props.jurisdiction !== "default") {
    headers["cf-r2-jurisdiction"] = props.jurisdiction;
  }

  return headers;
}

/**
 * Get a bucket
 */
export async function getBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<R2BucketResult> {
  return await extractCloudflareResult<R2BucketResult>(
    `get R2 bucket "${bucketName}"`,
    api.get(`/accounts/${api.accountId}/r2/buckets/${bucketName}`, {
      headers: withJurisdiction(props),
    }),
  );
}

/**
 * Create a new bucket
 */
export async function createBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<R2BucketResult> {
  return await extractCloudflareResult<R2BucketResult>(
    `create R2 bucket "${bucketName}"`,
    api.post(
      `/accounts/${api.accountId}/r2/buckets`,
      {
        name: bucketName,
        locationHint: props.locationHint,
        storageClass: props.storageClass,
      },
      {
        headers: withJurisdiction(props),
      },
    ),
  );
}

/**
 * Delete a bucket
 */
export async function deleteBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
) {
  try {
    await extractCloudflareResult(
      `delete R2 bucket "${bucketName}"`,
      api.delete(`/accounts/${api.accountId}/r2/buckets/${bucketName}`, {
        headers: withJurisdiction(props),
      }),
    );
  } catch (error) {
    if (error instanceof CloudflareApiError && error.status === 404) {
      return;
    }
    throw error;
  }
}

/**
 * Update the managed domain setting for a bucket
 */
export async function putManagedDomain(
  api: CloudflareApi,
  bucketName: string,
  enabled: boolean,
  jurisdiction?: string,
) {
  return await withExponentialBackoff(
    async () => {
      const result = await extractCloudflareResult<{
        bucketId: string;
        domain: string;
        enabled: boolean;
      }>(
        `put R2 bucket managed domain for "${bucketName}"`,
        api.put(
          `/accounts/${api.accountId}/r2/buckets/${bucketName}/domains/managed`,
          { enabled },
          { headers: withJurisdiction({ jurisdiction }) },
        ),
      );
      return result.enabled ? result.domain : undefined;
    },
    (err) => err.status === 404,
    10,
    1000,
  );
}

/**
 * Delete all objects in a bucket
 */
async function emptyBucket(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
) {
  let cursor: string | undefined;
  while (true) {
    const result = await listObjects(api, bucketName, props, cursor);
    if (result.keys.length) {
      // Another undocumented API! But it lets us delete multiple objects at once instead of one by one.
      await extractCloudflareResult(
        `delete ${result.keys.length} objects from bucket "${bucketName}"`,
        api.delete(
          `/accounts/${api.accountId}/r2/buckets/${bucketName}/objects`,
          {
            headers: withJurisdiction(props),
            method: "DELETE",
            body: JSON.stringify(result.keys),
          },
        ),
      );
      if (result.cursor) {
        cursor = result.cursor;
        continue;
      }
    }
    break;
  }
}

/**
 * Lists objects in a bucket.
 */
export async function listObjects(
  api: CloudflareApi,
  bucketName: string,
  props: { jurisdiction?: string },
  cursor?: string,
) {
  const params = new URLSearchParams({
    per_page: "1000",
  });
  if (cursor) {
    params.set("cursor", cursor);
  }
  const response = await api.get(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}/objects?${params.toString()}`,
    { headers: withJurisdiction(props) },
  );
  const json: {
    result: { key: string }[];
    result_info?: {
      cursor: string;
      is_truncated: boolean;
      per_page: number;
    };
    success: boolean;
    errors: CloudflareApiErrorPayload[];
  } = await response.json();
  if (!json.success) {
    // 10006 indicates that the bucket does not exist, so there are no objects to list
    if (json.errors.some((e) => e.code === 10006)) {
      return { keys: [], cursor: undefined };
    }
    throw new CloudflareApiError(
      `Failed to list objects in bucket "${bucketName}": ${json.errors.map((e) => `- [${e.code}] ${e.message}${e.documentation_url ? ` (${e.documentation_url})` : ""}`).join("\n")}`,
      response,
      json.errors,
    );
  }
  return {
    keys: json.result.map((object) => object.key),
    cursor: json.result_info?.cursor,
  };
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
) {
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

  // Make the API request
  const result = await extractCloudflareResult<{
    buckets: { name: string; creation_date: string }[];
  }>(
    "list R2 buckets",
    api.get(path, {
      headers: withJurisdiction(options),
    }),
  );
  return result.buckets;
}

export async function putBucketCORS(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
) {
  let request: RequestInit;
  if (props.cors?.length) {
    request = {
      method: "PUT",
      body: JSON.stringify({ rules: props.cors }),
      headers: withJurisdiction(props, {
        "Content-Type": "application/json",
      }),
    };
  } else {
    request = {
      method: "DELETE",
      headers: withJurisdiction(props),
    };
  }
  await extractCloudflareResult(
    `${request.method} R2 bucket CORS rules for "${bucketName}"`,
    api.fetch(
      `/accounts/${api.accountId}/r2/buckets/${bucketName}/cors`,
      request,
    ),
  );
}

export async function putBucketLifecycleRules(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
) {
  const rulesBody = Array.isArray(props.lifecycle)
    ? props.lifecycle.length === 0
      ? { rules: [] }
      : {
          rules: props.lifecycle.map((rule) => ({
            ...rule,
            // Required by the API; empty prefix means all objects/uploads
            conditions: rule.conditions ?? { prefix: "" },
            // Required by the API
            enabled: rule.enabled ?? true,
          })),
        }
    : {};

  await extractCloudflareResult(
    `put R2 bucket lifecycle rules for "${bucketName}"`,
    api.put(
      `/accounts/${api.accountId}/r2/buckets/${bucketName}/lifecycle`,
      rulesBody,
      { headers: withJurisdiction(props) },
    ),
  );
}

/**
 * Get lifecycle rules for a bucket
 */
export async function getBucketLifecycleRules(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<R2BucketLifecycleRule[]> {
  const res = await api.get(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}/lifecycle`,
    { headers: withJurisdiction(props) },
  );
  const json: any = await res.json();
  if (!json?.success) {
    throw new CloudflareApiError(
      `Failed to get R2 bucket lifecycle rules for "${bucketName}": ${res.status} ${res.statusText}`,
      res,
      json?.errors,
    );
  }
  const rules: any[] = Array.isArray(json.result)
    ? json.result
    : (json.result?.rules ?? []);
  return rules as R2BucketLifecycleRule[];
}

export async function putBucketLockRules(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps,
) {
  const rulesBody = Array.isArray(props.lock)
    ? props.lock.length === 0
      ? { rules: [] }
      : {
          rules: props.lock.map((rule) => ({
            ...rule,
            // Required by the API
            enabled: rule.enabled ?? true,
          })),
        }
    : {};

  await extractCloudflareResult(
    `put R2 bucket lock rules for "${bucketName}"`,
    api.put(
      `/accounts/${api.accountId}/r2/buckets/${bucketName}/lock`,
      rulesBody,
      { headers: withJurisdiction(props) },
    ),
  );
}

/**
 * Get lock rules for a bucket
 */
export async function getBucketLockRules(
  api: CloudflareApi,
  bucketName: string,
  props: BucketProps = {},
): Promise<R2BucketLockRule[]> {
  const res = await api.get(
    `/accounts/${api.accountId}/r2/buckets/${bucketName}/lock`,
    { headers: withJurisdiction(props) },
  );
  const json: any = await res.json();
  if (!json?.success) {
    throw new CloudflareApiError(
      `Failed to get R2 bucket lock rules for "${bucketName}": ${res.status} ${res.statusText}`,
      res,
      json?.errors,
    );
  }
  const rules: any[] = Array.isArray(json.result)
    ? json.result
    : (json.result?.rules ?? []);
  return rules as R2BucketLockRule[];
}
