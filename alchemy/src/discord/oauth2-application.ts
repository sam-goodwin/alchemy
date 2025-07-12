import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import type { Application } from "./application.ts";

/**
 * Properties for configuring OAuth2 settings for a Discord application.
 */
export interface OAuth2ApplicationProps {
  /**
   * Discord application reference.
   */
  application: string | Application;

  /**
   * OAuth2 redirect URIs.
   */
  redirectUris: string[];

  /**
   * Required OAuth2 scopes.
   * Common scopes: identify, email, guilds, bot, applications.commands
   */
  scopes: string[];

  /**
   * Bot permission integer.
   * Use permission calculator: https://discord.com/developers/docs/topics/permissions
   */
  permissions?: string;

  /**
   * Whether to delete the OAuth2 configuration when the resource is destroyed.
   * @default false
   */
  delete?: boolean;

  /**
   * Whether to adopt existing OAuth2 settings instead of creating new ones.
   * @default false
   */
  adopt?: boolean;
}

/**
 * OAuth2 configuration for a Discord application.
 */
export interface OAuth2Application
  extends Resource<"discord::oauth2-application"> {
  /**
   * OAuth2 authorization URL.
   */
  authorizationUrl: string;

  /**
   * Configured scopes.
   */
  scopes: string[];

  /**
   * Permission integer.
   */
  permissions: string;

  /**
   * Application ID.
   */
  applicationId: string;

  /**
   * Configured redirect URIs.
   */
  redirectUris: string[];
}

/**
 * Manages OAuth2 settings for Discord applications.
 *
 * @example
 * ## Basic OAuth2 Setup
 *
 * Configure OAuth2 for user authentication:
 *
 * ```ts
 * const oauth2 = await OAuth2Application("my-oauth2", {
 *   application: app,
 *   redirectUris: ["https://myapp.com/auth/discord/callback"],
 *   scopes: ["identify", "email", "guilds"]
 * });
 *
 * // Use the authorization URL for OAuth2 flow
 * console.log("Authorize at:", oauth2.authorizationUrl);
 * ```
 *
 * @example
 * ## Bot with Commands Scope
 *
 * Configure OAuth2 for bot installation with slash commands:
 *
 * ```ts
 * const oauth2 = await OAuth2Application("bot-oauth2", {
 *   application: app,
 *   redirectUris: ["https://myapp.com/bot/installed"],
 *   scopes: ["bot", "applications.commands"],
 *   permissions: "8" // Administrator permission
 * });
 * ```
 *
 * @example
 * ## Multiple Redirect URIs
 *
 * Configure multiple redirect URIs for different environments:
 *
 * ```ts
 * const oauth2 = await OAuth2Application("multi-oauth2", {
 *   application: app,
 *   redirectUris: [
 *     "https://myapp.com/auth/discord/callback",
 *     "https://staging.myapp.com/auth/discord/callback",
 *     "http://localhost:3000/auth/discord/callback"
 *   ],
 *   scopes: ["identify", "guilds.join"]
 * });
 * ```
 *
 * @example
 * ## Adopt Existing OAuth2 Configuration
 *
 * Adopt existing OAuth2 settings without updating them:
 *
 * ```ts
 * const oauth2 = await OAuth2Application("existing-oauth2", {
 *   application: app,
 *   redirectUris: ["https://myapp.com/auth/discord/callback"],
 *   scopes: ["identify", "email"],
 *   adopt: true
 * });
 * ```
 *
 * @example
 * ## Auto-Delete OAuth2 Configuration
 *
 * Create OAuth2 configuration that warns about deletion when destroyed:
 *
 * ```ts
 * const oauth2 = await OAuth2Application("temp-oauth2", {
 *   application: app,
 *   redirectUris: ["https://myapp.com/auth/discord/callback"],
 *   scopes: ["identify"],
 *   delete: true
 * });
 * ```
 */
export const OAuth2Application = Resource(
  "discord::oauth2-application",
  async function (
    this: Context<OAuth2Application>,
    _id: string,
    props: OAuth2ApplicationProps,
  ): Promise<OAuth2Application> {
    const {
      application,
      redirectUris,
      scopes,
      permissions = "0",
      delete: deleteOnDestroy = false,
      adopt = false,
    } = props;

    // Handle delete phase
    if (this.phase === "delete") {
      if (deleteOnDestroy) {
        logger.warn(
          "Discord OAuth2 settings cannot be deleted programmatically. " +
            "Please clear redirect URIs manually at https://discord.com/developers/applications",
        );
      } else {
        logger.log("Skipping OAuth2 configuration deletion (delete=false)");
      }
      return this.destroy();
    }

    // Validate props
    if (redirectUris.length === 0) {
      throw new Error("At least one redirect URI is required");
    }

    if (scopes.length === 0) {
      throw new Error("At least one scope is required");
    }

    // Validate redirect URIs
    for (const uri of redirectUris) {
      try {
        new URL(uri);
      } catch {
        throw new Error(`Invalid redirect URI: ${uri}`);
      }
    }

    // Get application ID
    const appId =
      typeof application === "string" ? application : application.id;

    // Build authorization URL
    const params = new URLSearchParams({
      client_id: appId,
      response_type: "code",
      scope: scopes.join(" "),
    });

    if (scopes.includes("bot")) {
      params.set("permissions", permissions);
    }

    // Discord's OAuth2 doesn't have a specific API endpoint to manage redirect URIs
    // They are configured in the Discord Developer Portal
    // This resource primarily generates the authorization URL

    const authorizationUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

    if (adopt) {
      logger.log("Adopting existing OAuth2 configuration", {
        applicationId: appId,
        redirectUris,
      });
      logger.warn(
        "Note: Redirect URIs must be manually configured in Discord Developer Portal. " +
          "Ensure the following URIs are added to your application:",
      );
      redirectUris.forEach((uri) => logger.log(`  - ${uri}`));
    } else {
      logger.log("Configuring OAuth2 settings", {
        applicationId: appId,
        redirectUris,
      });
      logger.warn(
        "Discord OAuth2 redirect URIs must be manually configured. " +
          "Please add the following URIs to your application at https://discord.com/developers/applications:",
      );
      redirectUris.forEach((uri) => logger.log(`  - ${uri}`));
    }

    return this({
      authorizationUrl,
      scopes,
      permissions,
      applicationId: appId,
      redirectUris,
    });
  },
);
