import { exec } from "node:child_process";
import { promisify } from "node:util";
import type { Context } from "../../context.js";
import { Resource } from "../../resource.js";

const execAsync = promisify(exec);

export type InstallDependencies = Resource<"project::InstallDependencies">;

export const InstallDependencies = Resource(
  "project::InstallDependencies",
  {
    alwaysUpdate: true,
  },
  async function (
    this: Context<InstallDependencies>,
    _id: string,
    {
      cwd,
      dependencies,
      devDependencies,
    }: {
      cwd: string;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    },
  ) {
    if (this.phase === "delete") {
      return this.destroy();
    }

    await installDependencies(cwd, dependencies);
    await installDependencies(cwd, devDependencies, "-D");
    await execAsync("bun install", { cwd });

    return this({});
  },
);

function isInstallableVersion(version: string) {
  // TODO: file:// ?
  return !version.startsWith("workspace:");
}

export function fixedDependencies(dependencies?: Record<string, string>) {
  if (!dependencies) return {};
  return Object.fromEntries(
    Object.entries(dependencies).filter(
      ([, value]) => !isInstallableVersion(value),
    ),
  );
}

export async function installDependencies(
  cwd: string,
  dependencies: Record<string, string> | undefined,
  ...args: string[]
) {
  if (!dependencies) return;
  const deps = Object.entries(dependencies)
    .filter(([, value]) => isInstallableVersion(value))
    .map(([pkg, version]) => `${pkg}@${version}`)
    .join(" ");

  const cmd = `bun add ${args.join(" ")} ${deps}`;
  console.log(cmd);
  await execAsync(cmd, { cwd });
}
