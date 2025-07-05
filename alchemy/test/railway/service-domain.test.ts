import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi, getServiceDomain } from "../../src/railway/index.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { Service } from "../../src/railway/service.ts";
import { ServiceDomain } from "../../src/railway/service-domain.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("ServiceDomain Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-svc-domain-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-svc-domain-environment`;
  const testServiceId = `${BRANCH_PREFIX}-svc-domain-service`;
  const testServiceDomainId = `${BRANCH_PREFIX}-service-domain`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create, update, and delete service domain",
    async (scope) => {
      const api = createRailwayApi();
      let project: Project | undefined;
      let environment: Environment | undefined;
      let service: Service | undefined;
      let serviceDomain: ServiceDomain | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} Service Domain Test Project`,
          description: "A project for testing service domains",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        service = await Service(testServiceId, {
          name: "api-service",
          project: project,
        });

        serviceDomain = await ServiceDomain(testServiceDomainId, {
          domain: `${BRANCH_PREFIX}-api.railway.app`,
          service: service,
          environment: environment,
        });

        expect(serviceDomain.id).toBeTruthy();
        expect(serviceDomain).toMatchObject({
          domain: `${BRANCH_PREFIX}-api.railway.app`,
          serviceId: service.id,
          environmentId: environment.id,
        });
        expect(serviceDomain.url).toBeTruthy();

        const railwayServiceDomain = await getServiceDomain(api, serviceDomain.id);
        expect(railwayServiceDomain).toMatchObject({
          id: serviceDomain.id,
          domain: `${BRANCH_PREFIX}-api.railway.app`,
          serviceId: service.id,
          environmentId: environment.id,
        });

        serviceDomain = await ServiceDomain(testServiceDomainId, {
          domain: `${BRANCH_PREFIX}-updated-api.railway.app`,
          service: service,
          environment: environment,
        });

        expect(serviceDomain).toMatchObject({
          domain: `${BRANCH_PREFIX}-updated-api.railway.app`,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (serviceDomain?.id) {
          await assertServiceDomainDeleted(serviceDomain.id, api);
        }
      }
    },
  );
});

async function assertServiceDomainDeleted(serviceDomainId: string, api: any) {
  try {
    const serviceDomain = await getServiceDomain(api, serviceDomainId);
    expect(serviceDomain).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
