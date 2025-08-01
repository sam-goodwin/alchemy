import { existsSync, readlinkSync, statSync } from "node:fs";

export const DEFAULT_CONFIG_PATH = ".alchemy/local/wrangler.jsonc";
export const DEFAULT_PERSIST_PATH = ".alchemy/miniflare";

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
  if (throws) {
    throw new Error(message);
  }
  if (!warned.has(message)) {
    console.warn(message);
    warned.add(message);
  }
};
