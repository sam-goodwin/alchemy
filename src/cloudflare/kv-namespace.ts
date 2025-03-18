import type { Resolved } from "../output";
import { type Context, Resource } from "../resource";
import { createCloudflareApi } from "./api";

/**
 * Properties for creating or updating a KV Namespace
 */
export interface KVNamespaceProps {
  /**
   * Title of the namespace
   */
  title: string;

  /**
   * KV pairs to store in the namespace
   * Only used for initial setup or updates
   */
  values?: KVPair[];
}

/**
 * Key-value pair to store in a KV Namespace
 */
export interface KVPair {
  /**
   * Key name
   */
  key: string;

  /**
   * Value to store (string or JSON object)
   */
  value: string | object;

  /**
   * Optional expiration in seconds from now
   */
  expiration?: number;

  /**
   * Optional expiration timestamp in seconds since epoch
   */
  expirationTtl?: number;

  /**
   * Optional metadata for the key
   */
  metadata?: any;
}

/**
 * Output returned after KV Namespace creation/update
 */
export interface KVNamespaceOutput extends KVNamespaceProps {
  /**
   * The ID of the namespace
   */
  id: string;

  /**
   * Time at which the namespace was created
   */
  createdAt: number;

  /**
   * Time at which the namespace was last modified
   */
  modifiedAt: number;
}

export function isKVNamespace(binding: any): binding is Resolved<KVNamespace> {
  return (
    binding.type === "kv_namespace" &&
    typeof (binding as any).namespaceId === "string"
  );
}

export class KVNamespace extends Resource(
  "cloudflare::KVNamespace",
  async (ctx: Context<KVNamespaceOutput>, props: KVNamespaceProps) => {
    // Create Cloudflare API client with automatic account discovery
    const api = await createCloudflareApi();

    if (ctx.event === "delete") {
      // For delete operations, we need to check if the namespace ID exists in the output
      const namespaceId = ctx.output?.id;

      if (namespaceId) {
        // Delete KV namespace
        const deleteResponse = await api.delete(
          `/accounts/${api.accountId}/storage/kv/namespaces/${namespaceId}`,
        );

        if (!deleteResponse.ok && deleteResponse.status !== 404) {
          const errorData: any = await deleteResponse.json().catch(() => ({
            errors: [{ message: deleteResponse.statusText }],
          }));
          console.error(
            "Error deleting KV namespace:",
            errorData.errors?.[0]?.message || deleteResponse.statusText,
          );
        }
      }

      // Return minimal output for deleted state
      return;
    } else {
      // For create or update operations
      // If ctx.event is "update", we expect ctx.output to exist
      let namespaceId = ctx.event === "update" ? ctx.output?.id || "" : "";
      let createdAt =
        ctx.event === "update"
          ? ctx.output?.createdAt || Date.now()
          : Date.now();

      if (ctx.event === "update" && namespaceId) {
        // Can't update a KV namespace title directly, just work with existing ID
      } else {
        // Create new KV namespace
        const createResponse = await api.post(
          `/accounts/${api.accountId}/storage/kv/namespaces`,
          {
            title: props.title,
          },
        );

        if (!createResponse.ok) {
          const errorData: any = await createResponse.json().catch(() => ({
            errors: [{ message: createResponse.statusText }],
          }));
          throw new Error(
            `Error creating KV namespace '${props.title}': ${errorData.errors?.[0]?.message || createResponse.statusText}`,
          );
        }

        const createResult: any = await createResponse.json();
        namespaceId = createResult.result.id;
        createdAt = Date.now();
      }

      // Handle KV pairs if provided
      if (props.values && props.values.length > 0 && namespaceId) {
        // Process KV pairs in batches of 10000 (API limit)
        const BATCH_SIZE = 10000;

        for (let i = 0; i < props.values.length; i += BATCH_SIZE) {
          const batch = props.values.slice(i, i + BATCH_SIZE);

          const bulkPayload = batch.map((entry) => {
            const item: any = {
              key: entry.key,
              value:
                typeof entry.value === "string"
                  ? entry.value
                  : JSON.stringify(entry.value),
            };

            if (entry.expiration) {
              item.expiration = entry.expiration;
            }

            if (entry.expirationTtl) {
              item.expiration_ttl = entry.expirationTtl;
            }

            if (entry.metadata) {
              item.metadata = entry.metadata;
            }

            return item;
          });

          const bulkResponse = await api.put(
            `/accounts/${api.accountId}/storage/kv/namespaces/${namespaceId}/bulk`,
            bulkPayload,
          );

          if (!bulkResponse.ok) {
            const errorData: any = await bulkResponse.json().catch(() => ({
              errors: [{ message: bulkResponse.statusText }],
            }));
            console.warn(
              `Error writing KV batch: ${errorData.errors?.[0]?.message || bulkResponse.statusText}`,
            );
          }
        }
      }

      const now = Date.now();

      // Construct the output
      const output: KVNamespaceOutput = {
        id: namespaceId,
        title: props.title,
        values: props.values,
        createdAt: createdAt,
        modifiedAt: now,
      };

      return output;
    }
  },
) {}
