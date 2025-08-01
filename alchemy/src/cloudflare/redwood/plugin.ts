import { redwood, type RedwoodPluginOptions } from "rwsdk/vite";
import { DEFAULT_CONFIG_PATH } from "../runtime/paths.ts";
import alchemyVite from "../vite/plugin.ts";

const alchemyRedwood = (options?: RedwoodPluginOptions) => {
  const configPath = options?.configPath ?? DEFAULT_CONFIG_PATH;
  return [
    redwood({
      ...options,
      configPath,
    }),
    alchemyVite({
      configPath,
    }),
  ];
};

export default alchemyRedwood;
