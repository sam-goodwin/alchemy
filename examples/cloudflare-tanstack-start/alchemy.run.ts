import alchemy from "alchemy";
import { KVNamespace, TanStackStart } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-tanstack");

export const kv = await KVNamespace("kv", {
  title: `${app.name}-${app.stage}-kv`,
});

export const website = await TanStackStart("website", {
  name: `${app.name}-${app.stage}-website`,
  bindings: {
    KV: kv,
    TEST_SECRET_VALUE: alchemy.secret("test-secret-value"),
  },
  adopt: true,
});

console.log({
  url: website.url,
});

if (process.env.ALCHEMY_E2E) {
  const { test } = await import("./test/e2e.js");
  await test({
    url: website.url,
    env: { TEST_SECRET_VALUE: "test-secret-value" },
  });
}

await app.finalize();
