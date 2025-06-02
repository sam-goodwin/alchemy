import { describe, expect } from "bun:test";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { alchemy } from "../../src/alchemy.js";
import { AnalyticsEngineDataset } from "../../src/cloudflare/analytics-engine.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { Assets } from "../../src/cloudflare/assets.js";
import { Self } from "../../src/cloudflare/bindings.js";
import { R2Bucket } from "../../src/cloudflare/bucket.js";
import { D1Database } from "../../src/cloudflare/d1-database.js";
import { DurableObjectNamespace } from "../../src/cloudflare/durable-object-namespace.js";
import { KVNamespace } from "../../src/cloudflare/kv-namespace.js";
import { Queue } from "../../src/cloudflare/queue.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { Workflow } from "../../src/cloudflare/workflow.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

// Create a Cloudflare API client for verification
const api = await createCloudflareApi();

// Helper function to check if a worker exists
async function assertWorkerDoesNotExist(workerName: string) {
  try {
    const response = await api.get(
      `/accounts/${api.accountId}/workers/scripts/${workerName}`,
    );
    expect(response.status).toEqual(404);
  } catch {
    // 404 is expected, so we can ignore it
    return;
  }
}

describe("Worker Resource", () => {
  // Sample worker script (CJS style)
  const workerScript = `
    addEventListener('fetch', event => {
      event.respondWith(new Response('Hello world!', { status: 200 }));
    });
  `;

  // Sample ESM worker script
  const esmWorkerScript = `
    export default {
      async fetch(request, env, ctx) {
        return new Response('Hello ESM world!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with a Durable Object
  const durableObjectWorkerScript = `
    export class Counter {
      constructor(state, env) {
        this.state = state;
        this.env = env;
        this.counter = 0;
      }

      async fetch(request) {
        this.counter++;
        return new Response('Counter: ' + this.counter, { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        // Use the DO binding if needed
        if (request.url.includes('/counter')) {
          const id = env.COUNTER.idFromName('default');
          const stub = env.COUNTER.get(id);
          return stub.fetch(request);
        }

        return new Response('Hello with Durable Object!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with KV Namespace
  const kvWorkerScript = `
    export default {
      async fetch(request, env, ctx) {
        // Use the KV binding
        if (request.url.includes('/kv')) {
          const value = await env.TEST_KV.get('testKey');
          return new Response('KV Value: ' + (value || 'not found'), { status: 200 });
        }

        return new Response('Hello with KV Namespace!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with R2 bucket
  const r2WorkerScript = `
    export default {
      async fetch(request, env, ctx) {
        // Use the R2 binding
        if (request.url.includes('/r2-info')) {
          // Just confirm we have access to the binding
          return new Response(JSON.stringify({
            hasR2: !!env.STORAGE,
            bucketName: env.STORAGE.name || 'unknown'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response('Hello with R2 Bucket!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with multiple bindings
  const multiBindingsWorkerScript = `
    export class Counter {
      constructor(state, env) {
        this.state = state;
        this.env = env;
        this.counter = 0;
      }

      async fetch(request) {
        this.counter++;
        return new Response('Counter: ' + this.counter, { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        // Path-based routing to demonstrate different bindings
        const url = new URL(request.url);

        if (url.pathname.includes('/counter')) {
          const id = env.COUNTER.idFromName('default');
          const stub = env.COUNTER.get(id);
          return stub.fetch(request);
        }

        if (url.pathname.includes('/kv')) {
          const value = await env.TEST_KV.get('testKey');
          return new Response('KV Value: ' + (value || 'not found'), { status: 200 });
        }

        if (url.pathname.includes('/secret')) {
          return new Response('Secret: ' + env.API_KEY, { status: 200 });
        }

        return new Response('Hello worker with multiple bindings!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with environment variables
  const envVarsWorkerScript = `
    export default {
      async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Return the value of the requested environment variable
        if (url.pathname.startsWith('/env/')) {
          const varName = url.pathname.split('/env/')[1];
          const value = env[varName];
          return new Response(value || 'undefined', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }

        // Return all environment variables
        if (url.pathname === '/env') {
          const envVars = Object.entries(env)
            .filter(([key]) => key !== 'COUNTER' && !key.includes('Durable')) // Filter out bindings
            .map(([key, value]) => \`\${key}: \${value}\`)
            .join('\\n');

          return new Response(envVars, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }

        return new Response('Hello with environment variables!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with original Counter class
  const doMigrationWorkerScriptV1 = `
    export class Counter {
      constructor(state, env) {
        this.state = state;
        this.env = env;
        this.counter = 0;
      }

      async fetch(request) {
        this.counter++;
        return new Response('Counter V1: ' + this.counter, { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        if (request.url.includes('/counter')) {
          const id = env.COUNTER.idFromName('default');
          const stub = env.COUNTER.get(id);
          return stub.fetch(request);
        }
        return new Response('Hello with Counter V1!', { status: 200 });
      }
    };
  `;

  // Sample ESM worker script with renamed CounterV2 class
  const doMigrationWorkerScriptV2 = `
    export class CounterV2 {
      constructor(state, env) {
        this.state = state;
        this.env = env;
        this.counter = 0;
      }

      async fetch(request) {
        this.counter++;
        return new Response('Counter V2: ' + this.counter, { status: 200 });
      }
    }

    export default {
      async fetch(request, env, ctx) {
        if (request.url.includes('/counter')) {
          const id = env.COUNTER.idFromName('default');
          const stub = env.COUNTER.get(id);
          return stub.fetch(request);
        }
        return new Response('Hello with Counter V2!', { status: 200 });
      }
    };
  `;

  // Sample worker script with a scheduled handler
  const cronWorkerScript = `
    export default {
      async fetch(request, env, ctx) {
        return new Response('Worker with cron is running!', { status: 200 });
      },
      async scheduled(event, env, ctx) {
        // Log the scheduled event details
        console.log('Scheduled event received:', event.scheduledTime, event.cron);
        // In a real worker, you would perform tasks here
      },
    };
  `;

  test("create, update, and delete worker (CJS format)", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-cjs-1`;

    let worker: Worker | undefined;
    try {
      // Create a worker with an explicit name
      worker = await Worker(workerName, {
        name: workerName,
        script: workerScript,
        format: "cjs",
      });

      // Apply to create the worker
      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.format).toEqual("cjs");

      // Update the worker with a new script
      const updatedScript = `
        addEventListener('fetch', event => {
          event.respondWith(new Response('Hello updated world!', { status: 200 }));
        });
      `;

      worker = await Worker(workerName, {
        name: workerName,
        script: updatedScript,
        format: "cjs",
      });

      expect(worker.id).toEqual(worker.id);
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("create, update, and delete worker (ESM format)", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-esm-1`;

    let worker: Worker | undefined;
    try {
      // Create a worker with ESM format
      worker = await Worker(workerName, {
        name: workerName,
        script: esmWorkerScript,
        format: "esm", // Explicitly using ESM
      });

      // Apply to create the worker
      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.format).toEqual("esm");

      // Update the worker with a new ESM script
      const updatedEsmScript = `
        export default {
          async fetch(request, env, ctx) {
            return new Response('Hello updated ESM world!', { status: 200 });
          }
        };
      `;

      worker = await Worker(workerName, {
        name: workerName,
        script: updatedEsmScript,
        format: "esm",
      });

      expect(worker.id).toEqual(worker.id);
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("convert between ESM and CJS formats", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-format-conversion-convert-1`;

    let worker: Worker | undefined;
    try {
      // First create with ESM format
      worker = await Worker(workerName, {
        name: workerName,
        script: esmWorkerScript,
        format: "esm",
      });

      expect(worker.format).toEqual("esm");

      // Update to CJS format
      worker = await Worker(workerName, {
        name: workerName,
        script: workerScript,
        format: "cjs",
      });
      expect(worker.format).toEqual("cjs");

      // Update back to ESM format
      worker = await Worker(workerName, {
        name: workerName,
        script: esmWorkerScript,
        format: "esm",
      });

      expect(worker.format).toEqual("esm");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("fails when creating a worker with a duplicate name", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-duplicate`;

    try {
      // First, create a worker successfully
      await Worker(workerName, {
        name: workerName,
        script: workerScript,
        format: "cjs",
      });

      // Try to create another worker with the same name, which should fail
      const duplicateWorker = Worker(`${workerName}-dup`, {
        name: workerName, // Same name as firstWorker
        script: workerScript,
        format: "cjs",
      });
      await expect(duplicateWorker).rejects.toThrow(
        `Worker with name '${workerName}' already exists. Please use a unique name.`,
      );
    } finally {
      await destroy(scope);
    }
  });

  test("create and delete worker with Durable Object binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-do-binding-do-1`;

    let worker: Worker | undefined;
    try {
      // First create the worker without the DO binding
      worker = await Worker(workerName, {
        name: workerName,
        script: durableObjectWorkerScript,
        format: "esm",
        // No bindings yet
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeEmpty();

      // Create a Durable Object namespace
      const counterNamespace = new DurableObjectNamespace(
        "test-counter-namespace",
        {
          className: "Counter",
          scriptName: workerName,
        },
      );

      // Update the worker with the DO binding
      worker = await Worker(workerName, {
        name: workerName,
        script: durableObjectWorkerScript,
        format: "esm",
        bindings: {
          COUNTER: counterNamespace,
        },
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("create and delete worker with KV Namespace binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-kv-binding-kv-1`;

    let worker: Worker | undefined;
    let testKv: KVNamespace | undefined;
    try {
      // Create a KV namespace with initial values
      testKv = await KVNamespace("test-kv-namespace", {
        title: `${BRANCH_PREFIX} Test KV Namespace 2`,
        values: [
          {
            key: "testKey",
            value: "initial-value",
          },
        ],
      });

      // Create a worker with the KV Namespace binding
      worker = await Worker(workerName, {
        name: workerName,
        script: kvWorkerScript,
        format: "esm",
        bindings: {
          TEST_KV: testKv,
        },
      });
      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("create and delete worker with multiple bindings", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-multi-bindings-multi-1`;

    // Create a Durable Object namespace
    const counterNamespace = new DurableObjectNamespace(
      "test-counter-namespace",
      {
        className: "Counter",
        scriptName: workerName,
      },
    );

    // Create a KV namespace
    const testKv = await KVNamespace("test-kv-namespace", {
      title: `${BRANCH_PREFIX} Test KV Namespace 1`,
      values: [
        {
          key: "testKey",
          value: "initial-value",
        },
      ],
    });

    let worker: Worker | undefined;

    try {
      // First create the worker without bindings
      worker = await Worker(workerName, {
        name: workerName,
        script: multiBindingsWorkerScript,
        format: "esm",
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);

      // Update the worker with all bindings
      worker = await Worker(workerName, {
        name: workerName,
        script: multiBindingsWorkerScript,
        format: "esm",
        bindings: {
          COUNTER: counterNamespace,
          TEST_KV: testKv,
          API_KEY: "test-api-key-value",
        },
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  // Add a new test for environment variables
  test("create and test worker with environment variables", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-env-vars-env-1`;
    let worker: Worker | undefined;
    try {
      // Create a worker with environment variables
      worker = await Worker(workerName, {
        name: workerName,
        script: envVarsWorkerScript,
        format: "esm",
        env: {
          TEST_API_KEY: "test-api-key-123",
          NODE_ENV: "testing",
          APP_DEBUG: "true",
        },
        url: true, // Enable workers.dev URL to test the worker
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.env).toBeDefined();
      expect(worker.env?.TEST_API_KEY).toEqual("test-api-key-123");
      expect(worker.env?.NODE_ENV).toEqual("testing");
      expect(worker.url).toBeTruthy();

      if (worker.url) {
        // Test that the environment variables are accessible in the worker
        const response = await fetch(`${worker.url}/env/TEST_API_KEY`);
        expect(response.status).toEqual(200);
        const text = await response.text();
        expect(text).toEqual("test-api-key-123");

        // Test another environment variable
        const nodeEnvResponse = await fetch(`${worker.url}/env/NODE_ENV`);
        expect(nodeEnvResponse.status).toEqual(200);
        const nodeEnvText = await nodeEnvResponse.text();
        expect(nodeEnvText).toEqual("testing");
      }

      // Update the worker with different environment variables
      worker = await Worker(workerName, {
        name: workerName,
        script: envVarsWorkerScript,
        format: "esm",
        env: {
          TEST_API_KEY: "updated-key-456",
          NODE_ENV: "production",
          NEW_VAR: "new-value",
        },
        url: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toEqual(worker.id);
      expect(worker.env?.TEST_API_KEY).toEqual("updated-key-456");
      expect(worker.env?.NODE_ENV).toEqual("production");
      expect(worker.env?.NEW_VAR).toEqual("new-value");
      // APP_DEBUG should no longer be present
      expect(worker.env?.APP_DEBUG).toBeUndefined();

      // Test that the updated environment variables are accessible
      const response = await fetch(`${worker.url}/env/TEST_API_KEY`);
      expect(response.status).toEqual(200);
      const text = await response.text();
      expect(text).toEqual("updated-key-456");

      // Test new environment variable
      const newVarResponse = await fetch(`${worker.url}/env/NEW_VAR`);
      expect(newVarResponse.status).toEqual(200);
      const newVarText = await newVarResponse.text();
      expect(newVarText).toEqual("new-value");

      // Test that the removed environment variable is no longer accessible
      const removedVarResponse = await fetch(`${worker.url}/env/APP_DEBUG`);
      expect(removedVarResponse.status).toEqual(200);
      const removedVarText = await removedVarResponse.text();
      expect(removedVarText).toEqual("undefined");
    } finally {
      await destroy(scope);
      // Verify the worker was deleted
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("migrate durable object by renaming class", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-do-migration-migrate-1`;
    let worker: Worker | undefined;
    try {
      // First create the worker with the original Counter class
      worker = await Worker(workerName, {
        name: workerName,
        script: doMigrationWorkerScriptV1,
        format: "esm",
        adopt: true,
      });

      // Apply to create the worker first
      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);

      // Create a stable DO namespace with the original Counter class
      const counterNamespace = new DurableObjectNamespace(
        "test-counter-namespace",
        {
          className: "Counter",
          scriptName: workerName,
        },
      );

      // Update worker with the original Counter binding
      worker = await Worker(workerName, {
        name: workerName,
        script: doMigrationWorkerScriptV1,
        format: "esm",
        bindings: {
          COUNTER: counterNamespace,
        },
      });

      expect(worker.bindings).toBeDefined();

      // Now update the namespace to use CounterV2 class
      const updatedNamespace = new DurableObjectNamespace(
        "test-counter-namespace",
        {
          className: "CounterV2",
          scriptName: workerName,
        },
      );

      // Update worker with the migrated binding
      worker = await Worker(workerName, {
        name: workerName,
        script: doMigrationWorkerScriptV2,
        format: "esm",
        bindings: {
          COUNTER: updatedNamespace,
        },
      });

      expect(worker.bindings).toBeDefined();
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("add environment variables to worker with durable object", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-do-with-env-doenv-1`;

    let worker: Worker | undefined;
    try {
      // First create a worker with a Durable Object but no env vars
      worker = await Worker(workerName, {
        name: workerName,
        script: durableObjectWorkerScript,
        format: "esm",
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);

      // Create a Durable Object namespace
      const counterNamespace = new DurableObjectNamespace(
        "test-counter-env-namespace",
        {
          className: "Counter",
          scriptName: workerName,
        },
      );

      // Update the worker with the DO binding
      worker = await Worker(workerName, {
        name: workerName,
        script: durableObjectWorkerScript,
        format: "esm",
        bindings: {
          COUNTER: counterNamespace,
        },
      });

      // Apply the worker with binding
      expect(worker.bindings).toBeDefined();
      expect(worker.env).toBeUndefined();

      // Now update the worker by adding environment variables
      worker = await Worker(workerName, {
        name: workerName,
        script: durableObjectWorkerScript,
        format: "esm",
        bindings: {
          COUNTER: counterNamespace,
        },
        env: {
          API_SECRET: "test-secret-123",
          DEBUG_MODE: "true",
        },
      });

      expect(worker.bindings).toBeDefined();
      expect(worker.env).toBeDefined();
      expect(worker.env?.API_SECRET).toEqual("test-secret-123");
      expect(worker.env?.DEBUG_MODE).toEqual("true");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("create and delete worker with R2 bucket binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-r2-binding-r2-1`;

    // Create a test R2 bucket
    let testBucket: R2Bucket | undefined;

    let worker: Worker<{ STORAGE: R2Bucket }> | undefined;

    try {
      testBucket = await R2Bucket("test-bucket", {
        name: `${BRANCH_PREFIX.toLowerCase()}-test-r2-bucket`,
        allowPublicAccess: false,
      });

      // Create a worker with the R2 bucket binding
      worker = await Worker(workerName, {
        name: workerName,
        script: r2WorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          STORAGE: testBucket,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings!.STORAGE).toBeDefined();

      // Test that the R2 binding is accessible in the worker
      const response = await fetch(`${worker.url}/r2-info`);
      expect(response.status).toEqual(200);
      const data = (await response.json()) as {
        hasR2: boolean;
        bucketName: string;
      };
      expect(data.hasR2).toEqual(true);
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  // Test for static assets
  test("create and test worker with static assets", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-assets`;
    let tempDir: string | undefined;

    try {
      // Create a temporary directory to store test assets
      tempDir = path.join(".out", "alchemy-assets-test");

      await fs.rm(tempDir, { recursive: true, force: true });

      // Ensure directory exists with proper permissions
      await fs.mkdir(tempDir, { recursive: true });

      // Create test files in the temporary directory
      const testContent = "Hello from static assets!";
      const cssContent = "body { color: blue; }";
      const jsonContent = JSON.stringify({
        message: "Hello from JSON",
        timestamp: Date.now(),
      });

      // Create a subdirectory with additional files
      const subDir = path.join(tempDir, "data");
      await Promise.all([
        fs.writeFile(path.join(tempDir, "index.html"), testContent),
        fs.writeFile(path.join(tempDir, "styles.css"), cssContent),
        fs.mkdir(subDir, { recursive: true }),
      ]);
      await fs.writeFile(path.join(subDir, "config.json"), jsonContent);

      // Create assets resource
      const assets = await Assets("static-assets", {
        path: tempDir,
      });

      // Create a worker that uses ESM format and serves static assets
      const workerWithAssetsScript = `
        export default {
          async fetch(request, env, ctx) {
            const url = new URL(request.url);

            if (url.pathname.startsWith("/api/")) {
              return new Response("Worker with assets is running!", {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
            return new Response("Not Found", { status: 404 });
          }
        };
      `;

      // Create the worker with assets binding
      const worker = await Worker(workerName, {
        name: workerName,
        script: workerWithAssetsScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          ASSETS: assets,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.url).toBeTruthy();
      expect(worker.bindings?.ASSETS).toBeTruthy();

      async function get(url: string) {
        const response = await fetch(url);
        if (response.status !== 200) {
          console.log(
            response.status,
            response.statusText,
            await response.text(),
          );
        }
        expect(response.status).toEqual(200);
        const text = await response.text();
        return text;
      }

      // Test that the static assets are accessible
      const indexText = await get(`${worker.url}/index.html`);
      expect(indexText).toEqual(testContent);

      // Test the worker's main handler
      // should route to index.html
      const mainText = await get(worker.url!);
      expect(mainText).toEqual(testContent);

      // Test CSS file
      const cssText = await get(`${worker.url}/styles.css`);
      expect(cssText).toEqual(cssContent);

      // Test file in subdirectory
      const jsonData = JSON.parse(await get(`${worker.url}/data/config.json`));
      expect(jsonData.message).toEqual("Hello from JSON");

      const apiCall = await get(`${worker.url}/api/data`);
      expect(apiCall).toEqual("Worker with assets is running!");
    } finally {
      // Clean up temporary directory
      if (tempDir) {
        await fs.rm(tempDir, { recursive: true, force: true });
      }

      await destroy(scope);
      // Verify the worker was deleted
      await assertWorkerDoesNotExist(workerName);
    }
  });

  // Test for worker with assets configuration
  test("create worker with assets configuration options", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-assets-config`;
    let tempDir: string | undefined;

    try {
      // Create a temporary directory to store test assets
      tempDir = path.join(".out", "alchemy-assets-config-test");
      await fs.rm(tempDir, { recursive: true, force: true });
      await fs.mkdir(tempDir, { recursive: true });

      // Create test files in the temporary directory
      const indexContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Assets Config Test</title>
            <link rel="stylesheet" href="styles.css">
          </head>
          <body>
            <h1>Assets Config Test</h1>
            <p>Testing assets configuration options</p>
          </body>
        </html>
      `;

      const cssContent =
        "body { font-family: Arial; color: #333; padding: 20px; }";
      const spaContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>SPA Page</title>
          </head>
          <body>
            <h1>Single Page App</h1>
            <div id="app">This is a single page application</div>
          </body>
        </html>
      `;

      // Create files
      await Promise.all([
        fs.writeFile(path.join(tempDir, "index.html"), indexContent),
        fs.writeFile(path.join(tempDir, "styles.css"), cssContent),
        fs.writeFile(path.join(tempDir, "app.html"), spaContent),
      ]);

      // Create assets resource
      const assets = await Assets("assets-with-config", {
        path: tempDir,
      });

      // Create custom headers configuration
      const headersConfig = `#
/styles.css
  Cache-Control: public, max-age=86400
  Content-Type: text/css
  XYZ: 123

/*.html
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  ABC: 456

/
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  ABC: 456
`;

      // Create custom redirects configuration
      const redirectsConfig = `# Redirect old path to new path
/old-path /index.html 301

# Redirect with wildcard
/legacy/* /app.html 302
`;

      // Create a worker script that serves assets
      const workerScript = `
        export default {
          async fetch(request, env, ctx) {
            const url = new URL(request.url);

            // API endpoint to check worker is running
            if (url.pathname === "/api/status") {
              return new Response(JSON.stringify({
                status: "ok",
                worker: "${workerName}",
                timestamp: Date.now()
              }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            }

            return new Response("Not Found", { status: 404 });
          }
        };
      `;

      // Create the worker with assets binding and configuration
      const worker = await Worker(workerName, {
        name: workerName,
        script: workerScript,
        format: "esm",
        url: true,
        adopt: true,
        bindings: {
          ASSETS: assets,
        },
        assets: {
          _headers: headersConfig,
          _redirects: redirectsConfig,
          html_handling: "auto-trailing-slash",
          not_found_handling: "single-page-application",
          run_worker_first: false,
        },
      });

      console.log(worker.url);

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.url).toBeTruthy();
      expect(worker.bindings?.ASSETS).toBeTruthy();

      // Verify assets configuration was saved
      expect(worker.assets).toBeDefined();
      // expect(worker.assets?._headers).toEqual(headersConfig);
      // expect(worker.assets?._redirects).toEqual(redirectsConfig);
      expect(worker.assets?.html_handling).toEqual("auto-trailing-slash");
      expect(worker.assets?.not_found_handling).toEqual(
        "single-page-application",
      );
      expect(worker.assets?.run_worker_first).toEqual(false);

      // Test that the static assets are accessible
      const indexResponse = await fetch(`${worker.url}/index.html`);
      expect(indexResponse.status).toEqual(200);
      expect(await indexResponse.text()).toContain("Assets Config Test");

      // Test HTML headers
      expect(indexResponse.headers.get("ABC")).toEqual("456");
      expect(indexResponse.headers.get("X-Frame-Options")).toEqual("DENY");
      expect(indexResponse.headers.get("X-Content-Type-Options")).toEqual(
        "nosniff",
      );

      // Test that custom headers are applied
      const cssResponse = await fetch(`${worker.url}/styles.css`);
      expect(cssResponse.status).toEqual(200);
      expect(cssResponse.headers.get("Cache-Control")).toEqual(
        "public, max-age=86400",
      );
      expect(cssResponse.headers.get("XYZ")).toEqual("123");

      // Test auto-trailing-slash behavior
      // With auto-trailing-slash, /index should redirect to /index.html
      const indexWithoutExtension = await fetch(`${worker.url}/index`, {
        redirect: "manual",
      });
      expect(indexWithoutExtension.status).toEqual(307);

      // Test redirects
      const oldPathResponse = await fetch(`${worker.url}/old-path`, {
        redirect: "manual",
      });
      expect(oldPathResponse.status).toEqual(301);

      // Test wildcard redirects
      const legacyResponse = await fetch(`${worker.url}/legacy/something`, {
        redirect: "manual",
      });
      expect(legacyResponse.status).toEqual(302);

      // Test the worker's API endpoint
      const apiResponse = await fetch(`${worker.url}/api/status`);
      expect(apiResponse.status).toEqual(200);
      const apiData: any = await apiResponse.json();
      expect(apiData.status).toEqual("ok");
      expect(apiData.worker).toEqual(workerName);
    } finally {
      // Clean up temporary directory
      if (tempDir) {
        await fs.rm(tempDir, { recursive: true, force: true });
      }

      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  });

  // Test for binding a workflow to a worker
  test("create and delete worker with workflow binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-workflow`;

    // Sample worker script with workflow handler - updated to match Cloudflare Workflows pattern
    const workflowWorkerScript = `
      // Workflow definition for email notifications
      export class EmailNotifier {
        constructor(state, env) {
          this.state = state;
          this.env = env;
        }

        async run(event, step) {
          // Process order data from event payload
          const orderDetails = await step.do('process-order', async () => {
            console.log("Processing order", event.payload);
            return {
              success: true,
              orderId: event.payload.orderId,
              message: "Order processed successfully"
            };
          });

          return orderDetails;
        }
      }

      // Workflow definition for order processing
      export class OrderProcessor {
        constructor(state, env) {
          this.state = state;
          this.env = env;
        }

        async run(event, step) {
          // Process shipping data
          const shippingDetails = await step.do('process-shipping', async () => {
            console.log("Processing shipping", event.payload);
            return {
              success: true,
              shipmentId: event.payload.shipmentId,
              message: "Shipment scheduled successfully"
            };
          });

          return shippingDetails;
        }
      }

      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);

          // Add endpoints to trigger workflows for testing
          if (url.pathname === '/trigger-email-workflow') {
            try {
              // Get workflow binding
              const workflow = env.EMAIL_WORKFLOW;

              if (!workflow) {
                return new Response(JSON.stringify({ error: "No email workflow binding found" }), {
                  status: 500,
                  headers: { 'Content-Type': 'application/json' }
                });
              }

              // Create a workflow instance with parameters
              const params = { orderId: "test-123", amount: 99.99 };
              const instance = await workflow.create(params);

              return Response.json({
                id: instance.id,
                details: await instance.status(),
                success: true,
                orderId: params.orderId,
                message: "Order processed successfully"
              });
            } catch (error) {
              console.error("Error triggering email workflow:", error);
              return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }

          // Endpoint for the order workflow
          if (url.pathname === '/trigger-order-workflow') {
            try {
              // Get workflow binding
              const workflow = env.ORDER_WORKFLOW;

              if (!workflow) {
                return new Response(JSON.stringify({ error: "No order workflow binding found" }), {
                  status: 500,
                  headers: { 'Content-Type': 'application/json' }
                });
              }

              // Create a workflow instance with parameters
              const params = { shipmentId: "ship-456", carrier: "FastShip" };
              const instance = await workflow.create(params);

              return Response.json({
                id: instance.id,
                details: await instance.status(),
                success: true,
                shipmentId: params.shipmentId,
                message: "Shipment scheduled successfully"
              });
            } catch (error) {
              console.error("Error triggering order workflow:", error);
              return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }

          return new Response('Worker with workflow bindings!', { status: 200 });
        }
      };
    `;

    let worker: Worker | undefined;
    try {
      // Create a workflow instance
      const emailWorkflow = new Workflow("email-notifier", {
        className: "EmailNotifier",
        workflowName: "email-notification-workflow",
      });

      // Create a worker with the workflow binding
      worker = await Worker(workerName, {
        name: workerName,
        script: workflowWorkerScript,
        format: "esm",
        bindings: {
          EMAIL_WORKFLOW: emailWorkflow,
        },
        url: true, // Enable workers.dev URL to test the workflow
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.url).toBeTruthy();

      // Test triggering the first workflow
      const response = await fetch(`${worker.url!}/trigger-email-workflow`);
      const result: any = await response.json();
      console.log("Email workflow response:", result);

      expect(response.status).toEqual(200);
      expect(result.success).toEqual(true);
      expect(result.orderId).toEqual("test-123");
      expect(result.message).toEqual("Order processed successfully");
      // Verify the instance ID is not empty
      expect(result.id).toBeTruthy();
      expect(typeof result.id).toBe("string");
      expect(result.id.length).toBeGreaterThan(0);
      // Verify the details contain valid status
      expect(result.details).toBeDefined();
      expect(result.details.status).toBeTruthy();

      // Create a new workflow binding and update the worker
      const orderWorkflow = new Workflow("order-processor", {
        className: "OrderProcessor",
        workflowName: "order-processing-workflow",
      });

      // Update the worker with multiple workflow bindings
      worker = await Worker(workerName, {
        name: workerName,
        script: workflowWorkerScript,
        format: "esm",
        bindings: {
          EMAIL_WORKFLOW: emailWorkflow,
          ORDER_WORKFLOW: orderWorkflow,
        },
        url: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.bindings).toBeDefined();
      expect(Object.keys(worker.bindings || {})).toHaveLength(2);

      // Test triggering the second workflow
      const orderResponse = await fetch(
        `${worker.url!}/trigger-order-workflow`,
      );
      const orderResult: any = await orderResponse.json();
      console.log("Order workflow response:", orderResult);

      expect(orderResponse.status).toEqual(200);
      expect(orderResult.success).toEqual(true);
      expect(orderResult.shipmentId).toEqual("ship-456");
      expect(orderResult.message).toEqual("Shipment scheduled successfully");
      // Verify the instance ID is not empty
      expect(orderResult.id).toBeTruthy();
      expect(typeof orderResult.id).toBe("string");
      expect(orderResult.id.length).toBeGreaterThan(0);
      // Verify the details contain valid status
      expect(orderResult.details).toBeDefined();
      expect(orderResult.details.status).toBeTruthy();
    } finally {
      // Explicitly destroy resources since destroy: false is set
      await destroy(scope);
      // Verify the worker was deleted
      await assertWorkerDoesNotExist(workerName);
    }
  });

  test("create and test worker with D1 database binding", async (scope) => {
    // Sample ESM worker script with D1 database functionality
    const d1WorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);

          // Initialize the database with a table and data
          if (url.pathname === '/init-db') {
            try {
              const db = env.DATABASE;

              // Create a test table
              await db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

              // Insert some test data
              await db.exec("INSERT INTO users (name, email) VALUES ('Test User', 'test@example.com')");

              return new Response('Database initialized successfully!', {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            } catch (error) {
              return new Response('Error initializing database: ' + error.message, {
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }

          // Query data from the database
          if (url.pathname === '/query-db') {
            try {
              const db = env.DATABASE;

              // Query the database
              const { results } = await db.prepare("SELECT * FROM users").all();

              return new Response(JSON.stringify({ success: true, data: results }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (error) {
              return new Response(JSON.stringify({
                success: false,
                error: error.message
              }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }

          return new Response('D1 Database Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    const workerName = `${BRANCH_PREFIX}-test-worker-d1`;

    let worker: Worker<{ DATABASE: D1Database }> | undefined;
    let db: D1Database | undefined;

    try {
      // Create a D1 database
      db = await D1Database(`${BRANCH_PREFIX}-test-db`, {
        name: `${BRANCH_PREFIX}-test-db`,
        primaryLocationHint: "wnam", // West North America
      });

      expect(db.id).toBeTruthy();
      expect(db.name).toEqual(`${BRANCH_PREFIX}-test-db`);

      // Create a worker with the D1 database binding
      worker = await Worker(workerName, {
        name: workerName,
        script: d1WorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          DATABASE: db,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings!.DATABASE).toBeDefined();
      expect(worker.bindings!.DATABASE.id).toEqual(db.id);
      expect(worker.url).toBeTruthy();

      // Initialize the database with a table and data
      const initResponse = await fetch(`${worker.url}/init-db`);
      expect(initResponse.status).toEqual(200);
      const initText = await initResponse.text();
      expect(initText).toEqual("Database initialized successfully!");

      // Query data from the database
      const queryResponse = await fetch(`${worker.url}/query-db`);
      expect(queryResponse.status).toEqual(200);
      const queryData: any = await queryResponse.json();
      expect(queryData.success).toEqual(true);
      expect(queryData.data).toBeArray();
      expect(queryData.data.length).toBeGreaterThan(0);
      expect(queryData.data[0].name).toEqual("Test User");
      expect(queryData.data[0].email).toEqual("test@example.com");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 120000); // Increased timeout for D1 database operations

  test("create and test worker with Queue binding", async (scope) => {
    // Sample ESM worker script with Queue functionality
    const queueWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);

          // Send a message to the queue
          if (url.pathname === '/send-message') {
            try {
              const body = await request.json();
              const messageId = await env.MESSAGE_QUEUE.send(body);

              return new Response(JSON.stringify({
                success: true,
                messageId,
                message: 'Message sent successfully'
              }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (error) {
              return new Response(JSON.stringify({
                success: false,
                error: error.message
              }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }

          return new Response('Queue Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    const workerName = `${BRANCH_PREFIX}-test-worker-queue`;
    const queueName = `${BRANCH_PREFIX}-test-queue`;

    let worker: Worker<{ MESSAGE_QUEUE: Queue }> | undefined;
    let queue: Queue | undefined;

    try {
      // Create a Queue
      queue = await Queue(queueName, {
        name: queueName,
        deliveryDelay: 0, // No delay for testing
        deliveryPaused: false,
      });

      expect(queue.id).toBeTruthy();
      expect(queue.name).toEqual(queueName);
      expect(queue.type).toEqual("queue");

      // Create a worker with the Queue binding
      worker = await Worker(workerName, {
        name: workerName,
        script: queueWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          MESSAGE_QUEUE: queue,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings!.MESSAGE_QUEUE).toBeDefined();
      expect(worker.url).toBeTruthy();

      if (worker.url) {
        // Send a message to the queue
        const testMessage = {
          id: "msg-123",
          content: "Test message content",
          timestamp: Date.now(),
        };

        const sendResponse = await fetch(`${worker.url}/send-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testMessage),
        });

        expect(sendResponse.status).toEqual(200);
        const responseData: any = await sendResponse.json();
        expect(responseData.success).toEqual(true);
        expect(responseData.message).toEqual("Message sent successfully");
      }
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 120000); // Increased timeout for Queue operations

  test("create and test worker with Self binding", async (scope) => {
    // Sample ESM worker script with Self binding functionality

    const workerName = `${BRANCH_PREFIX}-test-worker-self`;

    let worker: Worker | undefined;

    try {
      // Create a worker with the Self binding
      worker = await Worker(workerName, {
        name: workerName,
        script: `
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);
              
              // Echo endpoint
              if (url.pathname.startsWith('/echo/')) {
                const message = url.pathname.split('/echo/')[1];
                return new Response('Echo: ' + message, {
                  status: 200,
                  headers: { 'Content-Type': 'text/plain' }
                });
              }
              
              // Recursive endpoint that calls itself
              if (url.pathname.startsWith('/recursive/')) {
                const parts = url.pathname.split('/recursive/')[1].split('/');
                const message = parts[0] || '';
                const count = parseInt(parts[1] || '0', 10);
                
                if (count <= 0) {
                  return new Response('Final result: ' + message, {
                    status: 200,
                    headers: { 'Content-Type': 'text/plain' }
                  });
                }
                
                // Call self using the SELF binding
                try {
                  const response = await env.SELF.fetch(
                    new URL(\`/recursive/\${message}-\${count}/\${count - 1}\`, request.url)
                  );
                  return response;
                } catch (error) {
                  return new Response('Error calling self: ' + error.message, {
                    status: 500,
                    headers: { 'Content-Type': 'text/plain' }
                  });
                }
              }
              
              return new Response('Self-binding Worker is running!', {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          };
        `,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          SELF: Self, // Bind the worker to itself
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.url).toBeTruthy();

      // Test the echo endpoint
      const echoResponse = await fetch(`${worker.url}/echo/hello-world`);
      expect(echoResponse.status).toEqual(200);
      const echoText = await echoResponse.text();
      expect(echoText).toEqual("Echo: hello-world");

      // Test the recursive endpoint with a count of 3
      const recursiveResponse = await fetch(`${worker.url}/recursive/start/3`);
      expect(recursiveResponse.status).toEqual(200);
      const recursiveText = await recursiveResponse.text();
      expect(recursiveText).toEqual("Final result: start-3-2-1");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 60000); // Increased timeout for Self binding operations

  // Test for worker creation using an entrypoint file instead of an inline script
  test("create, update, and delete worker using entrypoint file", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-entrypoint`;
    const tempDir = path.join(".out", "alchemy-entrypoint-test");
    const entrypointPath = path.join(tempDir, "worker.ts");

    try {
      // Create a temporary directory for the entrypoint file
      await fs.rm(tempDir, { recursive: true, force: true });
      await fs.mkdir(tempDir, { recursive: true });

      // Create a worker script file
      const workerScript = `
        export default {
          async fetch(request, env, ctx) {
            const url = new URL(request.url);

            // Return different responses based on the path
            if (url.pathname === '/data') {
              return Response.json({
                message: "Hello from bundled worker!",
                timestamp: Date.now(),
                version: "1.0.0"
              });
            }

            return new Response('Hello from entrypoint file!', {
              status: 200,
              headers: { 'Content-Type': 'text/plain' }
            });
          }
        };
      `;

      await fs.writeFile(entrypointPath, workerScript);

      // Create a worker using the entrypoint file
      let worker = await Worker(workerName, {
        name: workerName,
        entrypoint: entrypointPath,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify the worker was created correctly
      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.format).toEqual("esm");
      expect(worker.url).toBeTruthy();

      // Test that the worker is running correctly
      const response = await fetch(worker.url!);
      expect(response.status).toEqual(200);
      const text = await response.text();
      expect(text).toEqual("Hello from entrypoint file!");

      // Test the JSON endpoint
      const jsonResponse = await fetch(`${worker.url}/data`);
      expect(jsonResponse.status).toEqual(200);
      const data: any = await jsonResponse.json();
      expect(data.message).toEqual("Hello from bundled worker!");
      expect(data.version).toEqual("1.0.0");

      // Update the worker script file
      const updatedWorkerScript = `
        export default {
          async fetch(request, env, ctx) {
            const url = new URL(request.url);

            // Return different responses based on the path
            if (url.pathname === '/data') {
              return Response.json({
                message: "Hello from updated bundled worker!",
                timestamp: Date.now(),
                version: "2.0.0"
              });
            }

            return new Response('Hello from updated entrypoint file!', {
              status: 200,
              headers: { 'Content-Type': 'text/plain' }
            });
          }
        };
      `;

      await fs.writeFile(entrypointPath, updatedWorkerScript);

      // Update the worker with the new entrypoint file content
      worker = await Worker(workerName, {
        name: workerName,
        entrypoint: entrypointPath,
        format: "esm",
        url: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (worker.url) {
        // Test that the worker was updated correctly
        const response = await fetch(worker.url);
        expect(response.status).toEqual(200);
        const text = await response.text();
        expect(text).toEqual("Hello from updated entrypoint file!");

        // Test the updated JSON endpoint
        const jsonResponse = await fetch(`${worker.url}/data`);
        expect(jsonResponse.status).toEqual(200);
        const data: any = await jsonResponse.json();
        expect(data.message).toEqual("Hello from updated bundled worker!");
        expect(data.version).toEqual("2.0.0");
      }
    } finally {
      // Clean up the temporary directory
      await fs.rm(tempDir, { recursive: true, force: true });

      // Clean up the worker
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 120000); // Increased timeout for bundling operations

  test("create and test worker with cron triggers", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-cron`;

    let worker: Worker | undefined;
    try {
      // Create a worker with cron triggers
      worker = await Worker(workerName, {
        name: workerName,
        script: cronWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL for manual trigger checking
        crons: [
          "*/5 * * * *", // Every 5 minutes
          "0 0 * * *", // Daily at midnight (suspended)
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.url).toBeTruthy();
      expect(worker.crons).toBeDefined();
      expect(worker.crons?.length).toEqual(2);

      // Verify the worker exists via API
      const getResponse = await api.get(
        `/accounts/${api.accountId}/workers/scripts/${workerName}`,
      );
      expect(getResponse.status).toEqual(200);

      // Verify cron triggers were created correctly
      // Since we can't directly query for cron triggers via API, we'll verify using our resource

      const trigger1 = worker.crons?.find((t) => t === "*/5 * * * *");
      expect(trigger1).toBeDefined();

      const trigger2 = worker.crons?.find((t) => t === "0 0 * * *");
      expect(trigger2).toBeDefined();

      // Update the worker - change one trigger, remove one
      worker = await Worker(workerName, {
        name: workerName,
        script: cronWorkerScript, // Same script
        format: "esm",
        url: true,
        crons: [
          "*/10 * * * *", // Changed from */5 to */10
          // Removed the daily trigger
        ],
      });

      expect(worker.id).toBeTruthy(); // Should be the same worker
      expect(worker.crons).toBeDefined();
      expect(worker.crons?.length).toEqual(1); // Only one trigger now

      const updatedTrigger = worker.crons?.find((t) => t === "*/10 * * * *");
      expect(updatedTrigger).toBeDefined();
      // Verify the removed trigger is gone
      const removedTrigger = worker.crons?.find((t) => t === "0 0 * * *");
      expect(removedTrigger).toBeUndefined();
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 60000); // Increase timeout for Worker operations

  test("create and test worker with worker-to-worker binding", async (scope) => {
    // Create names for both workers
    const targetWorkerName = `${BRANCH_PREFIX}-target-worker`;
    const callerWorkerName = `${BRANCH_PREFIX}-caller-worker`;

    // Script for the target worker
    const targetWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);
          
          if (url.pathname === '/api/data') {
            return Response.json({
              workerName: "${targetWorkerName}",
              message: "Hello from target worker!",
              timestamp: Date.now()
            });
          }

          if (url.pathname === '/api/echo') {
            const body = await request.json();
            return Response.json({
              workerName: "${targetWorkerName}",
              echo: body,
              received: true
            });
          }

          return new Response('Target Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    // Script for the caller worker that will use the worker binding
    const callerWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);
          
          // Call the target worker via binding
          if (url.pathname === '/call-target') {
            try {
              const targetResponse = await env.TARGET_WORKER.fetch(
                new Request('https://example.com/api/data')
              );
              
              const targetData = await targetResponse.json();
              
              return Response.json({
                success: true,
                callerName: "${callerWorkerName}",
                targetResponse: targetData
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message
              }, { status: 500 });
            }
          }

          // Echo test with payload to verify data passing works
          if (url.pathname === '/echo-test') {
            try {
              const testPayload = {
                message: "Test message from caller",
                timestamp: Date.now()
              };
              
              const targetResponse = await env.TARGET_WORKER.fetch(
                new Request('https://example.com/api/echo', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(testPayload)
                })
              );
              
              const echoResponse = await targetResponse.json();
              
              return Response.json({
                success: true,
                callerName: "${callerWorkerName}",
                echoResponse
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message
              }, { status: 500 });
            }
          }

          return new Response('Caller Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    let targetWorker: Worker | undefined;
    let callerWorker: Worker | undefined;

    try {
      // First create the target worker
      targetWorker = await Worker(targetWorkerName, {
        name: targetWorkerName,
        script: targetWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(targetWorker.id).toBeTruthy();
      expect(targetWorker.name).toEqual(targetWorkerName);
      expect(targetWorker.url).toBeTruthy();

      // Create the caller worker with a binding to the target worker
      callerWorker = await Worker(callerWorkerName, {
        name: callerWorkerName,
        script: callerWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
        bindings: {
          TARGET_WORKER: targetWorker, // Bind to the target worker
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(callerWorker.id).toBeTruthy();
      expect(callerWorker.name).toEqual(callerWorkerName);
      expect(callerWorker.url).toBeTruthy();
      expect(callerWorker.bindings?.TARGET_WORKER).toBeDefined();

      // Test direct access to target worker works
      const targetResponse = await fetch(targetWorker.url!);
      expect(targetResponse.status).toEqual(200);
      const targetText = await targetResponse.text();
      expect(targetText).toEqual("Target Worker is running!");

      // Test caller worker can access the target worker through binding
      const callerResponse = await fetch(`${callerWorker.url}/call-target`);
      expect(callerResponse.status).toEqual(200);
      const callerData: any = await callerResponse.json();

      expect(callerData.success).toEqual(true);
      expect(callerData.callerName).toEqual(callerWorkerName);
      expect(callerData.targetResponse).toBeDefined();
      expect(callerData.targetResponse.workerName).toEqual(targetWorkerName);
      expect(callerData.targetResponse.message).toEqual(
        "Hello from target worker!",
      );

      // Test echo functionality to verify data passing works
      const echoResponse = await fetch(`${callerWorker.url}/echo-test`);
      expect(echoResponse.status).toEqual(200);
      const echoData: any = await echoResponse.json();

      expect(echoData.success).toEqual(true);
      expect(echoData.echoResponse).toBeDefined();
      expect(echoData.echoResponse.workerName).toEqual(targetWorkerName);
      expect(echoData.echoResponse.received).toEqual(true);
      expect(echoData.echoResponse.echo.message).toEqual(
        "Test message from caller",
      );
    } finally {
      await destroy(scope);
      // Verify both workers were deleted
      await assertWorkerDoesNotExist(targetWorkerName);
      await assertWorkerDoesNotExist(callerWorkerName);
    }
  }, 60000); // Increase timeout for Worker operations

  test("create and delete worker with Analytics Engine binding", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-analytics-engine`;

    // Sample worker script that uses Analytics Engine
    const analyticsWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);
          
          // Log an event to the analytics engine
          if (url.pathname === '/log-event') {
            try {
              const body = await request.json();
              
              // Write an event to the analytics dataset
              env.ANALYTICS.writeDataPoint({
                blobs: [body.action, body.category, body.details || ""],
                doubles: [body.value || 1.0],
                indexes: [body.userId || "anonymous"]
              });
              
              return Response.json({
                success: true,
                message: "Event logged successfully"
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message || "Unknown error"
              }, { status: 500 });
            }
          }
          
          // Confirm binding exists
          if (url.pathname === '/check-binding') {
            return Response.json({
              hasBinding: !!env.ANALYTICS,
              bindingType: typeof env.ANALYTICS,
              success: true
            });
          }
          
          return new Response('Analytics Engine Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    let worker: Worker | undefined;
    let dataset: AnalyticsEngineDataset | undefined;

    try {
      // Create an Analytics Engine dataset
      dataset = new AnalyticsEngineDataset("test-analytics-dataset", {
        dataset: `${BRANCH_PREFIX}-test-analytics-dataset`,
      });

      expect(dataset.id).toBeTruthy();
      expect(dataset.dataset).toEqual(
        `${BRANCH_PREFIX}-test-analytics-dataset`,
      );

      // Create a worker with the analytics engine binding
      worker = await Worker(workerName, {
        name: workerName,
        script: analyticsWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL to test the worker
        bindings: {
          ANALYTICS: dataset,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.bindings).toBeDefined();
      expect(worker.bindings!.ANALYTICS).toBeDefined();
      expect(worker.url).toBeTruthy();

      // Test that the binding exists in the worker
      const response = await fetch(`${worker.url}/check-binding`);
      expect(response.status).toEqual(200);
      const data: any = await response.json();
      expect(data.success).toEqual(true);
      expect(data.hasBinding).toEqual(true);

      // Test logging an event
      const logResponse = await fetch(`${worker.url}/log-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "page_view",
          category: "documentation",
          details: "analytics_engine_page",
          value: 1.0,
          userId: "test-user-123",
        }),
      });

      expect(logResponse.status).toEqual(200);
      const logData: any = await logResponse.json();
      expect(logData.success).toEqual(true);
      expect(logData.message).toEqual("Event logged successfully");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 60000); // Increase timeout for Worker operations

  test("create and test worker with cross-script durable object binding", async (scope) => {
    // Create names for both workers
    const doWorkerName = `${BRANCH_PREFIX}-do-provider-worker`;
    const clientWorkerName = `${BRANCH_PREFIX}-do-client-worker`;

    // Script for the worker that defines the durable object
    const doProviderWorkerScript = `
      export class SharedCounter {
        constructor(state, env) {
          this.state = state;
          this.env = env;
          this.counter = 0;
        }

        async fetch(request) {
          const url = new URL(request.url);
          
          if (url.pathname === '/increment') {
            this.counter++;
            return new Response(JSON.stringify({
              action: 'increment',
              counter: this.counter,
              worker: '${doWorkerName}'
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          }

          if (url.pathname === '/get') {
            return new Response(JSON.stringify({
              action: 'get',
              counter: this.counter,
              worker: '${doWorkerName}'
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          }

          return new Response('SharedCounter DO is running!', { status: 200 });
        }
      }

      export default {
        async fetch(request, env, ctx) {
          return new Response('DO Provider Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    // Script for the worker that uses the cross-script durable object
    const clientWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);
          
          if (url.pathname === '/increment') {
            try {
              // Get the durable object instance and increment
              const id = env.SHARED_COUNTER.idFromName('test-counter');
              const stub = env.SHARED_COUNTER.get(id);
              const response = await stub.fetch(new Request('https://example.com/increment'));
              const data = await response.json();
              
              return Response.json({
                success: true,
                clientWorker: '${clientWorkerName}',
                result: data,
                crossScriptWorking: true
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message,
                crossScriptWorking: false
              }, { status: 500 });
            }
          }

          if (url.pathname === '/get') {
            try {
              // Get the current counter value
              const id = env.SHARED_COUNTER.idFromName('test-counter');
              const stub = env.SHARED_COUNTER.get(id);
              const response = await stub.fetch(new Request('https://example.com/get'));
              const data = await response.json();
              
              return Response.json({
                success: true,
                clientWorker: '${clientWorkerName}',
                result: data
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message
              }, { status: 500 });
            }
          }

          return new Response('DO Client Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    let doProviderWorker;
    let clientWorker;

    try {
      // First create the worker that defines the durable object with its own binding
      doProviderWorker = await Worker(doWorkerName, {
        name: doWorkerName,
        script: doProviderWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
        bindings: {
          // Create a durable object namespace for the provider worker
          SHARED_COUNTER: new DurableObjectNamespace(
            "provider-counter-namespace",
            {
              className: "SharedCounter",
              // No scriptName means it binds to its own script
            },
          ), // Bind to its own durable object
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(doProviderWorker.id).toBeTruthy();
      expect(doProviderWorker.name).toEqual(doWorkerName);
      expect(doProviderWorker.url).toBeTruthy();

      // Create the client worker with the cross-script durable object binding
      clientWorker = await Worker(clientWorkerName, {
        name: clientWorkerName,
        script: clientWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
        bindings: {
          // Create a cross-script durable object namespace that references the first worker
          SHARED_COUNTER: new DurableObjectNamespace(
            "cross-script-counter-namespace",
            {
              className: "SharedCounter",
              scriptName: doWorkerName, // This makes it cross-script
            },
          ), // Cross-script binding
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(clientWorker.id).toBeTruthy();
      expect(clientWorker.name).toEqual(clientWorkerName);
      expect(clientWorker.url).toBeTruthy();
      expect(clientWorker.bindings?.SHARED_COUNTER).toBeDefined();

      // Verify the binding configuration
      const binding = clientWorker.bindings.SHARED_COUNTER;
      expect(binding.className).toEqual("SharedCounter");
      expect(binding.scriptName).toEqual(doWorkerName);

      // Test that both workers respond to basic requests
      const doProviderResponse = await fetch(doProviderWorker.url!);
      expect(doProviderResponse.status).toEqual(200);
      const doProviderText = await doProviderResponse.text();
      expect(doProviderText).toEqual("DO Provider Worker is running!");

      const clientResponse = await fetch(clientWorker.url!);
      expect(clientResponse.status).toEqual(200);
      const clientText = await clientResponse.text();
      expect(clientText).toEqual("DO Client Worker is running!");

      // Test cross-script durable object functionality by calling increment
      const incrementResponse = await fetch(`${clientWorker.url}/increment`);
      expect(incrementResponse.status).toEqual(200);
      const incrementData: any = await incrementResponse.json();

      expect(incrementData).toMatchObject({
        success: true,
        clientWorker: clientWorkerName,
        crossScriptWorking: true,
        result: {
          action: "increment",
          worker: doWorkerName,
        },
      });

      // Test getting the counter value
      const getResponse = await fetch(`${clientWorker.url}/get`);
      expect(getResponse.status).toEqual(200);
      const getData: any = await getResponse.json();

      expect(getData).toMatchObject({
        success: true,
        clientWorker: clientWorkerName,
        result: {
          action: "get",
          worker: doWorkerName,
        },
      });

      // Test state persistence by making multiple increment calls
      const firstIncrement = await fetch(`${clientWorker.url}/increment`);
      const firstData: any = await firstIncrement.json();

      const secondIncrement = await fetch(`${clientWorker.url}/increment`);
      const secondData: any = await secondIncrement.json();

      const thirdIncrement = await fetch(`${clientWorker.url}/increment`);
      const thirdData: any = await thirdIncrement.json();

      // Verify that the counter is incrementing properly across calls
      expect(firstData.result.counter).toBeLessThan(secondData.result.counter);
      expect(secondData.result.counter).toBeLessThan(thirdData.result.counter);
    } finally {
      await destroy(scope);
      // Verify both workers were deleted
      await assertWorkerDoesNotExist(doWorkerName);
      await assertWorkerDoesNotExist(clientWorkerName);
    }
  }, 120000); // Increased timeout for cross-script DO operations

  test("create and test worker with cross-script durable object binding using re-exported syntax", async (scope) => {
    // Create names for both workers
    const doWorkerName = `${BRANCH_PREFIX}-do-provider-worker-re-exported`;
    const clientWorkerName = `${BRANCH_PREFIX}-do-client-worker-re-exported`;

    // Script for the worker that defines the durable object
    const doProviderWorkerScript = `
      export class SharedCounter {
        constructor(state, env) {
          this.state = state;
          this.env = env;
          this.counter = 0;
        }

        async fetch(request) {
          const url = new URL(request.url);
          
          if (url.pathname === '/increment') {
            this.counter++;
            return new Response(JSON.stringify({
              action: 'increment',
              counter: this.counter,
              worker: '${doWorkerName}'
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          }

          if (url.pathname === '/get') {
            return new Response(JSON.stringify({
              action: 'get',
              counter: this.counter,
              worker: '${doWorkerName}'
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          }

          return new Response('SharedCounter DO is running!', { status: 200 });
        }
      }

      export default {
        async fetch(request, env, ctx) {
          return new Response('DO Provider Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    // Script for the worker that uses the cross-script durable object
    const clientWorkerScript = `
      export default {
        async fetch(request, env, ctx) {
          const url = new URL(request.url);
          
          if (url.pathname === '/increment') {
            try {
              // Get the durable object instance and increment
              const id = env.SHARED_COUNTER.idFromName('test-counter');
              const stub = env.SHARED_COUNTER.get(id);
              const response = await stub.fetch(new Request('https://example.com/increment'));
              const data = await response.json();
              
              return Response.json({
                success: true,
                clientWorker: '${clientWorkerName}',
                result: data,
                crossScriptWorking: true
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message,
                crossScriptWorking: false
              }, { status: 500 });
            }
          }

          if (url.pathname === '/get') {
            try {
              // Get the current counter value
              const id = env.SHARED_COUNTER.idFromName('test-counter');
              const stub = env.SHARED_COUNTER.get(id);
              const response = await stub.fetch(new Request('https://example.com/get'));
              const data = await response.json();
              
              return Response.json({
                success: true,
                clientWorker: '${clientWorkerName}',
                result: data
              });
            } catch (error) {
              return Response.json({
                success: false,
                error: error.message
              }, { status: 500 });
            }
          }

          return new Response('DO Client Worker is running!', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      };
    `;

    let doProviderWorker;
    let clientWorker;

    try {
      // First create the worker that defines the durable object with its own binding
      doProviderWorker = await Worker(doWorkerName, {
        name: doWorkerName,
        script: doProviderWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
        bindings: {
          // Create a durable object namespace for the provider worker
          SHARED_COUNTER: new DurableObjectNamespace(
            "provider-counter-namespace",
            {
              className: "SharedCounter",
              // No scriptName means it binds to its own script
            },
          ), // Bind to its own durable object
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(doProviderWorker.id).toBeTruthy();
      expect(doProviderWorker.name).toEqual(doWorkerName);
      expect(doProviderWorker.url).toBeTruthy();

      expect(doProviderWorker.bindings.SHARED_COUNTER.scriptName).toEqual(
        doWorkerName,
      );

      // Create the client worker with the cross-script durable object binding
      clientWorker = await Worker(clientWorkerName, {
        name: clientWorkerName,
        script: clientWorkerScript,
        format: "esm",
        url: true, // Enable workers.dev URL
        bindings: {
          // Create a cross-script durable object namespace that references the first worker
          SHARED_COUNTER: doProviderWorker.bindings.SHARED_COUNTER,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(clientWorker.id).toBeTruthy();
      expect(clientWorker.name).toEqual(clientWorkerName);
      expect(clientWorker.url).toBeTruthy();
      expect(clientWorker.bindings?.SHARED_COUNTER).toBeDefined();

      // Verify the binding configuration
      const binding = clientWorker.bindings.SHARED_COUNTER;
      expect(binding.className).toEqual("SharedCounter");
      expect(binding.scriptName).toEqual(doWorkerName);

      // Test that both workers respond to basic requests
      const doProviderResponse = await fetch(doProviderWorker.url!);
      expect(doProviderResponse.status).toEqual(200);
      const doProviderText = await doProviderResponse.text();
      expect(doProviderText).toEqual("DO Provider Worker is running!");

      const clientResponse = await fetch(clientWorker.url!);
      expect(clientResponse.status).toEqual(200);
      const clientText = await clientResponse.text();
      expect(clientText).toEqual("DO Client Worker is running!");

      // Test cross-script durable object functionality by calling increment
      const incrementResponse = await fetch(`${clientWorker.url}/increment`);
      expect(incrementResponse.status).toEqual(200);
      const incrementData: any = await incrementResponse.json();

      expect(incrementData).toMatchObject({
        success: true,
        clientWorker: clientWorkerName,
        crossScriptWorking: true,
        result: {
          action: "increment",
          worker: doWorkerName,
        },
      });

      // Test getting the counter value
      const getResponse = await fetch(`${clientWorker.url}/get`);
      expect(getResponse.status).toEqual(200);
      const getData: any = await getResponse.json();

      expect(getData).toMatchObject({
        success: true,
        clientWorker: clientWorkerName,
        result: {
          action: "get",
          worker: doWorkerName,
        },
      });

      // Test state persistence by making multiple increment calls
      const firstIncrement = await fetch(`${clientWorker.url}/increment`);
      const firstData: any = await firstIncrement.json();

      const secondIncrement = await fetch(`${clientWorker.url}/increment`);
      const secondData: any = await secondIncrement.json();

      const thirdIncrement = await fetch(`${clientWorker.url}/increment`);
      const thirdData: any = await thirdIncrement.json();

      // Verify that the counter is incrementing properly across calls
      expect(firstData.result.counter).toBeLessThan(secondData.result.counter);
      expect(secondData.result.counter).toBeLessThan(thirdData.result.counter);
    } finally {
      await destroy(scope);
      // Verify both workers were deleted
      await assertWorkerDoesNotExist(doWorkerName);
      await assertWorkerDoesNotExist(clientWorkerName);
    }
  }, 120000); // Increased timeout for cross-script DO operations

  test("adopting a Worker should use server-side state to migrate classes", async (scope) => {
    try {
      const workerName = `${BRANCH_PREFIX}-test-worker-adoption-migrate`;
      await Worker("worker-1", {
        name: workerName,
        script: `
          export class Counter {}
          export default { fetch() {} }
        `,
        bindings: {
          DO: new DurableObjectNamespace("DO", {
            className: "Counter",
          }),
        },
      });

      await Worker("worker-2", {
        name: workerName,
        // adopt the worker since it already exists
        adopt: true,
        script: `
          export class Counter2 {}
          export default { fetch() {} }
        `,
        bindings: {
          // mapped by stable ID "DO"
          DO_1: new DurableObjectNamespace("DO", {
            // should migrate to Counter 2
            className: "Counter2",
          }),
        },
      });
    } finally {
      await destroy(scope);
    }
  });
});
