import path from "node:path";
import type { GetPlatformProxyOptions } from "wrangler";
import type { Scope } from "../scope.ts";
import {
  DEFAULT_CONFIG_PATH,
  validateConfigPath,
  validatePersistPath,
} from "./miniflare/paths.ts";

export interface ProxyOptions extends GetPlatformProxyOptions {
  scope?: Scope | undefined;
}

export const getCloudflareEnvProxy = async <E>(options: ProxyOptions = {}) => {
  const { getPlatformProxy } = await import("wrangler");
  const config = getPlatformProxyOptions(options);
  const proxy = await getPlatformProxy(config);
  return proxy.env as E;
};

export const getPlatformProxyOptions = (
  input: ProxyOptions = {},
): GetPlatformProxyOptions => {
  const persist =
    input.persist === false
      ? false
      : {
          path: validatePersistPath(
            typeof input.persist === "object" &&
              typeof input.persist.path === "string"
              ? input.persist.path
              : path.join(
                  input.scope?.dotAlchemy ??
                    process.env.ALCHEMY_HOME ??
                    ".alchemy",
                  "miniflare",
                  "v3",
                ),
          ),
        };
  if (!persist) {
    const message =
      "[Alchemy] Persistence for local bindings is disabled. Some bindings may not work as expected. To enable, remove the `persist` option from getPlatformProxyOptions.";
    if (!warned.has(message)) {
      console.warn(message);
      warned.add(message);
    }
  }
  return {
    ...input,
    configPath: validateConfigPath(input.configPath ?? DEFAULT_CONFIG_PATH),
    persist,
    experimental: (input as any).experimental ?? {
      remoteBindings: true,
    },
  } as any;
};

const warned = new Set<string>();
