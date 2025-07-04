import alchemy from "alchemy";
import { D1Database, DOStateStore, Redwood } from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";

const app = await alchemy("cloudflare-redwood", {
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
});

const database = await D1Database(`cloudflare-redwood-db${BRANCH_PREFIX}`, {
  migrationsDir: "drizzle",
  adopt: true,
});

export const website = await Redwood(
  `cloudflare-redwood-website${BRANCH_PREFIX}`,
  {
    adopt: true,
    bindings: {
      DB: database,
    },
  },
);

console.log({
  url: website.url,
});

await app.finalize();
