import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Prisma Connection", () => {
  test("Connection", async (scope) => {
    const { Project } = await import("../../src/prisma/project.ts");
    const { Database } = await import("../../src/prisma/database.ts");
    const { Connection } = await import("../../src/prisma/connection.ts");

    const projectId = `${BRANCH_PREFIX}-prisma-conn-project`;
    const databaseId = `${BRANCH_PREFIX}-prisma-conn-database`;
    const connectionId = `${BRANCH_PREFIX}-prisma-connection`;

    let project: any;
    let database: any;
    let connection: any;

    try {
      // First create a project
      project = await Project(projectId, {
        name: `Connection Test Project ${BRANCH_PREFIX}`,
        description: "A test project for connection testing",
      });

      expect(project.id).toBeDefined();

      // Create database
      database = await Database(databaseId, {
        project: project,
        name: `test-conn-db-${BRANCH_PREFIX}`,
        region: "us-east-1",
      });

      expect(database.id).toBeDefined();

      // Create connection
      connection = await Connection(connectionId, {
        project: project,
        database: database,
        name: `test-connection-${BRANCH_PREFIX}`,
      });

      expect(connection).toMatchObject({
        projectId: project.id,
        databaseId: database.id,
        name: `test-connection-${BRANCH_PREFIX}`,
      });

      expect(connection.id).toBeDefined();
      expect(connection.createdAt).toBeDefined();
      expect(connection.connectionString).toBeDefined();
      expect(typeof connection.connectionString.unencrypted).toBe("string");

      // Update (should return same connection as they are immutable)
      connection = await Connection(connectionId, {
        project: project,
        database: database,
        name: `test-connection-${BRANCH_PREFIX}`,
      });

      expect(connection.id).toBeDefined();
      expect(connection.projectId).toBe(project.id);
      expect(connection.databaseId).toBe(database.id);
    } finally {
      await destroy(scope);
      await assertConnectionDoesNotExist(
        project?.id,
        database?.id,
        connection?.id,
      );
    }
  });
});

async function assertConnectionDoesNotExist(
  projectId: string,
  databaseId: string,
  connectionId: string,
) {
  if (!projectId || !databaseId || !connectionId) return;

  const { createPrismaApi } = await import("../../src/prisma/api.ts");
  const api = createPrismaApi();

  try {
    const response = await api.get(
      `/projects/${projectId}/databases/${databaseId}/connections`,
    );
    if (response.ok) {
      const data = await response.json();
      const connections = data.data || [];
      const connectionExists = connections.some(
        (c: any) => c.id === connectionId,
      );
      if (connectionExists) {
        throw new Error(
          `Connection ${connectionId} still exists when it should have been deleted`,
        );
      }
    }
  } catch (error) {
    // Expected - connection should not exist
    if (error.message.includes("still exists")) {
      throw error;
    }
    // Other errors might be expected depending on API behavior
  }
}
