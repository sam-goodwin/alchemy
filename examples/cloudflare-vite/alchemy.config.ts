import { $, alchemize } from "../../src";
import {
  DurableObjectNamespace,
  StaticSite,
  Worker,
  Workflow,
} from "../../src/cloudflare";

import "dotenv/config";

const workflow = new Workflow("workflow", {
  workflowName: "workflows-starter",
  className: "Workflow",
  scriptName: "workflows-starter",
});

const counter = new DurableObjectNamespace("counter", {
  className: "Counter",
  sqlite: true,
});

const api = new Worker("api", {
  name: "alchemy-example-vite-api",
  entrypoint: "./src/index.ts",
  bindings: {
    COUNTER: counter,
    WORKFLOW: workflow,
  },
});

const website = new StaticSite("Website", {
  name: "alchemy-example-vite",
  dir: "./dist",
  build: {
    command: "bun run build",
  },
  routes: {
    "/api/*": api,
  },
});

$(console).log({
  url: website.url,
});

await alchemize({
  mode: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: process.argv.includes("--verbose") ? false : true,
});
