import alchemy from "alchemy";
import { Astro, DOStateStore } from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-astro", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  password: process.env.ALCHEMY_PASSWORD,
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
});

export const website = await Astro(`cloudflare-astro-website${BRANCH_PREFIX}`, {
  command: "bun run build",
});

console.log({
  url: website.url,
});

await app.finalize();
