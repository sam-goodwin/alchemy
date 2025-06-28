import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { ApiToken } from "../../src/turso/api-token.ts";
import { getTursoApi } from "../../src/turso/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Turso ApiToken", () => {
  test("create api token", async (scope) => {
    const tokenId = `${BRANCH_PREFIX}-token`;
    const tokenName = `${BRANCH_PREFIX}-test-token`;
    let token: ApiToken;

    try {
      // Create new token
      token = await ApiToken(tokenId, {
        name: tokenName,
      });

      expect(token).toMatchObject({
        type: "turso::api-token",
        name: tokenName,
      });
      expect(token.id).toBeDefined();
      expect(token.token).toBeDefined();
      expect(typeof token.token).toBe("string");
      expect(token.token!.length).toBeGreaterThan(0);
    } finally {
      await destroy(scope);
      await assertTokenDoesNotExist(tokenName);
    }
  });

  test("idempotent token creation", async (scope) => {
    const tokenId = `${BRANCH_PREFIX}-idempotent`;
    const tokenName = `${BRANCH_PREFIX}-idempotent-token`;
    let token1: ApiToken;
    let token2: ApiToken;

    try {
      // Create token first time
      token1 = await ApiToken(tokenId, {
        name: tokenName,
      });

      expect(token1.token).toBeDefined();

      // Create same token again - should return existing
      token2 = await ApiToken(tokenId, {
        name: tokenName,
      });

      // Second call should not have token value
      expect(token2.token).toBeUndefined();
      expect(token2.id).toBe(token1.id);
      expect(token2.name).toBe(token1.name);
    } finally {
      await destroy(scope);
      await assertTokenDoesNotExist(tokenName);
    }
  });

  test("multiple tokens with different names", async (scope) => {
    const tokenNames = [
      `${BRANCH_PREFIX}-ci-token`,
      `${BRANCH_PREFIX}-dev-token`,
      `${BRANCH_PREFIX}-prod-token`,
    ];
    let tokens: ApiToken[] = [];

    try {
      // Create multiple tokens
      tokens = await Promise.all([
        ApiToken("token1", { name: tokenNames[0] }),
        ApiToken("token2", { name: tokenNames[1] }),
        ApiToken("token3", { name: tokenNames[2] }),
      ]);

      expect(tokens).toHaveLength(3);

      // All tokens should have unique IDs and token values
      const ids = tokens.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);

      // All should have token values on creation
      for (const token of tokens) {
        expect(token.token).toBeDefined();
      }
    } finally {
      await destroy(scope);
      for (const name of tokenNames) {
        await assertTokenDoesNotExist(name);
      }
    }
  });

  test("validate token name required", async (scope) => {
    const tokenId = `${BRANCH_PREFIX}-no-name`;

    await expect(
      ApiToken(tokenId, {
        name: "",
      }),
    ).rejects.toThrow("Token name is required");
  });
});

async function assertTokenDoesNotExist(tokenName: string) {
  const api = getTursoApi();

  try {
    const response = await api.get<{ tokens: Array<{ name: string }> }>(
      "/v1/auth/api-tokens",
    );

    const tokenExists = response.tokens.some(
      (token) => token.name === tokenName,
    );
    if (tokenExists) {
      throw new Error(
        `API token '${tokenName}' still exists when it should have been deleted`,
      );
    }
  } catch (error: any) {
    // If we can't list tokens, that's fine - the token might not exist
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}
