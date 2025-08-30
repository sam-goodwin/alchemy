import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { PlanetScaleClient } from "../../src/planetscale/api/client.gen.ts";
import { Database } from "../../src/planetscale/database.ts";
import {
  waitForBranchReady,
  waitForDatabaseReady,
} from "../../src/planetscale/utils.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const kinds = [
  { kind: "mysql", ps10: "PS_10", ps20: "PS_20" },
  { kind: "postgresql", ps10: "PS_10_AWS_X86", ps20: "PS_20_AWS_X86" },
] as const;

describe.skipIf(!process.env.PLANETSCALE_TEST).concurrent.each(kinds)(
  "Database Resource ($kind)",
  ({ kind, ...expectedClusterSizes }) => {
    const api = new PlanetScaleClient();
    const organizationId = alchemy.env.PLANETSCALE_ORG_ID;

    test(`create database with minimal settings (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-${kind}-basic`;

      try {
        const database = await Database("basic", {
          name,
          organizationId,
          clusterSize: "PS_10",
          kind,
        });

        expect(database).toMatchObject({
          id: expect.any(String),
          name,
          defaultBranch: "main",
          organizationId,
          state: expect.any(String),
          plan: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          htmlUrl: expect.any(String),
          kind,
        });

        // Branch won't exist until database is ready
        await waitForDatabaseReady(api, organizationId, name);

        // Verify main branch cluster size
        const mainBranchResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: name,
              name: "main",
            },
          });

        expect(mainBranchResponse.cluster_name).toEqual(
          expectedClusterSizes.ps10,
        );
      } finally {
        await destroy(scope);
        // Verify database was deleted by checking API directly
        await assertDatabaseDeleted(api, organizationId, name);
      }
    }, 1_000_000); // postgres takes forever

    test(`create, update, and delete database (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-${kind}-crud`;
      let database;
      try {
        // Create test database with initial settings
        database = await Database("crud", {
          name,
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
          kind,
        });

        expect(database).toMatchObject({
          id: expect.any(String),
          name,
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
          kind,
        });

        // Update database settings
        database = await Database("crud", {
          name,
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
          kind,
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
          kind,
        });

        // Verify main branch cluster size was updated
        const mainBranchResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: name,
              name: "main",
            },
          });
        expect(mainBranchResponse.cluster_name).toEqual(
          expectedClusterSizes.ps20,
        );
      } catch (err) {
        console.error("Test error:", err);
        throw err;
      } finally {
        // Cleanup
        await destroy(scope);

        // Verify database was deleted by checking API directly
        await assertDatabaseDeleted(api, organizationId, name);
      }
    }, 1_000_000);

    test(`creates non-main default branch if specified (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-${kind}-create-branch`;
      const defaultBranch = "custom";
      try {
        // Create database with custom default branch
        const database = await Database("create-branch", {
          name,
          organizationId,
          clusterSize: "PS_10",
          defaultBranch,
          kind,
        });

        expect(database).toMatchObject({
          defaultBranch,
        });
        await waitForBranchReady(
          api,
          organizationId,
          database.name,
          defaultBranch,
        );
        // Verify branch was created
        const branchResponse = await api.organizations.databases.branches.get({
          path: {
            organization: organizationId,
            database: name,
            name: defaultBranch,
          },
        });
        expect(branchResponse.parent_branch).toEqual("main");
        expect(branchResponse.cluster_name).toEqual(expectedClusterSizes.ps10);

        // Update default branch on existing database
        await Database("create-branch", {
          name,
          organizationId,
          clusterSize: "PS_20",
          defaultBranch,
          kind,
        });

        // Verify branch cluster size was updated
        await waitForBranchReady(
          api,
          organizationId,
          database.name,
          defaultBranch,
        );
        const newBranchResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: name,
              name: defaultBranch,
            },
          });
        expect(newBranchResponse.cluster_name).toEqual(
          expectedClusterSizes.ps20,
        );
      } catch (err) {
        console.error("Test error:", err);
        throw err;
      } finally {
        await destroy(scope);

        // Verify database was deleted
        await assertDatabaseDeleted(api, organizationId, name);
      }
    }, 1_500_000); // must wait on multiple resizes and branch creation

    test.skipIf(kind !== "postgresql")(
      `create database with arm arch (${kind})`,
      async (scope) => {
        const name = `${BRANCH_PREFIX}-${kind}-arm`;
        try {
          const database = await Database("arm", {
            name,
            organizationId,
            clusterSize: "PS_10",
            kind: "postgresql",
            arch: "arm",
          });
          expect(database).toMatchObject({
            id: expect.any(String),
            name,
            arch: "arm",
            kind,
          });
          await waitForDatabaseReady(api, organizationId, name);
          const branch = await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: name,
              name: "main",
            },
          });
          expect(branch.cluster_name).toEqual("PS_10_AWS_ARM");
          expect(branch.cluster_architecture).toEqual("aarch64");
        } catch (err) {
          console.error("Test error:", err);
          throw err;
        } finally {
          await destroy(scope);
          await assertDatabaseDeleted(api, organizationId, name);
        }
      },
      1_000_000,
    );
  },
);

/**
 * Wait for database to be deleted (return 404) for up to 60 seconds
 */
async function assertDatabaseDeleted(
  api: PlanetScaleClient,
  organizationId: string,
  databaseName: string,
): Promise<void> {
  const timeout = 1000_000;
  const interval = 2_000;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const response = await api.organizations.databases.get({
      path: {
        organization: organizationId,
        name: databaseName,
      },
      result: "full",
    });

    console.log(
      `Waiting for database ${databaseName} to be deleted: ${response.status}`,
    );

    if (response.status === 404) {
      // Database is deleted, test passes
      return;
    }

    // Database still exists, wait and try again
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  // Timeout reached, database still exists
  throw new Error(
    `Database ${databaseName} was not deleted within ${timeout}ms`,
  );
}
