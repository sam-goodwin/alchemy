import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Project } from "../../src/railway/project.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Project Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-project`;

  test.skipIf(!!process.env.CI)(
    "create, update, and delete project",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
      let project: Project | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Alchemy Test Project`,
          description: "A project created for testing Railway provider",
          isPublic: false,
        });

        expect(project.id).toBeTruthy();
        expect(project).toMatchObject({
          name: `${BRANCH_PREFIX} Alchemy Test Project`,
          description: "A project created for testing Railway provider",
          isPublic: false,
        });

        const response = await api.query(
          `
        query Project($id: String!) {
          project(id: $id) {
            id
            name
            description
            isPublic
          }
        }
        `,
          { id: project.id },
        );

        const railwayProject = response.data?.project;
        expect(railwayProject).toMatchObject({
          id: project.id,
          name: `${BRANCH_PREFIX} Alchemy Test Project`,
          description: "A project created for testing Railway provider",
          isPublic: false,
        });

        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Updated Test Project`,
          description: "Updated description",
          isPublic: true,
        });

        expect(project.id).toBeTruthy();
        expect(project).toMatchObject({
          name: `${BRANCH_PREFIX} Updated Test Project`,
          description: "Updated description",
          isPublic: true,
        });

        const updatedResponse = await api.query(
          `
        query Project($id: String!) {
          project(id: $id) {
            id
            name
            description
            isPublic
          }
        }
        `,
          { id: project.id },
        );

        const updatedRailwayProject = updatedResponse.data?.project;
        expect(updatedRailwayProject).toMatchObject({
          name: `${BRANCH_PREFIX} Updated Test Project`,
          description: "Updated description",
          isPublic: true,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (project?.id) {
          await assertProjectDeleted(project.id, api);
        }
      }
    },
  );
});

async function assertProjectDeleted(projectId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Project($id: String!) {
        project(id: $id) {
          id
        }
      }
      `,
      { id: projectId },
    );

    expect(response.data?.project).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
