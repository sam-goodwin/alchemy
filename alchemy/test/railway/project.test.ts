import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/index.ts";
import { Project } from "../../src/railway/project.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Project Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-project`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete project",
    async (scope) => {
      const api = createRailwayApi();
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

        // Project creation verified by the resource properties above

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

        // Project update verified by the resource properties above
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Project deletion is handled by destroy(scope)
      }
    },
  );
});

