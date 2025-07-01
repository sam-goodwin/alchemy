import { exec } from "node:child_process";
import { existsSync, watch, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { promisify } from "node:util";
import { log, spinner } from "@clack/prompts";
import pc from "picocolors";
import { detectPackageManager } from "../services/package-manager.ts";

const execAsync = promisify(exec);

export interface DeployInput {
  path?: string;
  quiet?: boolean;
  read?: boolean;
  destroy?: boolean;
  stage?: string;
  watch?: boolean;
}

export async function deployAlchemy(input: DeployInput = {}) {
  const {
    path = process.cwd(),
    quiet,
    read,
    destroy,
    stage,
    watch: watchMode,
  } = input;

  // Check for alchemy.run.ts or alchemy.run.js
  const runTsPath = resolve(path, "alchemy.run.ts");
  const runJsPath = resolve(path, "alchemy.run.js");

  let runFile: string | null = null;
  if (existsSync(runTsPath)) {
    runFile = runTsPath;
  } else if (existsSync(runJsPath)) {
    runFile = runJsPath;
  }

  if (!runFile) {
    log.error(
      pc.red(
        "No alchemy.run.ts or alchemy.run.js file found in the current directory.",
      ),
    );
    log.info("Create an alchemy.run.ts file to define your infrastructure.");
    process.exit(1);
  }

  // Detect package manager
  const packageManager = detectPackageManager(path);

  // Build command arguments
  const args: string[] = [];
  if (quiet) args.push("--quiet");
  if (read) args.push("--read");
  if (destroy) args.push("--destroy");
  if (stage) args.push(`--stage ${stage}`);

  const argsString = args.join(" ");

  // Determine the command to run based on package manager and file extension
  let command: string;
  const isTypeScript = runFile.endsWith(".ts");

  switch (packageManager) {
    case "bun":
      command = `bun ${runFile} ${argsString}`;
      break;
    case "deno":
      command = `deno run -A ${runFile} ${argsString}`;
      break;
    case "pnpm":
      command = isTypeScript
        ? `pnpm tsx ${runFile} ${argsString}`
        : `pnpm node ${runFile} ${argsString}`;
      break;
    case "yarn":
      command = isTypeScript
        ? `yarn tsx ${runFile} ${argsString}`
        : `yarn node ${runFile} ${argsString}`;
      break;
    default:
      command = isTypeScript
        ? `npx tsx ${runFile} ${argsString}`
        : `node ${runFile} ${argsString}`;
      break;
  }

  // Execute the deploy
  async function executeDeploy() {
    const s = spinner();
    s.start(`Executing: ${command}`);

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: path,
        env: {
          ...process.env,
          FORCE_COLOR: "1",
        },
      });

      s.stop("Deploy command executed");

      if (stdout) {
        console.log(stdout);
      }

      if (stderr) {
        console.error(stderr);
      }
    } catch (error: any) {
      s.stop("Deploy failed");
      log.error(pc.red(`Deploy failed: ${error.message}`));
      if (error.stdout) {
        console.log(error.stdout);
      }
      if (error.stderr) {
        console.error(error.stderr);
      }
      if (!watchMode) {
        process.exit(1);
      }
    }
  }

  // Initial deploy
  await executeDeploy();

  // Set up watch mode if requested
  if (watchMode) {
    const watchDir = dirname(runFile);
    const watchers: any[] = [];
    let debounceTimer: NodeJS.Timeout | null = null;

    // Function to handle file changes
    const handleFileChange = (filename?: string) => {
      // Debounce to prevent multiple rapid redeployments
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(async () => {
        if (filename) {
          log.info(pc.yellow(`\nFile changed: ${filename}`));
        }
        log.info(pc.yellow("Redeploying..."));
        await executeDeploy();
        log.info(pc.cyan("\nWatching for changes..."));
      }, 300);
    };

    // Watch the main alchemy.run file
    const mainWatcher = watch(runFile, (eventType) => {
      if (eventType === "change") {
        handleFileChange(runFile);
      }
    });
    watchers.push(mainWatcher);

    // Also watch TypeScript/JavaScript files in the same directory and src subdirectory
    const watchPatterns = [".ts", ".js", ".mjs", ".tsx", ".jsx"];
    const srcDir = join(watchDir, "src");

    // Function to recursively watch directories
    const watchDirectory = (dir: string, depth = 0, maxDepth = 3) => {
      if (depth > maxDepth) return;

      try {
        const files = readdirSync(dir);
        for (const file of files) {
          const fullPath = join(dir, file);
          const stat = statSync(fullPath);

          if (
            stat.isDirectory() &&
            !file.startsWith(".") &&
            file !== "node_modules"
          ) {
            watchDirectory(fullPath, depth + 1, maxDepth);
          } else if (
            stat.isFile() &&
            watchPatterns.some((ext) => file.endsWith(ext))
          ) {
            const fileWatcher = watch(fullPath, (eventType) => {
              if (eventType === "change") {
                handleFileChange(fullPath);
              }
            });
            watchers.push(fileWatcher);
          }
        }
      } catch (_err) {
        // Directory might not exist, ignore
      }
    };

    // Watch current directory and src if it exists
    watchDirectory(watchDir, 0, 1);
    if (existsSync(srcDir)) {
      watchDirectory(srcDir, 0, 2);
    }

    log.info(pc.cyan(`Watching for changes in ${watchDir}...`));
    log.info(pc.gray("Press Ctrl+C to stop watching"));

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      log.info(pc.gray("\nStopping file watchers..."));
      watchers.forEach((watcher) => watcher.close());
      process.exit(0);
    });
  }
}
