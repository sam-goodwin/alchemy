import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { BRANCH_PREFIX } from "../util.ts";
import { KVNamespace, OpenAuth } from "../../src/cloudflare/index.ts";
import { secret } from "../../src/secret.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("OpenAuth", () => {
  test("creates OpenAuth worker with GitHub provider", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-github`;

    let openauth: any;
    try {
      // Create OpenAuth worker with GitHub provider
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          github: {
            clientId: secret("fake-github-client-id"),
            clientSecret: secret("fake-github-client-secret"),
            scopes: ["user:email", "read:user"],
          },
        },
        adopt: true,
      });

      expect(openauth).toMatchObject({
        id: resourceId,
        name: resourceId,
        providers: {
          github: {
            clientId: expect.any(Object),
            clientSecret: expect.any(Object),
            scopes: ["user:email", "read:user"],
          },
        },
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      });

      expect(openauth.url).toMatch(/https:\/\/.+\.workers\.dev/);
      expect(openauth.store).toBeDefined();
      expect(openauth.app).toBeDefined();
      expect(openauth.bindings.AUTH_STORE).toBe(openauth.store);
      expect(typeof openauth.fetch).toBe("function");

      // Test the worker responds to health check
      const healthResponse = await openauth.fetch("/");
      expect(healthResponse.status).toBe(200);

      const healthData = await healthResponse.json();
      expect(healthData).toMatchObject({
        message: "OpenAuth Worker",
        providers: ["github"],
        status: "healthy",
      });

      // Test auth routes are accessible
      const authResponse = await openauth.fetch("/auth");
      expect(authResponse.status).toBe(404); // Expected for root auth route without provider

      // Update with additional provider
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          github: {
            clientId: secret("fake-github-client-id"),
            clientSecret: secret("fake-github-client-secret"),
            scopes: ["user:email"],
          },
          google: {
            clientId: secret("fake-google-client-id"),
            clientSecret: secret("fake-google-client-secret"),
            scopes: ["profile", "email"],
          },
        },
        adopt: true,
      });

      expect(openauth.providers).toHaveProperty("github");
      expect(openauth.providers).toHaveProperty("google");

      const updatedHealthResponse = await openauth.fetch("/");
      const updatedHealthData = await updatedHealthResponse.json();
      expect(updatedHealthData.providers).toContain("github");
      expect(updatedHealthData.providers).toContain("google");
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates OpenAuth worker with custom success handler", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-custom`;

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          github: {
            clientId: secret("fake-github-client-id"),
            clientSecret: secret("fake-github-client-secret"),
          },
        },
        onSuccess: async (_ctx, value) => {
          return {
            id: value.user.id.toString(),
            name: value.user.name || value.user.login,
            email: value.user.email,
            avatar: value.user.avatar_url,
            customField: "processed",
          };
        },
        adopt: true,
      });

      expect(openauth).toMatchObject({
        id: resourceId,
        name: resourceId,
        providers: {
          github: expect.any(Object),
        },
        store: expect.any(Object),
        app: expect.any(Object),
      });

      // Test worker is healthy
      const response = await openauth.fetch("/");
      expect(response.status).toBe(200);
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates OpenAuth worker with app usage", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-app`;

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          discord: {
            clientId: secret("fake-discord-client-id"),
            clientSecret: secret("fake-discord-client-secret"),
            scopes: ["identify", "email"],
          },
        },
        adopt: true,
      });

      expect(openauth.app).toBeDefined();
      expect(openauth.store).toBeDefined();

      // Test that app object has expected methods
      expect(typeof openauth.app.get).toBe("function");
      expect(typeof openauth.app.post).toBe("function");
      expect(typeof openauth.app.route).toBe("function");
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates OpenAuth worker with multiple providers and bindings", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-multi`;

    const cacheStore = await KVNamespace("cache-store", {
      title: `${resourceId}-cache`,
      adopt: true,
    });

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          github: {
            clientId: secret("fake-github-client-id"),
            clientSecret: secret("fake-github-client-secret"),
            scopes: ["user:email"],
          },
          google: {
            clientId: secret("fake-google-client-id"),
            clientSecret: secret("fake-google-client-secret"),
            scopes: ["profile", "email"],
          },
          facebook: {
            clientId: secret("fake-facebook-client-id"),
            clientSecret: secret("fake-facebook-client-secret"),
            scopes: ["email"],
          },
        },
        bindings: {
          CACHE: cacheStore,
        },
        env: {
          NODE_ENV: "test",
          APP_NAME: "OpenAuth Test",
        },
        adopt: true,
      });

      expect(openauth.providers).toHaveProperty("github");
      expect(openauth.providers).toHaveProperty("google");
      expect(openauth.providers).toHaveProperty("facebook");
      expect(openauth.bindings.CACHE).toBe(cacheStore);
      expect(openauth.store).toBeDefined();
      expect(openauth.app).toBeDefined();

      // Verify all providers are listed in health check
      const response = await openauth.fetch("/");
      const data = await response.json();
      expect(data.providers).toEqual(
        expect.arrayContaining(["github", "google", "facebook"]),
      );
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("returns error response when no providers are specified", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-no-providers`;

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {},
        adopt: true,
      });

      // Test that the worker returns an error response
      const response = await openauth.fetch("/");
      expect(response.status).toBe(500);

      const text = await response.text();
      expect(text).toContain("At least one OAuth provider must be configured");
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates auth store automatically when not provided", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-auto-store`;

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {
          github: {
            clientId: secret("fake-github-client-id"),
            clientSecret: secret("fake-github-client-secret"),
          },
        },
        adopt: true,
      });

      // Test that the auth store was automatically created
      expect(openauth.store).toBeDefined();
      expect(openauth.store.title).toMatch(/auth-store/);
      expect(openauth.bindings.AUTH_STORE).toBe(openauth.store);

      // Test that the worker is healthy
      const response = await openauth.fetch("/");
      expect(response.status).toBe(200);
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });
});

async function assertOpenAuthDoesNotExist(openauth: any) {
  if (!openauth?.url) return;

  try {
    const response = await fetch(openauth.url);
    // If we get here, the worker still exists
    if (response.ok || response.status !== 404) {
      throw new Error(`OpenAuth worker still exists at ${openauth.url}`);
    }
  } catch (error: any) {
    // Network errors or 404s are expected when the worker is deleted
    if (error.message.includes("still exists")) {
      throw error;
    }
    // Otherwise, this is expected behavior (worker is deleted)
  }
}
