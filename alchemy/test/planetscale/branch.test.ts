import { afterAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Branch } from "../../src/planetscale/branch.ts";
import { Database } from "../../src/planetscale/database.ts";
import { PlanetScaleApi } from "../../src/planetscale/api.ts";
import { waitForDatabaseReady } from "../../src/planetscale/utils.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";
import type { Scope } from "../../src/scope.ts";

const api = new PlanetScaleApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Branch Resource", () => {
  const testDbId = `${BRANCH_PREFIX}-test-database`;
  const organizationId = process.env.PLANETSCALE_ORG_ID || "";
  let testDB: Database;
  if (!organizationId) {
    throw new Error(
      "PLANETSCALE_ORG_ID environment variable is required for tests",
    );
  }
  const minimalDatabaseConfig = {
    name: "test-db",
    organizationId,
    clusterSize: "PS_10",
  };
  let scope: Scope | undefined;

  test.beforeAll(async (_scope) => {
    testDB = await Database(testDbId, minimalDatabaseConfig);
    await waitForDatabaseReady(api, organizationId, testDB.name);
    scope = _scope;
  });

  afterAll(async () => {
    if (scope) {
      await destroy(scope);
    }
  });

  test("adopts existing branch when adopt is true", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-branch`;
    try {
      // Create a branch first
      await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        isProduction: false,
      });

      // Try to create the same branch with adopt=true
      const branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        adopt: true,
        isProduction: false,
      });

      expect(branch).toMatchObject({
        name: testId,
        parentBranch: "main",
      });

      // Verify branch exists via API
      const getResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getResponse.status).toEqual(200);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify branch and all its resources were deleted
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);

      const safeMigrationsResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}/safe-migrations`,
      );
      expect(safeMigrationsResponse.status).toEqual(404);
    }
  });

  test("errors on existing branch when adopt is false", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-branch-adopt-false`;

    try {
      // First create the branch
      await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        isProduction: false,
        parentBranch: "main",
      });

      // Then try to create it again without adopt flag
      await expect(
        Branch(testId, {
          name: testId,
          organizationId,
          databaseName: testDB.name,
          parentBranch: "main",
          isProduction: false,
          adopt: false,
        }),
      ).rejects.toThrow("Branch");

      // Verify original branch still exists
      const getResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getResponse.status).toEqual(200);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify branch and all its resources were deleted
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);

      // Verify associated resources are deleted
      const clusterResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}/cluster`,
      );
      expect(clusterResponse.status).toEqual(404);
    }
  });

  test("can create branch with backup", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-branch-backup`;

    try {
      // Create a unique backup name so we avoid collisions
      const backupName = `alchemy-test-backupReady-${crypto.randomUUID()}`;
      const createBackupResponse = await api.post(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/main/backups`,
        {
          retention_unit: "hour",
          retention_value: 1,
          name: backupName,
        },
      );
      expect(createBackupResponse.status).toEqual(201);
      const backupId = (await createBackupResponse.json<any>()).id;
      // Wait for backup to be ready (up to 240 seconds). It takes a while...
      let backupReady = false;
      for (let i = 0; i < 48; i++) {
        const backupStatusResponse = await api.get(
          `/organizations/${organizationId}/databases/${testDB.name}/backups/${backupId}`,
        );
        const statusData = await backupStatusResponse.json<any>();
        if (statusData.completed_at) {
          backupReady = true;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
      expect(backupReady).toEqual(true);

      const branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        backupId: backupId,
        clusterSize: "PS_10",
        isProduction: true,
      });

      expect(branch).toMatchObject({
        name: testId,
        parentBranch: "main",
      });
      expect(branch.isProduction).toEqual(true);

      // Verify branch exists
      const getBranchResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getBranchResponse.status).toEqual(200);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify branch was deleted
      const getDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(getDeletedResponse.status).toEqual(404);
    }
  }, 300_000);

  test("can enable and disable safe migrations", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-branch-migrations`;

    try {
      // Create branch with safe migrations enabled
      let branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        safeMigrations: true,
        isProduction: true,
      });

      expect(branch).toMatchObject({
        name: testId,
      });

      // Verify safe migrations were enabled
      let response = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(response.status).toEqual(200);
      expect((await response.json<any>()).safe_migrations).toBe(true);

      // Update branch to disable safe migrations
      branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        safeMigrations: false,
        adopt: true,
        isProduction: true,
      });

      response = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(response.ok).toBeTruthy();
      expect((await response.json<any>()).safe_migrations).toBe(false);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });

  test("can update cluster size", async (scope) => {
    const testId = `${BRANCH_PREFIX}-test-branch-clusters`;

    try {
      // Create branch with initial cluster size
      let branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        isProduction: true,
        clusterSize: "PS_10",
      });

      expect(branch).toMatchObject({
        name: testId,
      });

      // Update branch with new cluster size
      branch = await Branch(testId, {
        name: testId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        clusterSize: "PS_20",
        isProduction: true,
        adopt: true,
      });

      // Verify cluster size was updated
      const response = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${testId}`,
      );
      expect(response.status).toEqual(200);
      const data = await response.json<any>();
      expect(data.cluster_name).toEqual("PS_20");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  }, 300_000);

  test("can create branch with Branch object as parent", async (scope) => {
    const parentBranchId = `${BRANCH_PREFIX}-parent-branch`;
    const childBranchId = `${BRANCH_PREFIX}-child-branch`;

    try {
      // Create a parent branch first
      const parentBranch = await Branch(parentBranchId, {
        name: parentBranchId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: "main",
        isProduction: false,
      });

      expect(parentBranch).toMatchObject({
        name: parentBranchId,
        parentBranch: "main",
      });

      // Create a child branch using the parent Branch object
      const childBranch = await Branch(childBranchId, {
        name: childBranchId,
        organizationId,
        databaseName: testDB.name,
        parentBranch: parentBranch, // Using Branch object instead of string
        isProduction: false,
      });

      expect(childBranch).toMatchObject({
        name: childBranchId,
        parentBranch: parentBranchId, // Should use the parent's name
      });

      // Verify both branches exist via API
      const getParentResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${parentBranchId}`,
      );
      expect(getParentResponse.status).toEqual(200);

      const getChildResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${childBranchId}`,
      );
      expect(getChildResponse.status).toEqual(200);

      const childData = await getChildResponse.json<any>();
      expect(childData.parent_branch).toEqual(parentBranchId);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);

      // Verify both branches were deleted
      const getParentDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${parentBranchId}`,
      );
      expect(getParentDeletedResponse.status).toEqual(404);

      const getChildDeletedResponse = await api.get(
        `/organizations/${organizationId}/databases/${testDB.name}/branches/${childBranchId}`,
      );
      expect(getChildDeletedResponse.status).toEqual(404);
    }
  });
});
