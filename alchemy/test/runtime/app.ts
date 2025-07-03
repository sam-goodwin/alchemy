import { alchemy } from "../../src/alchemy.js";
import { R2Bucket } from "../../src/cloudflare/bucket.js";
import { KVNamespace } from "../../src/cloudflare/kv-namespace.js";
import "../../src/cloudflare/pipeline.js";
import { Pipeline } from "../../src/cloudflare/pipeline.js";
import { Queue } from "../../src/cloudflare/queue.js";
import { Worker } from "../../src/cloudflare/worker.js";

const app = await alchemy("my-bootstrap-ap", {
  phase: process.argv.includes("--destroy") ? "destroy" : "apply",
});

const bucket = await R2Bucket("my-bootstrap-bucket", {
  accessKey: await alchemy.secret.env.R2_ACCESS_KEY_ID,
  secretAccessKey: await alchemy.secret.env.R2_SECRET_ACCESS_KEY,
  empty: true,
});

const kv = await KVNamespace("my-bootstrap-kv");

const pipeline = await Pipeline<{
  key: string;
}>("my-bootstrap-pipeline", {
  source: [{ type: "binding", format: "json" }],
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: bucket.name,
    },
    credentials: {
      accessKeyId: await alchemy.secret.env.R2_ACCESS_KEY_ID,
      secretAccessKey: await alchemy.secret.env.R2_SECRET_ACCESS_KEY,
    },
    batch: {
      maxMb: 10,
      // testing value. recommended - 300
      maxSeconds: 5,
      maxRows: 100,
    },
  },
});

const otherWorker = await Worker("other-worker", {
  script: `
    export default {
      fetch(request) {
        return new Response(request.body);
      }
    }
  `,
});

const queue = await Queue<string>("my-bootstrap-queue");

export default Worker("worker", import.meta, {
  async fetch(request) {
    const key = new URL(request.url).pathname;
    const obj = await bucket.put(key, request.body);
    if (!obj) {
      return new Response("Failed to upload object", { status: 500 });
    }
    await queue.send(obj.key);
    await pipeline.send([
      {
        key: "value",
      },
    ]);
    await kv.put("key", "value");
    await otherWorker.fetch(
      new Request("https://example.com/post", {
        method: "POST",
        body: JSON.stringify(
          {
            key: obj.key,
            etag: obj.etag,
          },
          null,
          2,
        ),
      }),
    );
    return new Response("hello world");
  },
});

await app.finalize();
