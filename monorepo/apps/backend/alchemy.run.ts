import alchemy from "alchemy";
import { D1Database, Worker } from "alchemy/cloudflare";
import path from "node:path";

const app = await alchemy("backend");

const db = await D1Database("db");

// second read-only consumer can sync on change
// if no change of inputs, assume it's safe to go?
//   -> does this have a race on first run?
export const backend = await Worker("worker", {
  entrypoint: path.join(import.meta.dirname, "src", "index.ts"),
  bindings: {
    db,
    API_KEY: alchemy.secret.env.API_KEY,
  },
});

if (import.meta.main) {
  await app.finalize();
}
