import type { CloudflareOptions } from "nitropack/presets/cloudflare/types";
import { validateConfigPath, validatePersistPath } from "../runtime/paths.ts";

const alchemyCloudflare = (
  options: Partial<CloudflareOptions> = {},
): CloudflareOptions => {
  return {
    dev: {
      configPath: validateConfigPath(options.dev?.configPath),
      persistDir: validatePersistPath(options.dev?.persistDir),
      ...options.dev,
    },
    ...options,
  };
};

export default alchemyCloudflare;
