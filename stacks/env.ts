import type { AlchemyOptions, Phase } from "../alchemy/src/alchemy.js";
import { R2RestStateStore } from "../alchemy/src/cloudflare/index.js";
import alchemy from "../alchemy/src/index.js";

export const CLOUDFLARE_EMAIL = await alchemy.env.CLOUDFLARE_EMAIL;

export const CLOUDFLARE_ACCOUNT_ID = await alchemy.env.CLOUDFLARE_ACCOUNT_ID;

export const CLOUDFLARE_API_KEY = await alchemy.secret.env.CLOUDFLARE_API_KEY;

export const STRIPE_API_KEY = await alchemy.secret.env.STRIPE_API_KEY;

export const OPENAI_API_KEY = await alchemy.secret.env.OPENAI_API_KEY;

export const NEON_API_KEY = await alchemy.secret.env.NEON_API_KEY;

export const UPSTASH_API_KEY = await alchemy.secret.env.UPSTASH_API_KEY;

export default {
  stage: "prod",
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
      ? (scope) => new R2RestStateStore(scope)
      : undefined,
} satisfies AlchemyOptions;
