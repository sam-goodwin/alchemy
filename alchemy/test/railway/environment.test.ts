import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
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

  test.skipIf(!!process.env.CI)(
    "create, update, and delete environment",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
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

        const response = await api.query(
          `
        query Environment($id: String!) {
          environment(id: $id) {
            id
            name
            projectId
          }
        }
        `,
          { id: environment.id },
        );

        const railwayEnvironment = response.data?.environment;
        expect(railwayEnvironment).toMatchObject({
          id: environment.id,
          name: "staging",
          projectId: project.id,
        });

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

        if (environment?.id) {
          await assertEnvironmentDeleted(environment.id, api);
        }
      }
    },
  );
});

async function assertEnvironmentDeleted(environmentId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Environment($id: String!) {
        environment(id: $id) {
          id
        }
      }
      `,
      { id: environmentId },
    );

    expect(response.data?.environment).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
