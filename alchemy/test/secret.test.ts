import { describe, expect } from "vitest";
import { alchemy } from "../src/alchemy.ts";
import { serialize, deserialize } from "../src/serde.ts";
import { encrypt, decryptWithKey } from "../src/encrypt.ts";
import { destroy } from "../src/destroy.ts";
import { BRANCH_PREFIX } from "./util.ts";
// must import this or else alchemy.test won't exist
import "../src/test/vitest.ts";
import { SALT_KEY } from "../src/secret.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe.sequential("Secret serialization", () => {
  test(
    "should create salt on first secret serialization",
    {
      password: "test-password-456",
      prefix: `${BRANCH_PREFIX}-salt-creation-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        // Verify no salt exists initially
        const initialSalt = await scope.root.state.get(SALT_KEY);
        expect(initialSalt).toBeUndefined();

        // Create and serialize a secret - this should create the salt
        const secret = alchemy.secret("test-value");
        const serialized = await serialize(scope, secret);

        // Verify salt was created
        const saltState = await scope.root.state.get(SALT_KEY);
        expect(saltState).toBeTruthy();
        expect(saltState!.data).toBeTruthy();
        expect(saltState!.data.value).toBeTruthy();
        expect(typeof saltState!.data.value).toBe("string");

        // Also verify the secret was properly serialized
        expect(serialized).toHaveProperty("@secret");
        expect(typeof serialized["@secret"]).toBe("string");

        // And can be deserialized
        const deserialized = await deserialize(scope, serialized);
        expect(deserialized.unencrypted).toBe("test-value");
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );

  test(
    "should serialize and deserialize secrets correctly",
    {
      password: "test-password-123",
      prefix: `${BRANCH_PREFIX}-basic-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        // Create a secret
        const originalValue = "my-secret-api-key";
        const secret = alchemy.secret(originalValue);

        // Serialize the secret (this will create salt since we cleaned it up)
        const serialized = await serialize(scope, secret);

        // Should be encrypted (not plain text)
        expect(serialized).toHaveProperty("@secret");
        expect(typeof serialized["@secret"]).toBe("string");
        expect(serialized["@secret"]).not.toBe(originalValue);
        expect(serialized["@secret"].length).toBeGreaterThan(0);

        // Deserialize the secret
        const deserialized = await deserialize(scope, serialized);

        // Should get back the original value
        expect(deserialized.unencrypted).toBe(originalValue);
        expect(deserialized.type).toBe("secret");
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );

  test(
    "should reuse existing salt for multiple secrets",
    {
      password: "test-password-789",
      prefix: `${BRANCH_PREFIX}-salt-reuse-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        // Create and serialize first secret - this creates the salt
        const secret1 = alchemy.secret("secret-one");
        const serialized1 = await serialize(scope, secret1);
        const deserialized1 = await deserialize(scope, serialized1);
        expect(deserialized1.unencrypted).toBe("secret-one");

        // Get the salt value
        const saltState = await scope.root.state.get(SALT_KEY);
        expect(saltState).toBeTruthy();
        const originalSaltValue = saltState!.data.value;

        // Create and serialize second secret - should use existing salt
        const secret2 = alchemy.secret("secret-two");
        const serialized2 = await serialize(scope, secret2);
        const deserialized2 = await deserialize(scope, serialized2);
        expect(deserialized2.unencrypted).toBe("secret-two");

        // Create and serialize third secret - should also use existing salt
        const secret3 = alchemy.secret("secret-three");
        const serialized3 = await serialize(scope, secret3);
        const deserialized3 = await deserialize(scope, serialized3);
        expect(deserialized3.unencrypted).toBe("secret-three");

        // Verify salt wasn't recreated
        const finalSaltState = await scope.root.state.get(SALT_KEY);
        expect(finalSaltState!.data.value).toBe(originalSaltValue);
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );

  test(
    "should handle different secret values correctly",
    {
      password: "test-password-abc",
      prefix: `${BRANCH_PREFIX}-different-values-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        // Test various secret values
        const testValues = [
          "simple-string",
          "complex-string-with-symbols!@#$%^&*()",
          "very-long-string-" + "x".repeat(1000),
          "unicode-string-🔐🔑🛡️",
          "",
          " ",
          "newline\nstring",
          "tab\tstring",
        ];

        for (const value of testValues) {
          const secret = alchemy.secret(value);
          const serialized = await serialize(scope, secret);
          const deserialized = await deserialize(scope, serialized);

          expect(deserialized.unencrypted).toBe(value);
          expect(serialized).toHaveProperty("@secret");
          expect(serialized["@secret"]).not.toBe(value);
        }
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );

  test(
    "should have consistent serialization format",
    {
      password: "test-password-format",
      prefix: `${BRANCH_PREFIX}-format-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        const secret = alchemy.secret("test-value");
        const serialized1 = await serialize(scope, secret);
        const serialized2 = await serialize(scope, secret);

        // Both serializations should have the @secret property
        expect(serialized1).toHaveProperty("@secret");
        expect(serialized2).toHaveProperty("@secret");

        // But should be different due to different nonces
        expect(serialized1["@secret"]).not.toBe(serialized2["@secret"]);

        // Both should deserialize to the same value
        const deserialized1 = await deserialize(scope, serialized1);
        const deserialized2 = await deserialize(scope, serialized2);
        expect(deserialized1.unencrypted).toBe("test-value");
        expect(deserialized2.unencrypted).toBe("test-value");
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );

  test(
    "should maintain backwards compatibility with old encrypted values",
    {
      password: "test-password-compat",
      prefix: `${BRANCH_PREFIX}-compat-${Date.now()}`,
    },
    async (scope) => {
      try {
        // Clean up any existing salt first
        const existingSalt = await scope.root.state.get(SALT_KEY);
        if (existingSalt) {
          await scope.root.state.delete(SALT_KEY);
        }

        const testValue = "legacy-secret-value";
        const password = scope.password!;

        // Create an old-style encrypted value (no salt, uses generichash)
        const oldEncrypted = await encrypt(testValue, password); // no scope = generichash

        // Manually create a serialized secret with the old format
        const oldFormatSerialized = {
          "@secret": oldEncrypted,
        };

        // This should still deserialize correctly (backward compatibility)
        const deserialized = await deserialize(scope, oldFormatSerialized);
        expect(deserialized.unencrypted).toBe(testValue);

        // Now create a new secret which will create salt and use pwhash
        const newSecret = alchemy.secret(testValue);
        const newFormatSerialized = await serialize(scope, newSecret);

        // Verify salt was created
        const saltState = await scope.root.state.get(SALT_KEY);
        expect(saltState).toBeTruthy();

        // New format should also deserialize correctly
        const newDeserialized = await deserialize(scope, newFormatSerialized);
        expect(newDeserialized.unencrypted).toBe(testValue);

        // The old and new encrypted values should be different (different algorithms)
        expect(oldFormatSerialized["@secret"]).not.toBe(
          newFormatSerialized["@secret"],
        );

        // But both should decrypt to the same value using their respective methods
        const oldDecrypted = await decryptWithKey(oldEncrypted, password); // no scope = generichash
        const newDecrypted = await decryptWithKey(
          newFormatSerialized["@secret"],
          password,
          scope,
        ); // with scope = pwhash
        expect(oldDecrypted).toBe(testValue);
        expect(newDecrypted).toBe(testValue);
      } finally {
        // Clean up salt
        try {
          if (scope?.root?.state) {
            await scope.root.state.delete(SALT_KEY);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
        await destroy(scope);
      }
    },
  );
});
