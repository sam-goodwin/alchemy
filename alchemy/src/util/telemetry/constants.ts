import xdgAppPaths from "xdg-app-paths";

const xdg = xdgAppPaths("alchemy");

export const CONFIG_DIR = xdg.config();
export const STATE_DIR = xdg.state();

export const TELEMETRY_DISABLED =
  !!process.env.ALCHEMY_TELEMETRY_DISABLED || !!process.env.DO_NOT_TRACK;

// TODO(sam): replace with permanent URL
export const INGEST_URL =
  process.env.ALCHEMY_TELEMETRY_URL ??
  "https://b75a323ba8074abd80abe83abd01d092.pipelines.cloudflare.com";
