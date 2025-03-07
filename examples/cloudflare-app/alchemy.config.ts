import dotenv from "dotenv";
import path from "node:path";
import { alchemize } from "../../src";
import { Worker } from "../../src/cloudflare";

dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

new Worker("worker", {
  name: "alchemy-examples",
  entrypoint: "./src/index.ts",
  bindings: [
    {
      type: "durable_object_namespace",
      class_name: "Counter",
      name: "COUNTER",
    },
  ],
});

await alchemize({
  mode: process.argv.includes("--destroy") ? "destroy" : "up",
});
