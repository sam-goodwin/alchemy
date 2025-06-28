import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { Ai } from "../../src/cloudflare/ai.ts";
import { R2Bucket } from "../../src/cloudflare/bucket.ts";
import { D1Database } from "../../src/cloudflare/d1-database.ts";
import { DurableObjectNamespace } from "../../src/cloudflare/durable-object-namespace.ts";
import { KVNamespace } from "../../src/cloudflare/kv-namespace.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { WranglerJson } from "../../src/cloudflare/wrangler.json.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import { Workflow } from "../../src/cloudflare/workflow.ts";
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const esmWorkerScript = `
  export default {
    async fetch(request, env, ctx) {
      return new Response('Hello ESM world!', { status: 200 });
    }
  };
`;

const doWorkerScript = `
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

  export class SqliteCounter {
    constructor(state, env) {
      this.state = state;
      this.env = env;
    }

    async fetch(request) {
      let value = await this.state.storage.get("counter") || 0;
      value++;
      await this.state.storage.put("counter", value);
      return new Response('SqliteCounter: ' + value, { status: 200 });
    }
  }

  export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      
      if (url.pathname === '/counter') {
        const id = env.COUNTER.idFromName('default');
        const stub = env.COUNTER.get(id);
        return stub.fetch(request);
      }

      if (url.pathname === '/sqlite-counter') {
        const id = env.SQLITE_COUNTER.idFromName('default');
        const stub = env.SQLITE_COUNTER.get(id);
        return stub.fetch(request);
      }
      
      return new Response('Hello DO world!', { status: 200 });
    }
  };
`;

const wfWorkerScript = `
// Import the Workflow definition
import {
  WorkflowEntrypoint,
  type WorkflowEvent,
  type WorkflowStep,
} from "cloudflare:workers";
// just to test bundling
import { NonRetryableError } from "cloudflare:workflows";

// Create your own class that implements a Workflow
export class TestWorkflow extends WorkflowEntrypoint<any, any> {
  // Define a run() method
  async run(_event: WorkflowEvent<any>, step: WorkflowStep) {
    // Define one or more steps that optionally return state.
    await step.do("first step", async () => {
      console.log("WORKFLOW STEP 1");
    });
    await step.do("second step", async () => {
      console.log("WORKFLOW STEP 2");
    });

    return { status: "completed" };
  }
}

export default {
  async fetch(request, env, ctx) {
    return new Response('Hello Workflow world!', { status: 200 });
  }
};
`;

describe("WranglerJson Resource", () => {
  describe("with worker", () => {
    test("infers spec from worker", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-esm-1`;
      const tempDir = path.join(".out", "alchemy-entrypoint-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          compatibilityFlags: ["nodejs_compat"],
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-1`,
          { worker },
        );

        expect(spec).toMatchObject({
          name,
          // main should now be relative to the wrangler.json file location
          main: path.relative(process.cwd(), entrypoint),
          compatibility_date: worker.compatibilityDate,
          compatibility_flags: worker.compatibilityFlags,
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("requires entrypoint", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-esm-2`;

      try {
        const worker = await Worker(name, {
          format: "esm",
          script: esmWorkerScript,
          adopt: true,
        });

        const id = `${BRANCH_PREFIX}-test-wrangler-json-2`;

        await expect(
          async () => await WranglerJson(id, { worker }),
        ).rejects.toThrow(
          "Worker must have an entrypoint to generate a wrangler.json",
        );
      } finally {
        await destroy(scope);
      }
    });

    test("with browser binding", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-browser`;
      const tempDir = path.join(".out", "alchemy-browser-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            browser: { type: "browser" },
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-browser`,
          { worker },
        );

        expect(spec).toMatchObject({
          name,
          browser: {
            binding: "browser",
          },
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with AI binding", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-ai`;
      const tempDir = path.join(".out", "alchemy-ai-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            AI: new Ai(),
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-ai`,
          { worker },
        );

        expect(spec).toMatchObject({
          name,
          ai: {
            binding: "AI",
          },
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with durable object bindings", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-do`;
      const tempDir = path.join(".out", "alchemy-do-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, doWorkerScript);

        // Create durable object namespaces
        const counterNamespace = new DurableObjectNamespace("counter", {
          className: "Counter",
          scriptName: name,
          sqlite: false,
        });

        const sqliteCounterNamespace = new DurableObjectNamespace(
          "sqlite-counter",
          {
            className: "SqliteCounter",
            scriptName: name,
            sqlite: true,
          },
        );

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            COUNTER: counterNamespace,
            SQLITE_COUNTER: sqliteCounterNamespace,
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-do`,
          { worker },
        );

        // Verify the worker name and entrypoint
        expect(spec).toMatchObject({
          name,
          main: entrypoint,
        });

        // Verify the durable object bindings
        expect(spec.durable_objects).toBeDefined();
        expect(spec.durable_objects?.bindings).toHaveLength(2);

        // Find Counter binding
        const counterBinding = spec.durable_objects?.bindings.find(
          (b) => b.class_name === "Counter",
        );
        expect(counterBinding).toMatchObject({
          name: "COUNTER",
          script_name: name,
          class_name: "Counter",
        });

        // Find SqliteCounter binding
        const sqliteCounterBinding = spec.durable_objects?.bindings.find(
          (b) => b.class_name === "SqliteCounter",
        );
        expect(sqliteCounterBinding).toMatchObject({
          name: "SQLITE_COUNTER",
          script_name: name,
          class_name: "SqliteCounter",
        });

        // Verify migrations
        expect(spec.migrations).toHaveLength(1);
        expect(spec.migrations?.[0]).toMatchObject({
          tag: "v1",
          new_classes: ["Counter"],
          new_sqlite_classes: ["SqliteCounter"],
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with workflows", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-wf`;
      const tempDir = path.join(".out", "alchemy-wf-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, wfWorkerScript);

        // Create durable object namespaces
        const workflow = new Workflow("test-workflow", {
          className: "TestWorkflow",
          workflowName: "test-workflow",
          scriptName: "other-script",
        });

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            WF: workflow,
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-wf`,
          { worker },
        );

        expect(spec.workflows).toHaveLength(1);
        expect(spec.workflows?.[0]).toMatchObject({
          name: "test-workflow",
          binding: "WF",
          class_name: "TestWorkflow",
          script_name: "other-script",
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with cron triggers", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-cron-json`;
      const tempDir = path.join(".out", "alchemy-cron-json-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          crons: ["*/3 * * * *", "0 15 1 * *", "59 23 LW * *"],
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-cron`,
          { worker },
        );

        expect(spec.triggers).toMatchObject({
          crons: worker.crons!,
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with KV namespace - includes preview_id", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-kv-preview`;
      const tempDir = path.join(".out", "alchemy-kv-preview-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const kvNamespace = await KVNamespace(`${BRANCH_PREFIX}-test-kv-ns`, {
          title: "test-kv-namespace",
          adopt: true,
        });

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            KV: kvNamespace,
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-kv-preview`,
          { worker },
        );

        expect(spec.kv_namespaces).toHaveLength(1);
        expect(spec.kv_namespaces?.[0]).toMatchObject({
          binding: "KV",
          id: kvNamespace.namespaceId,
          preview_id: kvNamespace.namespaceId,
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with D1 database - includes preview_database_id", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-d1-preview`;
      const tempDir = path.join(".out", "alchemy-d1-preview-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const d1Database = await D1Database(`${BRANCH_PREFIX}-test-d1-db`);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            DB: d1Database,
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-d1-preview`,
          { worker },
        );

        expect(spec.d1_databases).toHaveLength(1);
        expect(spec.d1_databases?.[0]).toMatchObject({
          binding: "DB",
          database_id: d1Database.id,
          database_name: d1Database.name,
          preview_database_id: d1Database.id,
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with R2 bucket - includes preview_bucket_name", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-r2-preview`;
      const tempDir = path.join(".out", "alchemy-r2-preview-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const r2Bucket = await R2Bucket(`${BRANCH_PREFIX}-test-r2-bucket`, {
          adopt: true,
        });

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            BUCKET: r2Bucket,
          },
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-r2-preview`,
          { worker },
        );

        expect(spec.r2_buckets).toHaveLength(1);
        expect(spec.r2_buckets?.[0]).toMatchObject({
          binding: "BUCKET",
          bucket_name: r2Bucket.name,
          preview_bucket_name: r2Bucket.name,
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("paths are relative to wrangler.json file location", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-path-resolution`;
      const tempDir = path.join(".out", "path-resolution-test");
      const subDir = path.join(tempDir, "packages", "backend");
      const entrypoint = path.join(
        tempDir,
        "packages",
        "backend",
        "src",
        "index.ts",
      );
      const wranglerPath = path.join(subDir, "wrangler.jsonc");

      try {
        // Clean up and create directory structure
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(path.join(tempDir, "packages", "backend", "src"), {
          recursive: true,
        });
        await fs.writeFile(entrypoint, esmWorkerScript);

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          compatibilityFlags: ["nodejs_compat"],
          adopt: true,
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-path-resolution`,
          {
            worker,
            path: wranglerPath,
          },
        );

        // Verify the main path is relative to the wrangler.json file location
        // The entrypoint is at packages/backend/src/index.ts
        // The wrangler.json is at packages/backend/wrangler.jsonc
        // So main should be "./src/index.ts" (relative to packages/backend/)
        expect(spec.main).toBe("src/index.ts");
        expect(spec.name).toBe(name);

        // Verify the wrangler.jsonc file was actually created
        const wranglerExists = await fs
          .access(wranglerPath)
          .then(() => true)
          .catch(() => false);
        expect(wranglerExists).toBe(true);

        // Verify the content matches our expectation
        const wranglerContent = await fs.readFile(wranglerPath, "utf-8");
        const wranglerJson = JSON.parse(wranglerContent);
        expect(wranglerJson.main).toBe("src/index.ts");
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });
  });
});
