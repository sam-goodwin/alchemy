import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Project } from "../../src/railway/project.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const api = createRailwayApi();

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Railway", () => {
  test("project lifecycle", async (scope) => {
    const projectName = `${BRANCH_PREFIX}-test-project`;
    let project: Project | undefined;

    try {
      // Create project
      project = await Project("test-project", {
        name: projectName,
        description: "Test project for Alchemy Railway provider",
        isPublic: false,
      });

      expect(project).toMatchObject({
        name: projectName,
        description: "Test project for Alchemy Railway provider",
      });

      // Check isPublic separately since it might be undefined instead of false
      expect([false, undefined]).toContain(project.isPublic);

      expect(project.projectId).toBeTruthy();
      expect(project.createdAt).toBeTruthy();
      expect(project.updatedAt).toBeTruthy();

      // Update project
      project = await Project("test-project", {
        name: projectName,
        description: "Updated test project description",
        isPublic: false,
      });

      expect(project.description).toBe("Updated test project description");
    } finally {
      await destroy(scope);
      if (project) {
        await assertProjectDoesNotExist(api, project);
      }
    }
  });
});

async function assertProjectDoesNotExist(
  api: ReturnType<typeof createRailwayApi>,
  project: Project,
) {
  // Railway API may have eventual consistency, so we retry a few times
  const maxAttempts = 5;
  const delayMs = 2000; // 2 seconds between attempts

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const query = `
        query getProject($id: String!) {
          project(id: $id) {
            id
            name
          }
        }
      `;

      const response = await api.query<{
        project: { id: string; name: string } | null;
      }>(query, { id: project.projectId });

      // Check if the project data is null (deleted) or if we got actual data
      if (response.project === null || response.project === undefined) {
        // Project is null/undefined, which means it was deleted successfully
        return;
      }

      // Project still exists, wait and retry unless it's the last attempt
      if (attempt < maxAttempts) {
        console.log(
          `Project still exists (attempt ${attempt}/${maxAttempts}), waiting ${delayMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      // Final attempt failed
      throw new Error(
        `Project ${project.projectId} should have been deleted but still exists after ${maxAttempts} attempts`,
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("should have been deleted")
      ) {
        throw error;
      }
      // Any other error (like GraphQL errors) likely means the project doesn't exist
      // which is what we want
      return;
    }
  }
}
