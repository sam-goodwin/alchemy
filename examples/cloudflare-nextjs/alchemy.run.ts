import alchemy from "alchemy";
import { KVNamespace, Nextjs } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-nextjs");

export const kv = await KVNamespace("kv");

export const website = await Nextjs("website", {
  adopt: true,
  bindings: { KV: kv },
});
console.log(`Website: ${website.url}`);

if (process.env.ALCHEMY_E2E) {
  const { test } = await import("./test/e2e.js");
  await test({
    url: website.url,
  });
}

await app.finalize();
