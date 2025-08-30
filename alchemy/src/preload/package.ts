/// <reference types="node" />

import fs from "node:fs/promises";
import path from "node:path";

const roots = new Map<string, string>();

export async function findPackageRoot(
  file: string, // assume absolute file path
): Promise<string | undefined> {
  if (roots.has(file)) return roots.get(file);

  const stat = await fs.stat(file);
  if (!stat.isDirectory()) {
    const packageJsonPath = path.join(file, "package.json");
    if (await fs.exists(packageJsonPath)) {
      return file;
    }
  }
  const parentDir = path.dirname(file);
  if (parentDir === file) {
    return undefined;
  }
  return findPackageRoot(parentDir);
}
