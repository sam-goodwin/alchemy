/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

const app = await alchemy("my-alchemy-app");

export const worker = await Vite("website", {
  entrypoint: "worker/index.ts",
});

console.log({
  url: worker.url,
});

await app.finalize();
