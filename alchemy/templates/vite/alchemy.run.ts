/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

const app = await alchemy("{projectName}");

export const worker = await Vite("website", {
  name: `${app.name}-${app.stage}-website`,
  entrypoint: "src/worker.ts",
});

console.log({
  url: worker.url,
});

await app.finalize();
