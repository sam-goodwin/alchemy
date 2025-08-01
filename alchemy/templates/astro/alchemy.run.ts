/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("my-alchemy-app");

export const worker = await Astro("website", {
  output: "server",
});

console.log({
  url: worker.url,
});

await app.finalize();
