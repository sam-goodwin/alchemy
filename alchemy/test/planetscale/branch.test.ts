import { afterAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { PlanetScaleClient } from "../../src/planetscale/api/client.gen.ts";
import { Branch } from "../../src/planetscale/branch.ts";
import {
  Database,
  type DatabaseProps,
} from "../../src/planetscale/database.ts";
import { waitForDatabaseReady } from "../../src/planetscale/utils.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import type { Scope } from "../../src/scope.ts";
import "../../src/test/vitest.ts";

const kinds = [
  { kind: "mysql", ps10: "PS_10", ps20: "PS_20" },
  { kind: "postgresql", ps10: "PS_10_AWS_X86", ps20: "PS_20_AWS_X86" },
] as const;

describe.skipIf(!process.env.PLANETSCALE_TEST).concurrent.each(kinds)(
  "Branch Resource ($kind)",
  ({ kind, ...expectedClusterSizes }) => {
    const test = alchemy.test(import.meta, {
      prefix: `${BRANCH_PREFIX}-${kind}`,
    });

    const api = new PlanetScaleClient();
    const organizationId = alchemy.env.PLANETSCALE_ORG_ID;

    let database: Database;
    let scope: Scope | undefined;

    test.beforeAll(async (_scope) => {
      const props = {
        organizationId,
        clusterSize: "PS_10",
        kind,
      } as DatabaseProps;
      database = await Database("branch-test", props);
      await waitForDatabaseReady(api, organizationId, database.name);
      scope = _scope;
    }, 240_000); // postgres takes a while to initialize

    afterAll(async () => {
      if (scope) {
        await destroy(scope);
      }
    });

    test(`adopts existing branch when adopt is true (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-test-${kind}-branch-adopt-true`;
      try {
        // Create a branch first
        await Branch("branch-adopt-true", {
          name,
          organizationId,
          databaseName: database.name,
          isProduction: false,
        });

        // Try to create the same branch with adopt=true
        const branch = await Branch("branch-adopt-true", {
          name,
          organizationId,
          databaseName: database.name,
          adopt: true,
          isProduction: false,
        });

        expect(branch).toMatchObject({
          name,
          parentBranch: "main",
        });

        // Verify branch exists via API
        const getResponse = await api.organizations.databases.branches.get({
          path: {
            organization: organizationId,
            database: database.name,
            name,
          },
          result: "full",
        });
        expect(getResponse.status).toEqual(200);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Verify branch and all its resources were deleted
        const getDeletedResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
            result: "full",
          });
        expect(getDeletedResponse.status).toEqual(404);
      }
    });

    test(`errors on existing branch when adopt is false (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-test-${kind}-branch-adopt-false`;

      try {
        // First create the branch
        await Branch("branch-adopt-false", {
          name,
          organizationId,
          databaseName: database.name,
          isProduction: false,
          parentBranch: "main",
        });

        // Then try to create it again without adopt flag
        await expect(
          Branch("branch-adopt-false", {
            name,
            organizationId,
            databaseName: database.name,
            parentBranch: "main",
            isProduction: false,
            adopt: false,
          }),
        ).rejects.toThrow("Branch");

        // Verify original branch still exists
        const getResponse = await api.organizations.databases.branches.get({
          path: {
            organization: organizationId,
            database: database.name,
            name,
          },
          result: "full",
        });
        expect(getResponse.status).toEqual(200);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Verify branch and all its resources were deleted
        const getDeletedResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
            result: "full",
          });
        expect(getDeletedResponse.status).toEqual(404);
      }
    });

    test(`can create branch with backup (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-test-${kind}-branch-backup`;

      try {
        // Create a unique backup name so we avoid collisions
        const backupName = `alchemy-test-backupReady-${crypto.randomUUID()}`;
        const backup = await api.organizations.databases.branches.backups.post({
          path: {
            organization: organizationId,
            database: database.name,
            branch: "main",
          },
          body: {
            retention_unit: "hour",
            retention_value: 1,
            name: backupName,
          },
        });
        // Wait for backup to be ready (up to 240 seconds). It takes a while...
        let backupReady = false;
        for (let i = 0; i < 48; i++) {
          const status = await api.organizations.databases.branches.backups.get(
            {
              path: {
                organization: organizationId,
                database: database.name,
                branch: "main",
                id: backup.id,
              },
            },
          );
          if (status.completed_at) {
            backupReady = true;
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        expect(backupReady).toEqual(true);

        const branch = await Branch("branch-backup", {
          name,
          organizationId,
          databaseName: database.name,
          parentBranch: "main",
          backupId: backup.id,
          clusterSize: "PS_10",
          isProduction: true,
        });

        expect(branch).toMatchObject({
          name,
          parentBranch: "main",
        });
        expect(branch.isProduction).toEqual(true);

        // Verify branch exists
        const getBranchResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
            result: "full",
          });
        expect(getBranchResponse.status).toEqual(200);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Verify branch was deleted
        const getDeletedResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
            result: "full",
          });
        expect(getDeletedResponse.status).toEqual(404);
      }
    }, 300_000);

    // TODO: (422 unprocessable): Safe migrations requires schema validation before it may be enabled
    test.skipIf(kind === "postgresql")(
      //
      `can enable and disable safe migrations (${kind})`,
      async (scope) => {
        const name = `${BRANCH_PREFIX}-test-${kind}-branch-safe-migrations`;

        try {
          // Create branch with safe migrations enabled
          let branch = await Branch("branch-safe-migrations", {
            name,
            organizationId,
            databaseName: database.name,
            parentBranch: "main",
            safeMigrations: true,
            isProduction: true,
          });

          expect(branch).toMatchObject({
            name,
          });

          // Verify safe migrations were enabled
          let response = await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
          });
          expect(response.safe_migrations).toBe(true);

          // Update branch to disable safe migrations
          branch = await Branch("branch-safe-migrations", {
            name,
            organizationId,
            databaseName: database.name,
            parentBranch: "main",
            safeMigrations: false,
            adopt: true,
            isProduction: true,
          });

          response = await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name,
            },
          });
          expect(response.safe_migrations).toBe(false);
        } catch (err) {
          console.log(err);
          throw err;
        } finally {
          await destroy(scope);
        }
      },
    );

    test(`can update cluster size (${kind})`, async (scope) => {
      const name = `${BRANCH_PREFIX}-test-${kind}-branch-cluster-size`;

      try {
        // Create branch with initial cluster size
        let branch = await Branch("branch-cluster-size", {
          name,
          organizationId,
          databaseName: database.name,
          parentBranch: "main",
          isProduction: true,
          clusterSize: "PS_10",
        });

        expect(branch).toMatchObject({
          name,
        });

        const data1 = await api.organizations.databases.branches.get({
          path: {
            organization: organizationId,
            database: database.name,
            name,
          },
        });
        expect(data1.cluster_name).toEqual(expectedClusterSizes.ps10);

        // Update branch with new cluster size
        branch = await Branch("branch-cluster-size", {
          name,
          organizationId,
          databaseName: database.name,
          parentBranch: "main",
          clusterSize: "PS_20",
          isProduction: true,
          adopt: true,
        });

        // Verify cluster size was updated
        const data2 = await api.organizations.databases.branches.get({
          path: {
            organization: organizationId,
            database: database.name,
            name,
          },
        });
        expect(data2.cluster_name).toEqual(expectedClusterSizes.ps20);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);
      }
    }, 1_200_000);

    test(`can create branch with Branch object as parent (${kind})`, async (scope) => {
      const parentBranchName = `${BRANCH_PREFIX}-test-${kind}-parent-branch`;
      const childBranchName = `${BRANCH_PREFIX}-test-${kind}-child-branch`;

      try {
        // Create a parent branch first
        const parentBranch = await Branch("parent-branch", {
          name: parentBranchName,
          organizationId,
          databaseName: database.name,
          parentBranch: "main",
          isProduction: false,
        });

        expect(parentBranch).toMatchObject({
          name: parentBranchName,
          parentBranch: "main",
        });

        // Create a child branch using the parent Branch object
        const childBranch = await Branch("test-child-branch", {
          name: childBranchName,
          organizationId,
          databaseName: database.name,
          parentBranch, // Using Branch object instead of string
          isProduction: false,
        });

        expect(childBranch).toMatchObject({
          name: childBranchName,
          parentBranch: parentBranchName, // Should use the parent's name
        });

        // Verify both branches exist via API
        const getParentResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name: parentBranchName,
            },
            result: "full",
          });
        expect(getParentResponse.status).toEqual(200);

        const getChildResponse = await api.organizations.databases.branches.get(
          {
            path: {
              organization: organizationId,
              database: database.name,
              name: childBranchName,
            },
            result: "full",
          },
        );
        expect(getChildResponse.status).toEqual(200);
        expect(getChildResponse.data?.parent_branch).toEqual(parentBranchName);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Verify both branches were deleted
        const getParentDeletedResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name: parentBranchName,
            },
            result: "full",
          });
        expect(getParentDeletedResponse.status).toEqual(404);

        const getChildDeletedResponse =
          await api.organizations.databases.branches.get({
            path: {
              organization: organizationId,
              database: database.name,
              name: childBranchName,
            },
            result: "full",
          });
        expect(getChildDeletedResponse.status).toEqual(404);
      }
    }, 600_000);
  },
);
