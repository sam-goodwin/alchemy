import { AsyncLocalStorage } from "node:async_hooks";
import { existsSync, readlinkSync, statSync } from "node:fs";
import path from "node:path";
import type { Scope } from "../../scope.ts";

const dynamicImportContext = new AsyncLocalStorage<boolean>();

/**
 * Used to disable path validation during dynamic imports.
 */
export const withSkipPathValidation = <T>(callback: () => T) => {
  return dynamicImportContext.run(true, callback);
};

export const DEFAULT_CONFIG_PATH =
  // we may set this via env variable when running `vite dev`
  process.env.ALCHEMY_DEFAULT_CONFIG_PATH ??
  path.join(".alchemy", "local", "wrangler.jsonc");

export const DEFAULT_PERSIST_PATH =
  // we may set this via env variable when running `vite dev`
  process.env.ALCHEMY_DEFAULT_PERSIST_PATH ??
  path.join(".alchemy", "miniflare", "v3");

export function getPersistPath(scope: Scope) {
  return path.join(scope.dotAlchemy, "miniflare", "v3");
}

export const validateConfigPath = (
  path = DEFAULT_CONFIG_PATH,
  throws = true,
) => {
  if (!existsSync(path)) {
    warnOrThrow(
      `The Wrangler config path, "${path}", could not be found. Please run \`alchemy dev\` or \`alchemy deploy\` to create it.`,
      throws,
    );
  }
  return path;
};

const DEFAULT_VALIDATE_PERSIST =
  process.env.NODE_ENV === "development" ||
  !process.argv.some((arg) => ["build", "prepare", "typegen"].includes(arg));

export const validatePersistPath = (
  path = DEFAULT_PERSIST_PATH,
  throws = DEFAULT_VALIDATE_PERSIST,
) => {
  try {
    const stat = statSync(path);
    if (stat.isSymbolicLink()) {
      return readlinkSync(path);
    }
    return path;
  } catch {
    warnOrThrow(
      `The Alchemy data path, "${path}", could not be resolved. This is required for Cloudflare bindings during development. Please run \`alchemy dev\` to create it.`,
      throws,
    );
    return path;
  }
};

const warned = new Set<string>();

const warnOrThrow = (message: string, throws: boolean) => {
  if (dynamicImportContext.getStore()) {
    return;
  }
  if (throws) {
    throw new Error(message);
  }
  if (!warned.has(message)) {
    console.warn(message);
    warned.add(message);
  }
};
