import alchemy, { type } from "alchemy";
import {
  DurableObjectNamespace,
  Queue,
  R2Bucket,
  Worker,
  Workflow,
  WranglerJson,
} from "alchemy/cloudflare";
import type { HelloWorldDO } from "./src/do.ts";
import type MyRPC from "./src/rpc.ts";

const app = await alchemy("cloudflare-worker");

export const queue = await Queue<{
  name: string;
  email: string;
}>("queue", {
  name: `${app.name}-${app.stage}-queue`,
  adopt: true,
});

export const rpc = await Worker("rpc", {
  name: `${app.name}-${app.stage}-rpc`,
  entrypoint: "./src/rpc.ts",
  rpc: type<MyRPC>,
});

export const worker = await Worker("worker", {
  name: `${app.name}-${app.stage}-worker`,
  entrypoint: "./src/worker.ts",
  bindings: {
    BUCKET: await R2Bucket("bucket", {
      name: `${app.name}-${app.stage}-bucket`,
      adopt: true,
    }),
    QUEUE: queue,
    WORKFLOW: Workflow("OFACWorkflow", {
      className: "OFACWorkflow",
      workflowName: "ofac-workflow",
    }),
    DO: DurableObjectNamespace<HelloWorldDO>("HelloWorldDO", {
      className: "HelloWorldDO",
      sqlite: true,
    }),
    RPC: rpc,
  },
  url: true,
  eventSources: [queue],
  bundle: {
    metafile: true,
    format: "esm",
    target: "es2020",
  },
  adopt: true,
});

await WranglerJson("wrangler.jsonc", {
  worker,
});

console.log(worker.url);

await app.finalize();
