import { afterAll, describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { CloudflareApiError } from "../../src/cloudflare/api-error.ts";
import { createCloudflareApi } from "../../src/cloudflare/api.ts";
import { Route } from "../../src/cloudflare/route.ts";
import { Worker } from "../../src/cloudflare/worker.ts";
import { Zone } from "../../src/cloudflare/zone.ts";
import { destroy } from "../../src/destroy.ts";
import type { Scope } from "../../src/scope.ts";
import { BRANCH_PREFIX } from "../util.ts";
// must import this or else alchemy.test won't exist
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const testDomain = `${BRANCH_PREFIX}-route-test.com`;

const isEnabled = !!process.env.ALL_TESTS;

let zone: Zone;
let scope: Scope | undefined;

test.beforeAll(async (_scope) => {
  if (!isEnabled) return;
  zone = await Zone(`${BRANCH_PREFIX}-zone`, {
    name: testDomain,
  });
  scope = _scope;
});

afterAll(async () => {
  if (scope) {
    await destroy(scope);
  }
});

// this can have a 1hour throttle timeout, so will skip it by default
// e.g.
// Cloudflare Rate Limit Exceeded at 2025-07-05T08:29:27.625Z: You have
// exceeded the rate limit for adding or deleting zones. Please try again
// n 1 hour.
// ... truly insane
describe.skipIf(!isEnabled)("Route Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-route`;

  test("create, update, and delete route", async (scope) => {
    let route: any;
    let worker: any;
    let api: any;
    const pattern = `${testDomain}/test1/*`;

    try {
      // Initialize API client
      api = await createCloudflareApi();

      // First create a worker to connect the route to
      const workerName = `${BRANCH_PREFIX}-worker-1`;
      worker = await Worker(workerName, {
        adopt: true,
        script: `
          export default {
            fetch(request, env) {
              return new Response('Hello from ${workerName}!');
            }
          }
        `,
      });

      expect(worker.name).toEqual(workerName);

      // Create a test route
      route = await Route(testId, {
        pattern,
        script: worker,
        zoneId: zone.id,
        adopt: true,
      });

      expect(route.id).toBeTruthy();
      expect(route.pattern).toEqual(pattern);
      expect(route.script).toEqual(workerName);

      // Verify route was created by querying the API directly
      const getResponse = await api.get(
        `/zones/${route.zoneId}/workers/routes/${route.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.result.pattern).toEqual(pattern);
      expect(responseData.result.script).toEqual(workerName);

      // Update the route with a new pattern
      const updatedPattern = `${testDomain}/test1/api/*`;

      route = await Route(testId, {
        pattern: updatedPattern,
        script: worker,
        zoneId: zone.id,
      });

      expect(route.id).toBeTruthy();
      expect(route.pattern).toEqual(updatedPattern);

      // Verify route was updated
      const getUpdatedResponse = await api.get(
        `/zones/${route.zoneId}/workers/routes/${route.id}`,
      );
      const updatedData = await getUpdatedResponse.json();
      expect(updatedData.result.pattern).toEqual(updatedPattern);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify route was deleted
      if (route?.id && route?.zoneId) {
        await assertRouteNotExists(api, route.zoneId, route.id);
      }
    }
  });

  test("create route with string script name", async (scope) => {
    let route: any;
    let api: any;
    let worker: any;
    const pattern = `${testDomain}/test2/*`;

    try {
      // Initialize API client
      api = await createCloudflareApi();

      // First create a worker to connect the route to
      const workerName = `${BRANCH_PREFIX}-worker-2`;
      worker = await Worker(workerName, {
        adopt: true,
        script: `
          export default {
            fetch(request, env) {
              return new Response('Hello from ${workerName}!');
            }
          }
        `,
      });

      expect(worker.name).toEqual(workerName);

      // Create a test route with a string script name
      route = await Route(`${testId}-string`, {
        pattern,
        script: workerName,
        zoneId: zone.id,
      });

      expect(route.id).toBeTruthy();
      expect(route.pattern).toEqual(pattern);
      expect(route.script).toEqual(workerName);

      // Verify route was created by querying the API directly
      const getResponse = await api.get(
        `/zones/${route.zoneId}/workers/routes/${route.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.result.pattern).toEqual(pattern);
      expect(responseData.result.script).toEqual(workerName);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify route was deleted
      if (route?.id && route?.zoneId) {
        await assertRouteNotExists(api, route.zoneId, route.id);
      }
    }
  });

  test("using different patterns", async (scope) => {
    let route: any;
    let api: any;
    let worker: any;

    try {
      // Initialize API client
      api = await createCloudflareApi();

      // First create a worker to connect the route to
      const workerName = `${BRANCH_PREFIX}-worker-3`;
      worker = await Worker(workerName, {
        adopt: true,
        script: `
          export default {
            fetch(request, env) {
              return new Response('Hello from ${workerName}!');
            }
          }
        `,
      });

      expect(worker.name).toEqual(workerName);

      // Use a more specific pattern - unique for this test
      const specificPattern = `${testDomain}/test3/api/*`;

      // Create a test route with a specific pattern
      route = await Route(`${testId}-specific-pattern`, {
        pattern: specificPattern,
        script: workerName,
        zoneId: zone.id,
      });

      expect(route.id).toBeTruthy();
      expect(route.pattern).toEqual(specificPattern);
      expect(route.script).toEqual(workerName);
      expect(route.zoneId).toEqual(zone.id);

      // Verify route was created by querying the API directly
      const getResponse = await api.get(
        `/zones/${route.zoneId}/workers/routes/${route.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.result.pattern).toEqual(specificPattern);
      expect(responseData.result.script).toEqual(workerName);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify route was deleted
      if (route?.id && route?.zoneId) {
        await assertRouteNotExists(api, route.zoneId, route.id);
      }
    }
  });

  test("adopt existing route", async (scope) => {
    let route1: any;
    let route2: any;
    let api: any;
    let worker: any;
    const pattern = `${testDomain}/test4/*`;

    try {
      // Initialize API client
      api = await createCloudflareApi();

      // First create a worker to connect the route to
      const workerName = `${BRANCH_PREFIX}-worker-4`;
      worker = await Worker(workerName, {
        adopt: true,
        script: `
          export default {
            fetch(request, env) {
              return new Response('Hello from ${workerName}!');
            }
          }
        `,
      });

      expect(worker.name).toEqual(workerName);

      // Create the first route
      route1 = await Route(`${testId}-adopt-1`, {
        pattern,
        script: workerName,
        zoneId: zone.id,
      });

      expect(route1.id).toBeTruthy();
      expect(route1.pattern).toEqual(pattern);

      // Try to create a second route with the same pattern - this should fail without adopt
      try {
        await Route(`${testId}-adopt-2-fail`, {
          pattern,
          script: workerName,
          zoneId: zone.id,
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error: any) {
        // Expected to fail with 409 conflict
        expect(error).toBeInstanceOf(CloudflareApiError);
        expect(error.status).toBe(409);
      }

      // Now create a second route with adopt=true - this should succeed and adopt the existing route
      route2 = await Route(`${testId}-adopt-2-success`, {
        pattern,
        script: workerName,
        zoneId: zone.id,
        adopt: true,
      });

      expect(route2.id).toBeTruthy();
      expect(route2.pattern).toEqual(pattern);
      expect(route2.script).toEqual(workerName);

      // The adopted route should have the same ID as the original
      expect(route2.id).toEqual(route1.id);

      // Verify route exists by querying the API directly
      const getResponse = await api.get(
        `/zones/${route2.zoneId}/workers/routes/${route2.id}`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.result.pattern).toEqual(pattern);
      expect(responseData.result.script).toEqual(workerName);
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify route was deleted
      if (route2?.id && route2?.zoneId) {
        await assertRouteNotExists(api, route2.zoneId, route2.id);
      }
    }
  });

  test("create worker with routes (explicit zone ID)", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-explicit`;
    const testDomain = `${BRANCH_PREFIX}-routes-test.com`;

    let worker: Worker | undefined;
    let zone: Zone | undefined;

    try {
      // Create a zone first
      zone = await Zone("test-zone", {
        name: testDomain,
      });

      // Create a worker with explicit routes
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);
              return new Response(\`Hello from worker on path: \${url.pathname}\`, {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/api/*`,
            zoneId: zone.id,
          },
          {
            pattern: `${testDomain}/admin/*`,
            zoneId: zone.id,
          },
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.routes).toBeDefined();
      expect(worker.routes?.length).toEqual(2);

      // Verify routes configuration
      const apiRoute = worker.routes?.find((r) => r.pattern.includes("/api/"));
      const adminRoute = worker.routes?.find((r) =>
        r.pattern.includes("/admin/"),
      );

      expect(apiRoute).toBeDefined();
      expect(apiRoute?.zoneId).toEqual(zone.id);
      expect(adminRoute).toBeDefined();
      expect(adminRoute?.zoneId).toEqual(zone.id);

      // Verify routes were created via API
      const api = await createCloudflareApi();
      const routesResponse = await api.get(`/zones/${zone.id}/workers/routes`);
      expect(routesResponse.ok).toBeTruthy();

      const routesData: any = await routesResponse.json();
      const createdRoutes = routesData.result.filter(
        (route: any) => route.script === workerName,
      );
      expect(createdRoutes.length).toEqual(2);
    } finally {
      await destroy(scope);
    }
  });

  test("create worker with routes (automatic zone ID inference)", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-auto`;
    const testDomain = `${BRANCH_PREFIX}-auto-routes.com`;

    let worker: Worker;
    let zone: Zone;

    try {
      // Create a zone first
      zone = await Zone("auto-zone", {
        name: testDomain,
      });

      // Create a worker with routes that will auto-infer zone ID
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);
              return new Response(\`Auto-inferred zone worker on: \${url.pathname}\`, {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }
        `,
        format: "esm",
        routes: [
          {
            // Zone ID should be automatically inferred from domain
            pattern: `${testDomain}/*`,
          },
          {
            // Zone ID should be inferred for subdomain too
            pattern: `api.${testDomain}/*`,
          },
          {
            // Wildcard patterns should also work
            pattern: `*.${testDomain}/api/*`,
          },
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.routes).toBeDefined();
      expect(worker.routes?.length).toEqual(3);

      // Verify all routes have the inferred zone ID
      worker.routes?.forEach((route) => {
        expect(route.zoneId).toEqual(zone.id);
      });

      // Verify routes were created via API
      const api = await createCloudflareApi();
      const routesResponse = await api.get(`/zones/${zone.id}/workers/routes`);
      expect(routesResponse.ok).toBeTruthy();

      const routesData: any = await routesResponse.json();
      const createdRoutes = routesData.result.filter(
        (route: any) => route.script === workerName,
      );
      expect(createdRoutes.length).toEqual(3);
    } finally {
      await destroy(scope);
    }
  });

  test("create worker with mixed explicit and inferred route zones", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-mixed`;
    const testDomain1 = `${BRANCH_PREFIX}-mixed1.com`;
    const testDomain2 = `${BRANCH_PREFIX}-mixed2.com`;

    let worker: Worker | undefined;
    let zone1: Zone;
    let zone2: Zone;

    try {
      // Create two zones
      zone1 = await Zone("mixed-zone-1", {
        name: testDomain1,
      });

      zone2 = await Zone("mixed-zone-2", {
        name: testDomain2,
      });

      // Create a worker with mixed explicit and auto-inferred routes
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);
              return new Response(\`Mixed zones worker: \${url.hostname}\${url.pathname}\`, {
                status: 200,
                headers: { 'Content-Type': 'text/plain' }
              });
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain1}/*`,
            // Zone ID will be auto-inferred
          },
          {
            pattern: `${testDomain2}/*`,
            zoneId: zone2.id, // Explicit zone ID
          },
          {
            pattern: `api.${testDomain1}/*`,
            // Zone ID will be auto-inferred from parent domain
          },
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.name).toEqual(workerName);
      expect(worker.routes).toBeDefined();
      expect(worker.routes?.length).toEqual(3);

      // Verify zone IDs are correct
      const domain1Routes = worker.routes?.filter((r) =>
        r.pattern.includes(testDomain1),
      );
      const domain2Routes = worker.routes?.filter((r) =>
        r.pattern.includes(testDomain2),
      );

      expect(domain1Routes?.length).toEqual(2);
      expect(domain2Routes?.length).toEqual(1);

      domain1Routes?.forEach((route) => {
        expect(route.zoneId).toEqual(zone1.id);
      });

      domain2Routes?.forEach((route) => {
        expect(route.zoneId).toEqual(zone2.id);
      });

      // Verify routes were created via API for both zones
      const api = await createCloudflareApi();

      const routes1Response = await api.get(
        `/zones/${zone1.id}/workers/routes`,
      );
      const routes1Data: any = await routes1Response.json();
      const created1Routes = routes1Data.result.filter(
        (route: any) => route.script === workerName,
      );
      expect(created1Routes.length).toEqual(2);

      const routes2Response = await api.get(
        `/zones/${zone2.id}/workers/routes`,
      );
      const routes2Data: any = await routes2Response.json();
      const created2Routes = routes2Data.result.filter(
        (route: any) => route.script === workerName,
      );
      expect(created2Routes.length).toEqual(1);
    } finally {
      await destroy(scope);
    }
  });

  test("fail to create worker with routes when zone cannot be inferred", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-fail`;
    const nonExistentDomain = `${BRANCH_PREFIX}-nonexistent.example`;

    try {
      // Try to create worker with routes for non-existent domain
      const workerPromise = Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Should not be created');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${nonExistentDomain}/*`,
            // No zoneId provided, should fail inference
          },
        ],
      });

      await expect(workerPromise).rejects.toThrow(
        /Could not infer zone ID for route pattern/,
      );
    } finally {
      await destroy(scope);
      // Worker should not exist since creation failed
    }
  });

  test("create worker with duplicate route patterns should fail", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-duplicate`;
    const testDomain = `${BRANCH_PREFIX}-duplicate.com`;

    let zone: Zone | undefined;

    try {
      // Create a zone
      zone = await Zone("duplicate-zone", {
        name: testDomain,
      });

      // Try to create worker with duplicate route patterns
      const workerPromise = Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Should not be created');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/*`,
            zoneId: zone.id,
          },
          {
            pattern: `${testDomain}/*`, // Duplicate pattern
            zoneId: zone.id,
          },
        ],
      });

      await expect(workerPromise).rejects.toThrow(/Duplicate Route found: /);
    } finally {
      await destroy(scope);
      // Worker should not exist since creation failed
    }
  });

  test("create worker with routes that adopt existing routes", async (scope) => {
    const workerName1 = `${BRANCH_PREFIX}-worker-routes-adopt-1`;
    const workerName2 = `${BRANCH_PREFIX}-worker-routes-adopt-2`;
    const testDomain = `${BRANCH_PREFIX}-adopt.com`;

    let worker1: Worker | undefined;
    let worker2: Worker | undefined;
    let zone: Zone | undefined;

    try {
      // Create a zone
      zone = await Zone("adopt-zone", {
        name: testDomain,
      });

      // Create first worker with routes
      worker1 = await Worker(workerName1, {
        name: workerName1,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Worker 1');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/shared/*`,
            zoneId: zone.id,
          },
        ],
      });

      expect(worker1.id).toBeTruthy();

      // Create second worker that adopts the existing route
      worker2 = await Worker(workerName2, {
        name: workerName2,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Worker 2');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/shared/*`, // Same pattern
            zoneId: zone.id,
            adopt: true, // Should adopt existing route
          },
        ],
      });

      expect(worker2.id).toBeTruthy();
      expect(worker2.routes).toBeDefined();
      expect(worker2.routes?.length).toEqual(1);

      // Verify route was adopted (script should be updated to worker2)
      const api = await createCloudflareApi();
      const routesResponse = await api.get(`/zones/${zone.id}/workers/routes`);
      const routesData: any = await routesResponse.json();

      const sharedRoutes = routesData.result.filter(
        (route: any) => route.pattern === `${testDomain}/shared/*`,
      );

      // Should only be one route with this pattern
      expect(sharedRoutes.length).toEqual(1);
      // And it should point to worker2 now
      expect(sharedRoutes[0].script).toEqual(workerName2);
    } finally {
      await destroy(scope);
    }
  });

  test("update worker routes", async (scope) => {
    const workerName = `${BRANCH_PREFIX}-worker-routes-update`;
    const testDomain = `${BRANCH_PREFIX}-update.com`;

    let worker: Worker | undefined;
    let zone: Zone | undefined;

    try {
      // Create a zone
      zone = await Zone("update-zone", {
        name: testDomain,
      });

      // Create worker with initial routes
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Initial version');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/api/*`,
            zoneId: zone.id,
          },
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.routes?.length).toEqual(1);

      // Update worker with different routes
      worker = await Worker(workerName, {
        name: workerName,
        adopt: true,
        script: `
          export default {
            async fetch(request, env, ctx) {
              return new Response('Updated version');
            }
          }
        `,
        format: "esm",
        routes: [
          {
            pattern: `${testDomain}/api/v2/*`, // Different pattern
            zoneId: zone.id,
          },
          {
            pattern: `${testDomain}/admin/*`, // Additional route
            zoneId: zone.id,
          },
        ],
      });

      expect(worker.id).toBeTruthy();
      expect(worker.routes?.length).toEqual(2);

      // Verify new routes were created
      const api = await createCloudflareApi();
      const routesResponse = await api.get(`/zones/${zone.id}/workers/routes`);
      const routesData: any = await routesResponse.json();

      const workerRoutes = routesData.result.filter(
        (route: any) => route.script === workerName,
      );

      expect(workerRoutes.length).toEqual(2);

      const patterns = workerRoutes.map((route: any) => route.pattern);
      expect(patterns).toContain(`${testDomain}/api/v2/*`);
      expect(patterns).toContain(`${testDomain}/admin/*`);
      expect(patterns).not.toContain(`${testDomain}/api/*`); // Old route should be removed
    } finally {
      await destroy(scope);
    }
  });
});

/**
 * Asserts that a route does not exist by checking for a 404 status
 */
async function assertRouteNotExists(api: any, zoneId: string, routeId: string) {
  const getDeletedResponse = await api.get(
    `/zones/${zoneId}/workers/routes/${routeId}`,
  );
  expect(getDeletedResponse.status).toEqual(404);
}
