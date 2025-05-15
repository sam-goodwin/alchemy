import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { createCloudflareApi, type CloudflareApiOptions } from "./api.js";

/**
 * Cloudflare permission group as returned by the API
 */
export interface PermissionGroup {
  /**
   * Unique identifier for the permission group
   */
  id: string;

  /**
   * Human-readable name of the permission group
   */
  name: string;

  /**
   * Scopes included in this permission group
   */
  scopes: string[];
}

/**
 * Response from the Cloudflare permission groups API
 */
interface PermissionGroupsResponse {
  result: PermissionGroup[];
  success: boolean;
  errors: any[];
  messages: any[];
}

export type PermissionGroupName = R2PermissionGroups;

export type R2PermissionGroups =
  | "Workers R2 Storage Write"
  | "Workers R2 Storage Read"
  | "Workers R2 Storage Bucket Item Write"
  | "Workers R2 Storage Bucket Item Read";

/**
 * All Cloudflare permission groups mapped by name to ID
 *
 * @see https://developers.cloudflare.com/r2/api/tokens/#permissions
 */
export type PermissionGroups = Resource<"cloudflare::PermissionGroups"> & {
  /**
   * Admin Read & Write - Allows create, list, delete buckets and edit bucket configurations
   * plus list, write, and read object access
   */
  "Workers R2 Storage Write": PermissionGroup;

  /**
   * Admin Read only - Allows list buckets and view bucket configuration
   * plus list and read object access
   */
  "Workers R2 Storage Read": PermissionGroup;

  /**
   * Object Read & Write - Allows read, write, and list objects in specific buckets
   */
  "Workers R2 Storage Bucket Item Write": PermissionGroup;

  /**
   * Object Read only - Allows read and list objects in specific buckets
   */
  "Workers R2 Storage Bucket Item Read": PermissionGroup;

  /**
   * Dynamically discovered permission groups
   */
  [name: string]: PermissionGroup;
};

/**
 * Lists all permission groups available for the Cloudflare account
 * and returns a typed map of permission names to their IDs.
 *
 * This is primarily used when creating API tokens for Cloudflare services like R2.
 *
 * Note: Requires a Cloudflare API Key or Token with account read access.
 * The API token must have permission to read token permission groups.
 * The OAuth token from `wrangler login` is NOT sufficient for this operation.
 *
 * @example
 * // Get all permission groups including those for R2
 * const permissions = await PermissionGroups("cloudflare-permissions");
 *
 * // Use with AccountApiToken to create a token with proper permissions
 * const token = await AccountApiToken("r2-token", {
 *   name: "R2 Read-Only Token",
 *   policies: [
 *     {
 *       effect: "allow",
 *       resources: {
 *         "com.cloudflare.edge.r2.bucket.abc123_default_my-bucket": "*"
 *       },
 *       permissionGroups: [
 *         {
 *           id: permissions["Workers R2 Storage Bucket Item Read"]
 *         }
 *       ]
 *     }
 *   ]
 * });
 */
export const PermissionGroups = Resource(
  "cloudflare::PermissionGroups",
  async function (
    this: Context<PermissionGroups>,
    _id: string,
    options: CloudflareApiOptions = {},
  ): Promise<PermissionGroups> {
    // Only create and update phases are supported
    if (this.phase === "delete") {
      return this.destroy();
    }

    // Initialize API client
    const api = await createCloudflareApi(options);

    // Fetch permission groups from Cloudflare API
    const response = await api.get(
      `/accounts/${api.accountId}/tokens/permission_groups`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch permission groups: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as PermissionGroupsResponse;

    if (!data.success || !data.result) {
      throw new Error(
        `API returned error: ${data.errors?.[0]?.message || "Unknown error"}`,
      );
    }

    return this(
      Object.fromEntries(
        data.result.map((group) => [group.name, group]),
      ) as PermissionGroups,
    );
  },
);
