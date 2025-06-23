import alchemy from "alchemy";
import { Orange, R2RestStateStore } from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";

const app = await alchemy("cloudflare-orange", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

export const website = await Orange("website", {
  name: `cloudflare-orange-website${BRANCH_PREFIX}`,
});

console.log({
  url: website.url,
});

await app.finalize();
