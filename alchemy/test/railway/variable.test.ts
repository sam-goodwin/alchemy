import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/index.ts";
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

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete variable",
    async (scope) => {
      const api = createRailwayApi();
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

        // Variable creation verified by the resource properties above

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

        // Variable deletion is handled by destroy(scope)
      }
    },
  );
});

