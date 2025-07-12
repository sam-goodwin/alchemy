import { $ } from "execa";

import { throwWithContext } from "../errors.ts";
import type { ProjectContext } from "../types.ts";

export async function isGitInstalled(): Promise<boolean> {
  try {
    await $`git --version`;
    return true;
  } catch {
    return false;
  }
}

export async function initializeGitRepo(
  context: ProjectContext,
): Promise<void> {
  const cwd = context.path;

  try {
    await $({ cwd })`git init`;
    await $({ cwd })`git add -A`;
    await $({ cwd })`git commit -m ${"initial commit"}`;
  } catch (error) {
    throwWithContext(error, "Git initialisation failed");
  }
}
