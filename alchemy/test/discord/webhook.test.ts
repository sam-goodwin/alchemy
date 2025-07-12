import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { createDiscordApi } from "../../src/discord/api.ts";
import { Webhook, deleteWebhook } from "../../src/discord/webhook.ts";
import { secret } from "../../src/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

const botToken = process.env.DISCORD_BOT_TOKEN!;
const channelId = process.env.DISCORD_TEST_CHANNEL_ID!;

describe("Discord Webhook", () => {
  test("create and update webhook", async (scope) => {
    const webhookId = `${BRANCH_PREFIX}-test-webhook`;
    let webhook: Webhook | undefined;

    try {
      // Create webhook
      webhook = await Webhook(webhookId, {
        name: "Alchemy Test Webhook",
        channelId: channelId!,
        botToken: secret(botToken!),
      });

      expect(webhook).toMatchObject({
        id: expect.any(String),
        token: expect.any(String),
        url: expect.stringContaining("https://discord.com/api/webhooks/"),
        channelId,
        guildId: expect.any(String),
        name: "Alchemy Test Webhook",
      });

      // Verify webhook URL format
      expect(webhook.url).toBe(
        `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`,
      );

      // Update webhook
      const updatedWebhook = await Webhook(webhookId, {
        name: "Alchemy Test Webhook Updated",
        channelId: channelId!,
        botToken: secret(botToken!),
      });

      expect(updatedWebhook.id).toBe(webhook.id);
      expect(updatedWebhook.name).toBe("Alchemy Test Webhook Updated");
      expect(updatedWebhook.channelId).toBe(channelId);
    } finally {
      // Clean up webhook
      if (webhook) {
        try {
          const api = createDiscordApi({ botToken: secret(botToken!) });
          await deleteWebhook(api, webhook.id);
          // Verify webhook was deleted
          await assertWebhookDoesNotExist(webhook, botToken);
        } catch (error) {
          console.error("Failed to clean up webhook:", error);
        }
      }

      await destroy(scope);
    }
  });

  test("create webhook with avatar", async (scope) => {
    const webhookId = `${BRANCH_PREFIX}-avatar-webhook`;
    let webhook: Webhook | undefined;

    try {
      // Create a simple 1x1 red pixel PNG as base64
      const redPixelPng =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

      webhook = await Webhook(webhookId, {
        name: "Avatar Test Webhook",
        channelId: channelId!,
        avatar: `data:image/png;base64,${redPixelPng}`,
        botToken: secret(botToken!),
        reason: "Testing webhook with avatar",
      });

      expect(webhook.name).toBe("Avatar Test Webhook");
    } finally {
      // Clean up webhook
      if (webhook) {
        try {
          const api = createDiscordApi({ botToken: secret(botToken!) });
          await deleteWebhook(api, webhook.id);
          // Verify webhook was deleted
          await assertWebhookDoesNotExist(webhook, botToken);
        } catch (error) {
          console.error("Failed to clean up webhook:", error);
        }
      }

      await destroy(scope);
    }
  });

  test("validates webhook name length", async () => {
    await expect(
      Webhook("invalid-name", {
        name: "", // Too short
        channelId: channelId!,
        botToken: secret(botToken!),
      }),
    ).rejects.toThrow("Webhook name must be between 1 and 80 characters");

    await expect(
      Webhook("invalid-name-2", {
        name: "a".repeat(81), // Too long
        channelId: channelId!,
        botToken: secret(botToken!),
      }),
    ).rejects.toThrow("Webhook name must be between 1 and 80 characters");
  });

  test("webhook can send messages", async (scope) => {
    const webhookId = `${BRANCH_PREFIX}-send-webhook`;
    let webhook: Webhook | undefined;

    try {
      webhook = await Webhook(webhookId, {
        name: "Message Test Webhook",
        channelId: channelId!,
        botToken: secret(botToken!),
      });

      // Test sending a message through the webhook
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "Test message from Alchemy webhook test suite",
        }),
      });

      expect(response.ok).toBe(true);
    } finally {
      // Clean up webhook
      if (webhook) {
        try {
          const api = createDiscordApi({ botToken: secret(botToken!) });
          await deleteWebhook(api, webhook.id);
          // Verify webhook was deleted
          await assertWebhookDoesNotExist(webhook, botToken);
        } catch (error) {
          console.error("Failed to clean up webhook:", error);
        }
      }

      await destroy(scope);
    }
  });
});

async function assertWebhookDoesNotExist(webhook: Webhook, botToken: string) {
  const api = createDiscordApi({ botToken: secret(botToken) });

  try {
    await api.get(`webhooks/${webhook.id}`);
    throw new Error("Expected webhook to be deleted, but it still exists");
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      // Expected - webhook was deleted
      return;
    }
    throw error;
  }
}
