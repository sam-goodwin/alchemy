import alchemy from "alchemy";
import { Astro, DOStateStore } from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-astro", {
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
});

export const website = await Astro("website", {
  name: `cloudflare-astro-website${BRANCH_PREFIX}`,
  command: "bun run build",
});

console.log({
  url: website.url,
});

await app.finalize();
