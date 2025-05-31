import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { secret } from "../../src/secret.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { SecretsStore } from "../../src/cloudflare/secrets-store.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

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

      expect(secretsStore.id).toBeTruthy();
      expect(secretsStore.name).toEqual(`${BRANCH_PREFIX}-test-store`);

      await assertSecretsStoreExists(secretsStore.id);

      secretsStore = await SecretsStore(testId, {
        name: `${BRANCH_PREFIX}-test-store`,
      });

      expect(secretsStore.id).toEqual(secretsStore.id);
      expect(secretsStore.name).toEqual(`${BRANCH_PREFIX}-test-store`);

      await assertSecretsStoreExists(secretsStore.id);
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
      await assertSecretsStoreNotExists(secretsStore!.id);
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
      await assertSecretsStoreNotExists(secretsStore!.id);
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
    let secretsStore: SecretsStore | undefined;
    try {
      secretsStore = await SecretsStore(`${testId}-with-secrets`, {
        name: `${BRANCH_PREFIX}-test-store-with-secrets`,
        secrets: {
          API_KEY: secret("test-api-key-value"),
          DATABASE_URL: secret("test-db-url-value"),
        },
      });

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
      if (secretsStore) {
        await assertSecretsStoreNotExists(secretsStore.id);
      }
    }
  });

  test("update secrets in store", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    try {
      secretsStore = await SecretsStore(`${testId}-update-secrets`, {
        name: `${BRANCH_PREFIX}-test-store-update`,
        secrets: {
          INITIAL_SECRET: secret("initial-value"),
        },
      });

      secretsStore = await SecretsStore(`${testId}-update-secrets`, {
        name: `${BRANCH_PREFIX}-test-store-update`,
        secrets: {
          UPDATED_SECRET: secret("updated-value"),
          NEW_SECRET: secret("new-value"),
        },
      });

      expect(secretsStore.secrets).toBeTruthy();
      expect(Object.keys(secretsStore.secrets!)).toEqual([
        "UPDATED_SECRET",
        "NEW_SECRET",
      ]);
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore) {
        await assertSecretsStoreNotExists(secretsStore.id);
      }
    }
  });
});
