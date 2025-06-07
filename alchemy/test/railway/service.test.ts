import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
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

  test.skipIf(!!process.env.CI)(
    "create, update, and delete service",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
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

        const response = await api.query(
          `
        query Service($id: String!) {
          service(id: $id) {
            id
            name
            projectId
            sourceRepo
            sourceRepoBranch
            rootDirectory
          }
        }
        `,
          { id: service.id },
        );

        const railwayService = response.data?.service;
        expect(railwayService).toMatchObject({
          id: service.id,
          name: "api-service",
          projectId: project.id,
          sourceRepo: "https://github.com/example/api",
          sourceRepoBranch: "main",
          rootDirectory: "/",
        });

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

        if (service?.id) {
          await assertServiceDeleted(service.id, api);
        }
      }
    },
  );
});

async function assertServiceDeleted(serviceId: string, api: any) {
  try {
    const response = await api.query(
      `
      query Service($id: String!) {
        service(id: $id) {
          id
        }
      }
      `,
      { id: serviceId },
    );

    expect(response.data?.service).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
