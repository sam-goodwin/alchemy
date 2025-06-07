import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Function } from "../../src/railway/function.ts";
import { Project } from "../../src/railway/project.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Function Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-func-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-func-environment`;
  const testFunctionId = `${BRANCH_PREFIX}-function`;

  test.skipIf(!!process.env.CI)(
    "create, update, and delete function",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
      let project: Project | undefined;
      let environment: Environment | undefined;
      let func: Function | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Function Test Project`,
          description: "A project for testing functions",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        func = await Function(testFunctionId, {
          name: "hello-world",
          project: project,
          environment: environment,
          runtime: "nodejs",
          main: "./test/fixtures/hello-handler.js",
          entrypoint: "index.handler",
        });

        expect(func.id).toBeTruthy();
        expect(func).toMatchObject({
          name: "hello-world",
          projectId: project.id,
          environmentId: environment.id,
          runtime: "nodejs",
          entrypoint: "index.handler",
        });
        expect(func.url).toBeTruthy();

        const response = await api.query(
          `
        query Function($id: String!) {
          function(id: $id) {
            id
            name
            projectId
            environmentId
            runtime
            entrypoint
            url
          }
        }
        `,
          { id: func.id },
        );

        const railwayFunction = response.data?.function;
        expect(railwayFunction).toMatchObject({
          id: func.id,
          name: "hello-world",
          projectId: project.id,
          environmentId: environment.id,
          runtime: "nodejs",
          entrypoint: "index.handler",
        });

        func = await Function(testFunctionId, {
          name: "updated-hello-world",
          project: project,
          environment: environment,
          runtime: "python",
          main: "./test/fixtures/hello-handler.py",
          entrypoint: "main.handler",
        });

        expect(func).toMatchObject({
          name: "updated-hello-world",
          runtime: "python",
          entrypoint: "main.handler",
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (func?.id) {
          await assertFunctionDeleted(func.id, api);
        }
      }
    },
  );
});

async function assertFunctionDeleted(functionId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Function($id: String!) {
        function(id: $id) {
          id
        }
      }
      `,
      { id: functionId },
    );

    expect(response.data?.function).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
