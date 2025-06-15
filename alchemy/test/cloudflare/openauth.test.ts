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

    // Create KV namespace for session storage
    const authStore = await KVNamespace("auth-store", {
      title: `${resourceId}-auth-store`,
      adopt: true,
    });

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
        storage: authStore,
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
        ttl: {
          reuse: 60,
        },
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      });

      expect(openauth.url).toMatch(/https:\/\/.+\.workers\.dev/);
      expect(openauth.bindings.AUTH_STORE).toBe(authStore);
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
        storage: authStore,
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

    const authStore = await KVNamespace("auth-store-custom", {
      title: `${resourceId}-auth-store`,
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
          },
        },
        storage: authStore,
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
      });

      // Test worker is healthy
      const response = await openauth.fetch("/");
      expect(response.status).toBe(200);
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates OpenAuth worker with custom routes and TTL", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-routes`;

    const authStore = await KVNamespace("auth-store-routes", {
      title: `${resourceId}-auth-store`,
      adopt: true,
    });

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
        storage: authStore,
        ttl: {
          reuse: 120,
        },
        routes: {
          "/api/me": `
            return c.json({ user: "test-user", authenticated: true });
          `,
          "/api/status": `
            return c.json({ status: "ok", service: "openauth" });
          `,
        },
        adopt: true,
      });

      expect(openauth.ttl.reuse).toBe(120);

      // Test custom routes
      const meResponse = await openauth.fetch("/api/me");
      expect(meResponse.status).toBe(200);

      const meData = await meResponse.json();
      expect(meData).toMatchObject({
        user: "test-user",
        authenticated: true,
      });

      const statusResponse = await openauth.fetch("/api/status");
      expect(statusResponse.status).toBe(200);

      const statusData = await statusResponse.json();
      expect(statusData).toMatchObject({
        status: "ok",
        service: "openauth",
      });
    } finally {
      await destroy(scope);
      await assertOpenAuthDoesNotExist(openauth);
    }
  });

  test("creates OpenAuth worker with multiple providers and bindings", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-multi`;

    const authStore = await KVNamespace("auth-store-multi", {
      title: `${resourceId}-auth-store`,
      adopt: true,
    });

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
        storage: authStore,
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

    const authStore = await KVNamespace("auth-store-error", {
      title: `${resourceId}-auth-store`,
      adopt: true,
    });

    let openauth: any;
    try {
      openauth = await OpenAuth(resourceId, import.meta, {
        name: resourceId,
        providers: {},
        storage: authStore,
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

  test("returns error response when storage is not provided", async (scope) => {
    const resourceId = `${BRANCH_PREFIX}-openauth-no-storage`;

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
        storage: null as any,
        adopt: true,
      });

      // Test that the worker returns an error response
      const response = await openauth.fetch("/");
      expect(response.status).toBe(500);
      
      const text = await response.text();
      expect(text).toContain("Storage (KV Namespace) is required for session management");
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
