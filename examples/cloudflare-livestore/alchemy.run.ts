/// <reference types="@types/node" />

import alchemy from "alchemy";
import {
  D1Database,
  DurableObjectNamespace,
  Vite,
  Worker,
} from "alchemy/cloudflare";

const app = await alchemy("cloudflare-livestore");

export const server = await Worker("server", {
  name: `${app.name}-${app.stage}-server`,
  entrypoint: "src/cf-worker/index.ts",
  bindings: {
    DB: await D1Database("db", {
      name: `${app.name}-${app.stage}-livestore-sync-cf-demo`,
      adopt: true,
    }),
    WEBSOCKET_SERVER: DurableObjectNamespace("websocket-server", {
      className: "WebSocketServer",
    }),
  },
  compatibilityFlags: ["nodejs_compat"],
  compatibilityDate: "2025-05-08",
});

export const client = await Vite("client", {
  assets: "dist",
  command: "bun vite build",
  dev: {
    command: "bun vite --force",
  },
  env: {
    VITE_LIVESTORE_SYNC_URL: server.url!,
  },
  wrangler: false,
});

console.log(`server.url: ${server.url}`);

await app.finalize();
