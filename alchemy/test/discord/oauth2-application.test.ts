import { describe, expect } from "vitest";
import { destroy } from "../../src/destroy.ts";
import { Application } from "../../src/discord/application.ts";
import { OAuth2Application } from "../../src/discord/oauth2-application.ts";
import { secret } from "../../src/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";

import { alchemy } from "../../src/alchemy.ts";
import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Discord OAuth2Application", () => {
  test("create OAuth2 configuration", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const appId = `${BRANCH_PREFIX}-oauth2-app`;
    const oauth2Id = `${BRANCH_PREFIX}-oauth2-config`;

    let app: Application;
    let oauth2: OAuth2Application;

    try {
      // Create application first
      app = await Application(appId, {
        name: "OAuth2 Test App",
        botToken: secret(botToken),
      });

      // Create OAuth2 configuration
      oauth2 = await OAuth2Application(oauth2Id, {
        application: app,
        redirectUris: ["https://example.com/callback"],
        scopes: ["identify", "email", "guilds"],
      });

      expect(oauth2).toMatchObject({
        applicationId: app.id,
        scopes: ["identify", "email", "guilds"],
        permissions: "0",
        redirectUris: ["https://example.com/callback"],
      });

      // Verify authorization URL format
      const url = new URL(oauth2.authorizationUrl);
      expect(url.hostname).toBe("discord.com");
      expect(url.pathname).toBe("/api/oauth2/authorize");
      expect(url.searchParams.get("client_id")).toBe(app.id);
      expect(url.searchParams.get("response_type")).toBe("code");
      expect(url.searchParams.get("scope")).toBe("identify email guilds");
    } finally {
      await destroy(scope);
    }
  });

  test("create bot OAuth2 with permissions", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const appId = `${BRANCH_PREFIX}-bot-oauth2-app`;
    const oauth2Id = `${BRANCH_PREFIX}-bot-oauth2`;

    try {
      const app = await Application(appId, {
        name: "Bot OAuth2 Test App",
        botToken: secret(botToken),
      });

      const oauth2 = await OAuth2Application(oauth2Id, {
        application: app,
        redirectUris: ["https://example.com/bot-added"],
        scopes: ["bot", "applications.commands"],
        permissions: "8", // Administrator
      });

      const url = new URL(oauth2.authorizationUrl);
      expect(url.searchParams.get("scope")).toBe("bot applications.commands");
      expect(url.searchParams.get("permissions")).toBe("8");
    } finally {
      await destroy(scope);
    }
  });

  test("supports application ID reference", async (scope) => {
    const applicationId = process.env.DISCORD_TEST_APPLICATION_ID;

    try {
      const oauth2 = await OAuth2Application("oauth2-app-id", {
        application: applicationId!, // String reference
        redirectUris: ["https://example.com/callback"],
        scopes: ["identify"],
      });

      expect(oauth2.applicationId).toBe(applicationId);
    } finally {
      await destroy(scope);
    }
  });

  test("validates redirect URIs", async (scope) => {
    try {
      await expect(
        OAuth2Application("invalid-oauth2", {
          application: "123456789",
          redirectUris: [],
          scopes: ["identify"],
        }),
      ).rejects.toThrow("At least one redirect URI is required");

      await expect(
        OAuth2Application("invalid-oauth2-2", {
          application: "123456789",
          redirectUris: ["not-a-valid-url"],
          scopes: ["identify"],
        }),
      ).rejects.toThrow("Invalid redirect URI: not-a-valid-url");
    } finally {
      await destroy(scope);
    }
  });

  test("validates scopes", async (scope) => {
    try {
      await expect(
        OAuth2Application("invalid-oauth2-3", {
          application: "123456789",
          redirectUris: ["https://example.com/callback"],
          scopes: [],
        }),
      ).rejects.toThrow("At least one scope is required");
    } finally {
      await destroy(scope);
    }
  });

  test("supports multiple redirect URIs", async (scope) => {
    try {
      const oauth2 = await OAuth2Application("multi-redirect", {
        application: "123456789",
        redirectUris: [
          "https://example.com/callback",
          "https://staging.example.com/callback",
          "http://localhost:3000/callback",
        ],
        scopes: ["identify", "email"],
      });

      expect(oauth2.redirectUris).toHaveLength(3);
      expect(oauth2.redirectUris).toContain("https://example.com/callback");
      expect(oauth2.redirectUris).toContain(
        "https://staging.example.com/callback",
      );
      expect(oauth2.redirectUris).toContain("http://localhost:3000/callback");
    } finally {
      await destroy(scope);
    }
  });

  test("creates proper authorization URL without bot scope", async (scope) => {
    try {
      const oauth2 = await OAuth2Application("no-bot-oauth2", {
        application: "123456789",
        redirectUris: ["https://example.com/callback"],
        scopes: ["identify", "guilds.join"],
        permissions: "8", // Should not be included without bot scope
      });

      const url = new URL(oauth2.authorizationUrl);
      expect(url.searchParams.has("permissions")).toBe(false);
      expect(oauth2.permissions).toBe("8"); // Still stored in resource
    } finally {
      await destroy(scope);
    }
  });
});
