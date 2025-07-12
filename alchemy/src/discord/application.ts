import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { type Secret, secret } from "../secret.ts";
import { logger } from "../util/logger.ts";
import { type DiscordApi, createDiscordApi } from "./api.ts";

/**
 * Properties for creating or updating a Discord Application.
 */
export interface ApplicationProps {
  /**
   * Application name (1-32 characters).
   */
  name: string;

  /**
   * Application description (1-400 characters).
   */
  description?: string;

  /**
   * Base64 encoded icon image.
   */
  icon?: string;

  /**
   * Whether the bot can be added by anyone.
   * @default false
   */
  botPublic?: boolean;

  /**
   * Whether bot requires OAuth2 code grant.
   * @default false
   */
  botRequireCodeGrant?: boolean;

  /**
   * URL for receiving interactions via HTTP POST.
   */
  interactionsEndpointUrl?: string;

  /**
   * Discord bot token for authentication.
   * If not provided, will check DISCORD_BOT_TOKEN environment variable.
   * To create a new application, you must manually create it at https://discord.com/developers/applications
   */
  botToken?: Secret;

  /**
   * Whether to delete the application when the resource is destroyed.
   * @default false
   */
  delete?: boolean;
}

/**
 * A Discord Application with bot user.
 */
export interface Application extends Resource<"discord::application"> {
  /**
   * Application ID.
   */
  id: string;

  /**
   * Ed25519 public key for signature verification.
   */
  publicKey: string;

  /**
   * Bot user ID.
   */
  botId: string;

  /**
   * Bot authentication token.
   */
  botToken: Secret;

  /**
   * OAuth2 client ID.
   */
  clientId: string;

  /**
   * OAuth2 client secret.
   */
  clientSecret: Secret;

  /**
   * Bot invite URL with default permissions.
   */
  inviteUrl: string;
}

/**
 * Creates a Discord application with bot user.
 *
 * @example
 * ## Basic Discord Application
 *
 * Create a simple Discord application with bot user:
 *
 * ```ts
 * const app = await Application("my-bot", {
 *   name: "My Discord Bot",
 *   description: "A bot powered by Alchemy"
 * });
 * ```
 *
 * @example
 * ## Application with Interactions Endpoint
 *
 * Create an application configured for HTTP interactions:
 *
 * ```ts
 * const app = await Application("interaction-bot", {
 *   name: "Interaction Bot",
 *   description: "Handles slash commands via HTTP",
 *   botPublic: true,
 *   interactionsEndpointUrl: "https://my-worker.workers.dev/interactions"
 * });
 * ```
 */
export const Application = Resource(
  "discord::application",
  async function (
    this: Context<Application>,
    id: string,
    props: ApplicationProps,
  ): Promise<Application> {
    const {
      name,
      description,
      icon,
      botPublic = false,
      botRequireCodeGrant = false,
      interactionsEndpointUrl,
    } = props;

    // Validate props
    if (name.length < 1 || name.length > 32) {
      throw new Error("Application name must be between 1 and 32 characters");
    }
    if (description && (description.length < 1 || description.length > 400)) {
      throw new Error(
        "Application description must be between 1 and 400 characters",
      );
    }

    // Try to get bot token from props or environment
    let botToken = props.botToken;
    if (!botToken) {
      const envToken = process.env.DISCORD_BOT_TOKEN;
      if (envToken) {
        botToken = secret(envToken, `discord-bot-token-${id}`);
      } else {
        throw new Error(
          "Discord bot token not provided. Either:\n" +
            "1. Set DISCORD_BOT_TOKEN environment variable\n" +
            "2. Pass botToken in props\n" +
            "3. Create a new application at https://discord.com/developers/applications",
        );
      }
    }

    const clientSecret = secret(`discord-client-secret-${id}`);

    // Create API client
    const api = createDiscordApi({ botToken });

    // Handle delete phase
    if (this.phase === "delete") {
      if (props.delete) {
        logger.warn(
          "Discord applications cannot be deleted programmatically. " +
            "Please delete the application manually at https://discord.com/developers/applications",
        );
      } else {
        logger.log("Skipping Discord application deletion (delete=false)");
      }
      return this.destroy();
    }

    // Try to get existing application
    let application: any;
    let isNew = false;

    try {
      application = await getApplication(api);
      logger.log("Found existing Discord application", {
        id: application.id,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        // Token is invalid or application doesn't exist
        isNew = true;
      } else {
        throw error;
      }
    }

    if (isNew) {
      // Create new application
      logger.log("Creating new Discord application", { name });

      // Discord doesn't have a direct API to create applications programmatically
      // This would typically require using Discord's OAuth2 flow or manual creation
      throw new Error(
        "Discord applications must be created manually at https://discord.com/developers/applications. " +
          "Please create the application and provide the bot token.",
      );
    }

    // Update application if needed
    const updatePayload: any = {
      name,
      description: description || "",
      bot_public: botPublic,
      bot_require_code_grant: botRequireCodeGrant,
    };

    if (icon) {
      updatePayload.icon = icon;
    }

    if (interactionsEndpointUrl) {
      updatePayload.interactions_endpoint_url = interactionsEndpointUrl;
    }

    const updatedApp = await updateApplication(
      api,
      application.id,
      updatePayload,
    );

    // Get bot information
    const bot = await getCurrentUser(api);

    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${updatedApp.id}&permissions=0&scope=bot%20applications.commands`;

    return this({
      id: updatedApp.id,
      publicKey: updatedApp.verify_key,
      botId: bot.id,
      botToken,
      clientId: updatedApp.id,
      clientSecret,
      inviteUrl,
    });
  },
);

/**
 * Get application information.
 */
export async function getApplication(api: DiscordApi): Promise<any> {
  return api.get("applications/@me");
}

/**
 * Update application information.
 */
export async function updateApplication(
  api: DiscordApi,
  applicationId: string,
  data: any,
): Promise<any> {
  return api.patch(`applications/${applicationId}`, data);
}

/**
 * Get current bot user information.
 */
export async function getCurrentUser(api: DiscordApi): Promise<any> {
  return api.get("users/@me");
}
