import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import type { Rune } from "../rune.ts";
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
import { findSecretsStoreByName, SecretsStore } from "./secrets-store.ts";

/**
 * Properties for creating or updating a Secret in a Secrets Store (public interface)
 */
export interface SecretProps extends CloudflareApiOptions {
  /**
   * Name for the Secret.
   *
   * @default ${app}-${stage}-${id}
   */
  name?: string;
  /**
   * The secrets store to add this secret to
   *
   * @default - the default-secret-store
   */
  store?: SecretsStore<any>;
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

export type Secret = Resource<"cloudflare::Secret"> &
  Omit<SecretProps, "delete" | "value"> & {
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
  };

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
 * // Use in a Worker binding
 * const worker = await Worker("my-worker", {
 *   bindings: {
 *     SECRETS: store
 *   },
 *   code: `
 *     export default {
 *       async fetch(request, env) {
 *         const apiKey = await env.SECRETS.get("api-key");
 *         const dbUrl = await env.SECRETS.get("database-url");
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
export function Secret(name: string, props: SecretProps) {
  // Call the internal resource with secure props
  return _Secret(name, {
    ...props,
    value:
      typeof props.value === "string"
        ? alchemySecret(props.value)
        : props.value,
  }) as Rune.of<Secret>;
}

const _Secret = Resource(
  "cloudflare::Secret",
  async function (
    this: Context<Secret>,
    id: string,
    props: SecretProps & {
      value: AlchemySecret;
    },
  ): Promise<Secret> {
    const api = await createCloudflareApi(props);

    const secretName =
      props.name ?? this.output?.name ?? this.scope.createPhysicalName(id);

    if (this.phase === "update" && this.output.name !== secretName) {
      this.replace();
    }

    const storeId =
      props.store?.id ??
      (await findSecretsStoreByName(api, SecretsStore.Default))?.id ??
      (
        await SecretsStore("default-store", {
          name: SecretsStore.Default,
          adopt: true,
          delete: false,
        })
      )?.id!;

    if (this.phase === "delete") {
      if (props.delete !== false) {
        await deleteSecret(api, storeId, secretName);
      }
      return this.destroy();
    }

    const createdAt =
      this.phase === "update"
        ? this.output?.createdAt || Date.now()
        : Date.now();

    // Insert or update the secret
    await insertSecret(api, storeId, secretName, props.value);

    return this({
      type: "secrets_store_secret",
      name: secretName,
      storeId,
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
  // First try to create the secret
  const createResponse = await api.post(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
    [
      {
        name: secretName,
        value: secretValue.unencrypted,
        scopes: ["workers"],
      },
    ],
  );

  if (createResponse.ok) {
    return; // Secret created successfully
  }

  // If creation failed, check if it's because the secret already exists
  const createErrorData: any = await createResponse.json().catch(() => ({
    errors: [{ message: createResponse.statusText }],
  }));

  const isAlreadyExists = createErrorData.errors?.some(
    (error: any) =>
      error.code === 10021 ||
      error.message?.includes("secret_name_already_exists"),
  );

  if (isAlreadyExists) {
    // Secret already exists, find its ID and update it
    const secretId = await getSecretId(api, storeId, secretName);
    if (!secretId) {
      throw new Error(`Secret '${secretName}' not found in store`);
    }

    const updateResponse = await api.patch(
      `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets/${secretId}`,
      {
        value: secretValue.unencrypted,
        scopes: ["workers"],
      },
    );

    if (!updateResponse.ok) {
      const updateErrorData: any = await updateResponse.json().catch(() => ({
        errors: [{ message: updateResponse.statusText }],
      }));
      const updateErrorMessage =
        updateErrorData.errors?.[0]?.message || updateResponse.statusText;
      throw new Error(
        `Error updating secret '${secretName}': ${updateErrorMessage}`,
      );
    }
  } else {
    // Some other error occurred during creation
    const createErrorMessage =
      createErrorData.errors?.[0]?.message || createResponse.statusText;
    throw new Error(
      `Error creating secret '${secretName}': ${createErrorMessage}`,
    );
  }
}

/**
 * Get the ID of a secret by its name
 */
async function getSecretId(
  api: CloudflareApi,
  storeId: string,
  secretName: string,
): Promise<string | null> {
  const response = await api.get(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    result: Array<{
      id: string;
      name: string;
      created: string;
      modified: string;
      status: string;
    }>;
    success: boolean;
    errors: any[];
  };

  const secret = data.result.find((s) => s.name === secretName);
  return secret?.id || null;
}

/**
 * Delete a secret from a secrets store
 */
export async function deleteSecret(
  api: CloudflareApi,
  storeId: string,
  secretName: string,
): Promise<void> {
  const secretId = await getSecretId(api, storeId, secretName);
  const response = await api.delete(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets/${secretId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok && response.status !== 404) {
    await handleApiError(response, "delete", "secret", secretName);
  }
}
