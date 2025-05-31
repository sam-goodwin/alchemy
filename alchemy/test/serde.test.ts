import { describe, expect } from "bun:test";
import { alchemy } from "../src/alchemy.js";
import { Secret } from "../src/secret.js";
import { deserialize, serialize } from "../src/serde.js";
import { BRANCH_PREFIX } from "./util.js";

import "../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("serde", async () => {
  test("serializes and deserializes primitive values", async (scope) => {
    // Test primitive values
    const testCases = [42, "hello", true, null, undefined];

    for (const value of testCases) {
      const serialized = await serialize(scope, value);
      const deserialized = await deserialize(scope, serialized);
      expect(deserialized).toEqual(value);
    }
  });

  test("serializes and deserializes arrays", async (scope) => {
    const array = [1, "two", true, null];

    const serialized = await serialize(scope, array);
    const deserialized = await deserialize(scope, serialized);
    expect(deserialized).toEqual(array);
  });

  test("serializes and deserializes nested objects", async (scope) => {
    const obj = {
      a: 1,
      b: {
        c: "hello",
        d: [1, 2, 3],
        e: {
          f: true,
        },
      },
    };

    const serialized = await serialize(scope, obj);
    const deserialized = await deserialize(scope, serialized);
    expect(deserialized).toEqual(obj);
  });

  test("serializes and deserializes secrets", async (scope) => {
    const secret = alchemy.secret("sensitive-data");

    const serialized = await serialize(scope, secret);
    expect(serialized).toHaveProperty("@secret");
    expect(typeof serialized["@secret"]).toBe("string");
    expect(serialized["@secret"]).not.toContain("sensitive-data");

    const deserialized = await deserialize(scope, serialized);
    expect(deserialized).toBeInstanceOf(Secret);
    expect(deserialized.unencrypted).toBe("sensitive-data");
  });

  test("serializes scope to undefined", async (scope) => {
    const objWithScope = {
      scope: scope,
      data: "test",
    };

    const serialized = await serialize(scope, objWithScope);
    expect(serialized).toEqual({
      scope: {
        "@scope": null,
      },
      data: "test",
    });
  });

  test("handles complex objects with secrets", async (scope) => {
    const complexObj = {
      name: "test",
      credentials: {
        username: "user",
        password: alchemy.secret("super-secret"),
        apiKey: alchemy.secret("api-key-123"),
      },
      settings: {
        enabled: true,
        tokens: [alchemy.secret("token1"), alchemy.secret("token2")],
      },
    };

    const serialized = await serialize(scope, complexObj);
    const deserialized = await deserialize(scope, serialized);

    // Verify structure
    expect(deserialized).toHaveProperty("name", "test");
    expect(deserialized.credentials.username).toBe("user");
    expect(deserialized.credentials.password).toBeInstanceOf(Secret);
    expect(deserialized.credentials.password.unencrypted).toBe("super-secret");
    expect(deserialized.credentials.apiKey.unencrypted).toBe("api-key-123");
    expect(deserialized.settings.enabled).toBe(true);

    expect(deserialized.settings.tokens[0].unencrypted).toBe("token1");
    expect(deserialized.settings.tokens[1].unencrypted).toBe("token2");
  });

  test("props", async (scope) => {
    const props = {
      name: "alchemy.run",
      type: "full",
    };
    const serialized = await serialize(scope, props);
    expect(serialized).toEqual(props);
  });

  test("symbol property", async (scope) => {
    const props = {
      [Symbol.for("foo")]: "bar",
    };

    const serialized = await serialize(scope, props);
    expect(serialized).toEqual({
      "Symbol(foo)": "bar",
    });
    expect(await deserialize(scope, serialized)).toEqual(props);
  });

  test("symbol value", async (scope) => {
    const props = {
      foo: Symbol.for("bar"),
    };

    const serialized = await serialize(scope, props);
    expect(serialized).toEqual({
      foo: {
        "@symbol": "Symbol(bar)",
      },
    });
    expect(await deserialize(scope, serialized)).toEqual(props);
  });

  test("unique symbol property should error", async (scope) => {
    expect(
      serialize(scope, {
        [Symbol()]: "bar",
      }),
    ).rejects.toThrow();
    expect(
      serialize(scope, {
        [Symbol("foo")]: "bar",
      }),
    ).rejects.toThrow();
  });

  test("unique symbol value should error", async (scope) => {
    expect(
      serialize(scope, {
        foo: Symbol(),
      }),
    ).rejects.toThrow();
    expect(
      serialize(scope, {
        foo: Symbol("bar"),
      }),
    ).rejects.toThrow();
  });

  test("backwards compatibility can decrypt old v1 encrypted secrets", async (scope) => {
    const { encrypt: encryptV1 } = await import("../src/encrypt.js");
    const oldSecret = alchemy.secret("legacy-secret-data");

    if (!scope.password) {
      throw new Error("Password required for test");
    }

    const oldEncrypted = await encryptV1(oldSecret.unencrypted, scope.password);

    const oldSerializedData = {
      "@secret": oldEncrypted.startsWith("v1:")
        ? oldEncrypted.slice(3)
        : oldEncrypted,
    };

    const deserialized = await deserialize(scope, oldSerializedData);
    expect(deserialized).toBeInstanceOf(Secret);
    expect(deserialized.unencrypted).toBe("legacy-secret-data");
  });

  test("new encryption uses secure v2 method", async (scope) => {
    const secret = alchemy.secret("new-secure-data");

    const serialized = await serialize(scope, secret);
    expect(serialized).toHaveProperty("@secret");
    expect(typeof serialized["@secret"]).toBe("string");
    expect(serialized["@secret"]).toMatch(/^v2:/);
    expect(serialized["@secret"]).not.toContain("new-secure-data");

    const deserialized = await deserialize(scope, serialized);
    expect(deserialized).toBeInstanceOf(Secret);
    expect(deserialized.unencrypted).toBe("new-secure-data");
  });

  test("can decrypt both v1 and v2 encrypted data in same session", async (scope) => {
    const { encrypt: encryptV1 } = await import("../src/encrypt.js");

    if (!scope.password) {
      throw new Error("Password required for test");
    }

    const v1Encrypted = await encryptV1("v1-data", scope.password);
    const v1Data = {
      "@secret": v1Encrypted.startsWith("v1:")
        ? v1Encrypted.slice(3)
        : v1Encrypted,
    };

    const v2Secret = alchemy.secret("v2-data");
    const v2Data = await serialize(scope, v2Secret);

    const v1Deserialized = await deserialize(scope, v1Data);
    const v2Deserialized = await deserialize(scope, v2Data);

    expect(v1Deserialized.unencrypted).toBe("v1-data");
    expect(v2Deserialized.unencrypted).toBe("v2-data");
  });
});
