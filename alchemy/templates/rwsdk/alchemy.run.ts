/// <reference types="@types/node" />
import alchemy from "alchemy";
import { D1Database, DurableObjectNamespace, Redwood } from "alchemy/cloudflare";

const app = await alchemy("my-alchemy-app");
    
const database = await D1Database("database", {
  name: "my-alchemy-app-db",
  migrationsDir: "migrations",
});

export const worker = await Redwood("website", {
  name: "my-alchemy-app-website",
  command: "bun run build",
  bindings: {
    AUTH_SECRET_KEY: alchemy.secret(process.env.AUTH_SECRET_KEY),
    DB: database,
    SESSION_DURABLE_OBJECT: DurableObjectNamespace("session", {
      className: "SessionDurableObject",
    }),
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
    