import { describe, expect } from "bun:test";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { alchemy } from "../../src/alchemy.js";
import { Ai } from "../../src/cloudflare/ai.js";
import { DurableObjectNamespace } from "../../src/cloudflare/durable-object-namespace.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { WranglerJson } from "../../src/cloudflare/wrangler.json.js";
import { destroy } from "../../src/destroy.js";
import { BRANCH_PREFIX } from "../util.js";

import { Queue } from "../../src/cloudflare/queue.js";
import { Workflow } from "../../src/cloudflare/workflow.js";
import "../../src/test/bun.js";

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

const queueWorkerScript = `
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello Queue world!', { status: 200 });
  },
  
  async queue(batch, env, ctx) {
    for (const message of batch.messages) {
      console.log('Processing message:', message.body);
      // Process each message in the batch
      message.ack();
    }
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
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-1`,
          { worker },
        );

        expect(spec).toMatchObject({
          name,
          main: entrypoint,
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
        });

        const id = `${BRANCH_PREFIX}-test-wrangler-json-2`;

        await expect(async () => await WranglerJson(id, { worker })).toThrow(
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
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-do`,
          { worker },
        );

        console.log(JSON.stringify(spec, null, 2));

        expect(spec).toMatchObject({
          name,
          main: entrypoint,
          durable_objects: {
            bindings: [
              {
                name: "COUNTER",
                class_name: "Counter",
                script_name: name,
              },
              {
                name: "SQLITE_COUNTER",
                class_name: "SqliteCounter",
                script_name: name,
              },
            ],
          },
          migrations: [
            {
              tag: "v1",
              new_classes: ["Counter"],
              new_sqlite_classes: ["SqliteCounter"],
            },
          ],
        });

        // Verify we have exactly 2 bindings
        expect(spec.durable_objects?.bindings).toHaveLength(2);
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
        });

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            WF: workflow,
          },
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-wf`,
          { worker },
        );

        expect(spec).toMatchObject({
          workflows: [
            {
              name: "test-workflow",
              binding: "WF",
              class_name: "TestWorkflow",
            },
          ],
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
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-cron`,
          { worker },
        );

        expect(spec).toMatchObject({
          triggers: {
            crons: worker.crons,
          },
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });

    test("with queue binding and event source", async (scope) => {
      const name = `${BRANCH_PREFIX}-test-worker-queue`;
      const tempDir = path.join(".out", "alchemy-queue-test");
      const entrypoint = path.join(tempDir, "worker.ts");

      try {
        // Create a temporary directory for the entrypoint file
        await fs.rm(tempDir, { recursive: true, force: true });
        await fs.mkdir(tempDir, { recursive: true });
        await fs.writeFile(entrypoint, queueWorkerScript);

        // Create a queue
        const queue = await Queue(`${BRANCH_PREFIX}-test-queue`, {
          name: `${BRANCH_PREFIX}-test-queue`,
          deliveryDelay: 30,
          messageRetentionPeriod: 86400,
        });

        // Create a workflow for the example
        const workflow = new Workflow("test-workflow", {
          className: "TestWorkflow",
          workflowName: "test-workflow",
        });

        const worker = await Worker(name, {
          format: "esm",
          entrypoint,
          bindings: {
            MY_WORKFLOW: workflow,
            MY_QUEUE: queue,
            MY_SECRET: alchemy.secret("test-secret"),
          },
          compatibilityDate: "2024-10-22",
          compatibilityFlags: ["nodejs_compat"],
          eventSources: [
            {
              queue,
              batchSize: 1,
              maxConcurrency: 1,
              maxRetries: 3,
            },
          ],
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-queue`,
          { worker },
        );

        expect(spec).toMatchObject({
          name,
          main: entrypoint,
          compatibility_date: "2024-10-22",
          compatibility_flags: expect.arrayContaining(["nodejs_compat"]),
          queues: {
            producers: [
              {
                binding: "MY_QUEUE",
                queue: queue.name,
              },
            ],
            consumers: [
              {
                queue: queue.name,
                max_batch_size: 1,
                max_concurrency: 1,
                max_retries: 3,
              },
            ],
          },
          workflows: [
            {
              binding: "MY_WORKFLOW",
            },
          ],
        });
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });
  });
});
