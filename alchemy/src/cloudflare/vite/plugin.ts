import { cloudflare, type PluginConfig } from "@cloudflare/vite-plugin";
import { getPlatformProxyOptions } from "../runtime/cloudflare-env-proxy.ts";

const alchemyVite = (config?: PluginConfig) => {
  const resolvedConfig = {
    ...getPlatformProxyOptions(),
    ...config,
  } satisfies PluginConfig;
  return cloudflare(resolvedConfig);
};

export default alchemyVite;
