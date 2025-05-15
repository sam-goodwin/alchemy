import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { BrowserRendering } from "../../src/cloudflare/browser-rendering.js";
import { KVNamespace } from "../../src/cloudflare/kv-namespace.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import path from "node:path";
import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Browser Rendering Resource", () => {
  test("create worker with browser rendering binding and take screenshot", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-browser-renderer`;
    const kvNamespaceName = `${BRANCH_PREFIX}-browser-kv-demo`;

    let worker: Worker | undefined;
    let kvNamespace: KVNamespace | undefined;

    try {
      // Create a KV namespace for caching screenshots
      kvNamespace = await KVNamespace(kvNamespaceName, {
        title: `${BRANCH_PREFIX} Browser KV Demo`,
      });

      expect(kvNamespace.title).toEqual(`${BRANCH_PREFIX} Browser KV Demo`);

      // Create a worker with browser rendering binding
      worker = await Worker(workerName, {
        name: workerName,
        entrypoint: path.join(import.meta.dirname, "browser-handler.ts"),
        format: "esm",
        compatibilityFlags: ["nodejs_compat"], // Required for puppeteer
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          MYBROWSER: new BrowserRendering(),
          BROWSER_KV_DEMO: kvNamespace,
        },
        bundle: {
          platform: "node",
        },
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.url).toBeTruthy();

      // Test taking a screenshot of Google
      const response = await fetch(`${worker.url}?url=https://google.com`);
      expect(response.status).toEqual(200);
      expect(response.headers.get("content-type")).toEqual("image/jpeg");

      // Verify we got an actual image by checking content length
      const imageBuffer = await response.arrayBuffer();
      expect(imageBuffer.byteLength).toBeGreaterThan(1000); // A valid screenshot should be at least 1KB

      // Test fetching from cache
      console.log("Testing cached screenshot...");
      const cachedResponse = await fetch(
        `${worker.url}?url=https://google.com`,
      );
      expect(cachedResponse.status).toEqual(200);

      // Take a screenshot of a different URL
      console.log("Testing screenshot of a different URL...");
      const anotherResponse = await fetch(
        `${worker.url}?url=https://example.com`,
      );
      expect(anotherResponse.status).toEqual(200);

      // Test error case - missing URL parameter
      console.log("Testing error case - missing URL parameter...");
      const errorResponse = await fetch(worker.url!);
      expect(errorResponse.status).toEqual(200); // The worker returns 200 even for the error case
      const errorText = await errorResponse.text();
      expect(errorText).toEqual(
        "Please add an ?url=https://example.com/ parameter",
      );
    } finally {
      await destroy(scope);
    }
  }, 120000); // Longer timeout for browser rendering operations
});
