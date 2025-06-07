import alchemy from "alchemy";
import {
  DOStateStore,
  KVNamespace,
  R2Bucket,
  SvelteKit,
} from "alchemy/cloudflare";

const BRANCH_PREFIX = process.env.BRANCH_PREFIX ?? "";
const app = await alchemy("cloudflare-sveltekit", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: !process.argv.includes("--verbose"),
  password: process.env.ALCHEMY_PASSWORD,
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOStateStore(scope)
      : undefined,
});

export const website = await SvelteKit(
  `cloudflare-sveltekit-website${BRANCH_PREFIX}`,
  {
    bindings: {
      AUTH_STORE: await KVNamespace("AUTH_STORE", {
        title: `cloudflare-sveltekit-auth-store${BRANCH_PREFIX}`,
        adopt: true,
      }),
      STORAGE: await R2Bucket(`cloudflare-sveltekit-storage${BRANCH_PREFIX}`, {
        allowPublicAccess: false,
        adopt: true,
      }),
    },
    url: true,
  },
);

console.log(website.url);

await app.finalize();
