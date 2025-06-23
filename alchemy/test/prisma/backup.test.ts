import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Prisma Backup", () => {
  test("Backup - list backups", async (scope) => {
    const { Project } = await import("../../src/prisma/project.ts");
    const { Database } = await import("../../src/prisma/database.ts");
    const { Backup } = await import("../../src/prisma/backup.ts");

    const projectId = `${BRANCH_PREFIX}-prisma-backup-project`;
    const databaseId = `${BRANCH_PREFIX}-prisma-backup-database`;
    const backupId = `${BRANCH_PREFIX}-prisma-backup`;

    let project: any;
    let database: any;
    let backup: any;

    try {
      // First create a project
      project = await Project(projectId, {
        name: `Backup Test Project ${BRANCH_PREFIX}`,
        description: "A test project for backup testing",
      });

      expect(project.id).toBeDefined();

      // Create database
      database = await Database(databaseId, {
        project: project,
        name: `test-backup-db-${BRANCH_PREFIX}`,
        region: "us-east-1",
      });

      expect(database.id).toBeDefined();

      // List backups
      backup = await Backup(backupId, {
        project: project,
        database: database,
      });

      expect(backup).toMatchObject({
        projectId: project.id,
        databaseId: database.id,
      });

      expect(Array.isArray(backup.backups)).toBe(true);
      expect(backup.meta).toBeDefined();
      expect(typeof backup.meta.backupRetentionDays).toBe("number");

      // Test that backup entries have correct structure if any exist
      if (backup.backups.length > 0) {
        const firstBackup = backup.backups[0];
        expect(firstBackup.id).toBeDefined();
        expect(firstBackup.createdAt).toBeDefined();
        expect(["full", "incremental"]).toContain(firstBackup.backupType);
        expect(typeof firstBackup.size).toBe("number");
        expect(["running", "completed", "failed", "unknown"]).toContain(
          firstBackup.status,
        );
      }

      // Update (should return fresh backup list)
      backup = await Backup(backupId, {
        project: project,
        database: database,
      });

      expect(backup.projectId).toBe(project.id);
      expect(backup.databaseId).toBe(database.id);
      expect(Array.isArray(backup.backups)).toBe(true);
    } finally {
      await destroy(scope);
      // Backups are read-only, nothing to assert for deletion
    }
  });

  // Note: Testing backup restore would require having actual backups available
  // which may not be feasible in a test environment. The restore functionality
  // is tested implicitly through the resource implementation.
});
