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

        expect(spec.name).toEqual(name);
        expect(spec.main).toEqual(entrypoint);
        expect(spec.compatibility_date).toEqual(worker.compatibilityDate);
        expect(spec.compatibility_flags).toEqual(worker.compatibilityFlags);
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

        expect(spec.name).toEqual(name);
        expect(spec.browser).toBeDefined();
        expect(spec.browser?.binding).toEqual("browser");
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

        expect(spec.name).toEqual(name);
        expect(spec.ai).toBeDefined();
        expect(spec.ai?.binding).toEqual("AI");
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

        // Verify the worker name and entrypoint
        expect(spec.name).toEqual(name);
        expect(spec.main).toEqual(entrypoint);

        // Verify the durable object bindings
        expect(spec.durable_objects).toBeDefined();
        expect(spec.durable_objects?.bindings).toHaveLength(2);

        // Find Counter binding
        const counterBinding = spec.durable_objects?.bindings.find(
          (b) => b.class_name === "Counter",
        );
        expect(counterBinding).toBeDefined();
        expect(counterBinding?.name).toEqual("COUNTER");
        expect(counterBinding?.script_name).toEqual(name);

        // Find SqliteCounter binding
        const sqliteCounterBinding = spec.durable_objects?.bindings.find(
          (b) => b.class_name === "SqliteCounter",
        );
        expect(sqliteCounterBinding).toBeDefined();
        expect(sqliteCounterBinding?.name).toEqual("SQLITE_COUNTER");
        expect(sqliteCounterBinding?.script_name).toEqual(name);

        // Verify migrations
        expect(spec.migrations).toBeDefined();
        expect(spec.migrations?.length).toEqual(1);
        expect(spec.migrations?.[0].tag).toEqual("v1");

        // Verify new_classes contains Counter
        expect(spec.migrations?.[0].new_classes).toContain("Counter");
        expect(spec.migrations?.[0].new_classes?.length).toEqual(1);

        // Verify new_sqlite_classes contains SqliteCounter
        expect(spec.migrations?.[0].new_sqlite_classes).toContain(
          "SqliteCounter",
        );
        expect(spec.migrations?.[0].new_sqlite_classes?.length).toEqual(1);
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
        });

        const { spec } = await WranglerJson(
          `${BRANCH_PREFIX}-test-wrangler-json-wf`,
          { worker },
        );

        expect(spec.workflows).toBeDefined();
        expect(spec.workflows?.length).toEqual(1);
        expect(spec.workflows?.[0].name).toEqual("test-workflow");
        expect(spec.workflows?.[0].binding).toEqual("WF");
        expect(spec.workflows?.[0].class_name).toEqual("TestWorkflow");
        expect(spec.workflows?.[0].script_name).toEqual("other-script");
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

        expect(spec.triggers).toBeDefined();
        expect(spec.triggers?.crons).toEqual(worker.crons!);
      } finally {
        await fs.rm(tempDir, { recursive: true, force: true });
        await destroy(scope);
      }
    });
  });
});
