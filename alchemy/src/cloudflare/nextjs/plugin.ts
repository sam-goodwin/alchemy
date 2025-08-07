import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { GetPlatformProxyOptions } from "wrangler";
import { getPlatformProxyOptions } from "../cloudflare-env-proxy.ts";

export function initAlchemyNextjs(options: GetPlatformProxyOptions = {}) {
  return initOpenNextCloudflareForDev(getPlatformProxyOptions(options));
}
