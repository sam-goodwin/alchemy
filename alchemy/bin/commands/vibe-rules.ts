import { execa } from "execa";
import * as fs from "fs-extra";
import { join } from "node:path";
import { getPackageManagerCommands } from "../services/package-manager.ts";
import type { InstallInput } from "../types.ts";

export async function ensureVibeRulesPostinstall(
  cwd: string,
  editor: string,
): Promise<void> {
  try {
    const packageJsonPath = join(cwd, "package.json");
    if (!(await fs.pathExists(packageJsonPath))) return;

    const packageJson = await fs.readJson(packageJsonPath);

    const postinstallCmd = `vibe-rules install ${editor}`;

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (packageJson.scripts.postinstall) {
      if (!packageJson.scripts.postinstall.includes("vibe-rules install")) {
        packageJson.scripts.postinstall = `${packageJson.scripts.postinstall} && ${postinstallCmd}`;
      }
    } else {
      packageJson.scripts.postinstall = postinstallCmd;
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  } catch (_err) {}
}

export async function installAlchemyRules(input: InstallInput): Promise<void> {
  const packageManager = input.packageManager || "bun";
  const commands = getPackageManagerCommands(packageManager);

  const args = ["vibe-rules", "install", input.editor];

  await execa(commands.x, args, {
    stdio: "pipe",
    cwd: input.cwd,
  });

  await ensureVibeRulesPostinstall(input.cwd ?? process.cwd(), input.editor);
}
