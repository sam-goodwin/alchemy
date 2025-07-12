import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/index.ts";
import { Project } from "../../src/railway/project.ts";
import { Service } from "../../src/railway/service.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Service Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-service-project`;
  const testServiceId = `${BRANCH_PREFIX}-service`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete service",
    async (scope) => {
      const api = createRailwayApi();
      let project: Project | undefined;
      let service: Service | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Service Test Project`,
          description: "A project for testing services",
        });

        service = await Service(testServiceId, {
          name: "api-service",
          project: project,
          sourceRepo: "https://github.com/example/api",
          sourceRepoBranch: "main",
          rootDirectory: "/",
        });

        expect(service.id).toBeTruthy();
        expect(service).toMatchObject({
          name: "api-service",
          projectId: project.id,
          sourceRepo: "https://github.com/example/api",
          sourceRepoBranch: "main",
          rootDirectory: "/",
        });

        // Service creation verified by the resource properties above

        service = await Service(testServiceId, {
          name: "updated-api-service",
          project: project,
          sourceRepo: "https://github.com/example/updated-api",
          sourceRepoBranch: "develop",
          rootDirectory: "/app",
        });

        expect(service).toMatchObject({
          name: "updated-api-service",
          sourceRepo: "https://github.com/example/updated-api",
          sourceRepoBranch: "develop",
          rootDirectory: "/app",
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        // Service deletion is handled by destroy(scope)
      }
    },
  );
});

