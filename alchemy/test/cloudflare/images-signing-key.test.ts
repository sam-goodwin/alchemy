import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { ImagesSigningKey } from "../../src/cloudflare/images-signing-key.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Cloudflare Images Signing Key", () => {
  test("create, update, and delete signing key", async (scope) => {
    const keyName = `${BRANCH_PREFIX}-test-key`;
    let signingKey: Awaited<ReturnType<typeof ImagesSigningKey>>;

    try {
      // Create signing key
      signingKey = await ImagesSigningKey("test-key", {
        name: keyName,
      });

      expect(signingKey).toMatchObject({
        name: keyName,
      });
      expect(signingKey.value).toBeDefined();
      expect(signingKey.value).toMatch(/^[a-zA-Z0-9+/]+=*$/); // Base64-like pattern
      expect(signingKey.createdAt).toBeDefined();
      expect(signingKey.modifiedAt).toBeDefined();

      const originalValue = signingKey.value;

      // Update signing key (regenerates the value)
      signingKey = await ImagesSigningKey("test-key", {
        name: keyName,
      });

      expect(signingKey.name).toBe(keyName);
      expect(signingKey.value).toBeDefined();
      // Value should be different after regeneration
      expect(signingKey.value).not.toBe(originalValue);
    } finally {
      await destroy(scope);
      await assertImagesSigningKeyDoesNotExist(keyName);
    }
  });

  test("adopt existing signing key", async (scope) => {
    const keyName = `${BRANCH_PREFIX}-adopt-key`;
    let signingKey1: Awaited<ReturnType<typeof ImagesSigningKey>>;
    let signingKey2: Awaited<ReturnType<typeof ImagesSigningKey>>;

    try {
      // Create the first signing key
      signingKey1 = await ImagesSigningKey("adopt-key-1", {
        name: keyName,
      });

      // Try to adopt the same key name (should succeed with adopt: true)
      signingKey2 = await ImagesSigningKey("adopt-key-2", {
        name: keyName,
        adopt: true,
      });

      expect(signingKey1.name).toBe(signingKey2.name);
      expect(signingKey1.value).toBe(signingKey2.value);
      expect(signingKey1.createdAt).toBe(signingKey2.createdAt);
    } finally {
      await destroy(scope);
      await assertImagesSigningKeyDoesNotExist(keyName);
    }
  });

  test("preserve signing key when delete is false", async (scope) => {
    const keyName = `${BRANCH_PREFIX}-preserve-key`;
    let signingKey: Awaited<ReturnType<typeof ImagesSigningKey>>;

    try {
      // Create signing key with delete: false
      signingKey = await ImagesSigningKey("preserve-key", {
        name: keyName,
        delete: false,
      });

      expect(signingKey).toMatchObject({
        name: keyName,
      });
      expect(signingKey.value).toBeDefined();

      // After destroy, the key should still exist in Cloudflare
      await destroy(scope);

      // Verify key still exists by attempting to adopt it
      const adoptedKey = await ImagesSigningKey("adopt-preserved-key", {
        name: keyName,
        adopt: true,
      });

      expect(adoptedKey.name).toBe(keyName);
      expect(adoptedKey.value).toBe(signingKey.value);

      // Clean up the preserved key
      await ImagesSigningKey("cleanup-preserved-key", {
        name: keyName,
        delete: true,
      });
      await destroy(scope);
    } finally {
      // Ensure cleanup
      await assertImagesSigningKeyDoesNotExist(keyName);
    }
  });
});

async function assertImagesSigningKeyDoesNotExist(keyName: string) {
  try {
    // Try to get the signing key to ensure it doesn't exist
    const { createCloudflareApi } = await import("../../src/cloudflare/api.ts");
    const api = await createCloudflareApi();

    const response = await api.get(
      `/accounts/${api.accountId}/images/v1/keys/${keyName}`,
    );

    if (response.ok) {
      throw new Error(`Images signing key ${keyName} should not exist`);
    }

    // Expect 404 or similar error
    expect(response.status).toBe(404);
  } catch (error) {
    if (error instanceof Error && error.message.includes("should not exist")) {
      throw error;
    }
    // Expected - signing key should not exist
  }
}
