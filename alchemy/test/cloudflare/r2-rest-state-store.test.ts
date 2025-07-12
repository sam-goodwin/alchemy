import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { getBucket } from "../../src/cloudflare/bucket.ts";
import { BRANCH_PREFIX } from "../util.ts";

import { destroy } from "../../src/destroy.ts";
import { R2RestStateStore } from "../../src/state/r2-rest-state-store.ts";
import "../../src/test/vitest.ts";

describe("R2RestStateStore", async () => {
  const test = alchemy.test(import.meta, {
    // Isolate the default state store bucket from other tests' stores
    prefix: `${BRANCH_PREFIX}-r2-rest-state-store`,
    stateStore: (scope) => new R2RestStateStore(scope),
  });

  // For public access, we still need to use the Cloudflare API
  // This is one feature not available through the S3 API
  const api = await createCloudflareApi();

  test("optimistically creates alchemy-state bucket", async (scope) => {
    try {
      const defaultBucketName = "alchemy-state";
      const bucket = await getBucket(api, defaultBucketName);

      expect(bucket.result.name).toEqual(defaultBucketName);
    } finally {
      await destroy(scope);
    }
  });
});
