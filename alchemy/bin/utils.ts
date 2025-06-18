import { execa } from "execa";
import { applyEdits, modify } from "jsonc-parser";
import { existsSync } from "node:fs";
import * as fs from "node:fs/promises";
import { join } from "node:path";
import type {
  PackageManager,
  ProjectContext,
  WebsiteOptions,
} from "./types.ts";

export function throwWithContext(error: unknown, context: string): never {
  const errorMsg = error instanceof Error ? error.message : String(error);
  throw new Error(`${context}: ${errorMsg}`, {
    cause: error instanceof Error ? error : new Error(String(error)),
  });
}

/**
 * Detect package manager from lockfiles and environment
 * This function is pure and doesn't rely on global state
 */
export function detectPackageManager(): PackageManager {
  // Check lockfiles first (more reliable)
  if (existsSync("bun.lockb")) return "bun";
  if (existsSync("pnpm-lock.yaml")) return "pnpm";
  if (existsSync("yarn.lock")) return "yarn";

  // Check npm_execpath for bun
  if (process.env.npm_execpath?.includes("bun")) {
    return "bun";
  }

  // Check npm_config_user_agent
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("bun")) return "bun";
    if (userAgent.startsWith("pnpm")) return "pnpm";
    if (userAgent.startsWith("yarn")) return "yarn";
    if (userAgent.startsWith("npm")) return "npm";
  }

  // Default fallback
  return "npm";
}

export async function appendGitignore(projectPath: string): Promise<void> {
  try {
    await fs.writeFile(
      join(projectPath, ".gitignore"),
      [
        await fs.readFile(join(projectPath, ".gitignore"), "utf-8"),
        ".alchemy/",
        ".env",
      ].join("\n"),
    );
  } catch {
    await fs.writeFile(join(projectPath, ".gitignore"), ".alchemy/");
  }
}

export async function initWranglerRunTs(
  context: ProjectContext,
  options?: {
    entrypoint?: string;
  },
): Promise<void> {
  await fs.writeFile(
    join(context.path, "alchemy.run.ts"),
    createAlchemyRunTs(context, options),
  );
}

function createAlchemyRunTs(
  context: ProjectContext,
  options?: {
    entrypoint?: string;
  },
): string {
  const adopt = context.isTest ? "\n  adopt: true," : "";

  if (context.template === "typescript") {
    return `/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("${context.name}");

export const worker = await Worker("worker", {
  name: "${context.name}",${adopt}
  entrypoint: "${options?.entrypoint || "./src/worker.ts"}",
});

console.log(worker.url);

await app.finalize();
`;
  } else if (context.template === "rwsdk") {
    return `/// <reference types="@types/node" />
import alchemy from "alchemy";
import { D1Database, DurableObjectNamespace, Redwood } from "alchemy/cloudflare";

const app = await alchemy("${context.name}");

const database = await D1Database("database", {
  name: "${context.name}-db",${adopt}
  migrationsDir: "migrations",
});

export const worker = await Redwood("website", {
  name: "${context.name}-website",
  command: "${context.packageManager} run build",${adopt}
  bindings: {
    AUTH_SECRET_KEY: alchemy.secret(process.env.AUTH_SECRET_KEY),
    DB: database,
    SESSION_DURABLE_OBJECT: new DurableObjectNamespace("session", {
      className: "SessionDurableObject",
    }),
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
    `;
  }

  // Map template names to their corresponding resource names
  const resourceMap: Record<string, string> = {
    vite: "Vite",
    astro: "Astro",
    "react-router": "ReactRouter",
    sveltekit: "SvelteKit",
    "tanstack-start": "TanStackStart",
    rwsdk: "Redwood",
    nuxt: "Nuxt",
  };

  const resourceName = resourceMap[context.template];
  if (!resourceName) {
    throw new Error(`Unknown template: ${context.template}`);
  }

  // Special configuration for Vite template
  const config =
    options?.entrypoint !== undefined
      ? `{
  main: "${options?.entrypoint || "./src/index.ts"}",
  command: "${context.packageManager} run build",${adopt}
}`
      : `{
  command: "${context.packageManager} run build",${adopt}
}`;

  return `/// <reference types="@types/node" />

import alchemy from "alchemy";
import { ${resourceName} } from "alchemy/cloudflare";

const app = await alchemy("${context.name}");

export const worker = await ${resourceName}("website", ${config});

console.log({
  url: worker.url,
});

await app.finalize();
`;
}

async function tryReadFile(path: string): Promise<string | undefined> {
  try {
    return await fs.readFile(path, "utf-8");
  } catch {
    return undefined;
  }
}

async function appendFile(path: string, content: string): Promise<void> {
  const existingContent = await tryReadFile(path);
  await fs.writeFile(
    path,
    `${existingContent ? `${existingContent}\n` : ""}${content}`,
  );
}

export async function appendEnv(projectPath: string): Promise<void> {
  await appendFile(join(projectPath, ".env"), "ALCHEMY_PASSWORD=change-me");
  await appendFile(
    join(projectPath, ".env.example"),
    "ALCHEMY_PASSWORD=change-me",
  );
}

export async function createEnvTs(
  projectPath: string,
  identifier = "worker",
): Promise<void> {
  await mkdir(projectPath, "types");
  await fs.writeFile(
    join(projectPath, "types", "env.d.ts"),
    `// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/docs/concepts/bindings.html#type-safe-bindings

import type { ${identifier} } from "../alchemy.run.ts";

export type CloudflareEnv = typeof ${identifier}.Env;

declare global {
  type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}
`,
  );
}

export async function writeJsonFile(file: string, content: any): Promise<void> {
  await fs.writeFile(file, JSON.stringify(content, null, 2));
}

export async function cleanupWrangler(projectPath: string): Promise<void> {
  if (existsSync(join(projectPath, "worker-configuration.d.ts"))) {
    await fs.unlink(join(projectPath, "worker-configuration.d.ts"));
  }
  if (existsSync(join(projectPath, "wrangler.jsonc"))) {
    await fs.unlink(join(projectPath, "wrangler.jsonc"));
  }
}

/**
 * Modifies a JSON/JSONC file with the given modifications
 */
export async function modifyJsoncFile(
  file: string,
  modifications: Record<string, unknown>,
): Promise<void> {
  if (!existsSync(file)) {
    return; // No file to modify
  }

  const content = await fs.readFile(file, "utf-8");
  let modifiedContent = content;

  for (const [path, value] of Object.entries(modifications)) {
    const pathArray = path.split(".");
    const edits = modify(modifiedContent, pathArray, value, {
      formattingOptions: {
        tabSize: 2,
        insertSpaces: true,
        eol: "\n",
      },
    });
    modifiedContent = applyEdits(modifiedContent, edits);
  }

  await fs.writeFile(file, modifiedContent);
}

/**
 * Modifies tsconfig.json to set proper Cloudflare Workers types and remove worker-configuration.d.ts
 */
export async function modifyTsConfig(
  projectPath: string,
  options: WebsiteOptions = {},
): Promise<void> {
  const tsconfigPath = join(projectPath, options.tsconfig ?? "tsconfig.json");

  if (!existsSync(tsconfigPath)) {
    return; // No tsconfig.json to modify
  }

  const tsconfigContent = await fs.readFile(tsconfigPath, "utf-8");

  // Set compilerOptions.types to ["@cloudflare/workers-types"]
  const typesEdit = modify(
    tsconfigContent,
    ["compilerOptions", "types"],
    ["@cloudflare/workers-types", "./types/env.d.ts", ...(options.types ?? [])],
    {
      formattingOptions: {
        tabSize: 2,
        insertSpaces: true,
        eol: "\n",
      },
    },
  );

  let modifiedContent = applyEdits(tsconfigContent, typesEdit);

  // Parse the JSON to get the current includes array
  const { parseTree, getNodeValue, findNodeAtLocation } = await import(
    "jsonc-parser"
  );
  const tree = parseTree(modifiedContent);
  const includeNode = tree ? findNodeAtLocation(tree, ["include"]) : undefined;
  const currentIncludes = includeNode ? getNodeValue(includeNode) : [];

  // Filter out worker-configuration.d.ts and ensure required files are included
  let newIncludes = Array.isArray(currentIncludes) ? [...currentIncludes] : [];

  // Remove worker-configuration.d.ts if it exists
  newIncludes = newIncludes.filter(
    (include) =>
      include !== "worker-configuration.d.ts" &&
      include !== "./worker-configuration.d.ts",
  );

  await fs.writeFile(
    tsconfigPath,
    applyEdits(
      modifiedContent,
      modify(
        modifiedContent,
        ["include"],
        Array.from(
          new Set([
            "alchemy.run.ts",
            "types/**/*.ts",
            ...newIncludes.filter(
              (include) =>
                include !== "worker-configuration.d.ts" &&
                include !== "./worker-configuration.d.ts",
            ),
            ...(options.include ?? []),
          ]),
        ),
        {
          formattingOptions: {
            tabSize: 2,
            insertSpaces: true,
            eol: "\n",
          },
        },
      ),
    ),
  );
}

export async function modifyPackageJson(
  context: ProjectContext,
  scripts?: Record<string, string>,
): Promise<void> {
  const packageJsonPath = join(context.path, "package.json");

  if (!existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = {
    type: "module",
    ...JSON.parse(await fs.readFile(packageJsonPath, "utf-8")),
  };

  const deployCommand =
    context.packageManager === "bun"
      ? "bun --env-file=./.env ./alchemy.run.ts"
      : "tsx --env-file=./.env ./alchemy.run.ts";

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  packageJson.scripts.build = scripts?.build || "vite build";
  packageJson.scripts.deploy = scripts?.deploy || deployCommand;
  packageJson.scripts.destroy =
    scripts?.destroy || `${deployCommand} --destroy`;

  packageJson.scripts = {
    ...Object.fromEntries(
      Object.entries(packageJson.scripts).sort(([a], [b]) =>
        a.localeCompare(b),
      ),
    ),
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
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
  };

  return commands[pm];
}

export async function rm(path: string): Promise<void> {
  if (existsSync(path)) {
    await fs.rm(path, { recursive: true });
  }
}

export async function mkdir(...path: string[]): Promise<void> {
  await fs.mkdir(join(...path), {
    recursive: true,
  });
}

export function install(
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
) {
  const targetCwd = cwd || context.path;
  const pm = context.packageManager;

  if (!dependencies && !devDependencies) {
    execa(getPackageManagerCommands(pm).install, {
      cwd: targetCwd,
      shell: true,
    });
  }
  if (dependencies) {
    execa(`${getPackageManagerCommands(pm).add} ${dependencies.join(" ")}`, {
      cwd: targetCwd,
      shell: true,
    });
  }
  if (devDependencies) {
    execa(
      `${getPackageManagerCommands(pm).addDev} ${devDependencies.join(" ")}`,
      { cwd: targetCwd, shell: true },
    );
  }
}

export function getPackageExecutionCommand(
  packageManager: PackageManager | null | undefined,
  commandWithArgs: string,
): string {
  switch (packageManager) {
    case "pnpm":
      return `pnpm dlx ${commandWithArgs}`;
    case "bun":
      return `bunx ${commandWithArgs}`;
    case "yarn":
      return `yarn dlx ${commandWithArgs}`;
    default:
      return `npx ${commandWithArgs}`;
  }
}
