import { describe, expect, it } from "vitest";
import { convertWranglerToAlchemy } from "../../../scripts/wrangler-to-alchemy.ts";

describe("wrangler-to-alchemy conversion", () => {
  it("should convert basic wrangler.json", () => {
    const input = JSON.stringify({
      name: "my-worker",
      main: "src/index.ts",
      compatibility_date: "2023-12-01",
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("my-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("my-worker", {
  entrypoint: "src/index.ts",
  compatibilityDate: "2023-12-01",
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with KV namespace", () => {
    const input = JSON.stringify({
      name: "kv-worker",
      kv_namespaces: [{ binding: "MY_KV", id: "kv-id-123" }],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { KVNamespace, Worker } from "alchemy/cloudflare";

const app = await alchemy("kv-worker", {
  // Configure your app here
});

// Resources
export const my_kv = await KVNamespace("MY_KV", {
  title: "MY_KV",
  adopt: true,
});

// Worker
export const worker = await Worker("kv-worker", {
  bindings: {
    MY_KV: my_kv,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with R2 bucket", () => {
    const input = JSON.stringify({
      name: "r2-worker",
      r2_buckets: [{ binding: "MY_BUCKET", bucket_name: "my-bucket" }],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { R2Bucket, Worker } from "alchemy/cloudflare";

const app = await alchemy("r2-worker", {
  // Configure your app here
});

// Resources
export const my_bucket = await R2Bucket("my-bucket", {
  name: "my-bucket",
  adopt: true,
});

// Worker
export const worker = await Worker("r2-worker", {
  bindings: {
    MY_BUCKET: my_bucket,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with D1 database", () => {
    const input = JSON.stringify({
      name: "d1-worker",
      d1_databases: [
        { binding: "DB", database_id: "db-id-123", database_name: "my-db" },
      ],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { D1Database, Worker } from "alchemy/cloudflare";

const app = await alchemy("d1-worker", {
  // Configure your app here
});

// Resources
export const db = await D1Database("my-db", {
  name: "my-db",
  adopt: true,
});

// Worker
export const worker = await Worker("d1-worker", {
  bindings: {
    DB: db,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with durable objects", () => {
    const input = JSON.stringify({
      name: "do-worker",
      durable_objects: {
        bindings: [
          {
            name: "MY_DO",
            class_name: "MyDurableObject",
            script_name: "do-script",
            environment: "production",
          },
        ],
      },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { DurableObjectNamespace, Worker } from "alchemy/cloudflare";

const app = await alchemy("do-worker", {
  // Configure your app here
});

// Resources
export const my_do = new DurableObjectNamespace("MY_DO", {
  className: "MyDurableObject",
  scriptName: "do-script",
  environment: "production",
});

// Worker
export const worker = await Worker("do-worker", {
  bindings: {
    MY_DO: my_do,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with queues", () => {
    const input = JSON.stringify({
      name: "queue-worker",
      queues: {
        producers: [{ binding: "MY_QUEUE", queue: "my-queue" }],
        consumers: [{ queue: "my-queue", max_batch_size: 10 }],
      },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Queue, Worker } from "alchemy/cloudflare";

const app = await alchemy("queue-worker", {
  // Configure your app here
});

// Resources
export const my_queue = await Queue("my-queue", {
  name: "my-queue",
  adopt: true,
});

// Worker
export const worker = await Worker("queue-worker", {
  bindings: {
    MY_QUEUE: my_queue,
  },
  eventSources: [my_queue],
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with workflows", () => {
    const input = JSON.stringify({
      name: "workflow-worker",
      workflows: [
        {
          name: "my-workflow",
          binding: "MY_WORKFLOW",
          class_name: "MyWorkflow",
          script_name: "workflow-script",
        },
      ],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker, Workflow } from "alchemy/cloudflare";

const app = await alchemy("workflow-worker", {
  // Configure your app here
});

// Resources
export const my_workflow = new Workflow("my-workflow", {
  className: "MyWorkflow",
  workflowName: "my-workflow",
  scriptName: "workflow-script",
});

// Worker
export const worker = await Worker("workflow-worker", {
  bindings: {
    MY_WORKFLOW: my_workflow,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with AI binding", () => {
    const input = JSON.stringify({
      name: "ai-worker",
      ai: { binding: "AI" },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Ai, Worker } from "alchemy/cloudflare";

const app = await alchemy("ai-worker", {
  // Configure your app here
});

// Resources
export const ai = new Ai();

// Worker
export const worker = await Worker("ai-worker", {
  bindings: {
    AI: ai,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with browser binding", () => {
    const input = JSON.stringify({
      name: "browser-worker",
      browser: { binding: "BROWSER" },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { BrowserRendering, Worker } from "alchemy/cloudflare";

const app = await alchemy("browser-worker", {
  // Configure your app here
});

// Resources
export const browser = { type: "browser" as const };

// Worker
export const worker = await Worker("browser-worker", {
  bindings: {
    BROWSER: browser,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with images binding", () => {
    const input = JSON.stringify({
      name: "images-worker",
      images: { binding: "IMAGES" },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Images, Worker } from "alchemy/cloudflare";

const app = await alchemy("images-worker", {
  // Configure your app here
});

// Resources
export const images = { type: "images" as const };

// Worker
export const worker = await Worker("images-worker", {
  bindings: {
    IMAGES: images,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with version metadata binding", () => {
    const input = JSON.stringify({
      name: "version-worker",
      version_metadata: { binding: "VERSION" },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { VersionMetadata, Worker } from "alchemy/cloudflare";

const app = await alchemy("version-worker", {
  // Configure your app here
});

// Resources
export const versionMetadata = { type: "version_metadata" as const };

// Worker
export const worker = await Worker("version-worker", {
  bindings: {
    VERSION: versionMetadata,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with hyperdrive", () => {
    const input = JSON.stringify({
      name: "hyperdrive-worker",
      hyperdrive: [
        {
          binding: "HYPERDRIVE",
          id: "hyperdrive-id-123",
          localConnectionString: "postgres://user:password@localhost:5432/mydb",
        },
      ],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Hyperdrive, Worker } from "alchemy/cloudflare";

import { secret } from "alchemy";

const app = await alchemy("hyperdrive-worker", {
  // Configure your app here
});

// Resources
export const hyperdrive = await Hyperdrive("hyperdrive-id-123", {
  name: "hyperdrive-id-123",
  origin: {
    scheme: "postgres",
    host: "localhost",
    port: 5432,
    database: "mydb",
    user: "user",
    password: secret("USER_PASSWORD"),
  },
  adopt: true,
});

// Worker
export const worker = await Worker("hyperdrive-worker", {
  bindings: {
    HYPERDRIVE: hyperdrive,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with vectorize", () => {
    const input = JSON.stringify({
      name: "vectorize-worker",
      vectorize: [{ binding: "VECTORIZE", index_name: "my-index" }],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { VectorizeIndex, Worker } from "alchemy/cloudflare";

const app = await alchemy("vectorize-worker", {
  // Configure your app here
});

// Resources
export const vectorize = await VectorizeIndex("my-index", {
  name: "my-index",
  adopt: true,
});

// Worker
export const worker = await Worker("vectorize-worker", {
  bindings: {
    VECTORIZE: vectorize,
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with environment variables", () => {
    const input = JSON.stringify({
      name: "env-worker",
      vars: {
        API_URL: "https://api.example.com",
        DEBUG: "true",
      },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("env-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("env-worker", {
  env: {
      "API_URL": "https://api.example.com",
      "DEBUG": "true"
  },
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with cron triggers", () => {
    const input = JSON.stringify({
      name: "cron-worker",
      triggers: {
        crons: ["0 0 * * *", "0 12 * * *"],
      },
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("cron-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("cron-worker", {
  crons: ["0 0 * * *","0 12 * * *"],
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with routes", () => {
    const input = JSON.stringify({
      name: "route-worker",
      routes: ["example.com/*", "*.example.com/api/*"],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Route, Worker } from "alchemy/cloudflare";

const app = await alchemy("route-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("route-worker", {
  adopt: true,
});

// Routes
await Route("route-0", {
  pattern: "example.com/*",
  worker,
});
await Route("route-1", {
  pattern: "*.example.com/api/*",
  worker,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with compatibility flags", () => {
    const input = JSON.stringify({
      name: "compat-worker",
      compatibility_flags: ["nodejs_compat", "experimental_flag"],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("compat-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("compat-worker", {
  compatibilityFlags: ["nodejs_compat","experimental_flag"],
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert worker with workers_dev", () => {
    const input = JSON.stringify({
      name: "dev-worker",
      workers_dev: true,
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("dev-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("dev-worker", {
  url: true,
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  it("should convert complex worker with multiple bindings", () => {
    const input = JSON.stringify({
      name: "complex-worker",
      main: "src/index.ts",
      compatibility_date: "2023-12-01",
      compatibility_flags: ["nodejs_compat"],
      workers_dev: true,
      kv_namespaces: [{ binding: "CACHE", id: "kv-cache-123" }],
      r2_buckets: [{ binding: "STORAGE", bucket_name: "my-storage" }],
      d1_databases: [
        { binding: "DB", database_id: "db-123", database_name: "my-db" },
      ],
      ai: { binding: "AI" },
      vars: {
        API_URL: "https://api.example.com",
        ENV: "production",
      },
      triggers: {
        crons: ["0 */6 * * *"],
      },
      routes: ["*.example.com/*"],
    });

    const output = convertWranglerToAlchemy(input);

    const expectedOutput = `import alchemy from "alchemy";
import { Ai, D1Database, KVNamespace, R2Bucket, Route, Worker } from "alchemy/cloudflare";

const app = await alchemy("complex-worker", {
  // Configure your app here
});

// Resources
export const cache = await KVNamespace("CACHE", {
  title: "CACHE",
  adopt: true,
});
export const storage = await R2Bucket("my-storage", {
  name: "my-storage",
  adopt: true,
});
export const db = await D1Database("my-db", {
  name: "my-db",
  adopt: true,
});
export const ai = new Ai();

// Worker
export const worker = await Worker("complex-worker", {
  entrypoint: "src/index.ts",
  compatibilityDate: "2023-12-01",
  compatibilityFlags: ["nodejs_compat"],
  bindings: {
    CACHE: cache,
    STORAGE: storage,
    DB: db,
    AI: ai,
  },
  env: {
      "API_URL": "https://api.example.com",
      "ENV": "production"
  },
  crons: ["0 */6 * * *"],
  url: true,
  adopt: true,
});

// Routes
await Route("route-0", {
  pattern: "*.example.com/*",
  worker,
});

console.log(worker.url);

await app.finalize();`;

    expect(output).toBe(expectedOutput);
  });

  describe("error handling", () => {
    it("should throw error for invalid JSON", () => {
      const input = "{ invalid json";

      expect(() => convertWranglerToAlchemy(input)).toThrow("Invalid JSON");
    });

    it("should throw error for missing name field", () => {
      const input = JSON.stringify({
        main: "src/index.ts",
      });

      expect(() => convertWranglerToAlchemy(input)).toThrow(
        "wrangler.json must have a 'name' field",
      );
    });

    it("should handle empty JSON object", () => {
      const input = JSON.stringify({
        name: "empty-worker",
      });

      const output = convertWranglerToAlchemy(input);

      const expectedOutput = `import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("empty-worker", {
  // Configure your app here
});

// Worker
export const worker = await Worker("empty-worker", {
  adopt: true,
});

console.log(worker.url);

await app.finalize();`;

      expect(output).toBe(expectedOutput);
    });
  });
});
