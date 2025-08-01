import { log } from "@clack/prompts";
import { execa } from "execa";
import { resolve } from "node:path";
import pc from "picocolors";
import z from "zod";
import { detectRuntime } from "../../src/util/detect-node-runtime.ts";
import { detectPackageManager } from "../../src/util/detect-package-manager.ts";
import { exists } from "../../src/util/exists.ts";
import { ExitSignal } from "../trpc.ts";

export const entrypoint = z
  .string()
  .optional()
  .describe(
    "Path to the entrypoint file. Defaults to ./alchemy.run.ts > ./alchemy.run.js",
  );

export const watch = z
  .boolean()
  .optional()
  .default(false)
  .describe("Watch for changes to infrastructure and redeploy automatically");

export const force = z
  .boolean()
  .optional()
  .default(false)
  .describe("Apply updates to resources even if there are no changes");

export const execArgs = {
  cwd: z
    .string()
    .optional()
    .describe("Path to the project directory (defaults to current directory)"),
  quiet: z
    .boolean()
    .optional()
    .default(false)
    .describe("Suppress Create/Update/Delete messages"),
  stage: z
    .string()
    .optional()
    .describe(
      "Specify which stage/environment to target. Defaults to your username ($USER, or $USERNAME on windows)",
    ),
  envFile: z
    .string()
    .optional()
    .default(".env")
    .describe("Path to environment file to load"),
} as const;

export async function execAlchemy(
  main: string | undefined,
  {
    cwd = process.cwd(),
    quiet,
    force,
    stage,
    destroy,
    watch,
    envFile,
    read,
    dev,
  }: {
    cwd?: string;
    quiet?: boolean;
    force?: boolean;
    stage?: string;
    destroy?: boolean;
    watch?: boolean;
    envFile?: string;
    read?: boolean;
    dev?: boolean;
  },
) {
  const args: string[] = [];
  const execArgs: string[] = [];
  if (quiet) args.push("--quiet");
  if (read) args.push("--read");
  if (force) args.push("--force");
  if (stage) args.push(`--stage ${stage}`);
  if (destroy) args.push("--destroy");
  if (watch) execArgs.push("--watch");
  if (envFile) execArgs.push(`--env-file ${envFile}`);
  if (dev) args.push("--dev");

  // Check for alchemy.run.ts or alchemy.run.js (if not provided)
  if (!main) {
    const candidates = ["alchemy.run.ts", "alchemy.run.js"];
    for (const file of candidates) {
      const resolved = resolve(cwd, file);
      if (await exists(resolved)) {
        main = resolved;
        break;
      }
    }
  }

  if (!main) {
    log.error(
      pc.red(
        "No alchemy.run.ts or alchemy.run.js file found in the current directory.",
      ),
    );
    log.info("Create an alchemy.run.ts file to define your infrastructure.");
    throw new ExitSignal(1);
  }

  // Detect package manager
  const packageManager = await detectPackageManager(cwd);
  const runtime = detectRuntime();

  const argsString = args.join(" ");
  const execArgsString = execArgs.join(" ");
  // Determine the command to run based on package manager and file extension
  let command: string;
  const isTypeScript = main.endsWith(".ts");

  switch (packageManager) {
    case "bun":
      command = `bun ${execArgsString} ${main} ${argsString}`;
      break;
    case "deno":
      command = `deno run -A ${execArgsString} ${main} ${argsString}`;
      break;
    case "pnpm":
      command = isTypeScript
        ? `pnpm dlx tsx ${execArgsString} ${main} ${argsString}`
        : `pnpm node ${execArgsString} ${main} ${argsString}`;
      break;
    case "yarn":
      command = isTypeScript
        ? `yarn tsx ${execArgsString} ${main} ${argsString}`
        : `yarn node ${execArgsString} ${main} ${argsString}`;
      break;
    default:
      switch (runtime) {
        case "bun":
          command = `bun ${execArgsString} ${main} ${argsString}`;
          break;
        case "deno":
          command = `deno run -A ${execArgsString} ${main} ${argsString}`;
          break;
        case "node":
          command = isTypeScript
            ? `npx tsx ${execArgsString} ${main} ${argsString}`
            : `node ${execArgsString} ${main} ${argsString}`;
          break;
      }
  }

  try {
    console.log(command);
    await execa(command, {
      cwd,
      shell: true,
      stdio: "inherit",
      env: {
        ...process.env,
        FORCE_COLOR: "1",
      },
    });
  } catch (error: any) {
    log.error(pc.red(`Deploy failed: ${error.message}`));
    if (error.stdout) {
      console.log(error.stdout);
    }
    if (error.stderr) {
      console.error(error.stderr);
    }
    throw error;
  }
}
