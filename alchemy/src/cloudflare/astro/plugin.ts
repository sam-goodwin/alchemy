import cloudflare, { type Options } from "@astrojs/cloudflare";
import { getPlatformProxyOptions } from "../runtime/cloudflare-env-proxy.ts";

const alchemyCloudflare = (options?: Options) => {
  return cloudflare({
    platformProxy: getPlatformProxyOptions(),
    ...options,
  });
};

export default alchemyCloudflare;
