import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import {
  VectorizeIndex,
  listIndexes,
} from "../../src/cloudflare/vectorize-index.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Vectorize Index Resource", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-index`;

  // Create Cloudflare API client for direct verification
  const api = await createCloudflareApi();

  test("create and delete index", async (scope) => {
    // Create a test index
    let index: VectorizeIndex | undefined;

    try {
      index = await VectorizeIndex(testId, {
        name: testId,
        dimensions: 768,
        metric: "cosine",
        adopt: true,
      });

      expect(index.name).toEqual(testId);
      expect(index.id).toBeTruthy();
      expect(index.dimensions).toEqual(768);
      expect(index.metric).toEqual("cosine");

      // Check if index exists by listing indexes
      const indexes = await listIndexes(api);
      const foundIndex = indexes.find((idx) => idx.name === testId);
      expect(foundIndex).toBeTruthy();
    } finally {
      await alchemy.destroy(scope);

      // Verify index was deleted
      if (index) {
        await assertIndexDeleted(index);
      }
    }
  });

  test("throws error on update attempts", async (scope) => {
    const updateIndex = `${testId}-no-update`;

    try {
      // Create an index
      const index = await VectorizeIndex(updateIndex, {
        name: updateIndex,
        dimensions: 768,
        metric: "cosine",
        adopt: true,
      });

      expect(index.name).toEqual(updateIndex);
      expect(index.dimensions).toEqual(768);

      // Attempt to update the index, which should throw an error indicating updates are not supported
      await expect(
        VectorizeIndex(updateIndex, {
          name: updateIndex,
          description: "Updated description",
          dimensions: 768,
          metric: "cosine",
          adopt: true,
        }),
      ).rejects.toThrow(
        "Updating Vectorize indexes is not supported by the Cloudflare API",
      );
    } finally {
      await alchemy.destroy(scope);
    }
  });
});

async function assertIndexDeleted(index: VectorizeIndex) {
  const api = await createCloudflareApi();
  try {
    // Try to get the index
    const response = await api.get(
      `/accounts/${api.accountId}/vectorize/v2/indexes/${index.name}`,
    );

    // If we get a 200, the index still exists
    if (response.ok) {
      throw new Error(`Index ${index.name} was not deleted as expected`);
    }

    // 404 (Not Found) or 410 (Gone) mean deleted, which is what we want
    if (response.status !== 404 && response.status !== 410) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    // If the error is a 404 or 410, the index was deleted as expected
    if (error.status === 404 || error.status === 410) {
      return; // This is expected
    } else {
      throw new Error(`Unexpected error type: ${error}`);
    }
  }
}
