import { log } from "@clack/prompts";
import { execa } from "execa";
import * as fs from "fs-extra";
import type { PackageManager, ProjectContext } from "../types.ts";

export function detectPackageManager(
  path: string = process.cwd(),
): PackageManager {
  if (fs.pathExistsSync(`${path}/deno.lock`)) return "deno";
  if (
    fs.pathExistsSync(`${path}/deno.json`) ||
    fs.pathExistsSync(`${path}/deno.jsonc`)
  )
    return "deno";
  if (fs.pathExistsSync(`${path}/bun.lockb`)) return "bun";
  if (fs.pathExistsSync(`${path}/pnpm-lock.yaml`)) return "pnpm";
  if (fs.pathExistsSync(`${path}/yarn.lock`)) return "yarn";

  if (process.env.npm_execpath?.includes("bun")) {
    return "bun";
  }

  if (process.env.DENO) {
    return "deno";
  }

  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("deno")) return "deno";
    if (userAgent.startsWith("bun")) return "bun";
    if (userAgent.startsWith("pnpm")) return "pnpm";
    if (userAgent.startsWith("yarn")) return "yarn";
    if (userAgent.startsWith("npm")) return "npm";
  }

  return "npm";
}

export function getPackageManagerCommands(pm: PackageManager) {
  const commands = {
    bun: {
      init: "bun init -y",
      install: "bun install",
      add: "bun add",
      addDev: "bun add -D",
      run: "bun run",
      create: "bun create",
      x: "bunx",
    },
    npm: {
      init: "npm init -y",
      install: "npm install",
      add: "npm install",
      addDev: "npm install --save-dev",
      run: "npm run",
      create: "npm create",
      x: "npx",
    },
    pnpm: {
      init: "pnpm init",
      install: "pnpm install",
      add: "pnpm add",
      addDev: "pnpm add -D",
      run: "pnpm run",
      create: "pnpm create",
      x: "pnpm dlx",
    },
    yarn: {
      init: "yarn init -y",
      install: "yarn install",
      add: "yarn add",
      addDev: "yarn add -D",
      run: "yarn",
      create: "yarn create",
      x: "yarn dlx",
    },
    deno: {
      init: "deno init",
      install: "deno install",
      add: "deno add",
      addDev: "deno add",
      run: "deno task",
      create: "deno run -A",
      x: "deno run -A",
    },
  };

  return commands[pm];
}

export async function installDependencies(
  context: ProjectContext,
  {
    dependencies,
    devDependencies,
    cwd,
  }: {
    dependencies?: string[];
    devDependencies?: string[];
    cwd?: string;
  } = {},
): Promise<void> {
  const targetCwd = cwd || context.path;
  const pm = context.packageManager;
  const commands = getPackageManagerCommands(pm);

  try {
    if (!dependencies && !devDependencies) {
      await execa(commands.install, {
        cwd: targetCwd,
        shell: true,
        stdio: "pipe",
      });
    }

    if (dependencies) {
      await execa(`${commands.add} ${dependencies.join(" ")}`, {
        cwd: targetCwd,
        shell: true,
        stdio: "pipe",
      });
    }

    if (devDependencies) {
      await execa(`${commands.addDev} ${devDependencies.join(" ")}`, {
        cwd: targetCwd,
        shell: true,
        stdio: "pipe",
      });
    }
  } catch (error) {
    log.error("Failed to install dependencies");
    throw error;
  }
}
