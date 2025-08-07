import alchemy from "alchemy";
import { KVNamespace, Self, Website } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-nextjs");

const kv = await KVNamespace("kv");

export const website = await Website("website", {
  name: "cloudflare-nextjs",
  entrypoint: ".open-next/worker.js",
  build: "bun opennextjs-cloudflare build",
  dev: "next dev",
  adopt: true,
  noBundle: false,
  compatibilityDate: "2025-03-01",
  compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
  assets: {
    directory: ".open-next/assets",
  },
  bindings: {
    KV: kv,
    WORKER_SELF_REFERENCE: Self,
  },
});

console.log(website.url);

await app.finalize();
