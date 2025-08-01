import type { PluginConfig } from "@cloudflare/vite-plugin";
import alchemyVite from "../vite/plugin.ts";

const alchemyReactRouter = (config?: PluginConfig) => {
  return alchemyVite({
    ...config,
    viteEnvironment: {
      name: "ssr",
    },
  });
};

export default alchemyReactRouter;
