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

describe("Secret Resource", () => {
  const testId = `${BRANCH_PREFIX}-test-secret`;
  const storeId = `${BRANCH_PREFIX}-test-secret-store`;

  test("create and delete secret in store", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    let secretResource: Secret | undefined;

    try {
      // First create a secrets store
      secretsStore = await SecretsStore(storeId, {
        name: `${BRANCH_PREFIX}-test-store-for-secret`,
      });

      expect(secretsStore).toBeTruthy();

      // Create a secret in the store
      secretResource = await Secret(testId, {
        store: secretsStore,
        value: secret("test-secret-value"),
      });

      expect(secretResource).toBeTruthy();
      expect(secretResource!.name).toEqual(testId);
      expect(secretResource!.storeId).toEqual(secretsStore!.id);
      expect(secretResource!.value.unencrypted).toEqual("test-secret-value");

      // Verify the secret exists in the store
      await assertSecretExists(secretsStore!.id, testId);
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore && secretResource) {
        await assertSecretNotExists(secretsStore.id, testId);
      }
    }
  });

  test("create secret with string value", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    let secretResource: Secret | undefined;

    try {
      // First create a secrets store
      secretsStore = await SecretsStore(`${storeId}-string`, {
        name: `${BRANCH_PREFIX}-test-store-string`,
      });

      // Create a secret with string value (should be converted to Secret)
      secretResource = await Secret(`${testId}-string`, {
        store: secretsStore,
        value: "plain-string-value",
      });

      expect(secretResource).toBeTruthy();
      expect(secretResource!.name).toEqual(`${testId}-string`);
      expect(secretResource!.value.unencrypted).toEqual("plain-string-value");

      // Verify the secret exists in the store
      await assertSecretExists(secretsStore!.id, `${testId}-string`);
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore && secretResource) {
        await assertSecretNotExists(secretsStore.id, `${testId}-string`);
      }
    }
  });

  test("update secret value", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    let secretResource: Secret | undefined;

    try {
      // First create a secrets store
      secretsStore = await SecretsStore(`${storeId}-update`, {
        name: `${BRANCH_PREFIX}-test-store-update`,
      });

      // Create initial secret
      secretResource = await Secret(`${testId}-update`, {
        store: secretsStore,
        value: secret("initial-value"),
      });

      expect(secretResource!.value.unencrypted).toEqual("initial-value");

      // Update the secret value
      secretResource = await Secret(`${testId}-update`, {
        store: secretsStore,
        value: secret("updated-value"),
      });

      expect(secretResource!.value.unencrypted).toEqual("updated-value");

      // Verify the secret exists with updated value
      await assertSecretExists(secretsStore!.id, `${testId}-update`);
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore && secretResource) {
        await assertSecretNotExists(secretsStore.id, `${testId}-update`);
      }
    }
  });

  test("create secret with delete false", async (scope) => {
    let secretsStore: SecretsStore | undefined;
    let secretResource: Secret | undefined;

    try {
      // First create a secrets store
      secretsStore = await SecretsStore(`${storeId}-preserve`, {
        name: `${BRANCH_PREFIX}-test-store-preserve`,
      });

      await alchemy.run("nested", async (scope) => {
        // Create a secret with delete: false
        secretResource = await Secret(`${testId}-preserve`, {
          store: secretsStore!,
          value: secret("preserved-value"),
          delete: false,
        });

        expect(secretResource).toBeTruthy();
        await alchemy.destroy(scope);

        // Secret should still exist after destroying the scope
        await assertSecretExists(secretsStore!.id, `${testId}-preserve`);
      });
    } finally {
      await alchemy.destroy(scope);
      if (secretsStore) {
        // Manually clean up the preserved secret
        const api = await createCloudflareApi();
        await api.delete(
          `/accounts/${api.accountId}/secrets_store/stores/${secretsStore.id}/secrets`,
          {
            body: JSON.stringify([`${testId}-preserve`]),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
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