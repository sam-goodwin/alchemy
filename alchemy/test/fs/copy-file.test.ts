import { afterAll, beforeAll, describe, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { CopyFile } from "../../src/fs/copy-file.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta);

describe("CopyFile Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-copy-file`;
  const sourceFilePath = path.join(process.cwd(), "test-source.txt");
  const destinationFilePath = path.join(process.cwd(), "test-destination.txt");

  // Create a test source file before tests
  beforeAll(async () => {
    await fs.promises.writeFile(
      sourceFilePath,
      "This is a test file for copying",
    );
  });

  // Clean up test files after tests
  afterAll(async () => {
    try {
      await fs.promises.unlink(sourceFilePath);
      await fs.promises.unlink(destinationFilePath);
    } catch (_error) {
      // Ignore errors if files don't exist
    }
  });

  test("create, update, and delete copy file resource", async (scope) => {
    let resource;
    try {
      // Create a test copy file resource
      resource = await CopyFile(testId, {
        src: sourceFilePath,
        dest: destinationFilePath,
        overwrite: true,
      });

      // Verify resource properties
      expect(resource.src).toBe(sourceFilePath);
      expect(resource.dest).toBe(destinationFilePath);
      expect(resource.overwrite).toBe(true);
      expect(resource.copied).toBe(true);

      // Verify file was actually copied
      const fileExists = await fs.promises
        .access(destinationFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);

      // Verify file content
      const content = await fs.promises.readFile(destinationFilePath, "utf-8");
      expect(content).toBe("This is a test file for copying");

      // Update the resource with a different destination
      const newDestinationPath = path.join(
        process.cwd(),
        "test-destination-updated.txt",
      );
      resource = await CopyFile(testId, {
        src: sourceFilePath,
        dest: newDestinationPath,
        overwrite: true,
      });

      // Verify resource was updated
      expect(resource.dest).toBe(newDestinationPath);

      // Verify file was copied to new location
      const newFileExists = await fs.promises
        .access(newDestinationPath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
      expect(newFileExists).toBe(true);

      // Clean up the new destination file
      await fs.promises.unlink(newDestinationPath);
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify destination file was deleted
      const fileExists = await fs.promises
        .access(destinationFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(false);
    }
  });

  test("copy file with overwrite false", async (scope) => {
    try {
      // Create a file at the destination first
      await fs.promises.writeFile(
        destinationFilePath,
        "This is the original file",
      );

      // Create a copy file resource with overwrite false
      const resource = await CopyFile(`${testId}-no-overwrite`, {
        src: sourceFilePath,
        dest: destinationFilePath,
        overwrite: false,
      });

      // Verify resource properties
      expect(resource.overwrite).toBe(false);
      expect(resource.copied).toBe(true);

      // Verify original file content was preserved
      const content = await fs.promises.readFile(destinationFilePath, "utf-8");
      expect(content).toBe("This is the original file");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });
});
