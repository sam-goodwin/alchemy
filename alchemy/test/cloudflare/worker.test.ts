import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { AnalyticsEngineDataset } from "../../src/cloudflare/analytics-engine.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Assets } from "../../src/cloudflare/assets.ts";
import { Self } from "../../src/cloudflare/bindings.ts";
import { DurableObjectNamespace } from "../../src/cloudflare/durable-object-namespace.ts";
import { KVNamespace } from "../../src/cloudflare/kv-namespace.ts";
import { Worker, WorkerRef } from "../../src/cloudflare/worker.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";
import { fetchAndExpectOK, fetchAndExpectStatus } from "./fetch-utils.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

// Create a Cloudflare API client for verification
const api = await createCloudflareApi();

// Helper function to check if a worker exists (platform-aware)
async function assertWorkerDoesNotExist(
  workerName: string,
  platform: "vanilla" | "wfp" = "vanilla",
) {
  try {
    const endpoint =
      platform === "wfp"
        ? `/accounts/${api.accountId}/workers/platform/scripts/${workerName}`
        : `/accounts/${api.accountId}/workers/scripts/${workerName}`;
    const response = await api.get(endpoint);
    expect(response.status).toEqual(404);
  } catch {
    // 404 is expected, so we can ignore it
    return;
  }
}

describe("Worker Resource", () => {
  // Create tests for both platforms using testBothPlatforms helper
  const cjsTests = test.variant(
    ["vanilla", "wfp"],
    "create, update, and delete worker (CJS format)",
    async (scope, platform: "vanilla" | "wfp") => {
      const workerName = `${BRANCH_PREFIX}-test-worker-cjs-${platform}-1`;

      let worker: Worker | undefined;
      try {
        // Create a worker with an explicit name
        worker = await Worker(workerName, {
          name: workerName,
          script: `
            addEventListener('fetch', event => {
              event.respondWith(new Response('Hello world!', { status: 200 }));
            });
          `,
          format: "cjs",
          platform: platform === "wfp",
        });

        // Apply to create the worker
        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);
        expect(worker.format).toEqual("cjs");
        expect(worker.platform).toEqual(platform === "wfp");

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
          platform: platform === "wfp",
        });

        expect(worker.id).toEqual(worker.id);
        expect(worker.platform).toEqual(platform === "wfp");
      } finally {
        await destroy(scope);
        await assertWorkerDoesNotExist(workerName, platform);
      }
    },
  );

  // Register the CJS tests
  for (const cjsTest of cjsTests) {
    test(cjsTest.name, cjsTest.handler);
  }

  const esmTests = test.variant(
    ["vanilla", "wfp"],
    "create, update, and delete worker (ESM format)",
    async (scope, platform: "vanilla" | "wfp") => {
      const workerName = `${BRANCH_PREFIX}-test-worker-esm-${platform}-1`;

      let worker: Worker | undefined;
      try {
        // Create a worker with ESM format
        worker = await Worker(workerName, {
          name: workerName,
          script: `
            export default {
              async fetch(request, env, ctx) {
                return new Response('Hello ESM world!', { status: 200 });
              }
            };
          `,
          format: "esm", // Explicitly using ESM
          platform: platform === "wfp",
        });

        // Apply to create the worker
        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);
        expect(worker.format).toEqual("esm");
        expect(worker.platform).toEqual(platform === "wfp");

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
          platform: platform === "wfp",
        });

        expect(worker.id).toEqual(worker.id);
        expect(worker.platform).toEqual(platform === "wfp");
      } finally {
        await destroy(scope);
        await assertWorkerDoesNotExist(workerName, platform);
      }
    },
  );

  // Register the ESM tests
  for (const esmTest of esmTests) {
    test(esmTest.name, esmTest.handler);
  }

  const formatConversionTests = test.variant(
    ["vanilla", "wfp"],
    "convert between ESM and CJS formats",
    async (scope, platform: "vanilla" | "wfp") => {
      const workerName = `${BRANCH_PREFIX}-test-worker-format-conversion-${platform}-1`;

      let worker: Worker | undefined;
      try {
        // First create with ESM format
        worker = await Worker(workerName, {
          name: workerName,
          script: `
            export default {
              async fetch(request, env, ctx) {
                return new Response('Hello ESM world!', { status: 200 });
              }
            };
          `,
          format: "esm",
          platform: platform === "wfp",
        });

        expect(worker.format).toEqual("esm");
        expect(worker.platform).toEqual(platform === "wfp");

        // Update to CJS format
        worker = await Worker(workerName, {
          name: workerName,
          script: `
            addEventListener('fetch', event => {
              event.respondWith(new Response('Hello world!', { status: 200 }));
            });
          `,
          format: "cjs",
          platform: platform === "wfp",
        });
        expect(worker.format).toEqual("cjs");
        expect(worker.platform).toEqual(platform === "wfp");

        // Update back to ESM format
        worker = await Worker(workerName, {
          name: workerName,
          script: `
            export default {
              async fetch(request, env, ctx) {
                return new Response('Hello ESM world!', { status: 200 });
              }
            };
          `,
          format: "esm",
          platform: platform === "wfp",
        });

        expect(worker.format).toEqual("esm");
        expect(worker.platform).toEqual(platform === "wfp");
      } finally {
        await destroy(scope);
        await assertWorkerDoesNotExist(workerName, platform);
      }
    },
  );

  // Register the format conversion tests
  for (const formatTest of formatConversionTests) {
    test(formatTest.name, formatTest.handler);
  }

  test("fails when creating a worker with a duplicate name", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-duplicate`;

    try {
      // First, create a worker successfully
      await Worker(workerName, {
        name: workerName,
        script: `
          addEventListener('fetch', event => {
            event.respondWith(new Response('Hello world!', { status: 200 }));
          });
        `,
        format: "cjs",
      });

      // Try to create another worker with the same name, which should fail
      const duplicateWorker = Worker(`${workerName}-dup`, {
        name: workerName, // Same name as firstWorker
        script: `
          addEventListener('fetch', event => {
            event.respondWith(new Response('Hello world!', { status: 200 }));
          });
        `,
        format: "cjs",
      });
      await expect(duplicateWorker).rejects.toThrow(
        `Worker with name '${workerName}' already exists. Please use a unique name.`,
      );
    } finally {
      await destroy(scope);
    }
  });

  const multiBindingTests = test.variant(
    ["vanilla", "wfp"],
    "create and delete worker with multiple bindings",
    async (scope, platform: "vanilla" | "wfp") => {
      const workerName = `${BRANCH_PREFIX}-test-worker-multi-bindings-${platform}-1`;

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

      // Create a Durable Object namespace
      const counterNamespace = new DurableObjectNamespace(
        `test-counter-namespace-${platform}`,
        {
          className: "Counter",
          scriptName: workerName,
        },
      );

      // Create a KV namespace
      const testKv = await KVNamespace(`test-kv-namespace-${platform}`, {
        title: `${BRANCH_PREFIX} Test KV Namespace ${platform.toUpperCase()} 1`,
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
          platform: platform === "wfp",
        });

        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);
        expect(worker.platform).toEqual(platform === "wfp");

        // Update the worker with all bindings
        worker = await Worker(workerName, {
          name: workerName,
          script: multiBindingsWorkerScript,
          format: "esm",
          platform: platform === "wfp",
          bindings: {
            COUNTER: counterNamespace,
            TEST_KV: testKv,
            API_KEY: "test-api-key-value",
          },
        });

        expect(worker.id).toBeTruthy();
        expect(worker.name).toEqual(workerName);
        expect(worker.platform).toEqual(platform === "wfp");
        expect(worker.bindings).toBeDefined();
      } finally {
        await destroy(scope);
        await assertWorkerDoesNotExist(workerName, platform);
      }
    },
  );

  // Register the multi-binding tests
  for (const multiBindingTest of multiBindingTests) {
    test(multiBindingTest.name, multiBindingTest.handler);
  }

  // Add a new test for environment variables
  test("create and test worker with environment variables", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-env-vars-env-1`;
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
        const response = await fetchAndExpectOK(
          `${worker.url}/env/TEST_API_KEY`,
        );
        const text = await response.text();
        expect(text).toEqual("test-api-key-123");

        // Test another environment variable
        const nodeEnvResponse = await fetchAndExpectOK(
          `${worker.url}/env/NODE_ENV`,
        );
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
      const response = await fetchAndExpectOK(`${worker.url}/env/TEST_API_KEY`);
      const text = await response.text();
      expect(text).toEqual("updated-key-456");

      // Test new environment variable
      const newVarResponse = await fetchAndExpectOK(
        `${worker.url}/env/NEW_VAR`,
      );
      const newVarText = await newVarResponse.text();
      expect(newVarText).toEqual("new-value");

      // Test that the removed environment variable is no longer accessible
      const removedVarResponse = await fetchAndExpectOK(
        `${worker.url}/env/APP_DEBUG`,
      );
      const removedVarText = await removedVarResponse.text();
      expect(removedVarText).toEqual("undefined");
    } finally {
      await destroy(scope);
      // Verify the worker was deleted
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
        const response = await fetchAndExpectOK(url);
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
      const indexResponse = await fetchAndExpectOK(`${worker.url}/index.html`);
      expect(await indexResponse.text()).toContain("Assets Config Test");

      // Test HTML headers
      expect(indexResponse.headers.get("ABC")).toEqual("456");
      expect(indexResponse.headers.get("X-Frame-Options")).toEqual("DENY");
      expect(indexResponse.headers.get("X-Content-Type-Options")).toEqual(
        "nosniff",
      );

      // Test that custom headers are applied
      const cssResponse = await fetchAndExpectOK(`${worker.url}/styles.css`);
      expect(cssResponse.headers.get("Cache-Control")).toEqual(
        "public, max-age=86400",
      );
      expect(cssResponse.headers.get("XYZ")).toEqual("123");

      // Test auto-trailing-slash behavior
      // With auto-trailing-slash, /index should redirect to /index.html
      await fetchAndExpectStatus(
        `${worker.url}/index`,
        {
          redirect: "manual",
        },
        307,
      );

      // Test redirects
      await fetchAndExpectStatus(
        `${worker.url}/old-path`,
        {
          redirect: "manual",
        },
        301,
      );

      // Test wildcard redirects
      await fetchAndExpectStatus(
        `${worker.url}/legacy/something`,
        {
          redirect: "manual",
        },
        302,
      );

      // Test the worker's API endpoint
      const apiResponse = await fetchAndExpectOK(`${worker.url}/api/status`);
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
      const echoResponse = await fetchAndExpectOK(
        `${worker.url}/echo/hello-world`,
      );
      const echoText = await echoResponse.text();
      expect(echoText).toEqual("Echo: hello-world");

      // Test the recursive endpoint with a count of 3
      const recursiveResponse = await fetchAndExpectOK(
        `${worker.url}/recursive/start/3`,
      );
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
      const response = await fetchAndExpectOK(worker.url!);
      const text = await response.text();
      expect(text).toEqual("Hello from entrypoint file!");

      // Test the JSON endpoint
      const jsonResponse = await fetchAndExpectOK(`${worker.url}/data`);
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
        const response = await fetchAndExpectOK(worker.url);
        const text = await response.text();
        expect(text).toEqual("Hello from updated entrypoint file!");

        // Test the updated JSON endpoint
        const jsonResponse = await fetchAndExpectOK(`${worker.url}/data`);
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
      const targetResponse = await fetchAndExpectOK(targetWorker.url!);
      const targetText = await targetResponse.text();
      expect(targetText).toEqual("Target Worker is running!");

      // Test caller worker can access the target worker through binding
      const callerResponse = await fetchAndExpectOK(
        `${callerWorker.url}/call-target`,
      );
      const callerData: any = await callerResponse.json();

      expect(callerData.success).toEqual(true);
      expect(callerData.callerName).toEqual(callerWorkerName);
      expect(callerData.targetResponse).toBeDefined();
      expect(callerData.targetResponse.workerName).toEqual(targetWorkerName);
      expect(callerData.targetResponse.message).toEqual(
        "Hello from target worker!",
      );

      // Test echo functionality to verify data passing works
      const echoResponse = await fetchAndExpectOK(
        `${callerWorker.url}/echo-test`,
      );
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
        script: `
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
        `,
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
      const response = await fetchAndExpectOK(`${worker.url}/check-binding`);
      const data: any = await response.json();
      expect(data.success).toEqual(true);
      expect(data.hasBinding).toEqual(true);

      // Test logging an event
      const logResponse = await fetchAndExpectOK(`${worker.url}/log-event`, {
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

      const logData: any = await logResponse.json();
      expect(logData.success).toEqual(true);
      expect(logData.message).toEqual("Event logged successfully");
    } finally {
      await destroy(scope);
      await assertWorkerDoesNotExist(workerName);
    }
  }, 60000); // Increase timeout for Worker operations

  test("can bind to a worker referenced by name", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-test-worker-bind-by-name`;
    const workerName2 = `${BRANCH_PREFIX}-test-worker-bind-by-name-2`;
    try {
      await Worker("worker1", {
        name: workerName,
        script: `export default { async fetch(request, env, ctx) { return new Response('Hello, world!'); } };`,
      });

      const worker2 = await Worker("worker1", {
        name: workerName2,
        bindings: {
          TARGET_WORKER: WorkerRef<{
            foo(): Promise<string>;
            __WORKER_ENTRYPOINT_BRAND: never;
          }>({
            service: workerName,
          }),
        },
        script: `
          export default {
            async fetch(request, env, ctx) {
              // Call the target worker via the binding
              const response = await env.TARGET_WORKER.fetch(request);
              // Return the response from the target worker
              return response;
            }
          };
        `,
      });

      function _foo() {
        // should type check
        worker2.Env.TARGET_WORKER.foo();
        // @ts-expect-error
        worker2.Env.TARGET_WORKER.bar();
      }

      const response = await fetchAndExpectOK(worker2.url!);
      const text = await response.text();
      expect(text).toEqual("Hello, world!");
    } finally {
      await destroy(scope);
    }
  });
});
