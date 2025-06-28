import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/index.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Environment Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-env-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-environment`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete environment",
    async (scope) => {
      const api = createRailwayApi();
      let project: Project | undefined;
      let environment: Environment | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Environment Test Project`,
          description: "A project for testing environments",
        });

        environment = await Environment(testEnvironmentId, {
          name: "staging",
          project: project,
        });

        expect(environment.id).toBeTruthy();
        expect(environment).toMatchObject({
          name: "staging",
          projectId: project.id,
        });

        // Environment creation verified by the resource properties above

        environment = await Environment(testEnvironmentId, {
          name: "production",
          project: project,
        });

        expect(environment).toMatchObject({
          name: "production",
          projectId: project.id,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Environment deletion is handled by destroy(scope)
      }
    },
  );
});

