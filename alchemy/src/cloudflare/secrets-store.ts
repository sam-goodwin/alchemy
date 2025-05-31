import type { Context } from "../context.ts";
import { Resource, ResourceKind } from "../resource.ts";
import { bind } from "../runtime/bind.ts";
import type { Secret } from "../secret.ts";
import { handleApiError } from "./api-error.ts";
import {
  createCloudflareApi,
  type CloudflareApi,
  type CloudflareApiOptions,
} from "./api.ts";
import type { Bound } from "./bound.ts";

/**
 * Properties for creating or updating a Secrets Store
 */
export interface SecretsStoreProps extends CloudflareApiOptions {
  /**
   * Name of the secrets store
   *
   * @default id
   */
  name?: string;

  /**
   * Secrets to store in the secrets store
   * Maps secret names to Secret instances created with alchemy.secret()
   *
   * @example
   * ```ts
   * const store = await SecretsStore("my-store", {
   *   secrets: {
   *     API_KEY: alchemy.secret(process.env.API_KEY),
   *     DATABASE_URL: alchemy.secret(process.env.DATABASE_URL)
   *   }
   * });
   * ```
   */
  secrets?: { [secretName: string]: Secret };

  /**
   * Whether to adopt an existing store with the same name if it exists
   * If true and a store with the same name exists, it will be adopted rather than creating a new one
   *
   * @default false
   */
  adopt?: boolean;

  /**
   * Whether to delete the store.
   * If set to false, the store will remain but the resource will be removed from state
   *
   * @default true
   */
  delete?: boolean;
}

export function isSecretsStore(
  resource: Resource,
): resource is SecretsStoreResource {
  return resource[ResourceKind] === "cloudflare::SecretsStore";
}

export interface SecretsStoreResource
  extends Resource<"cloudflare::SecretsStore">,
    Omit<SecretsStoreProps, "delete"> {
  type: "secrets_store";
  id: string;
  name: string;
  secrets?: { [secretName: string]: Secret };
  createdAt: number;
  modifiedAt: number;
}

export type SecretsStore = SecretsStoreResource & Bound<SecretsStoreResource>;

/**
 * A Cloudflare Secrets Store is a secure, centralized location for storing account-level secrets.
 *
 * @see https://developers.cloudflare.com/secrets-store/
 *
 * @example
 * // Create a basic secrets store
 * const store = await SecretsStore("my-secrets", {
 *   name: "production-secrets"
 * });
 *
 * @example
 * // Create a secrets store with initial secrets
 * const store = await SecretsStore("my-secrets", {
 *   name: "production-secrets",
 *   secrets: {
 *     API_KEY: alchemy.secret(process.env.API_KEY),
 *     DATABASE_URL: alchemy.secret(process.env.DATABASE_URL),
 *     JWT_SECRET: alchemy.secret(process.env.JWT_SECRET)
 *   }
 * });
 *
 * @example
 * // Adopt an existing store if it already exists
 * const existingStore = await SecretsStore("existing-store", {
 *   name: "existing-secrets-store",
 *   adopt: true,
 *   secrets: {
 *     NEW_SECRET: alchemy.secret("new-value")
 *   }
 * });
 *
 * @example
 * // When removing from Alchemy state, keep the store in Cloudflare
 * const preservedStore = await SecretsStore("preserve-store", {
 *   name: "preserved-secrets-store",
 *   delete: false
 * });
 *
 * @example
 * // Use in a Worker binding to access secrets
 * const worker = await Worker("my-worker", {
 *   bindings: {
 *     SECRETS: store
 *   },
 *   code: `
 *     export default {
 *       async fetch(request, env) {
 *         const apiKey = await env.SECRETS.get("API_KEY");
 *         return new Response(apiKey ? "Secret found" : "No secret");
 *       }
 *     }
 *   `
 * });
 */
export async function SecretsStore(
  name: string,
  props: SecretsStoreProps = {},
): Promise<SecretsStore> {
  const store = await _SecretsStore(name, props);
  const binding = await bind(store);
  return {
    ...store,
    get: binding.get,
  };
}

const _SecretsStore = Resource(
  "cloudflare::SecretsStore",
  async function (
    this: Context<SecretsStoreResource>,
    id: string,
    props: SecretsStoreProps,
  ): Promise<SecretsStoreResource> {
    const api = await createCloudflareApi(props);

    const name = props.name ?? id;

    if (this.phase === "delete") {
      const storeId = this.output?.id;
      if (storeId && props.delete !== false) {
        await deleteSecretsStore(api, storeId);
      }

      return this.destroy();
    }

    let storeId = this.phase === "update" ? this.output?.id || "" : "";
    let createdAt =
      this.phase === "update"
        ? this.output?.createdAt || Date.now()
        : Date.now();

    if (this.phase === "update" && storeId) {
      const currentSecrets = props.secrets || {};
      const existingSecretNames = await listSecrets(api, storeId);

      const secretsToDelete = existingSecretNames.filter(
        (name) => !(name in currentSecrets),
      );

      if (secretsToDelete.length > 0) {
        await deleteSecrets(api, storeId, secretsToDelete);
      }

      await insertSecrets(api, storeId, props);
    } else {
      try {
        const { id } = await createSecretsStore(api, {
          ...props,
          name,
        });
        createdAt = Date.now();
        storeId = id;
      } catch (error) {
        if (
          props.adopt &&
          error instanceof Error &&
          error.message.includes("already exists")
        ) {
          console.log(`Secrets store '${name}' already exists, adopting it`);
          const existingStore = await findSecretsStoreByName(api, name);

          if (!existingStore) {
            throw new Error(
              `Failed to find existing secrets store '${name}' for adoption`,
            );
          }

          storeId = existingStore.id;
          createdAt = existingStore.createdAt || Date.now();
        } else {
          throw error;
        }
      }

      await insertSecrets(api, storeId, props);
    }

    return this({
      type: "secrets_store",
      id: storeId,
      name: name,
      secrets: props.secrets,
      createdAt: createdAt,
      modifiedAt: Date.now(),
    });
  },
);

export async function createSecretsStore(
  api: CloudflareApi,
  props: SecretsStoreProps & {
    name: string;
  },
): Promise<{ id: string }> {
  const createResponse = await api.post(
    `/accounts/${api.accountId}/secrets_store/stores`,
    {
      name: props.name,
    },
  );

  if (!createResponse.ok) {
    await handleApiError(createResponse, "create", "secrets_store", props.name);
  }

  return { id: ((await createResponse.json()) as any).result.id };
}

export async function deleteSecretsStore(api: CloudflareApi, storeId: string) {
  const deleteResponse = await api.delete(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}`,
  );

  if (!deleteResponse.ok && deleteResponse.status !== 404) {
    await handleApiError(deleteResponse, "delete", "secrets_store", storeId);
  }
}

export async function findSecretsStoreByName(
  api: CloudflareApi,
  name: string,
): Promise<{ id: string; createdAt?: number } | null> {
  const response = await api.get(
    `/accounts/${api.accountId}/secrets_store/stores`,
  );

  if (!response.ok) {
    await handleApiError(response, "list", "secrets_store", "all");
  }

  const data = (await response.json()) as {
    result: Array<{
      id: string;
      name: string;
      created: string;
      modified: string;
    }>;
    success: boolean;
    errors: any[];
  };

  const stores = data.result;

  const match = stores.find((store) => store.name === name);
  if (match) {
    return {
      id: match.id,
      createdAt: match.created ? new Date(match.created).getTime() : undefined,
    };
  }

  return null;
}

export async function insertSecrets(
  api: CloudflareApi,
  storeId: string,
  props: SecretsStoreProps,
) {
  if (props.secrets && Object.keys(props.secrets).length > 0) {
    const secretEntries = Object.entries(props.secrets);

    const BATCH_SIZE = 100;

    for (let i = 0; i < secretEntries.length; i += BATCH_SIZE) {
      const batch = secretEntries.slice(i, i + BATCH_SIZE);

      const bulkPayload = batch.map(([name, secret]) => ({
        name,
        value: secret.unencrypted,
        scopes: [],
      }));

      const bulkResponse = await api.post(
        `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
        bulkPayload,
      );

      if (!bulkResponse.ok) {
        const errorData: any = await bulkResponse.json().catch(() => ({
          errors: [{ message: bulkResponse.statusText }],
        }));
        const errorMessage =
          errorData.errors?.[0]?.message || bulkResponse.statusText;

        throw new Error(`Error creating secrets batch: ${errorMessage}`);
      }
    }
  }
}

export async function deleteSecrets(
  api: CloudflareApi,
  storeId: string,
  secretNames: string[],
) {
  if (secretNames.length > 0) {
    const deleteResponse = await api.delete(
      `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
      {
        body: JSON.stringify(secretNames),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!deleteResponse.ok && deleteResponse.status !== 404) {
      await handleApiError(
        deleteResponse,
        "delete",
        "secrets",
        secretNames.join(", "),
      );
    }
  }
}

export async function listSecrets(
  api: CloudflareApi,
  storeId: string,
): Promise<string[]> {
  const response = await api.get(
    `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
  );

  if (!response.ok) {
    await handleApiError(response, "list", "secrets", "all");
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

  return data.result.map((secret) => secret.name);
}
