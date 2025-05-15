import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { cloneD1Database } from "../../src/cloudflare/d1-clone.js";
import { D1Database } from "../../src/cloudflare/d1-database.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("D1 Clone", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const sourceDbId = `${BRANCH_PREFIX}-source-db`;
  const targetDbId = `${BRANCH_PREFIX}-target-db`;

  // Create Cloudflare API client for direct verification
  const api = await createCloudflareApi();

  test("clones a database with sample data", async (scope) => {
    try {
      // Create a source database and add some test data
      const sourceDb = await D1Database(sourceDbId, {
        name: sourceDbId,
        adopt: true,
      });

      // Create a test table and insert sample data
      await api.post(
        `/accounts/${api.accountId}/d1/database/${sourceDb.id}/query`,
        {
          sql: `
              CREATE TABLE test_clone (id INTEGER PRIMARY KEY, name TEXT);
              INSERT INTO test_clone (id, name) VALUES (1, 'test-item-1');
              INSERT INTO test_clone (id, name) VALUES (2, 'test-item-2');
            `,
        },
      );

      // Create a target database (empty)
      const targetDb = await D1Database(targetDbId, {
        name: targetDbId,
        adopt: true,
      });
      // Clone the source database to the target database
      const cloneResult = await cloneD1Database(api, {
        sourceDatabaseId: sourceDb.id,
        targetDatabaseId: targetDb.id,
      });

      // Verify clone was successful
      expect(cloneResult.success).toBe(true);
      expect(cloneResult.exportResult).toBeDefined();
      expect(cloneResult.importResult).toBeDefined();

      // Query the target database to verify data was cloned
      const response = await api.post(
        `/accounts/${api.accountId}/d1/database/${targetDb.id}/query`,
        {
          sql: "SELECT * FROM test_clone ORDER BY id",
        },
      );
      const data: any = await response.json();
      const results = data.result?.[0]?.results || [];

      // Verify the cloned data
      expect(results.length).toEqual(2);
      expect(results[0].id).toEqual(1);
      expect(results[0].name).toEqual("test-item-1");
      expect(results[1].id).toEqual(2);
      expect(results[1].name).toEqual("test-item-2");
    } finally {
      // Always clean up, even if test assertions fail
      await alchemy.destroy(scope);
    }
  });

  test("clones a database with specific tables", async (scope) => {
    try {
      // Create a source database with multiple tables
      const sourceDb = await D1Database(`${sourceDbId}-multi`, {
        name: `${sourceDbId}-multi`,
        adopt: true,
      });

      // Create multiple test tables
      await api.post(
        `/accounts/${api.accountId}/d1/database/${sourceDb.id}/query`,
        {
          sql: `
              CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT);
              INSERT INTO users (id, username) VALUES (1, 'user1');
              
              CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT);
              INSERT INTO posts (id, title) VALUES (1, 'post1');
              
              CREATE TABLE comments (id INTEGER PRIMARY KEY, content TEXT);
              INSERT INTO comments (id, content) VALUES (1, 'comment1');
            `,
        },
      );

      // Create a target database (empty)
      const targetDb = await D1Database(`${targetDbId}-multi`, {
        name: `${targetDbId}-multi`,
        adopt: true,
      });

      // Clone only the 'users' and 'posts' tables (excluding 'comments')
      const cloneResult = await cloneD1Database(api, {
        sourceDatabaseId: sourceDb.id,
        targetDatabaseId: targetDb.id,
        exportOptions: {
          dumpOptions: {
            tables: ["users", "posts"],
          },
        },
      });

      // Verify clone was successful
      expect(cloneResult.success).toBe(true);

      // Query the target database to verify 'users' table was cloned
      const usersResponse = await api.post(
        `/accounts/${api.accountId}/d1/database/${targetDb.id}/query`,
        {
          sql: "SELECT * FROM users",
        },
      );
      const usersData: any = await usersResponse.json();
      const usersResults = usersData.result?.[0]?.results || [];
      expect(usersResults.length).toEqual(1);
      expect(usersResults[0].username).toEqual("user1");

      // Query the target database to verify 'posts' table was cloned
      const postsResponse = await api.post(
        `/accounts/${api.accountId}/d1/database/${targetDb.id}/query`,
        {
          sql: "SELECT * FROM posts",
        },
      );
      const postsData: any = await postsResponse.json();
      const postsResults = postsData.result?.[0]?.results || [];
      expect(postsResults.length).toEqual(1);
      expect(postsResults[0].title).toEqual("post1");

      // Check that the 'comments' table was not cloned (should throw error)
      const commentsResponse = await api.post(
        `/accounts/${api.accountId}/d1/database/${targetDb.id}/query`,
        {
          sql: "SELECT name FROM sqlite_master WHERE type='table' AND name='comments'",
        },
      );
      const commentsData: any = await commentsResponse.json();
      const commentsResults = commentsData.result?.[0]?.results || [];
      expect(commentsResults.length).toEqual(0); // Should not find the comments table
    } finally {
      // Always clean up, even if test assertions fail
      await alchemy.destroy(scope);
    }
  });
});
