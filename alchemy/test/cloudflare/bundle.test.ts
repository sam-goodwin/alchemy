import * as path from "node:path";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import "../../src/test/vitest.ts";
import { BRANCH_PREFIX } from "../util.ts";
import { fetchAndExpectOK } from "./fetch-utils.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const entrypoint = path.resolve(__dirname, "bundle-handler.ts");
const entrypoint_als = path.resolve(__dirname, "bundle-handler-als.ts");
const entrypoint_grammy = path.resolve(__dirname, "bundle-handler-grammy.ts");

describe("Bundle Worker Test", () => {
  test("create, test, and delete worker from bundle", async (scope) => {
    try {
      // Create a worker using the entrypoint file
      const worker = await Worker(`${BRANCH_PREFIX}-test-bundle-worker`, {
        entrypoint,
        format: "esm", // Assuming bundle-handler.ts is ESM
        url: true, // Enable workers.dev URL to test the worker
        compatibilityFlags: ["nodejs_compat"],
        adopt: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetchAndExpectOK(worker.url!);
      const text = await response.text();
      // Check against the expected response from bundle-handler.ts
      expect(text).toEqual("Hello World!");
    } finally {
      // Clean up the worker
      await destroy(scope);
    }
  }, 120000); // Increased timeout for bundling and deployment

  test("create, test and delete a worker with 'nodejs_als' compatibility flag", async (scope) => {
    try {
      // Create a worker using the entrypoint file
      const worker = await Worker(`${BRANCH_PREFIX}-test-bundle-worker-als`, {
        entrypoint: entrypoint_als,
        format: "esm", // Assuming bundle-handler.ts is ESM
        url: true, // Enable workers.dev URL to test the worker
        compatibilityFlags: ["nodejs_als"],
        adopt: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetchAndExpectOK(worker.url!);
      const text = await response.text();
      // Check against the expected response from bundle-handler.ts
      expect(text).toEqual("function");
    } finally {
      // Clean up the worker
      await destroy(scope);
    }
  }, 120000); // Increased timeout for bundling and deployment

  test("error when using 'nodejs_compat' compatibility flag with a compatibility date before Sept 23rd 2024", async (scope) => {
    try {
      // Create a worker using the entrypoint file
      await expect(
        Worker(`${BRANCH_PREFIX}-test-bundle-worker-legacy`, {
          entrypoint,
          format: "esm",
          url: true,
          compatibilityDate: "2024-09-22", // v1 mode (before Sept 23rd 2024)
          compatibilityFlags: ["nodejs_compat"],
          adopt: true,
        }),
      ).rejects.toThrow(
        "You must set your compatibilty date >= 2024-09-23 when using 'nodejs_compat' compatibility flag",
      );
    } finally {
      // Clean up the worker
      await destroy(scope);
    }
  }, 120000); // Increased timeout for bundling and deployment

  test("should return a list of imported files when noBundle is true", async (scope) => {
    try {
      const worker = await Worker(`${BRANCH_PREFIX}-test-no-bundle`, {
        url: true,
        entrypoint: path.resolve(__dirname, "nobundle", "index.js"),
        format: "esm",
        noBundle: true,
        compatibilityDate: "2025-05-30",
        compatibilityFlags: [],
        adopt: true,
      });

      const response = await fetchAndExpectOK(worker.url!);
      const text = await response.text();
      expect(text).toEqual(
        JSON.stringify({
          foo: "foo",
          bar: "bar",
        }),
      );
    } finally {
      await destroy(scope);
    }
  });

  test("should bundle grammy", async (scope) => {
    try {
      // Create a worker using the entrypoint file
      const worker = await Worker(`${BRANCH_PREFIX}-test-bundle-worker`, {
        entrypoint: entrypoint_grammy,
        format: "esm", // Assuming bundle-handler.ts is ESM
        url: true, // Enable workers.dev URL to test the worker
        compatibilityFlags: ["nodejs_compat"],
        adopt: true,
        compatibilityDate: "2025-07-20",
        bundle: {
          outdir: ".out",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetchAndExpectOK(worker.url!);
      const text = await response.text();
      // Check against the expected response from bundle-handler.ts
      expect(text).toEqual("Hello World!");
    } finally {
      // Clean up the worker
      await destroy(scope);
    }
  }, 120000); // Increased timeout for bundling and deployment
});
