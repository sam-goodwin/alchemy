import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi, getCustomDomain } from "../../src/railway/index.ts";
import { CustomDomain } from "../../src/railway/custom-domain.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { Service } from "../../src/railway/service.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("CustomDomain Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-domain-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-domain-environment`;
  const testServiceId = `${BRANCH_PREFIX}-domain-service`;
  const testDomainId = `${BRANCH_PREFIX}-custom-domain`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create and delete custom domain",
    async (scope) => {
      const api = createRailwayApi();
      let project: Project | undefined;
      let environment: Environment | undefined;
      let service: Service | undefined;
      let customDomain: CustomDomain | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Custom Domain Test Project`,
          description: "A project for testing custom domains",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        service = await Service(testServiceId, {
          name: "web-service",
          project: project,
        });

        customDomain = await CustomDomain(testDomainId, {
          domain: `${BRANCH_PREFIX}-test.example.com`,
          service: service,
          environment: environment,
        });

        expect(customDomain.id).toBeTruthy();
        expect(customDomain).toMatchObject({
          domain: `${BRANCH_PREFIX}-test.example.com`,
          serviceId: service.id,
          environmentId: environment.id,
        });
        expect(customDomain.status).toBeTruthy();

        const railwayCustomDomain = await getCustomDomain(api, customDomain.id);
        expect(railwayCustomDomain).toMatchObject({
          id: customDomain.id,
          domain: `${BRANCH_PREFIX}-test.example.com`,
          serviceId: service.id,
          environmentId: environment.id,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (customDomain?.id) {
          await assertCustomDomainDeleted(customDomain.id, api);
        }
      }
    },
  );
});

async function assertCustomDomainDeleted(customDomainId: string, api: any) {
  try {
    const customDomain = await getCustomDomain(api, customDomainId);
    expect(customDomain).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
