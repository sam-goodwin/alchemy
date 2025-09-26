import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { R2Object } from "../../src/cloudflare/bucket-object.ts";
import { R2Bucket } from "../../src/cloudflare/bucket.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("R2Object Resource", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testBucketName = `${BRANCH_PREFIX.toLowerCase()}-test-bucket-objects`;

  test("create, update, and delete object", async (scope) => {
    let bucket: R2Bucket | undefined;
    let textObject: R2Object | undefined;

    try {
      // Create a test bucket first
      bucket = await R2Bucket("test-bucket", {
        name: testBucketName,
        adopt: true,
        empty: true,
      });

      // Create a simple text object
      textObject = await R2Object("test-object", {
        bucket: bucket,
        key: "test-file.txt",
        content: "Hello, R2Object!",
      });

      expect(textObject.id).toEqual("test-object");
      expect(textObject.key).toEqual("test-file.txt");

      // Verify object exists in bucket
      const headResult = await bucket.head("test-file.txt");
      expect(headResult).toBeDefined();
      expect(headResult?.size).toBeGreaterThan(0);

      // Get and verify content
      const getResult = await bucket.get("test-file.txt");
      const content = await getResult?.text();
      expect(content).toEqual("Hello, R2Object!");

      // Update the object with new content
      textObject = await R2Object("test-object", {
        bucket: bucket,
        key: "test-file.txt",
        content: "Updated content!",
      });

      expect(textObject.key).toEqual("test-file.txt");

      // Verify updated content
      const updatedResult = await bucket.get("test-file.txt");
      const updatedContent = await updatedResult?.text();
      expect(updatedContent).toEqual("Updated content!");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      // Clean up - destroy will handle both object and bucket deletion
      await alchemy.destroy(scope);

      // Verify object was deleted
      if (bucket) {
        const deletedResult = await bucket.head("test-file.txt");
        expect(deletedResult).toBeNull();
      }
    }
  });

  test("object with JSON content", async (scope) => {
    let bucket: R2Bucket | undefined;

    try {
      bucket = await R2Bucket("json-bucket", {
        name: `${testBucketName}-json`,
        adopt: true,
        empty: true,
      });

      const configData = { version: "1.0.0", debug: true, features: ["auth"] };
      const jsonObject = await R2Object("config", {
        bucket: bucket,
        key: "config/app.json",
        content: JSON.stringify(configData),
      });

      expect(jsonObject.key).toEqual("config/app.json");

      // Verify JSON content
      const result = await bucket.get("config/app.json");
      const retrievedData = JSON.parse(await result?.text() || "{}");
      expect(retrievedData).toEqual(configData);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("object with binary content", async (scope) => {
    let bucket: R2Bucket | undefined;

    try {
      bucket = await R2Bucket("binary-bucket", {
        name: `${testBucketName}-binary`,
        adopt: true,
        empty: true,
      });

      // Create binary content (ArrayBuffer)
      const binaryData = new ArrayBuffer(1024);
      const view = new Uint8Array(binaryData);
      view.fill(42); // Fill with some test data

      const binaryObject = await R2Object("binary-file", {
        bucket: bucket,
        key: "data/binary.bin",
        content: binaryData,
      });

      expect(binaryObject.key).toEqual("data/binary.bin");

      // Verify binary content
      const result = await bucket.get("data/binary.bin");
      const retrievedBuffer = await result?.arrayBuffer();
      expect(retrievedBuffer?.byteLength).toEqual(1024);

      const retrievedView = new Uint8Array(retrievedBuffer!);
      expect(retrievedView[0]).toEqual(42);
      expect(retrievedView[500]).toEqual(42);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await alchemy.destroy(scope);
    }
  });
});
