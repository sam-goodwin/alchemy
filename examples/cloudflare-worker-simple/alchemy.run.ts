/// <reference types="@types/node" />

import alchemy from "alchemy";
import {
  D1Database,
  DurableObjectNamespace,
  KVNamespace,
  R2Bucket,
  Worker,
} from "alchemy/cloudflare";

const app = await alchemy("cloudflare-worker-simple");

const [d1, kv, r2] = await Promise.all([
  D1Database("my-d1", { adopt: true }),
  KVNamespace("my-kv", {
    adopt: true,
    values: [
      { key: "test1", value: "test1" },
      { key: "test2", value: "test2" },
    ],
  }),
  R2Bucket("my-r2", { adopt: true }),
]);
const doNamespace = new DurableObjectNamespace("DO", {
  className: "DO",
  scriptName: "cloudflare-worker-simple",
  sqlite: true,
});
export const worker1 = await Worker("worker", {
  name: "cloudflare-worker-simple",
  entrypoint: "src/worker1.ts",
  bindings: {
    KV: kv,
    D1: d1,
    R2: r2,
    DO: doNamespace,
  },
  compatibilityFlags: ["nodejs_compat"],
  dev: {
    remote: true,
  },
});
export const worker2 = await Worker("worker2", {
  name: "cloudflare-worker-simple-2",
  entrypoint: "src/worker2.ts",
  bindings: {
    WORKER: worker1,
    DO: doNamespace,
  },
  compatibilityFlags: ["nodejs_compat"],
  dev: {
    remote: true,
  },
});

console.log(`worker1.url: ${worker1.url}`);
console.log(`worker2.url: ${worker2.url}`);

await app.finalize();
