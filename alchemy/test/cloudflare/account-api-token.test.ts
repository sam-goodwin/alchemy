import { beforeAll, describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { AccountApiToken } from "../../src/cloudflare/account-api-token.js";
import {
  type CloudflareApi,
  createCloudflareApi,
} from "../../src/cloudflare/api.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

// Create API client for verification
let api: CloudflareApi;

const test = alchemy.test(import.meta);

describe("AccountApiToken Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-token`;

  // Set up API client before tests
  beforeAll(async () => {
    api = await createCloudflareApi();
  });

  test("create, update, and delete token", async (scope) => {
    let token: AccountApiToken | undefined;
    try {
      // Create a test token with minimal permissions
      token = await AccountApiToken(testId, {
        name: `Test Token ${testId}`,
        policies: [
          {
            effect: "allow",
            permissionGroups: [
              // Use a read-only permission group to minimize risk in test
              { id: "c8fed203ed3043cba015a93ad1616f1f" }, // Zone Read permission
            ],
            resources: {
              [`com.cloudflare.api.account.${api.accountId}`]: "*",
            },
          },
        ],
        // Short expiration for test tokens
        expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      });

      // Verify token was created
      expect(token.id).toBeTruthy();
      expect(token.name).toEqual(`Test Token ${testId}`);
      expect(token.status).toEqual("active");
      expect(token.value).toBeTruthy(); // Should have a token value on creation

      // Keep token ID for verification
      const tokenId = token.id;

      // Verify token was created by querying the API directly
      const getResponse = await api.get(
        `/accounts/${api.accountId}/tokens/${tokenId}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData: any = await getResponse.json();
      expect(responseData.result.name).toEqual(`Test Token ${testId}`);

      // Update the token
      token = await AccountApiToken(testId, {
        name: `Updated Token ${testId}`,
        policies: [
          {
            effect: "allow",
            permissionGroups: [
              { id: "c8fed203ed3043cba015a93ad1616f1f" }, // Zone Read permission
            ],
            resources: {
              [`com.cloudflare.api.account.${api.accountId}`]: "*",
            },
          },
        ],
        expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      });

      expect(token.id).toEqual(tokenId);
      expect(token.name).toEqual(`Updated Token ${testId}`);

      // Verify token was updated
      const getUpdatedResponse = await api.get(
        `/accounts/${api.accountId}/tokens/${tokenId}`,
      );
      const updatedData: any = await getUpdatedResponse.json();
      expect(updatedData.result.name).toEqual(`Updated Token ${testId}`);
    } catch (err) {
      // Log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify token was deleted if it was created
      if (token?.id) {
        const getDeletedResponse = await api.get(
          `/accounts/${api.accountId}/tokens/${token.id}`,
        );
        expect(getDeletedResponse.status).toEqual(404);
      }
    }
  });
});
