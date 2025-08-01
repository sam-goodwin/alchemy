/// <reference types="@types/node" />

import alchemy from "alchemy";
import { ReactRouter } from "alchemy/cloudflare";

const app = await alchemy("my-alchemy-app");

export const worker = await ReactRouter("website");

console.log({
  url: worker.url,
});

await app.finalize();
