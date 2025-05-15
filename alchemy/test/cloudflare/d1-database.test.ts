import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { createCloudflareApi } from "../../src/cloudflare/api.js";
import { D1Database, listDatabases } from "../../src/cloudflare/d1-database.js";
import { BRANCH_PREFIX } from "../util.js";

import "../../src/test/bun.js";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("D1 Database Resource", async () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-db`;

  // Create Cloudflare API client for direct verification
  const api = await createCloudflareApi();

  test("create and delete database", async (scope) => {
    // Create a test database
    let database: D1Database | undefined;

    try {
      database = await D1Database(testId, {
        name: testId,
        primaryLocationHint: "wnam", // West North America
        adopt: true,
      });

      expect(database.name).toEqual(testId);
      expect(database.id).toBeTruthy();
      expect(database.fileSize).toBeNumber();
      expect(database.numTables).toBeNumber();
      expect(database.version).toBeTruthy();

      // Check if database exists by listing databases
      const databases = await listDatabases(api);
      const foundDatabase = databases.find((db) => db.name === testId);
      expect(foundDatabase).toBeTruthy();
      expect(foundDatabase?.id).toEqual(database.id);
    } finally {
      await alchemy.destroy(scope);

      // Verify database was deleted
      if (database) {
        await assertDatabaseDeleted(database);
      }
    }
  });

  test("primary location hint", async (scope) => {
    const locationDb = `${testId}-location`;

    try {
      // Create a database with West North America location hint
      const database = await D1Database(locationDb, {
        name: locationDb,
        primaryLocationHint: "wnam", // West North America
        adopt: true,
      });

      expect(database.name).toEqual(locationDb);
      expect(database.id).toBeTruthy();
      expect(database.primaryLocationHint).toEqual("wnam");

      // Check if database exists
      const databases = await listDatabases(api);
      const foundDatabase = databases.find((db) => db.name === locationDb);
      expect(foundDatabase).toBeTruthy();
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("update read replication mode", async (scope) => {
    const replicationDb = `${testId}-replication`;

    try {
      // Create a database with default settings
      let database = await D1Database(replicationDb, {
        name: replicationDb,
        adopt: true,
        primaryLocationHint: "wnam",
      });

      expect(database.name).toEqual(replicationDb);
      expect(database.id).toBeTruthy();

      // Update the database with disabled read replication
      database = await D1Database(replicationDb, {
        name: replicationDb,
        readReplication: {
          mode: "disabled",
        },
        adopt: true,
        primaryLocationHint: "wnam",
      });

      // Verify the update
      expect(database.readReplication?.mode).toEqual("disabled");

      // Update the database with disabled read replication
      database = await D1Database(replicationDb, {
        name: replicationDb,
        readReplication: {
          mode: "auto",
        },
        adopt: true,
        primaryLocationHint: "wnam",
      });

      expect(database.readReplication?.mode).toEqual("auto");
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("throws error on invalid update", async (scope) => {
    const invalidUpdateDb = `${testId}-invalid-update`;

    try {
      // Create a database with West North America location hint
      const database = await D1Database(invalidUpdateDb, {
        name: invalidUpdateDb,
        primaryLocationHint: "wnam", // West North America
        adopt: true,
      });

      expect(database.name).toEqual(invalidUpdateDb);
      expect(database.id).toBeTruthy();
      expect(database.primaryLocationHint).toEqual("wnam");

      // Attempt to update with a different location hint, which should throw an error
      await expect(
        D1Database(invalidUpdateDb, {
          name: invalidUpdateDb,
          primaryLocationHint: "eeur", // East Europe - different from original
          adopt: true,
        }),
      ).rejects.toThrow("Cannot update primaryLocationHint");
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("create database with migrationsDir applies migrations", async (scope) => {
    const migrationsDb = `${testId}-with-migrations`;
    let database: D1Database | undefined;

    try {
      database = await D1Database(migrationsDb, {
        name: migrationsDb,
        migrationsDir: `${__dirname}/migrations`,
        adopt: true,
      });

      expect(database.name).toEqual(migrationsDb);
      expect(database.id).toBeTruthy();

      // Now check if the test_migrations_table exists by querying the schema
      const resp = await api.post(
        `/accounts/${api.accountId}/d1/database/${database.id}/query`,
        {
          sql: "SELECT name FROM sqlite_master WHERE type='table' AND name='test_migrations_table';",
        },
      );
      const data: any = await resp.json();
      const tables = data.result?.results || data.result?.[0]?.results || [];

      expect(tables.length).toBeGreaterThan(0);
      expect(tables[0]?.name).toEqual("test_migrations_table");
    } finally {
      await alchemy.destroy(scope);
      if (database) {
        await assertDatabaseDeleted(database);
      }
    }
  });

  test("clone from existing database by ID", async (scope) => {
    const sourceDb = `${testId}-source-for-clone`;
    const targetDb = `${testId}-cloned-from-id`;

    try {
      // Create a source database with test data
      const source = await D1Database(sourceDb, {
        name: sourceDb,
        adopt: true,
      });

      // Add test data to the source database
      await api.post(
        `/accounts/${api.accountId}/d1/database/${source.id}/query`,
        {
          sql: `
            CREATE TABLE test_clone (id INTEGER PRIMARY KEY, name TEXT);
            INSERT INTO test_clone (id, name) VALUES (1, 'test-data');
          `,
        },
      );

      // Create a target database as a clone of the source by ID
      const cloned = await D1Database(targetDb, {
        name: targetDb,
        clone: { id: source.id },
        adopt: true,
      });

      expect(cloned.name).toEqual(targetDb);
      expect(cloned.id).toBeTruthy();

      // Verify the cloned data exists in the target database
      const resp = await api.post(
        `/accounts/${api.accountId}/d1/database/${cloned.id}/query`,
        {
          sql: "SELECT * FROM test_clone WHERE id = 1;",
        },
      );

      const data: any = await resp.json();
      const results = data.result?.[0]?.results || [];

      expect(results.length).toEqual(1);
      expect(results[0].name).toEqual("test-data");
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("clone from existing database by name", async (scope) => {
    const sourceDb = `${testId}-source-by-name`;
    const targetDb = `${testId}-cloned-from-name`;

    try {
      // Create a source database with test data
      const source = await D1Database(sourceDb, {
        name: sourceDb,
        adopt: true,
      });

      // Add test data to the source database
      await api.post(
        `/accounts/${api.accountId}/d1/database/${source.id}/query`,
        {
          sql: `
            CREATE TABLE test_clone_by_name (id INTEGER PRIMARY KEY, value TEXT);
            INSERT INTO test_clone_by_name (id, value) VALUES (1, 'name-lookup-test');
          `,
        },
      );

      // Create a target database as a clone of the source by name
      const cloned = await D1Database(targetDb, {
        name: targetDb,
        clone: { name: sourceDb },
        adopt: true,
      });

      expect(cloned.name).toEqual(targetDb);
      expect(cloned.id).toBeTruthy();

      // Verify the cloned data exists in the target database
      const resp = await api.post(
        `/accounts/${api.accountId}/d1/database/${cloned.id}/query`,
        {
          sql: "SELECT * FROM test_clone_by_name WHERE id = 1;",
        },
      );

      const data: any = await resp.json();
      const results = data.result?.[0]?.results || [];

      expect(results.length).toEqual(1);
      expect(results[0].value).toEqual("name-lookup-test");
    } finally {
      await alchemy.destroy(scope);
    }
  });

  test("clone by passing the source database object directly", async (scope) => {
    const sourceDbId = `${testId}-source-direct`;
    const targetDbId = `${testId}-cloned-direct`;

    try {
      // Create a source database with test data
      const sourceDb = await D1Database(sourceDbId, {
        name: sourceDbId,
        adopt: true,
      });

      // Add test data to the source database
      await api.post(
        `/accounts/${api.accountId}/d1/database/${sourceDb.id}/query`,
        {
          sql: `
            CREATE TABLE direct_clone_test (id INTEGER PRIMARY KEY, data TEXT);
            INSERT INTO direct_clone_test (id, data) VALUES (1, 'direct-clone-data');
          `,
        },
      );

      // Create a target database as a clone by passing the source database object directly
      const clonedDb = await D1Database(targetDbId, {
        name: targetDbId,
        clone: sourceDb, // Pass the D1Database object directly
        adopt: true,
      });

      expect(clonedDb.name).toEqual(targetDbId);
      expect(clonedDb.id).toBeTruthy();

      // Verify the cloned data exists in the target database
      const resp = await api.post(
        `/accounts/${api.accountId}/d1/database/${clonedDb.id}/query`,
        {
          sql: "SELECT * FROM direct_clone_test WHERE id = 1;",
        },
      );

      const data: any = await resp.json();
      const results = data.result?.[0]?.results || [];

      expect(results.length).toEqual(1);
      expect(results[0].data).toEqual("direct-clone-data");
    } finally {
      await alchemy.destroy(scope);
    }
  });
});

async function assertDatabaseDeleted(database: D1Database) {
  const api = await createCloudflareApi();
  try {
    if (!database.id) {
      throw new Error("Database ID is undefined");
    }

    // Try to list databases and check if our database is still there
    const databases = await listDatabases(api);
    const foundDatabase = databases.find((db) => db.id === database.id);

    if (foundDatabase) {
      throw new Error(`Database ${database.name} was not deleted as expected`);
    }
  } catch (error: any) {
    // If we get a 404, the database was deleted
    if (error.status === 404) {
      return; // This is expected
    } else {
      throw new Error(`Unexpected error type: ${error}`);
    }
  }
}
