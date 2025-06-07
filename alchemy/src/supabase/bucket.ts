import type { Context } from "../context.ts";
import {
  Resource,
  ResourceKind,
  ResourceID,
  ResourceFQN,
  ResourceScope,
  ResourceSeq,
} from "../resource.ts";
import { Scope } from "../scope.ts";
import {
  createSupabaseApi,
  type SupabaseApiOptions,
  type SupabaseApi,
} from "./api.ts";
import { handleApiError } from "./api-error.ts";
import type { ProjectResource } from "./project.ts";

/**
 * Properties for creating or updating a Supabase Storage Bucket
 */
export interface BucketProps extends SupabaseApiOptions {
  /**
   * Reference to the project (string ID or Project resource)
   */
  project: string | ProjectResource;

  /**
   * Name of the bucket (optional, defaults to resource ID)
   */
  name?: string;

  /**
   * Whether the bucket should be publicly accessible
   */
  public?: boolean;

  /**
   * Maximum file size limit in bytes
   */
  fileSizeLimit?: number;

  /**
   * Allowed MIME types for uploads
   */
  allowedMimeTypes?: string[];

  /**
   * Whether to adopt an existing bucket instead of failing on conflict
   */
  adopt?: boolean;

  /**
   * Whether to delete the bucket on resource destruction
   */
  delete?: boolean;
}

/**
 * Supabase Storage Bucket resource
 */
export interface BucketResource extends Resource<"supabase::Bucket"> {
  /**
   * Unique identifier of the bucket
   */
  id: string;

  /**
   * Name of the bucket
   */
  name: string;

  /**
   * Owner of the bucket
   */
  owner: string;

  /**
   * Whether the bucket is publicly accessible
   */
  public: boolean;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Last update timestamp
   */
  updatedAt: string;
}

export function isBucket(resource: Resource): resource is BucketResource {
  return resource[ResourceKind] === "supabase::Bucket";
}

/**
 * Create and manage Supabase Storage Buckets
 *
 * @example
 * // Create a private bucket:
 * const bucket = Bucket("user-uploads", {
 *   project: "proj-123",
 *   public: false,
 *   fileSizeLimit: 5242880,
 *   allowedMimeTypes: ["image/jpeg", "image/png", "image/gif"]
 * });
 *
 * @example
 * // Create a public bucket with Project resource:
 * const bucket = Bucket("public-assets", {
 *   project: myProject,
 *   public: true
 * });
 *
 * @example
 * // Adopt an existing bucket:
 * const bucket = Bucket("existing-bucket", {
 *   project: "proj-123",
 *   adopt: true
 * });
 */
export const Bucket = Resource(
  "supabase::Bucket",
  async function (
    this: Context<BucketResource>,
    id: string,
    props: BucketProps,
  ): Promise<BucketResource> {
    const api = await createSupabaseApi(props);
    const name = props.name ?? id;
    const projectRef =
      typeof props.project === "string" ? props.project : props.project.id;

    if (this.phase === "delete") {
      const bucketName = this.output?.name;
      if (bucketName && props.delete !== false) {
        await deleteBucket(api, projectRef, bucketName);
      }
      return this.destroy();
    }

    if (this.phase === "update" && this.output?.name) {
      const bucket = await getBucket(api, projectRef, this.output.name);
      return this(bucket);
    }

    try {
      const bucket = await createBucket(api, projectRef, {
        name,
        public: props.public,
        file_size_limit: props.fileSizeLimit,
        allowed_mime_types: props.allowedMimeTypes,
      });
      return this(bucket);
    } catch (error) {
      if (
        props.adopt &&
        error instanceof Error &&
        error.message.includes("already exists")
      ) {
        const existingBucket = await findBucketByName(api, projectRef, name);
        if (!existingBucket) {
          throw new Error(
            `Failed to find existing bucket '${name}' for adoption`,
          );
        }
        return this(existingBucket);
      }
      throw error;
    }
  },
);

async function createBucket(
  api: SupabaseApi,
  projectRef: string,
  params: any,
): Promise<BucketResource> {
  const response = await api.post(
    `/projects/${projectRef}/storage/buckets`,
    params,
  );
  if (!response.ok) {
    await handleApiError(response, "creating", "bucket", params.name);
  }
  const data = await response.json();
  return mapBucketResponse(data);
}

async function getBucket(
  api: SupabaseApi,
  projectRef: string,
  name: string,
): Promise<BucketResource> {
  const response = await api.get(`/projects/${projectRef}/storage/buckets`);
  if (!response.ok) {
    await handleApiError(response, "listing", "buckets");
  }
  const buckets = (await response.json()) as any[];
  const bucket = buckets.find((b: any) => b.name === name);
  if (!bucket) {
    throw new Error(`Bucket '${name}' not found`);
  }
  return mapBucketResponse(bucket);
}

async function deleteBucket(
  api: SupabaseApi,
  projectRef: string,
  name: string,
): Promise<void> {
  const response = await api.delete(
    `/projects/${projectRef}/storage/buckets/${name}`,
  );
  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "deleting", "bucket", name);
  }
}

async function findBucketByName(
  api: SupabaseApi,
  projectRef: string,
  name: string,
): Promise<BucketResource | null> {
  try {
    return await getBucket(api, projectRef, name);
  } catch {
    return null;
  }
}

function mapBucketResponse(data: any): BucketResource {
  return {
    [ResourceKind]: "supabase::Bucket",
    [ResourceID]: data.id,
    [ResourceFQN]: `supabase::Bucket::${data.id}`,
    [ResourceScope]: Scope.current,
    [ResourceSeq]: 0,
    id: data.id,
    name: data.name,
    owner: data.owner,
    public: data.public,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
