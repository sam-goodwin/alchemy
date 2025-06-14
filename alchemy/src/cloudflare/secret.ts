import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import {
  secret as alchemySecret,
  type Secret as AlchemySecret,
} from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { SecretsStore } from "./secrets-store.ts";
import { listSecrets } from "./secrets-store.ts";

/**
 * Properties for creating or updating a Secret in a Secrets Store (internal interface)
 */
interface _SecretProps extends CloudflareApiOptions {
  /**
   * The secrets store to add this secret to
   */
  store: SecretsStore<any>;

  /**
   * The secret value to store (must be an AlchemySecret for security)
   */
  value: AlchemySecret;

  /**
   * Whether to delete the secret.
   * If set to false, the secret will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;
}

/**
 * Properties for creating or updating a Secret in a Secrets Store (public interface)
 */
export interface SecretProps extends CloudflareApiOptions {
  /**
   * The secrets store to add this secret to
   */
  store: SecretsStore<any>;

  /**
   * The secret value to store
   * Can be a string or an existing Secret instance
   *
   * @example
   * ```ts
   * const secret = await Secret("api-key", {
   *   store: mySecretsStore,
   *   value: alchemy.secret(process.env.API_KEY)
   * });
   * ```
   */
  value: string | AlchemySecret;

  /**
   * Whether to delete the secret.
   * If set to false, the secret will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;
}

export function isSecret(resource: Resource): resource is Secret {
  return resource[ResourceKind] === "cloudflare::Secret";
}

export interface Secret
  extends Resource<"cloudflare::Secret">,
    Omit<_SecretProps, "delete"> {
  /**
   * The binding type for Cloudflare Workers
   */
  type: "secrets_store_secret";

  /**
   * The name of the secret
   */
  name: string;

  /**
   * The unique identifier of the secrets store this secret belongs to
   */
  storeId: string;

  /**
   * The secret value (as an alchemy Secret instance)
   */
  value: AlchemySecret;

  /**
   * Timestamp when the secret was created
   */
  createdAt: number;

  /**
   * Timestamp when the secret was last modified
   */
  modifiedAt: number;
}

/**
 * A Cloudflare Secret represents an individual secret stored in a Secrets Store.
 *
 * Use this resource to add individual secrets to an existing Secrets Store,
 * providing fine-grained control over secret management.
 *
 * @see https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/
 *
 * @example
 * // Create a secrets store first
 * const store = await SecretsStore("my-store", {
 *   name: "production-secrets"
 * });
 *
 * // Add individual secrets to the store
 * const apiKey = await Secret("api-key", {
 *   store: store,
 *   value: alchemy.secret(process.env.API_KEY)
 * });
 *
 * const dbUrl = await Secret("database-url", {
 *   store: store,
 *   value: process.env.DATABASE_URL
 * });
 *
 * @example
 * // Use individual secrets as Worker bindings
 * const worker = await Worker("my-worker", {
 *   bindings: {
 *     API_KEY: apiKey,
 *     DATABASE_URL: dbUrl
 *   },
 *   code: `
 *     export default {
 *       async fetch(request, env) {
 *         const apiKey = env.API_KEY;
 *         const dbUrl = env.DATABASE_URL;
 *         return new Response(\`API: \${apiKey ? "set" : "unset"}\`);
 *       }
 *     }
 *   `
 * });
 *
 * @example
 * // When removing from Alchemy state, keep the secret in Cloudflare
 * const preservedSecret = await Secret("preserve-secret", {
 *   store: myStore,
 *   value: "preserved-value",
 *   delete: false
 * });
 */
export async function Secret(
  name: string,
  props: SecretProps,
): Promise<Secret> {
  // Convert string value to AlchemySecret if needed to prevent plain text serialization
  const secretValue =
    typeof props.value === "string" ? alchemySecret(props.value) : props.value;

  // Call the internal resource with secure props
  return _Secret(name, {
    ...props,
    value: secretValue,
  });
}

const _Secret = Resource(
  "cloudflare::Secret",
  async function (
    this: Context<Secret>,
    name: string,
    props: _SecretProps,
  ): Promise<Secret> {
    const api = await createCloudflareApi(props);

    if (this.phase === "delete") {
      if (props.delete !== false) {
        await deleteSecret(api, props.store.id, name);
      }
      return this.destroy();
    }

    const createdAt =
      this.phase === "update"
        ? this.output?.createdAt || Date.now()
        : Date.now();

    // Insert or update the secret
    await insertSecret(api, props.store.id, name, props.value);

    return this({
      type: "secrets_store_secret",
      name,
      storeId: props.store.id,
      store: props.store,
      value: props.value,
      createdAt,
      modifiedAt: Date.now(),
    });
  },
);

/**
 * Insert or update a secret in a secrets store
 */
export async function insertSecret(
  api: CloudflareApi,
  storeId: string,
  secretName: string,
  secretValue: AlchemySecret,
): Promise<void> {
  // Use bulk POST endpoint for oauth_token compatibility
  const bulkPayload = [{
    name: secretName,
    value: secretValue.unencrypted,
    scopes: ["workers"],
  }];

  const response = await api.post(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
    bulkPayload,
  );

  if (!response.ok) {
    const errorData: any = await response.json().catch(() => ({
      errors: [{ message: response.statusText }],
    }));
    const errorMessage = errorData.errors?.[0]?.message || response.statusText;
    
    // If secret already exists, delete it first then recreate
    if (errorMessage.includes("secret_name_already_exists")) {
      await deleteSecret(api, storeId, secretName);
      
      // Retry creation after deletion
      const retryResponse = await api.post(
        `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
        bulkPayload,
      );
      
      if (!retryResponse.ok) {
        await handleApiError(retryResponse, "create", "secret", secretName);
      }
    } else {
      await handleApiError(response, "create", "secret", secretName);
    }
  }
}

/**
 * Delete a secret from a secrets store
 */
export async function deleteSecret(
  api: CloudflareApi,
  storeId: string,
  secretName: string,
): Promise<void> {
  const response = await api.delete(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets/${secretName}`,
  );

  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "delete", "secret", secretName);
  }
}
