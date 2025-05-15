import {
  DurableObjectNamespace,
  Queue,
  R2Bucket,
  R2RestStateStore,
  Worker,
  Workflow,
  WranglerJson,
} from "../../alchemy/src/cloudflare/index.js";
import alchemy from "../../alchemy/src/index.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-worker", {
  stage: BRANCH_PREFIX || undefined,
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

export const queue = await Queue<{
  name: string;
  email: string;
}>(`cloudflare-worker-queue${BRANCH_PREFIX}`);

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
    DO: new DurableObjectNamespace("HelloWorldDO", {
      className: "HelloWorldDO",
      sqlite: true,
    }),
  },
  url: true,
  eventSources: [queue],
  bundle: {
    metafile: true,
    format: "esm",
    target: "es2020",
  },
});

await WranglerJson("wrangler.jsonc", {
  worker,
});

console.log(worker.url);

await app.finalize();
