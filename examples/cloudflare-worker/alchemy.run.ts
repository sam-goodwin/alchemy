import alchemy, { type } from "alchemy";
import {
  DOStateStore,
  DurableObjectNamespace,
  Queue,
  R2Bucket,
  Worker,
  Workflow,
  WranglerJson,
} from "alchemy/cloudflare";
import type { HelloWorldDO } from "./src/do.ts";
import type MyRPC from "./src/rpc.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-worker", {
  stage: BRANCH_PREFIX || undefined,
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
  dev: process.argv.includes("--dev"),
  quiet: !process.argv.includes("--verbose"),
});

export const queue = await Queue<{
  name: string;
  email: string;
}>(`cloudflare-worker-queue${BRANCH_PREFIX}`, {
  name: `cloudflare-worker-queue${BRANCH_PREFIX}`,
  adopt: true,
});

export const rpc = await Worker(`cloudflare-worker-rpc${BRANCH_PREFIX}`, {
  entrypoint: "./src/rpc.ts",
  rpc: type<MyRPC>,
});

export const worker = await Worker(`cloudflare-worker-worker${BRANCH_PREFIX}`, {
  entrypoint: "./src/worker.ts",
  bindings: {
    BUCKET: await R2Bucket(`cloudflare-worker-bucket${BRANCH_PREFIX}`, {
      // so that CI is idempotent
      adopt: true,
    }),
    QUEUE: queue,
    WORKFLOW: new Workflow("OFACWorkflow", {
      className: "OFACWorkflow",
      workflowName: "ofac-workflow",
    }),
    DO: new DurableObjectNamespace<HelloWorldDO>("HelloWorldDO", {
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
