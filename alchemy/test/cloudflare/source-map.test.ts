import { afterAll, beforeAll, describe, expect } from "bun:test";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi, type CloudflareApi } from "../../src/cloudflare/api.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

// CRITICAL: This sets up alchemy.test
import "../../src/test/bun.js";

const testScope = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

let api: CloudflareApi;

const tempWorkerDir = path.join(__dirname, "temp-source-map-workers");

// Helper to create a temporary worker file
async function createTempWorkerFile(
  dir: string,
  fileName: string,
  content: string,
): Promise<string> {
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, fileName);
  await fs.writeFile(filePath, content);
  return filePath;
}

// Helper to delete the temp worker directory
async function cleanupTempWorkerDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function getWorkerLogs(
  workerApi: CloudflareApi, // Pass API client
  workerName: string,
  expectedErrorMarker: string,
  startTime: Date,
): Promise<string[]> {
  const MAX_ATTEMPTS = 15;
  const DELAY_MS = 4000;
  let attempts = 0;

  console.log(`Waiting for logs for ${workerName} (will poll up to ${(MAX_ATTEMPTS * DELAY_MS) / 1000}s)...`);

  while (attempts < MAX_ATTEMPTS) {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    attempts++;
    try {
      const response = await workerApi.get(
        // Using a more modern-looking endpoint for services.
        // Adjust if your api client targets scripts directly or if this specific endpoint/params are incorrect.
        `/accounts/${workerApi.accountId}/workers/services/${workerName}/environments/production/logs?outcome=exception&since=${startTime.toISOString()}`
      );

      if (response.ok) {
        const logData: { result?: Array<{ outcome: string, logs: Array<{ message: string[], level: string }>, exceptions: Array<{ name: string, message: string, timestamp: number, stack?: string }> }> } = await response.json();
        
        const relevantTraces: string[] = [];
        for (const traceEvent of logData.result || []) {
          if (traceEvent.outcome === 'exception' && traceEvent.exceptions && traceEvent.exceptions.length > 0) {
              for (const ex of traceEvent.exceptions) {
                if (ex.message?.includes(expectedErrorMarker) && ex.stack) {
                    relevantTraces.push(ex.stack);
                }
              }
          }
        }
        if (relevantTraces.length > 0) {
          console.log(`Found relevant stack traces for ${workerName}.`);
          return relevantTraces;
        }
      } else {
        console.log(`Log fetch attempt ${attempts} for ${workerName} failed: ${response.status} ${await response.text()}`);
      }
    } catch (error) {
      console.error(`Error fetching logs for ${workerName} (attempt ${attempts}):`, error);
    }
    if (attempts < MAX_ATTEMPTS) console.log("Retrying log fetch...");
  }
  console.warn(`Failed to fetch relevant logs for ${workerName} after ${MAX_ATTEMPTS} attempts.`);
  return [];
}

describe("Cloudflare Worker Source Maps", () => {
  const ERROR_MARKER = "### TEST_ERROR_MARKER_SM ###";
  const WORKER_SOURCE_TS_CONTENT = `
    function iWillThrow(): void {
      // This specific line number (3) is important for assertion
      throw new Error("${ERROR_MARKER} Deliberate test error in TS!");
    }

    export default {
      async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);
        if (url.pathname === "/error") {
          try {
            iWillThrow();
          } catch (e: any) {
            console.error("Error caught in worker: " + e.message); 
            throw e; 
          }
        }
        return new Response("Hello from source map test worker!");
      }
    };
  `;

  let workerTsFilePath: string;

  beforeAll(async () => {
    api = await createCloudflareApi(); 
    await fs.mkdir(tempWorkerDir, { recursive: true });
    workerTsFilePath = await createTempWorkerFile(
      tempWorkerDir,
      "test-worker-source.ts",
      WORKER_SOURCE_TS_CONTENT,
    );
  });

  afterAll(async () => {
    await cleanupTempWorkerDir(tempWorkerDir);
  });

  testScope("should inline source maps and deobfuscate stack trace when sourceMaps is true", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-sm-true`;
    let deployedWorker: Worker | undefined;
    const startTime = new Date(); 

    try {
      console.log(`Deploying worker ${workerName} with sourceMaps: true (inline), entrypoint: ${workerTsFilePath}`);
      deployedWorker = await Worker(workerName, {
        name: workerName,
        entrypoint: workerTsFilePath,
        sourceMaps: true,
        url: true, 
      });

      expect(deployedWorker).toBeDefined();
      expect(deployedWorker!.url).toBeDefined();
      console.log(`Worker ${workerName} deployed with URL: ${deployedWorker!.url}`);

      await new Promise(resolve => setTimeout(resolve, 15000)); 

      console.log(`Invoking ${deployedWorker!.url}/error to trigger an error...`);
      try {
        await fetch(`${deployedWorker!.url}/error`);
      } catch (e) {
        console.log(`Fetch to ${workerName} resulted in client-side error (expected for 5xx):`, e);
      }
      
      const logs = await getWorkerLogs(api, workerName, ERROR_MARKER, startTime);
      expect(logs.length).toBeGreaterThan(0);

      const stackTrace = logs.join("\n"); 
      console.log(`Captured stack trace for ${workerName} (sourceMaps: true, inline):\n${stackTrace}`);
      
      // With inline source maps, we should still get deobfuscated stack traces
      expect(stackTrace).toContain("test-worker-source.ts"); 
      expect(stackTrace).toMatch(/test-worker-source\.ts:3:\d+/);
      expect(stackTrace).not.toMatch(/_worker\.js/);

    } finally {
      console.log(`Cleaning up scope for ${workerName}...`);
      await destroy(scope);
    }
  }, 120000);

  testScope("should NOT deobfuscate stack trace when sourceMaps is false", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-sm-false`;
    let deployedWorker: Worker | undefined;
    const startTime = new Date();

    try {
      console.log(`Deploying worker ${workerName} with sourceMaps: false (no source maps), entrypoint: ${workerTsFilePath}`);
      deployedWorker = await Worker(workerName, {
        name: workerName,
        entrypoint: workerTsFilePath,
        sourceMaps: false, 
        url: true,
      });

      expect(deployedWorker).toBeDefined();
      expect(deployedWorker!.url).toBeDefined();
      console.log(`Worker ${workerName} deployed with URL: ${deployedWorker!.url}`);
      
      await new Promise(resolve => setTimeout(resolve, 15000));

      console.log(`Invoking ${deployedWorker!.url}/error to trigger an error...`);
      try {
        await fetch(`${deployedWorker!.url}/error`);
      } catch (e) {
        console.log(`Fetch to ${workerName} resulted in client-side error (expected for 5xx):`, e);
      }

      const logs = await getWorkerLogs(api, workerName, ERROR_MARKER, startTime);
      expect(logs.length).toBeGreaterThan(0);

      const stackTrace = logs.join("\n");
      console.log(`Captured stack trace for ${workerName} (sourceMaps: false):\n${stackTrace}`);
      
      // Without source maps, stack traces should show minified/bundled filenames
      expect(stackTrace).not.toContain("test-worker-source.ts");
      expect(stackTrace).toMatch(/(_worker\.js|main\.js):\d+:\d+/);

    } finally {
      console.log(`Cleaning up scope for ${workerName}...`);
      await destroy(scope);
    }
  }, 120000); 
  
  testScope("deployment with noBundle true and sourceMaps true should succeed", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-sm-nobundle`;
    let deployedWorker: Worker | undefined;

    const workerJsPath = await createTempWorkerFile(
      tempWorkerDir,
      "worker-nobundle.js",
      `export default { fetch() { return new Response("Hello from noBundle worker"); } };`
    );

    try {
      console.log(`Deploying worker ${workerName} with noBundle: true, sourceMaps: true (source maps only apply to bundled workers), entrypoint: ${workerJsPath}`);
      deployedWorker = await Worker(workerName, {
        name: workerName,
        entrypoint: workerJsPath,
        noBundle: true,
        sourceMaps: true, // This should not affect noBundle workers
        url: true,
      });
      expect(deployedWorker).toBeDefined();
      expect(deployedWorker!.url).toBeDefined();
      console.log(`Worker ${workerName} (noBundle) deployed with URL: ${deployedWorker!.url}`);

      await new Promise(resolve => setTimeout(resolve, 10000));
      const response = await fetch(deployedWorker!.url!);
      expect(response.ok).toBeTrue();
      const text = await response.text();
      expect(text).toBe("Hello from noBundle worker");

    } finally {
      console.log(`Cleaning up scope for ${workerName}...`);
      await destroy(scope);
    }
  }, 90000);

});
