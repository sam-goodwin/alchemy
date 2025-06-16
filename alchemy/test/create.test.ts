import "../src/test/vitest.ts";

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { describe, expect, test } from "vitest";
import { exec } from "../src/os/exec.ts";

// Get the root directory of the project
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");
const cliPath = path.join(rootDir, "alchemy", "bin", "alchemy.mjs");

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
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function cleanupProject(projectPath: string): Promise<void> {
  try {
    if (await fileExists(projectPath)) {
      await fs.rm(projectPath, { recursive: true, force: true });
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
  "tanstack-start": "--template=tanstack-start",
  nuxt: "--template=nuxt",
};

describe("Create CLI End-to-End Tests", { concurrent: false }, () => {
  // Generate a test for each template variant
  for (const [templateName, templateArg] of Object.entries(variants)) {
    test(`${templateName} - create, deploy, and destroy`, async () => {
      const smokeDir = path.join(rootDir, ".smoke");
      const projectPath = path.join(smokeDir, templateName);

      console.log(`--- Processing: ${templateName} template ---`);

      // Cleanup smoke directory if it exists
      await cleanupProject(smokeDir);

      try {
        // Ensure .smoke directory exists
        await fs.mkdir(smokeDir, { recursive: true });

        // Cleanup any existing project directory
        await cleanupProject(projectPath);

        // Create the project using CLI - run from .smoke directory
        console.log(`Creating ${templateName} project...`);
        const createResult = await runCommand(
          `bun ${cliPath} create ${templateName} ${templateArg} --yes`,
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
        const alchemyRunPath = path.join(projectPath, "alchemy.run.ts");
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
