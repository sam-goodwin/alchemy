import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { File } from "../../src/fs/file.ts";
import { SqliteStateStore } from "../../src/sqlite/sqlite-state-store.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
  stateStore: (scope) =>
    new SqliteStateStore(scope, {
      databasePath: `.alchemy/test-state-store-${BRANCH_PREFIX}.db`,
    }),
});

describe("SqliteStateStore", () => {
  test("state store operations through resource lifecycle", async (scope) => {
    const testId = `${BRANCH_PREFIX}-sqlite-state-test`;

    try {
      // Create phase - create a file resource that will be stored in SQLite state store
      let resource = await File(testId, {
        path: `test-file-${testId}.txt`,
        content: "Initial content for SqliteStateStore test",
      });

      // Verify resource was created and properties are correct
      expect(resource.path).toBe(`test-file-${testId}.txt`);
      expect(resource.content).toBe(
        "Initial content for SqliteStateStore test",
      );

      // Update phase - update the same resource with new content
      resource = await File(testId, {
        path: `test-file-${testId}.txt`,
        content: "Updated content for SqliteStateStore test",
      });

      // Verify resource was updated
      expect(resource.content).toBe(
        "Updated content for SqliteStateStore test",
      );

      // Create additional resources to stress test the state store
      const resource2 = await File(`${testId}-2`, {
        path: `test-file-${testId}-2.txt`,
        content: "Second file content",
      });

      const resource3 = await File(`${testId}-3`, {
        path: `nested/path/test-file-${testId}-3.txt`,
        content: "Nested file content",
      });

      // Verify multiple resources are handled correctly
      expect(resource2.path).toBe(`test-file-${testId}-2.txt`);
      expect(resource3.path).toBe(`nested/path/test-file-${testId}-3.txt`);

      // The state store operations (get, set, list, etc.) are exercised
      // naturally through the resource create/update lifecycle
    } finally {
      // Delete phase - destroy will clean up all resources through the state store
      await destroy(scope);
    }
  });

  test("handles resource updates and nested scopes", async (scope) => {
    const testId = `${BRANCH_PREFIX}-sqlite-nested-test`;

    try {
      // Create resources in the main scope
      await File(`${testId}-main`, {
        path: `main-${testId}.txt`,
        content: "Main scope file",
      });

      // Create a nested scope with more resources
      await alchemy.run("nested-scope", async () => {
        await File(`${testId}-nested`, {
          path: `nested-${testId}.txt`,
          content: "Nested scope file",
        });

        // Update nested resource
        await File(`${testId}-nested`, {
          path: `nested-${testId}.txt`,
          content: "Updated nested scope file",
        });
      });

      // Create another nested scope to test state isolation
      await alchemy.run("another-scope", async () => {
        await File(`${testId}-another`, {
          path: `another-${testId}.txt`,
          content: "Another scope file",
        });
      });

      // All state operations are exercised through the natural resource lifecycle
      // The SqliteStateStore handles scope-based isolation and proper key management
    } finally {
      await destroy(scope);
    }
  });
});
