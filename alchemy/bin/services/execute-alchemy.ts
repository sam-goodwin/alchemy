import { log } from "@clack/prompts";
import { execa } from "execa";
import { resolve } from "node:path";
import pc from "picocolors";
import { zod as z } from "trpc-cli";
import { exists } from "../../src/util/exists.ts";
import { detectPackageManager } from "../services/package-manager.ts";

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
  envFile: z.string().optional().describe("Path to environment file to load"),
} as const;

export async function execAlchemy(
  main: string | undefined,
  {
    cwd = process.cwd(),
    quiet,
    stage,
    destroy,
    watch,
    envFile,
    read,
    dev,
  }: {
    cwd?: string;
    quiet?: boolean;
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
    process.exit(1);
  }

  // Detect package manager
  const packageManager = detectPackageManager(cwd);

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
        ? `pnpm tsx ${execArgsString} ${main} ${argsString}`
        : `pnpm node ${execArgsString} ${main} ${argsString}`;
      break;
    case "yarn":
      command = isTypeScript
        ? `yarn tsx ${execArgsString} ${main} ${argsString}`
        : `yarn node ${execArgsString} ${main} ${argsString}`;
      break;
    default:
      command = isTypeScript
        ? `npx tsx ${execArgsString} ${main} ${argsString}`
        : `node ${execArgsString} ${main} ${argsString}`;
      break;
  }

  try {
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
    process.exit(1);
  }
}
