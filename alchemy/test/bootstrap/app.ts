import { alchemy } from "../../src/alchemy.js";
import { isRuntime } from "../../src/bootstrap/env.js";
import { R2Bucket } from "../../src/cloudflare/bucket.js";
import "../../src/cloudflare/pipeline.js";
import { Queue } from "../../src/cloudflare/queue.js";
import { Worker } from "../../src/cloudflare/worker.js";
import { ReadOnlyMemoryStateStore } from "../../src/state.js";

const app = await alchemy("my-bootstrap-ap", {
  phase: isRuntime
    ? "read"
    : process.argv.includes("--destroy")
      ? "destroy"
      : "up",
  password: "TODO",
  stateStore: isRuntime
    ? (scope) => new ReadOnlyMemoryStateStore(scope, __ALCHEMY_ENV__)
    : undefined,
});

const queue = await Queue<string>("my-bootstrap-queue");

const bucket = await R2Bucket("my-bootstrap-bucket");

// const pipeline = await Pipeline<{
//   key: string;
// }>("my-bootstrap-pipeline", {
//   source: [{ type: "binding", format: "json" }],
//   destination: {
//     type: "r2",
//     format: "json",
//     path: {
//       bucket: bucket.name,
//     },
//     credentials: {
//       accessKeyId: await alchemy.secret.env.R2_ACCESS_KEY_ID,
//       secretAccessKey: await alchemy.secret.env.R2_SECRET_ACCESS_KEY,
//     },
//     batch: {
//       maxMb: 10,
//       // testing value. recommended - 300
//       maxSeconds: 5,
//       maxRows: 100,
//     },
//   },
// });

export default Worker("worker", import.meta, {
  compatibilityFlags: ["nodejs_compat"],
  bundle: {
    // outfile: path.join(import.meta.dirname, "app.js"),
    minify: false,
  },
  url: true,
  async fetch(request) {
    const key = new URL(request.url).pathname;
    const obj = await bucket.put(key, request.body);
    if (!obj) {
      return new Response("Failed to upload object", { status: 500 });
    }
    await queue.send(obj.key);
    // await pipeline.send([
    //   {
    //     key: obj.key,
    //   },
    // ]);
    return new Response(
      JSON.stringify({
        key: obj.key,
        etag: obj.etag,
      }),
    );
  },
});

await app.finalize();
