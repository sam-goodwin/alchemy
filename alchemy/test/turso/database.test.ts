import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Database } from "../../src/turso/database.ts";
import { Group } from "../../src/turso/group.ts";
import { getTursoApi, assertOrganizationSlug } from "../../src/turso/api.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Turso Database", () => {
  test("create database in default group", async (scope) => {
    const dbId = `${BRANCH_PREFIX}-basic-db`;
    let database: Database;

    try {
      // Create a basic database
      database = await Database(dbId, {});

      expect(database).toMatchObject({
        type: "turso::database",
        databaseName: dbId,
        group: "default",
        is_schema: false,
        sleeping: false,
      });
      expect(database.DbId).toBeDefined();
      expect(database.Hostname).toBeDefined();
      expect(database.regions).toBeDefined();
      expect(database.primaryRegion).toBeDefined();
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(dbId);
    }
  });

  test("create database with custom group", async (scope) => {
    const groupId = `${BRANCH_PREFIX}-db-group`;
    const dbId = `${BRANCH_PREFIX}-grouped-db`;
    let group: Group;
    let database: Database;

    try {
      // Create a group first
      group = await Group(groupId, {
        locations: ["iad", "lhr"],
        primary: "iad",
      });

      // Create database in the group
      database = await Database(dbId, {
        group: group,
        size_limit: "1GB",
      });

      expect(database).toMatchObject({
        type: "turso::database",
        databaseName: dbId,
        group: groupId,
        regions: expect.arrayContaining(["iad", "lhr"]),
        primaryRegion: "iad",
      });
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(dbId);
      await assertGroupDoesNotExist(groupId);
    }
  });

  test("create schema database pattern", async (scope) => {
    const schemaId = `${BRANCH_PREFIX}-schema-db`;
    const appId = `${BRANCH_PREFIX}-app-db`;
    let schemaDb: Database;
    let appDb: Database;

    try {
      // Create schema database
      schemaDb = await Database(schemaId, {
        is_schema: true,
      });

      expect(schemaDb.is_schema).toBe(true);

      // Create application database using schema
      appDb = await Database(appId, {
        schema: schemaDb,
      });

      expect(appDb).toMatchObject({
        schema: schemaId,
        is_schema: false,
      });
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(appId);
      await assertDatabaseDoesNotExist(schemaId);
    }
  });

  test("validate immutable properties", async (scope) => {
    const dbId = `${BRANCH_PREFIX}-immutable-db`;
    const groupId = `${BRANCH_PREFIX}-immutable-group`;
    let database: Database;
    let group: Group;

    try {
      // Create database in default group
      database = await Database(dbId, {
        group: "default",
      });

      // Create a new group
      group = await Group(groupId, {
        locations: ["iad"],
      });

      // Try to change group (should fail)
      await expect(
        Database(dbId, {
          group: group,
        }),
      ).rejects.toThrow(/Cannot change database group/);

      // Try to change is_schema (should fail)
      await expect(
        Database(dbId, {
          is_schema: true,
        }),
      ).rejects.toThrow(/Cannot change is_schema property/);
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(dbId);
      await assertGroupDoesNotExist(groupId);
    }
  });

  test("update database configuration", async (scope) => {
    const dbId = `${BRANCH_PREFIX}-update-db`;
    let database: Database;

    try {
      // Create database
      database = await Database(dbId, {
        size_limit: "500MB",
      });

      // Update size limit
      database = await Database(dbId, {
        size_limit: "1GB",
      });

      // Note: The API doesn't return size_limit in the response,
      // so we can't verify it directly. The update should succeed
      // without throwing an error.
      expect(database.databaseName).toBe(dbId);
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(dbId);
    }
  });
});

async function assertDatabaseDoesNotExist(databaseName: string) {
  const api = getTursoApi();
  const orgSlug = assertOrganizationSlug();

  try {
    await api.get(`/v1/organizations/${orgSlug}/databases/${databaseName}`);
    throw new Error(
      `Database '${databaseName}' still exists when it should have been deleted`,
    );
  } catch (error: any) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}

async function assertGroupDoesNotExist(groupName: string) {
  const api = getTursoApi();
  const orgSlug = assertOrganizationSlug();

  try {
    await api.get(`/v1/organizations/${orgSlug}/groups/${groupName}`);
    throw new Error(
      `Group '${groupName}' still exists when it should have been deleted`,
    );
  } catch (error: any) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }
}
