import "../../alchemy/src/cloudflare/index.js";

import alchemy from "../../alchemy/src/index.js";
import {
  R2RestStateStore,
  TanStackStart,
} from "../../alchemy/src/cloudflare/index.js";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";

const app = await alchemy("cloudflare-tanstack", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
});

export const website = await TanStackStart(
  `cloudflare-tanstack-website${BRANCH_PREFIX}`,
);

console.log({
  url: website.url,
});

await app.finalize();
