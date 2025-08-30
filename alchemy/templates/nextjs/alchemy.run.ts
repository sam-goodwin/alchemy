/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Nextjs } from "alchemy/cloudflare";

const app = await alchemy("{projectName}");

export const website = await Nextjs("website", {
  name: `${app.name}-${app.stage}-website`,
});

console.log({
  url: website.url,
});

await app.finalize();