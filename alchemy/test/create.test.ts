import { access, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { exec } from "../src/os/exec.ts";

import "../src/test/vitest.ts";

// Get the root directory of the project
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..", "..");
const cliPath = join(rootDir, "src", "cli.ts");

async function runCommand(
  command: string,
  cwd: string,
  env?: Record<string, string>,
): Promise<{ stdout: string; stderr: string }> {
  console.log(`Running: ${command} in ${cwd}`);

  try {
    await exec(command, { cwd, stdio: "inherit", env });
    return { stdout: "", stderr: "" };
  } catch (error: any) {
    console.error(`Command failed: ${command}`);
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function cleanupProject(projectPath: string): Promise<void> {
  try {
    if (await fileExists(projectPath)) {
      await rm(projectPath, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn(`Failed to cleanup ${projectPath}:`, error);
  }
}

const variants = {
  typescript: "--template=typescript",
  vite: "--template=vite",
  astro: "--template=astro",
  "react-router": "--template=react-router",
  sveltekit: "--template=sveltekit",
  rwsdk: "--template=rwsdk",
};

describe("Create CLI End-to-End Tests", { concurrent: false }, () => {
  // Generate a test for each template variant
  for (const [templateName, templateArg] of Object.entries(variants)) {
    test(`${templateName} - create, deploy, and destroy`, async () => {
      const smokeDir = join(rootDir, ".smoke");
      const projectPath = join(smokeDir, templateName);

      console.log(`--- Processing: ${templateName} template ---`);

      // Cleanup smoke directory if it exists
      await cleanupProject(smokeDir);

      try {
        // Ensure .smoke directory exists
        await mkdir(smokeDir, { recursive: true });

        // Cleanup any existing project directory
        await cleanupProject(projectPath);

        // Create the project using CLI - run from .smoke directory
        console.log(`Creating ${templateName} project...`);
        const createResult = await runCommand(
          `bun ${cliPath} --name=${templateName} ${templateArg} --yes`,
          smokeDir, // Run from .smoke directory so project is created there
          {
            NODE_ENV: "test",
          },
        );
        expect(createResult).toBeDefined();

        // Verify project was created
        const projectExists = await fileExists(projectPath);
        expect(projectExists).toBe(true);

        // Verify alchemy.run.ts was created
        const alchemyRunPath = join(projectPath, "alchemy.run.ts");
        const alchemyRunExists = await fileExists(alchemyRunPath);
        expect(alchemyRunExists).toBe(true);

        // Try to deploy the project
        console.log(`Deploying ${templateName} project...`);
        const deployResult = await runCommand("bun run deploy", projectPath);
        expect(deployResult).toBeDefined();

        // Try to destroy the project
        console.log(`Destroying ${templateName} project...`);
        const destroyResult = await runCommand("bun run destroy", projectPath);
        expect(destroyResult).toBeDefined();

        console.log(`--- Completed: ${templateName} template ---`);
      } catch (error) {
        console.error(`Failed processing ${templateName}:`, error);
        throw error;
      } finally {
        // Always cleanup the project directory
        // await cleanupProject(projectPath);
      }
    }, 600000); // 10 minutes timeout per test
  }
});
