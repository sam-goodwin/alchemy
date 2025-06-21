import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Prisma Database", () => {
  test("Database", async (scope) => {
    const { Project } = await import("../../src/prisma/project.ts");
    const { Database } = await import("../../src/prisma/database.ts");

    const projectId = `${BRANCH_PREFIX}-prisma-db-project`;
    const databaseId = `${BRANCH_PREFIX}-prisma-database`;

    let project: any;
    let database: any;

    try {
      // First create a project
      project = await Project(projectId, {
        name: `DB Test Project ${BRANCH_PREFIX}`,
        description: "A test project for database testing",
      });

      expect(project.id).toBeDefined();

      // Create database
      database = await Database(databaseId, {
        project: project,
        name: `test-db-${BRANCH_PREFIX}`,
        region: "us-east-1",
        isDefault: false,
      });

      expect(database).toMatchObject({
        projectId: project.id,
        name: `test-db-${BRANCH_PREFIX}`,
        region: "us-east-1",
        isDefault: false,
      });

      expect(database.id).toBeDefined();
      expect(database.createdAt).toBeDefined();

      // Update (should return same database as most properties are immutable)
      database = await Database(databaseId, {
        project: project,
        name: `test-db-${BRANCH_PREFIX}`,
        region: "us-east-1",
        isDefault: false,
      });

      expect(database.id).toBeDefined();
      expect(database.projectId).toBe(project.id);
    } finally {
      await destroy(scope);
      await assertDatabaseDoesNotExist(project?.id, database?.id);
    }
  });
});

async function assertDatabaseDoesNotExist(
  projectId: string,
  databaseId: string,
) {
  if (!projectId || !databaseId) return;

  const { createPrismaApi } = await import("../../src/prisma/api.ts");
  const api = createPrismaApi();

  const response = await api.get(
    `/projects/${projectId}/databases/${databaseId}`,
  );
  expect(response.status).toEqual(404);
}
