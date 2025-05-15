import {
  D1Database,
  R2RestStateStore,
  Redwood,
} from "../../alchemy/src/cloudflare/index.js";
import alchemy from "../../alchemy/src/index.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";

const app = await alchemy("cloudflare-redwood", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

const database = await D1Database(`cloudflare-redwood-db${BRANCH_PREFIX}`, {
  migrationsDir: "drizzle",
});

export const website = await Redwood(
  `cloudflare-redwood-website${BRANCH_PREFIX}`,
  {
    bindings: {
      DB: database,
    },
  },
);

console.log({
  url: website.url,
});

await app.finalize();
