import type { GetPlatformProxyOptions } from "wrangler";
import {
  DEFAULT_CONFIG_PATH,
  DEFAULT_PERSIST_PATH,
  validateConfigPath,
  validatePersistPath,
} from "./paths.ts";

export const getCloudflareEnvProxy = async <E>(
  options: GetPlatformProxyOptions = {},
) => {
  const { getPlatformProxy } = await import("wrangler");
  const config = getPlatformProxyOptions(options);
  const proxy = await getPlatformProxy(config);
  return proxy.env as E;
};

export const getPlatformProxyOptions = (
  input: GetPlatformProxyOptions = {},
): GetPlatformProxyOptions => {
  const persist =
    input.persist === false
      ? false
      : {
          path: validatePersistPath(
            typeof input.persist === "object" &&
              typeof input.persist.path === "string"
              ? input.persist.path
              : DEFAULT_PERSIST_PATH,
          ),
        };
  if (!persist) {
    const message =
      "[Alchemy] Persistence for local bindings is disabled. Some bindings may not work as expected. To enable, remove the \`persist\` option from getPlatformProxyOptions.";
    if (!warned.has(message)) {
      console.warn(message);
      warned.add(message);
    }
  }
  return {
    ...input,
    configPath: validateConfigPath(input.configPath ?? DEFAULT_CONFIG_PATH),
    persist,
    experimental: input.experimental ?? {
      remoteBindings: true,
    },
  };
};

const warned = new Set<string>();
