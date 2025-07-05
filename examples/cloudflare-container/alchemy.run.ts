/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Container, Worker } from "alchemy/cloudflare";
import type { MyContainer } from "./src/worker.ts";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? process.env.USER;

const app = await alchemy("cloudflare-container");

const container = await Container<MyContainer>(
  `test-container${BRANCH_PREFIX}`,
  {
    className: "MyContainer",
    build: {
      context: import.meta.dirname,
      dockerfile: "Dockerfile",
    },
  },
);

export const worker = await Worker("test-worker", {
  name: `test-container-worker${BRANCH_PREFIX}`,
  entrypoint: "src/worker.ts",
  adopt: true,
  bindings: {
    MY_CONTAINER: container,
  },
});

console.log(worker.url);

await app.finalize();
