import path from "node:path";
import type { GetPlatformProxyOptions } from "wrangler";
import type { Scope } from "../scope.ts";
import {
  DEFAULT_CONFIG_PATH,
  validateConfigPath,
  validatePersistPath,
} from "./miniflare/paths.ts";

export const getCloudflareEnvProxy = async <E>(
  scope: Scope,
  options: GetPlatformProxyOptions = {},
) => {
  const { getPlatformProxy } = await import("wrangler");
  const config = getPlatformProxyOptions(scope, options);
  const proxy = await getPlatformProxy(config);
  return proxy.env as E;
};

export const getPlatformProxyOptions = (
  scope: Scope,
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
              : path.join(scope.dotAlchemy, "miniflare", "v3"),
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
