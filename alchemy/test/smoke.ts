import { dim } from "kleur/colors";
import { Listr } from "listr2";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { access, mkdir, readdir, stat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Get the root directory of the project
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..", "..");
const examplesDir = join(rootDir, "examples");
const smokeDir = join(rootDir, ".smoke");

// Check for --no-capture flag
const noCaptureFlag = process.argv.includes("--no-capture");

interface ExampleProject {
  name: string;
  path: string;
  hasEnvFile: boolean;
  hasAlchemyRunFile: boolean;
  hasIndexFile: boolean;
}

async function discoverExamples(): Promise<ExampleProject[]> {
  const examples: ExampleProject[] = [];

  try {
    const entries = await readdir(examplesDir);

    for (const entry of entries) {
      const examplePath = join(examplesDir, entry);
      const stats = await stat(examplePath);

      if (stats.isDirectory()) {
        // Check for various files
        const envFilePath = join(rootDir, ".env");
        const alchemyRunPath = join(examplePath, "alchemy.run.ts");
        const indexPath = join(examplePath, "index.ts");

        const hasEnvFile = await fileExists(envFilePath);
        const hasAlchemyRunFile = await fileExists(alchemyRunPath);
        const hasIndexFile = await fileExists(indexPath);

        examples.push({
          name: entry,
          path: examplePath,
          hasEnvFile,
          hasAlchemyRunFile,
          hasIndexFile,
        });
      }
    }
  } catch (error) {
    console.error("Failed to discover examples:", error);
    throw error;
  }

  return examples.sort((a, b) => a.name.localeCompare(b.name));
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function deleteOutputFile(exampleName: string): Promise<void> {
  if (!noCaptureFlag) {
    const outputPath = join(smokeDir, `${exampleName}.out`);
    try {
      await unlink(outputPath);
    } catch {
      // File might not exist, ignore
    }
  }
}

function stripAnsiColors(str: string): string {
  // Remove ANSI escape sequences
  return str.replace(/\u001b\[[0-9;]*m/g, "");
}

async function runCommand(
  command: string,
  options: { cwd: string; env?: Record<string, string>; exampleName?: string },
) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(/\s+/);
    const proc = spawn(cmd, args, {
      cwd: options.cwd,
      env: {
        ...process.env,
        ...options.env,
        DO_NOT_TRACK: "true",
      },
    });

    if (noCaptureFlag || !options.exampleName) {
      // Original behavior - stream to console
      proc.stdout?.on("data", (data) => {
        console.log(data.toString());
      });
      proc.stderr?.on("data", (data) => {
        console.error(data.toString());
      });
    } else {
      // Stream to file
      const outputPath = join(smokeDir, `${options.exampleName}.out`);
      const outputStream = createWriteStream(outputPath, { flags: "a" });

      proc.stdout?.on("data", (data) => {
        const cleanData = stripAnsiColors(data.toString());
        outputStream.write(cleanData);
      });
      proc.stderr?.on("data", (data) => {
        const cleanData = stripAnsiColors(data.toString());
        outputStream.write(cleanData);
      });

      proc.on("close", () => {
        outputStream.end();
      });
    }

    proc.on("error", (error) => {
      reject(error);
    });
    proc.on("close", (code) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        const errorPrefix = options.exampleName
          ? `${options.exampleName} - `
          : "";
        reject(new Error(`${errorPrefix}Command failed with code ${code}`));
      }
    });
  });
}

async function verifyNoLocalStateInCI(examplePath: string): Promise<void> {
  const alchemyDir = join(examplePath, ".alchemy");
  const isCloudflareStateStore =
    process.env.ALCHEMY_STATE_STORE === "cloudflare";
  const isCI = process.env.CI === "true";

  if (isCloudflareStateStore && isCI) {
    const alchemyDirExists = await fileExists(alchemyDir);

    if (alchemyDirExists) {
      throw new Error(
        ".alchemy/ directory exists when using Cloudflare state store in CI",
      );
    }
  }
}

const skippedExamples = ["aws-app", "cloudflare-tanstack-start"];

// Discover examples and generate tests
const examples = (await discoverExamples()).filter(
  (e) => !skippedExamples.includes(e.name),
);

const testIndex = process.argv.findIndex((arg) => arg === "-t");
const testName = testIndex !== -1 ? process.argv[testIndex + 1] : undefined;

// Filter examples based on test name if provided
const filteredExamples = examples.filter((e) =>
  testName ? e.name.includes(testName) : true,
);

// Ensure smoke directory exists
if (!noCaptureFlag) {
  try {
    await mkdir(smokeDir, { recursive: true });
  } catch {
    // Directory might already exist, ignore
  }
}

// Create Listr tasks
const tasks = new Listr(
  filteredExamples.map((example) => ({
    title: `${example.name}`,
    task: async (_ctx, task) => {
      let devCommand: string;
      let deployCommand: string;
      let destroyCommand: string;

      if (example.hasEnvFile) {
        // Use npm scripts if .env file exists in root
        devCommand = "bun run dev";
        deployCommand = "bun run deploy";
        destroyCommand = "bun run destroy";
      } else if (example.hasAlchemyRunFile) {
        // Use alchemy.run.ts if it exists
        devCommand = "bun tsx ./alchemy.run.ts --dev";
        deployCommand = "bun tsx ./alchemy.run.ts";
        destroyCommand = "bun tsx ./alchemy.run.ts --destroy";
      } else {
        // Fallback to index.ts
        devCommand = "bun ./index.ts --dev";
        deployCommand = "bun ./index.ts";
        destroyCommand = "bun ./index.ts --destroy";
      }

      const phases = [
        {
          title: "Cleanup",
          command: destroyCommand,
        },
        {
          title: "Check",
          command: "bun run build",
        },
        {
          title: "Dev",
          command: devCommand,
          env: {
            // this is how we force alchemy to exit on finalize in CI
            ALCHEMY_TEST_KILL_ON_FINALIZE: "1",
          },
        },
        {
          title: "Destroy",
          command: destroyCommand,
        },
        {
          title: "Dev",
          command: devCommand,
          env: {
            // this is how we force alchemy to exit on finalize in CI
            ALCHEMY_TEST_KILL_ON_FINALIZE: "1",
          },
        },
        {
          title: "Deploy",
          command: deployCommand,
        },
        {
          title: "Destroy",
          command: destroyCommand,
        },
      ];

      try {
        // Delete output file from previous run
        await deleteOutputFile(example.name);

        for (let i = 0; i < phases.length; i++) {
          const phase = phases[i];
          task.title = `${example.name} - ${phase.title} ${dim(`(${i}/${phases.length - 1})`)}`;
          await runCommand(phase.command, {
            cwd: example.path,
            exampleName: noCaptureFlag ? undefined : example.name,
            env: { DO_NOT_TRACK: "1", ...phase.env },
          });
          await verifyNoLocalStateInCI(example.path);
        }

        // Task completed successfully
        task.title = `${example.name} - ✅ Complete`;
      } catch (error) {
        task.title = `${example.name} - ❌ Failed`;
        throw error;
      }
    },
  })),
  {
    concurrent: true,
    exitOnError: false,
  },
);

try {
  await tasks.run();

  // Print summary
  const totalTests = filteredExamples.length;
  const failedTasks = tasks.tasks.filter((task) => task.hasFailed());
  const passedCount = totalTests - failedTasks.length;
  const failedCount = failedTasks.length;

  console.log(`\n${"=".repeat(50)}`);
  console.log("SMOKE TEST SUMMARY");
  console.log("=".repeat(50));
  console.log(`Total tests: ${totalTests}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (passedCount > 0) {
    console.log(`\n✅ Passed tests (${passedCount}):`);
    tasks.tasks
      .filter((task) => !task.hasFailed())
      .forEach((task) => {
        const taskTitle = task.title ? String(task.title) : "Unknown";
        const exampleName = taskTitle.split(" - ")[0];
        console.log(`  ✅ ${exampleName}`);
      });
  }

  if (failedCount > 0) {
    console.log(`\n❌ Failed tests (${failedCount}):`);
    failedTasks.forEach((task) => {
      const taskTitle = task.title ? String(task.title) : "Unknown";
      const exampleName = taskTitle.split(" - ")[0];
      console.log(`  ❌ ${exampleName}`);
    });

    process.exit(1);
  } else {
    console.log("\n🎉 All tests passed!");
  }
} catch (error) {
  console.error("Failed to run smoke tests:", error);
  process.exit(1);
}
