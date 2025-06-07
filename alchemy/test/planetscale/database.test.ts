import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Database } from "../../src/planetscale/database.ts";
import { PlanetScaleApi } from "../../src/planetscale/api.ts";
import { waitForDatabaseReady } from "../../src/planetscale/utils.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

const api = new PlanetScaleApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Database Resource", () => {
  const organizationId = process.env.PLANETSCALE_ORG_ID || "";

  if (!organizationId) {
    throw new Error(
      "PLANETSCALE_ORG_ID environment variable is required for tests",
    );
  }

  test("create database with minimal settings", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-db-basic`;

    try {
      const database = await Database(testId, {
        name: testId,
        organizationId,
        clusterSize: "PS_10",
        defaultBranch: "main",
      });

      expect(database).toMatchObject({
        id: expect.any(String),
        name: testId,
        organizationId,
        state: expect.any(String),
        plan: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        htmlUrl: expect.any(String),
      });

      // Branch won't exist until database is ready
      await waitForDatabaseReady(api, organizationId, testId);

      // Verify main branch cluster size
      const mainBranchResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}/branches/main`,
      );

      expect(mainBranchResponse.status).toEqual(200);
      const mainBranchData = await mainBranchResponse.json<any>();
      expect(mainBranchData.cluster_name).toEqual("PS_10");
    } finally {
      await destroy(scope);
      // Verify database was deleted by checking API directly
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  }, 600_000);

  test("create, update, and delete database", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-db-crud`;
    let database;
    try {
      // Create test database with initial settings
      database = await Database(testId, {
        name: testId,
        organizationId,
        region: {
          slug: "us-east",
        },
        clusterSize: "PS_10",
        allowDataBranching: true,
        automaticMigrations: true,
        requireApprovalForDeploy: false,
        restrictBranchRegion: true,
        insightsRawQueries: true,
        productionBranchWebConsole: true,
        defaultBranch: "main",
        migrationFramework: "rails",
        migrationTableName: "schema_migrations",
      });

      expect(database).toMatchObject({
        id: expect.any(String),
        name: testId,
        organizationId,
        allowDataBranching: true,
        automaticMigrations: true,
        requireApprovalForDeploy: false,
        restrictBranchRegion: true,
        insightsRawQueries: true,
        productionBranchWebConsole: true,
        defaultBranch: "main",
        migrationFramework: "rails",
        migrationTableName: "schema_migrations",
        state: expect.any(String),
        plan: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        htmlUrl: expect.any(String),
      });

      // Update database settings
      database = await Database(testId, {
        name: testId,
        organizationId,
        clusterSize: "PS_20", // Change cluster size
        allowDataBranching: false,
        automaticMigrations: false,
        requireApprovalForDeploy: true,
        restrictBranchRegion: false,
        insightsRawQueries: false,
        productionBranchWebConsole: false,
        defaultBranch: "main",
        migrationFramework: "django",
        migrationTableName: "django_migrations",
      });

      expect(database).toMatchObject({
        allowDataBranching: false,
        automaticMigrations: false,
        requireApprovalForDeploy: true,
        restrictBranchRegion: false,
        insightsRawQueries: false,
        productionBranchWebConsole: false,
        defaultBranch: "main",
        migrationFramework: "django",
        migrationTableName: "django_migrations",
      });

      // Verify main branch cluster size was updated
      const mainBranchResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}/branches/main`,
      );
      expect(mainBranchResponse.status).toEqual(200);
      const mainBranchData = await mainBranchResponse.json<any>();
      expect(mainBranchData.cluster_rate_name).toEqual("PS_20");
    } catch (err) {
      console.error("Test error:", err);
      throw err;
    } finally {
      // Cleanup
      await destroy(scope);

      // Verify database was deleted by checking API directly
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  }, 600_000); // this test takes forever as it needs to wait on multiple resizes!

  test("creates non-main default branch if specified", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-db-default-branch`;
    try {
      // Create database with custom default branch
      const customBranch = `${testId}-branch`;
      const database = await Database(testId, {
        name: testId,
        organizationId,
        clusterSize: "PS_10",
        defaultBranch: customBranch,
      });

      expect(database).toMatchObject({
        defaultBranch: customBranch,
      });
      await waitForDatabaseReady(
        api,
        organizationId,
        database.name,
        customBranch,
      );
      // Verify branch was created
      const branchResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}/branches/${customBranch}`,
      );
      expect(branchResponse.status).toEqual(200);

      const branchData = await branchResponse.json<any>();
      expect(branchData.parent_branch).toEqual("main");
      expect(branchData.cluster_rate_name).toEqual("PS_10");

      // Update default branch on existing database
      await Database(testId, {
        name: testId,
        organizationId,
        clusterSize: "PS_20",
        defaultBranch: customBranch,
      });

      // Verify branch cluster size was updated
      await waitForDatabaseReady(
        api,
        organizationId,
        database.name,
        customBranch,
      );
      const newBranchResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}/branches/${customBranch}`,
      );
      expect(newBranchResponse.status).toEqual(200);

      const newBranchData = await newBranchResponse.json<any>();
      expect(newBranchData.cluster_rate_name).toEqual("PS_20");
    } catch (err) {
      console.error("Test error:", err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify database was deleted
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  }, 1000_000); //must wait on multiple resizes
});
