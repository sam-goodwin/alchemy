import envPaths from "env-paths";

export const CONFIG_DIR = envPaths("alchemy", { suffix: "" }).config;

export const TELEMETRY_DISABLED =
  !!process.env.ALCHEMY_TELEMETRY_DISABLED || !!process.env.DO_NOT_TRACK;

// TODO(sam): replace with permanent URL
export const POSTHOG_CLIENT_API_HOST =
  process.env.POSTHOG_CLIENT_API_HOST ?? "https://ph.alchemy.run";
export const POSTHOG_PROJECT_ID =
  process.env.POSTHOG_PROJECT_ID ??
  "phc_A51Mi7Q63TvnNrvRMgvBxE1il0DAL66rVg4LdWPRsfK";
