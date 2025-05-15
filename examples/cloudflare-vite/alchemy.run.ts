/// <reference types="node" />

import {
  KVNamespace,
  R2Bucket,
  R2RestStateStore,
  Vite,
} from "../../alchemy/src/cloudflare/index.js";
import alchemy from "../../alchemy/src/index.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-vite", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: !process.argv.includes("--verbose"),
  password: process.env.ALCHEMY_PASSWORD,
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

export const [authStore, storage] = await Promise.all([
  KVNamespace("AUTH_STORE", {
    title: `cloudflare-vite-auth-store${BRANCH_PREFIX}`,
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
