import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createRailwayApi, getTcpProxy } from "../../src/railway/index.ts";
import { Environment } from "../../src/railway/environment.ts";
import { Project } from "../../src/railway/project.ts";
import { Service } from "../../src/railway/service.ts";
import { TcpProxy } from "../../src/railway/tcp-proxy.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("TcpProxy Resource", () => {
  const testProjectId = `${BRANCH_PREFIX}-tcp-project`;
  const testEnvironmentId = `${BRANCH_PREFIX}-tcp-environment`;
  const testServiceId = `${BRANCH_PREFIX}-tcp-service`;
  const testTcpProxyId = `${BRANCH_PREFIX}-tcp-proxy`;

  test.skipIf(!import.meta.env.RAILWAY_TOKEN)(
    "create and delete TCP proxy",
    async (scope) => {
      const api = createRailwayApi();
      let project: Project | undefined;
      let environment: Environment | undefined;
      let service: Service | undefined;
      let tcpProxy: TcpProxy | undefined;

      try {
        project = await Project(testProjectId, {
          name: `${BRANCH_PREFIX} TCP Proxy Test Project`,
          description: "A project for testing TCP proxies",
        });

        environment = await Environment(testEnvironmentId, {
          name: "test",
          project: project,
        });

        service = await Service(testServiceId, {
          name: "tcp-service",
          project: project,
        });

        tcpProxy = await TcpProxy(testTcpProxyId, {
          applicationPort: 3000,
          proxyPort: 8080,
          service: service,
          environment: environment,
        });

        expect(tcpProxy.id).toBeTruthy();
        expect(tcpProxy).toMatchObject({
          applicationPort: 3000,
          proxyPort: 8080,
          serviceId: service.id,
          environmentId: environment.id,
        });
        expect(tcpProxy.domain).toBeTruthy();

        const railwayTcpProxy = await getTcpProxy(api, tcpProxy.id);
        expect(railwayTcpProxy).toMatchObject({
          id: tcpProxy.id,
          applicationPort: 3000,
          proxyPort: 8080,
          serviceId: service.id,
          environmentId: environment.id,
        });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        await destroy(scope);

        if (tcpProxy?.id) {
          await assertTcpProxyDeleted(tcpProxy.id, api);
        }
      }
    },
  );
});

async function assertTcpProxyDeleted(tcpProxyId: string, api: any) {
  try {
    const tcpProxy = await getTcpProxy(api, tcpProxyId);
    expect(tcpProxy).toBeNull();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return;
    }
    throw error;
  }
}
