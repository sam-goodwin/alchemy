import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { secret } from "../../src/secret.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Secret } from "../../src/cloudflare/secret.ts";
import { SecretsStore } from "../../src/cloudflare/secrets-store.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("SecretsStore Resource", () => {
  const testId = `${BRANCH_PREFIX}-test-secrets-store`;

  test("create, update, and delete secrets store", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    try {
      secretsStore = await SecretsStore(testId, {
        name: `${BRANCH_PREFIX}-test-store`,
      });

      expect(secretsStore).toBeTruthy();
      expect(secretsStore!.id).toBeTruthy();
      expect(secretsStore!.name).toEqual(`${BRANCH_PREFIX}-test-store`);

      await assertSecretsStoreExists(secretsStore!.id);

      secretsStore = await SecretsStore(testId, {
        name: `${BRANCH_PREFIX}-test-store`,
      });

      expect(secretsStore!.id).toEqual(secretsStore!.id);
      expect(secretsStore!.name).toEqual(`${BRANCH_PREFIX}-test-store`);

      await assertSecretsStoreExists(secretsStore!.id);
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore) {
        await assertSecretsStoreNotExists(secretsStore.id);
      }
    }
  });

  test("adopt existing store", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    try {
      secretsStore = await SecretsStore("store", {
        name: `${BRANCH_PREFIX}-adopt-store`,
      });

      await alchemy.run("nested", async () => {
        const adoptedStore = await SecretsStore("store", {
          name: `${BRANCH_PREFIX}-adopt-store`,
          adopt: true,
        });

        expect(adoptedStore.id).toEqual(secretsStore!.id);
      });
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore) {
        await assertSecretsStoreNotExists(secretsStore.id);
      }
    }
  });

  test("adopt existing store with delete false", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    try {
      secretsStore = await SecretsStore("store", {
        name: `${BRANCH_PREFIX}-adopt-delete-false`,
      });

      await alchemy.run("nested", async (scope) => {
        const adoptedStore = await SecretsStore("store", {
          name: `${BRANCH_PREFIX}-adopt-delete-false`,
          adopt: true,
          delete: false,
        });

        expect(adoptedStore.id).toEqual(secretsStore!.id);
        await alchemy.destroy(scope);
        await assertSecretsStoreExists(adoptedStore.id);
      });
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore) {
        await assertSecretsStoreNotExists(secretsStore.id);
      }
    }
  });

  async function assertSecretsStoreExists(storeId: string): Promise<void> {
    const api = await createCloudflareApi();
    const response = await api.get(
      `/accounts/${api.accountId}/secrets_store/stores`,
    );

    expect(response.ok).toBe(true);
    const data: any = await response.json();
    const store = data.result.find((s: any) => s.id === storeId);
    expect(store).toBeTruthy();
  }

  async function assertSecretsStoreNotExists(storeId: string): Promise<void> {
    const api = await createCloudflareApi();
    const response = await api.get(
      `/accounts/${api.accountId}/secrets_store/stores`,
    );

    expect(response.ok).toBe(true);
    const data: any = await response.json();
    const store = data.result.find((s: any) => s.id === storeId);
    expect(store).toBeFalsy();
  }

  test("create secrets store with secrets", async (scope) => {
    const secretsStore = await SecretsStore(`${testId}-with-secrets`, {
      name: `${BRANCH_PREFIX}-test-store-with-secrets`,
      secrets: {
        API_KEY: secret("test-api-key-value"),
        DATABASE_URL: secret("test-db-url-value"),
      },
    });

    try {
      expect(secretsStore.id).toBeTruthy();
      expect(secretsStore.name).toEqual(
        `${BRANCH_PREFIX}-test-store-with-secrets`,
      );
      expect(secretsStore.secrets).toBeTruthy();
      expect(Object.keys(secretsStore.secrets!)).toEqual([
        "API_KEY",
        "DATABASE_URL",
      ]);

      await assertSecretsStoreExists(secretsStore.id);
    } finally {
      await alchemy.destroy(scope);
      await assertSecretsStoreNotExists(secretsStore.id);
    }
  });

  test("update secrets in store", async (scope) => {
    const initialStore = await SecretsStore(`${testId}-update-secrets`, {
      name: `${BRANCH_PREFIX}-test-store-update`,
      secrets: {
        INITIAL_SECRET: secret("initial-value"),
      },
    });

    try {
      const updatedStore = await SecretsStore(`${testId}-update-secrets`, {
        name: `${BRANCH_PREFIX}-test-store-update`,
        secrets: {
          UPDATED_SECRET: secret("updated-value"),
          NEW_SECRET: secret("new-value"),
        },
      });

      expect(updatedStore.secrets).toBeTruthy();
      expect(Object.keys(updatedStore.secrets!)).toEqual([
        "UPDATED_SECRET",
        "NEW_SECRET",
      ]);
    } finally {
      await alchemy.destroy(scope);
      await assertSecretsStoreNotExists(initialStore.id);
    }
  });

  test("add individual secrets to existing store", async (scope) => {
    const secretsStore = await SecretsStore(`${testId}-add-secrets`, {
      name: `${BRANCH_PREFIX}-test-store-add-secrets`,
    });

    try {
      // Verify store exists but has no secrets initially
      await assertSecretsStoreExists(secretsStore.id);
      await assertSecretNotExists(secretsStore.id, "DYNAMIC_SECRET_1");
      await assertSecretNotExists(secretsStore.id, "DYNAMIC_SECRET_2");

      // Add first secret using Secret resource
      const secret1 = await Secret("dynamic-secret-1", {
        store: secretsStore,
        value: secret("dynamic-value-1"),
      });

      expect(secret1.name).toEqual("dynamic-secret-1");
      expect(secret1.storeId).toEqual(secretsStore.id);
      await assertSecretExists(secretsStore.id, "dynamic-secret-1");

      // Add second secret using Secret resource
      const secret2 = await Secret("dynamic-secret-2", {
        store: secretsStore,
        value: "dynamic-value-2", // Test string conversion
      });

      expect(secret2.name).toEqual("dynamic-secret-2");
      expect(secret2.storeId).toEqual(secretsStore.id);
      await assertSecretExists(secretsStore.id, "dynamic-secret-2");

      // Both secrets should now exist
      await assertSecretExists(secretsStore.id, "dynamic-secret-1");
      await assertSecretExists(secretsStore.id, "dynamic-secret-2");
    } finally {
      await alchemy.destroy(scope);
      await assertSecretsStoreNotExists(secretsStore.id);
    }
  });

  test("remove individual secrets from existing store", async (scope) => {
    const secretsStore = await SecretsStore(`${testId}-remove-secrets`, {
      name: `${BRANCH_PREFIX}-test-store-remove-secrets`,
      secrets: {
        INITIAL_SECRET_1: secret("initial-value-1"),
        INITIAL_SECRET_2: secret("initial-value-2"),
        INITIAL_SECRET_3: secret("initial-value-3"),
      },
    });

    let dynamicSecret: Secret | undefined;

    try {
      // Verify all initial secrets exist
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_1");
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_2");
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_3");

      // Add a dynamic secret
      dynamicSecret = await Secret("dynamic-secret", {
        store: secretsStore,
        value: secret("dynamic-value"),
      });

      await assertSecretExists(secretsStore.id, "dynamic-secret");

      // Run a nested scope to remove the dynamic secret
      await alchemy.run("remove-secret", async (scope) => {
        // The dynamic secret should be removed when this scope is destroyed
        await alchemy.destroy(scope);
      });

      // Dynamic secret should be removed, but initial secrets should remain
      await assertSecretNotExists(secretsStore.id, "dynamic-secret");
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_1");
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_2");
      await assertSecretExists(secretsStore.id, "INITIAL_SECRET_3");
    } finally {
      await alchemy.destroy(scope);
      await assertSecretsStoreNotExists(secretsStore.id);
    }
  });

  test("add and remove secrets dynamically maintains store state", async (scope) => {
    const secretsStore = await SecretsStore(`${testId}-dynamic-management`, {
      name: `${BRANCH_PREFIX}-test-store-dynamic`,
      secrets: {
        PERSISTENT_SECRET: secret("persistent-value"),
      },
    });

    try {
      // Initial state: one persistent secret
      await assertSecretExists(secretsStore.id, "PERSISTENT_SECRET");
      await assertSecretNotExists(secretsStore.id, "temp-secret-1");
      await assertSecretNotExists(secretsStore.id, "temp-secret-2");

      // Add a persistent secret to main scope
      const tempSecret1 = await Secret("temp-secret-1", {
        store: secretsStore,
        value: secret("temp-value-1"),
      });

      await assertSecretExists(secretsStore.id, "temp-secret-1");

      // Add a temporary secret in nested scope that will be removed
      await alchemy.run("temp-scope", async (tempScope) => {
        const tempSecret2 = await Secret("temp-secret-2", {
          store: secretsStore,
          value: secret("temp-value-2"),
        });

        // Both temp secrets should exist now
        await assertSecretExists(secretsStore.id, "temp-secret-1");
        await assertSecretExists(secretsStore.id, "temp-secret-2");

        // Destroy the temp scope, which should remove temp-secret-2
        await alchemy.destroy(tempScope);
      });

      // Final state: persistent and temp-secret-1 should remain, temp-secret-2 should be gone
      await assertSecretExists(secretsStore.id, "PERSISTENT_SECRET");
      await assertSecretExists(secretsStore.id, "temp-secret-1");
      await assertSecretNotExists(secretsStore.id, "temp-secret-2");

      // Update temp-secret-1 to verify it still works
      const updatedTempSecret1 = await Secret("temp-secret-1", {
        store: secretsStore,
        value: secret("updated-temp-value-1"),
      });

      expect(updatedTempSecret1.value.unencrypted).toEqual("updated-temp-value-1");
      await assertSecretExists(secretsStore.id, "temp-secret-1");
    } finally {
      await alchemy.destroy(scope);
      await assertSecretsStoreNotExists(secretsStore.id);
    }
  });

  async function assertSecretExists(storeId: string, secretName: string): Promise<void> {
    const api = await createCloudflareApi();
    const response = await api.get(
      `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
    );

    expect(response.ok).toBe(true);
    const data: any = await response.json();
    const secret = data.result.find((s: any) => s.name === secretName);
    expect(secret).toBeTruthy();
  }

  async function assertSecretNotExists(storeId: string, secretName: string): Promise<void> {
    const api = await createCloudflareApi();
    const response = await api.get(
      `/accounts/${api.accountId}/secrets_store/stores/${storeId}/secrets`,
    );

    expect(response.ok).toBe(true);
    const data: any = await response.json();
    const secret = data.result.find((s: any) => s.name === secretName);
    expect(secret).toBeFalsy();
  }
});
