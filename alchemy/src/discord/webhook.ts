import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import type { Secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { type DiscordApi, createDiscordApi } from "./api.ts";

/**
 * Get webhooks for a channel.
 */
export async function getChannelWebhooks(
  api: DiscordApi,
  channelId: string,
): Promise<any[]> {
  return api.get(`channels/${channelId}/webhooks`);
}

/**
 * Create a webhook for a channel.
 */
export async function createWebhook(
  api: DiscordApi,
  channelId: string,
  data: any,
  reason?: string,
): Promise<any> {
  const headers: HeadersInit = {};
  if (reason) {
    headers["X-Audit-Log-Reason"] = reason;
  }
  return api.post(`channels/${channelId}/webhooks`, data, headers);
}

/**
 * Get a webhook by ID.
 */
export async function getWebhook(
  api: DiscordApi,
  webhookId: string,
): Promise<any> {
  return api.get(`webhooks/${webhookId}`);
}

/**
 * Update a webhook.
 */
export async function updateWebhook(
  api: DiscordApi,
  webhookId: string,
  data: any,
  reason?: string,
): Promise<any> {
  const headers: HeadersInit = {};
  if (reason) {
    headers["X-Audit-Log-Reason"] = reason;
  }
  return api.patch(`webhooks/${webhookId}`, data, headers);
}

/**
 * Delete a webhook.
 */
export async function deleteWebhook(
  api: DiscordApi,
  webhookId: string,
  reason?: string,
): Promise<any> {
  const headers: HeadersInit = {};
  if (reason) {
    headers["X-Audit-Log-Reason"] = reason;
  }
  return api.delete(`webhooks/${webhookId}`, headers);
}

/**
 * Execute a webhook (send a message).
 */
export async function executeWebhook(
  webhookId: string,
  webhookToken: string,
  data: any,
  baseUrl = "https://discord.com/api",
  apiVersion = "v10",
): Promise<any> {
  // Webhook execution doesn't require bot token
  const response = await fetch(
    `${baseUrl}/${apiVersion}/webhooks/${webhookId}/${webhookToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = (await response.json()) as any;
    throw new Error(`Discord API Error: ${error.message} (${error.code})`);
  }

  return response.status === 204 ? null : response.json();
}

/**
 * Properties for creating or updating a Discord Webhook.
 */
export interface WebhookProps {
  /**
   * Webhook name (1-80 characters).
   */
  name: string;

  /**
   * Target text channel ID.
   */
  channelId: string;

  /**
   * Base64 encoded avatar image.
   */
  avatar?: string;

  /**
   * Audit log reason.
   */
  reason?: string;

  /**
   * Bot token for authentication.
   * Required to create webhooks via API.
   * If not provided, will use DISCORD_BOT_TOKEN environment variable.
   */
  botToken?: Secret;

  /**
   * Whether to delete the webhook when the resource is destroyed.
   * @default false
   */
  delete?: boolean;

  /**
   * Whether to adopt an existing webhook instead of creating a new one.
   * @default false
   */
  adopt?: boolean;
}

/**
 * A Discord Webhook for sending messages to channels.
 */
export interface Webhook extends Resource<"discord::webhook"> {
  /**
   * Webhook ID.
   */
  id: string;

  /**
   * Webhook token (for tokenized requests).
   */
  token: string;

  /**
   * Complete webhook URL.
   */
  url: string;

  /**
   * Channel ID.
   */
  channelId: string;

  /**
   * Guild ID.
   */
  guildId: string;

  /**
   * Webhook name.
   */
  name: string;
}

/**
 * Creates a Discord webhook for sending messages to channels.
 *
 * @example
 * ## Basic Webhook
 *
 * Create a webhook for notifications:
 *
 * ```ts
 * const webhook = await Webhook("notifications", {
 *   name: "My Notifications",
 *   channelId: "1234567890123456789",
 *   botToken: process.env.DISCORD_BOT_TOKEN!
 * });
 *
 * // Use the webhook URL to send messages
 * await fetch(webhook.url, {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({
 *     content: "Hello from Alchemy!"
 *   })
 * });
 * ```
 *
 * @example
 * ## Webhook with Avatar
 *
 * Create a webhook with custom avatar:
 *
 * ```ts
 * const webhook = await Webhook("custom-webhook", {
 *   name: "Custom Bot",
 *   channelId: "1234567890123456789",
 *   avatar: await readFile("./avatar.png", "base64"),
 *   botToken: process.env.DISCORD_BOT_TOKEN!,
 *   reason: "Created for automated notifications"
 * });
 * ```
 *
 * @example
 * ## Adopt Existing Webhook
 *
 * Adopt an existing webhook by name:
 *
 * ```ts
 * const webhook = await Webhook("existing-webhook", {
 *   name: "My Existing Webhook",
 *   channelId: "1234567890123456789",
 *   botToken: process.env.DISCORD_BOT_TOKEN!,
 *   adopt: true
 * });
 * ```
 *
 * @example
 * ## Auto-Delete Webhook
 *
 * Create a webhook that will be deleted when destroyed:
 *
 * ```ts
 * const webhook = await Webhook("temp-webhook", {
 *   name: "Temporary Webhook",
 *   channelId: "1234567890123456789",
 *   botToken: process.env.DISCORD_BOT_TOKEN!,
 *   delete: true
 * });
 * ```
 */
export const Webhook = Resource(
  "discord::webhook",
  async function (
    this: Context<Webhook>,
    _id: string,
    props: WebhookProps,
  ): Promise<Webhook> {
    const {
      name,
      channelId,
      avatar,
      reason,
      delete: deleteOnDestroy = false,
      adopt = false,
    } = props;

    // Create API client
    const api = createDiscordApi({ botToken: props.botToken });

    // Handle deletion
    if (this.phase === "delete") {
      if (deleteOnDestroy && this.output) {
        logger.log("Deleting Discord webhook", { name, channelId });
        await deleteWebhook(api, this.output.id, reason);
      } else {
        logger.log("Retaining Discord webhook (delete=false)");
      }
      return this.destroy();
    }

    // Validate props
    if (name.length < 1 || name.length > 80) {
      throw new Error("Webhook name must be between 1 and 80 characters");
    }

    // Get existing webhooks for the channel
    const webhooks = await getChannelWebhooks(api, channelId);
    const existingWebhook = webhooks.find((wh) => wh.name === name);

    let webhook: any;

    if (adopt) {
      // Adopt existing webhook
      if (!existingWebhook) {
        throw new Error(
          `Cannot adopt: webhook '${name}' not found in channel ${channelId}`,
        );
      }
      logger.log("Adopting existing Discord webhook", { name, channelId });
      webhook = existingWebhook;

      // Update the adopted webhook with new properties
      logger.log("Updating adopted Discord webhook", { name, channelId });

      const updatePayload: any = { name };
      if (avatar) {
        updatePayload.avatar = avatar;
      }

      webhook = await updateWebhook(
        api,
        existingWebhook.id,
        updatePayload,
        reason,
      );
    } else if (existingWebhook) {
      // Update existing webhook
      logger.log("Updating existing Discord webhook", { name, channelId });

      const updatePayload: any = { name };
      if (avatar) {
        updatePayload.avatar = avatar;
      }

      webhook = await updateWebhook(
        api,
        existingWebhook.id,
        updatePayload,
        reason,
      );
    } else {
      // Create new webhook
      logger.log("Creating new Discord webhook", { name, channelId });

      const createPayload: any = { name };
      if (avatar) {
        createPayload.avatar = avatar;
      }

      webhook = await createWebhook(api, channelId, createPayload, reason);
    }

    return this({
      id: webhook.id,
      token: webhook.token,
      url: `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`,
      channelId: webhook.channel_id,
      guildId: webhook.guild_id,
      name: webhook.name,
    });
  },
);
