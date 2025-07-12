import type { AlchemyOptions, Phase } from "alchemy";
import alchemy from "alchemy";
import { DOFSStateStore } from "alchemy/cloudflare";

export const CLOUDFLARE_EMAIL = await alchemy.env.CLOUDFLARE_EMAIL;

export const CLOUDFLARE_ACCOUNT_ID = await alchemy.env.CLOUDFLARE_ACCOUNT_ID;

export const CLOUDFLARE_API_KEY = await alchemy.secret.env.CLOUDFLARE_API_KEY;

export const STRIPE_API_KEY = await alchemy.secret.env.STRIPE_API_KEY;

export const OPENAI_API_KEY = await alchemy.secret.env.OPENAI_API_KEY;

export const NEON_API_KEY = await alchemy.secret.env.NEON_API_KEY;

export const UPSTASH_API_KEY = await alchemy.secret.env.UPSTASH_API_KEY;

export default {
  stage: process.env.BRANCH_PREFIX || "prod",
  phase:
    (process.env.ALCHEMY_PHASE as Phase) ??
    (process.argv.includes("--destroy")
      ? "destroy"
      : process.argv.includes("--read")
        ? "read"
        : "up"),
  // pass the password in (you can get it from anywhere, e.g. stdin)
  password: process.env.SECRET_PASSPHRASE,
  quiet: process.argv.includes("--quiet"),
  stateStore:
    process.env.ALCHEMY_STATE_STORE === "cloudflare"
      ? (scope) => new DOFSStateStore(scope)
      : undefined,
} satisfies AlchemyOptions;
