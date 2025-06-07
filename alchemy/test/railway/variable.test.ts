import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { Service } from "../../src/railway/service.ts";
import { Variable } from "../../src/railway/variable.ts";
import { secret } from "../../src/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Variable Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-var-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-var-environment`;
  const testServiceId = `${BRANCH_PREFIX}-var-service`;
  const testVariableId = `${BRANCH_PREFIX}-variable`;

  test.skipIf(!!process.env.CI)(
    "create, update, and delete variable",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
      let project: Project | undefined;
      let environment: Environment | undefined;
      let service: Service | undefined;
      let variable: Variable | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Variable Test Project`,
          description: "A project for testing variables",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        service = await Service(testServiceId, {
          name: "test-service",
          project: project,
        });

        variable = await Variable(testVariableId, {
          name: "API_KEY",
          value: secret("secret-value-123"),
          environment: environment,
          service: service,
        });

        expect(variable.id).toBeTruthy();
        expect(variable).toMatchObject({
          name: "API_KEY",
          environmentId: environment.id,
          serviceId: service.id,
        });
        expect(variable.value.unencrypted).toBe("secret-value-123");

        const response = await api.query(
          `
        query Variable($id: String!) {
          variable(id: $id) {
            id
            name
            environmentId
            serviceId
          }
        }
        `,
          { id: variable.id },
        );

        const railwayVariable = response.data?.variable;
        expect(railwayVariable).toMatchObject({
          id: variable.id,
          name: "API_KEY",
          environmentId: environment.id,
          serviceId: service.id,
        });

        variable = await Variable(testVariableId, {
          name: "API_KEY",
          value: "updated-secret-value-456",
          environment: environment,
          service: service,
        });

        expect(variable.value.unencrypted).toBe("updated-secret-value-456");
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (variable?.id) {
          await assertVariableDeleted(variable.id, api);
        }
      }
    },
  );
});

async function assertVariableDeleted(variableId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Variable($id: String!) {
        variable(id: $id) {
          id
        }
      }
      `,
      { id: variableId },
    );

    expect(response.data?.variable).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
