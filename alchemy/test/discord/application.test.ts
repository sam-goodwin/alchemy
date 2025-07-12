import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Application } from "../../src/discord/application.ts";
import { secret } from "../../src/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Discord Application", () => {
  test("create and update application", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const appId = `${BRANCH_PREFIX}-test-app`;
    let app: Application;

    try {
      // Create application
      app = await Application(appId, {
        name: "Alchemy Test Bot",
        description: "Test bot for Alchemy Discord provider",
        botPublic: false,
        botToken: secret(botToken),
      });

      expect(app).toMatchObject({
        $type: "discord::application",
        id: expect.any(String),
        publicKey: expect.any(String),
        botId: expect.any(String),
        clientId: expect.any(String),
        inviteUrl: expect.stringContaining(
          "https://discord.com/api/oauth2/authorize",
        ),
      });

      // Update application
      const updatedApp = await Application(appId, {
        name: "Alchemy Test Bot Updated",
        description: "Updated test bot description",
        botPublic: true,
        interactionsEndpointUrl: "https://example.com/interactions",
        botToken: secret(botToken),
      });

      expect(updatedApp.id).toBe(app.id);
      expect(updatedApp.publicKey).toBe(app.publicKey);
    } finally {
      await destroy(scope);
      // Note: Discord applications cannot be deleted via API
      // They must be manually deleted from the Discord Developer Portal
    }
  });

  test("validates application name length", async () => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    await expect(
      Application("invalid-name", {
        name: "", // Too short
        botToken: secret(botToken),
      }),
    ).rejects.toThrow("Application name must be between 1 and 32 characters");

    await expect(
      Application("invalid-name-2", {
        name: "a".repeat(33), // Too long
        botToken: secret(botToken),
      }),
    ).rejects.toThrow("Application name must be between 1 and 32 characters");
  });

  test("validates application description length", async () => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    await expect(
      Application("invalid-desc", {
        name: "Valid Name",
        description: "a".repeat(401), // Too long
        botToken: secret(botToken),
      }),
    ).rejects.toThrow(
      "Application description must be between 1 and 400 characters",
    );
  });

  test("requires manual creation for new applications", async () => {
    await expect(
      Application("new-app", {
        name: "New Application",
        description: "This should fail",
      }),
    ).rejects.toThrow("Discord applications must be created manually");
  });

  test("respects delete property during destruction", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const appId = `${BRANCH_PREFIX}-test-delete-prop`;

    // Create application with delete=false (default)
    const app = await Application(appId, {
      name: "Test Delete Property",
      description: "Test bot for delete property",
      botToken: secret(botToken),
      delete: false, // Should skip deletion
    });

    expect(app).toMatchObject({
      $type: "discord::application",
      id: expect.any(String),
    });

    // Destroy should not attempt to delete the application
    await destroy(scope);
    // The application should still exist (cannot verify via API as Discord doesn't support deletion)
  });
});
