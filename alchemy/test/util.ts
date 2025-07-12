import fs from "node:fs/promises";
import os from "node:os";
import type { AlchemyOptions } from "../src/alchemy.ts";
import { D1StateStore } from "../src/cloudflare/d1-state-store.ts";
import { DOStateStore } from "../src/cloudflare/do-state-store.ts";
import { DOFSStateStore } from "../src/cloudflare/dofs-state-store/index.ts";
import { FileSystemStateStore } from "../src/fs/file-system-state-store.ts";
import { SQLiteStateStore } from "../src/sqlite/sqlite-state-store.ts";

/**
 * Check if a file or directory exists
 * Uses fs.access which is available in all Node.js versions
 */
export async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize a string to be safe for AWS resource names
 * Replaces any characters that aren't alphanumeric, hyphen, or underscore
 */
function sanitizeForAwsResourceName(str: string): string {
  // Replace any character that's not alphanumeric, hyphen, or underscore with a hyphen
  return str.replace(/[^a-zA-Z0-9\-_]/g, "-");
}

/**
 * Branch prefix for resource names to avoid naming conflicts in CI/CD
 *
 * Uses BRANCH_PREFIX environment variable in CI/CD environments
 * Falls back to current user's name in local development
 * Sanitizes to ensure only valid characters for AWS resource names
 */
export const BRANCH_PREFIX = sanitizeForAwsResourceName(
  process.env.BRANCH_PREFIX || os.userInfo().username,
);

export const createTestOptions = (storeType: string, namespace: string) =>
  ({
    stateStore: (scope) => {
      switch (storeType) {
        case "do":
          return new DOStateStore(scope);
        case "dofs":
          return new DOFSStateStore(scope);
        case "fs":
          return new FileSystemStateStore(scope);
        case "d1":
          return new D1StateStore(scope);
        default:
          return new SQLiteStateStore(scope, {
            filename: `.alchemy/${namespace}.sqlite`,
          });
      }
    },
  }) satisfies AlchemyOptions;
