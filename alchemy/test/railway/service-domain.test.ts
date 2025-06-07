import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi } from "../../src/railway/api.ts";
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

  test.skipIf(!!process.env.CI)(
    "create, update, and delete service domain",
    async (scope) => {
      const railwayToken = import.meta.env.RAILWAY_TOKEN;
      if (!railwayToken) {
        throw new Error("RAILWAY_TOKEN environment variable is required");
      }
      const api = createRailwayApi({ apiKey: railwayToken });
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

        const response = await api.query(
          `
        query ServiceDomain($id: String!) {
          serviceDomain(id: $id) {
            id
            domain
            serviceId
            environmentId
            url
          }
        }
        `,
          { id: serviceDomain.id },
        );

        const railwayServiceDomain = response.data?.serviceDomain;
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
    const response = await api.query(
      `
      query ServiceDomain($id: String!) {
        serviceDomain(id: $id) {
          id
        }
      }
      `,
      { id: serviceDomainId },
    );

    expect(response.data?.serviceDomain).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
