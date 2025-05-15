import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { getBucket } from "../../src/cloudflare/bucket.js";
import { BRANCH_PREFIX } from "../util.js";

import { R2RestStateStore } from "../../src/cloudflare/r2-rest-state-store.js";
import "../../src/test/bun.js";

describe("R2RestStateStore", async () => {
  const test = alchemy.test(import.meta, {
    // Isolate the default state store bucket from other tests' stores
    prefix: `${BRANCH_PREFIX}-r2-rest-state-store`,
    stateStore: (scope) => new R2RestStateStore(scope),
  });

  // For public access, we still need to use the Cloudflare API
  // This is one feature not available through the S3 API
  const api = await createCloudflareApi();

  test("optimistically creates alchemy-state bucket", async () => {
    const defaultBucketName = "alchemy-state";
    const bucket = await getBucket(api, defaultBucketName);

    expect(bucket.result.name).toEqual(defaultBucketName);
  });
});
