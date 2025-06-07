/// <reference types="node" />

import alchemy from "alchemy";
import { DOStateStore, KVNamespace, R2Bucket, Vite } from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-vite", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: !process.argv.includes("--verbose"),
  password: process.env.ALCHEMY_PASSWORD,
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
  dev: process.argv.includes("--dev"),
});

export const [authStore, storage] = await Promise.all([
  KVNamespace("AUTH_STORE", {
    title: `cloudflare-vite-auth-store${BRANCH_PREFIX}`,
    adopt: true,
  }),
  R2Bucket(`cloudflare-vite-storage${BRANCH_PREFIX}`, {
    allowPublicAccess: false,
    // so that CI is idempotent
    adopt: true,
  }),
]);

export const website = await Vite(`cloudflare-vite-website${BRANCH_PREFIX}`, {
  main: "./src/index.ts",
  command: "bun run build",
  bindings: {
    STORAGE: storage,
    AUTH_STORE: authStore,
  },
});

console.log({
  url: website.url,
});

await app.finalize();
