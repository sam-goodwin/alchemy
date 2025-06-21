import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Prisma", () => {
  test("Project", async (scope) => {
    const { Project } = await import("../../src/prisma/project.ts");
    const projectId = `${BRANCH_PREFIX}-prisma-project`;
    let project: any;

    try {
      // Create
      project = await Project(projectId, {
        name: `Test Project ${BRANCH_PREFIX}`,
        description: "A test project for Alchemy",
        private: false,
      });

      expect(project).toMatchObject({
        name: `Test Project ${BRANCH_PREFIX}`,
        description: "A test project for Alchemy",
        private: false,
      });

      expect(project.id).toBeDefined();
      expect(project.createdAt).toBeDefined();
      expect(project.updatedAt).toBeDefined();
      expect(Array.isArray(project.environments)).toBe(true);

      // Update
      project = await Project(projectId, {
        name: `Updated Test Project ${BRANCH_PREFIX}`,
        description: "An updated test project for Alchemy",
        private: true,
      });

      expect(project).toMatchObject({
        name: `Updated Test Project ${BRANCH_PREFIX}`,
        description: "An updated test project for Alchemy",
        private: true,
      });
    } finally {
      await destroy(scope);
      await assertProjectDoesNotExist(project);
    }
  });
});

async function assertProjectDoesNotExist(project: any) {
  if (!project?.id) return;

  const { createPrismaApi } = await import("../../src/prisma/api.ts");
  const api = createPrismaApi();

  const response = await api.get(`/projects/${project.id}`);
  expect(response.status).toEqual(404);
}
