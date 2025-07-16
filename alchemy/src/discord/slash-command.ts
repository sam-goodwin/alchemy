import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { type DiscordApi, createDiscordApi } from "./api.ts";
import type { Application } from "./application.ts";

/**
 * Discord command types.
 */
export enum CommandType {
  /** Slash command */
  CHAT_INPUT = 1,
  /** User context menu command */
  USER = 2,
  /** Message context menu command */
  MESSAGE = 3,
}

/**
 * Discord command option types.
 */
export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

/**
 * Discord channel types.
 */
export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
}

/**
 * Command choice for STRING, INTEGER, or NUMBER option types.
 */
export interface CommandChoice {
  name: string;
  value: string | number;
}

/**
 * Command option definition.
 */
export interface CommandOption {
  type: CommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: CommandChoice[];
  options?: CommandOption[];
  channelTypes?: ChannelType[];
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  autocomplete?: boolean;
}

/**
 * Properties for creating or updating a Discord slash command.
 */
export interface SlashCommandProps {
  /**
   * Discord application reference.
   */
  application: string | Application;

  /**
   * Command name (1-32 characters, lowercase, no spaces).
   */
  name: string;

  /**
   * Command description (1-100 characters).
   */
  description: string;

  /**
   * Type of command.
   * @default CommandType.CHAT_INPUT
   */
  type?: CommandType;

  /**
   * Command parameters.
   */
  options?: CommandOption[];

  /**
   * Bitfield of required permissions.
   */
  defaultMemberPermissions?: string;

  /**
   * Available in DMs.
   * @default true
   */
  dmPermission?: boolean;

  /**
   * Age-restricted command.
   * @default false
   */
  nsfw?: boolean;

  /**
   * Guild ID for guild-specific command (otherwise global).
   */
  guildId?: string;

  /**
   * Whether to delete the command when the resource is destroyed.
   * @default false
   */
  delete?: boolean;

  /**
   * Whether to adopt an existing command instead of creating a new one.
   * @default false
   */
  adopt?: boolean;
}

/**
 * A Discord slash command.
 */
export interface SlashCommand extends Resource<"discord::slash-command"> {
  /**
   * Command ID.
   */
  id: string;

  /**
   * Application ID.
   */
  applicationId: string;

  /**
   * Autoincrementing version identifier.
   */
  version: string;

  /**
   * Guild ID if guild-specific.
   */
  guildId?: string;

  /**
   * Command name.
   */
  name: string;

  /**
   * Command type.
   */
  type: CommandType;
}

/**
 * Creates a Discord slash command.
 *
 * @example
 * ## Basic Slash Command
 *
 * Create a simple ping command:
 *
 * ```ts
 * const command = await SlashCommand("ping", {
 *   application: app,
 *   name: "ping",
 *   description: "Replies with pong!"
 * });
 * ```
 *
 * @example
 * ## Command with Options
 *
 * Create a command with parameters:
 *
 * ```ts
 * const command = await SlashCommand("greet", {
 *   application: app,
 *   name: "greet",
 *   description: "Greet someone",
 *   options: [{
 *     type: CommandOptionType.STRING,
 *     name: "name",
 *     description: "Name to greet",
 *     required: true
 *   }]
 * });
 * ```
 *
 * @example
 * ## Guild-Specific Command
 *
 * Create a command for a specific Discord server:
 *
 * ```ts
 * const command = await SlashCommand("admin", {
 *   application: app,
 *   name: "admin",
 *   description: "Admin command",
 *   guildId: "123456789012345678",
 *   defaultMemberPermissions: "8" // Administrator permission
 * });
 * ```
 */
export const SlashCommand = Resource(
  "discord::slash-command",
  async function (
    this: Context<SlashCommand>,
    _id: string,
    props: SlashCommandProps,
  ): Promise<SlashCommand> {
    const {
      application,
      name,
      description,
      type = CommandType.CHAT_INPUT,
      options,
      defaultMemberPermissions,
      dmPermission = true,
      nsfw = false,
      guildId,
      delete: deleteOnDestroy = false,
      adopt = false,
    } = props;

    // Get application details
    const app =
      typeof application === "string"
        ? {
            id: application,
            botToken: undefined, // Will use environment variable
          }
        : application;

    // Create API client
    const api = createDiscordApi({ botToken: app.botToken });

    // Handle deletion
    if (this.phase === "delete") {
      if (deleteOnDestroy && this.output) {
        logger.log("Deleting Discord slash command", { name, guildId });
        await deleteCommand(api, app.id, this.output.id, guildId);
      } else {
        logger.log("Retaining Discord slash command (delete=false)");
      }
      return this.destroy();
    }

    // Validate props
    if (!name.match(/^[\w-]{1,32}$/)) {
      throw new Error(
        "Command name must be 1-32 characters, lowercase, alphanumeric with dashes/underscores only",
      );
    }
    if (description.length < 1 || description.length > 100) {
      throw new Error(
        "Command description must be between 1 and 100 characters",
      );
    }

    // Prepare command payload
    const commandPayload: any = {
      name,
      description,
      type,
      dm_permission: dmPermission,
      nsfw,
    };

    if (options) {
      commandPayload.options = options;
    }

    if (defaultMemberPermissions) {
      commandPayload.default_member_permissions = defaultMemberPermissions;
    }

    // Get existing commands
    const existingCommands = await getCommands(api, app.id, guildId);
    const existingCommand = existingCommands.find((cmd) => cmd.name === name);

    let command: any;

    if (adopt) {
      // Adopt existing command
      if (!existingCommand) {
        throw new Error(`Cannot adopt: command '${name}' not found`);
      }
      logger.log("Adopting existing Discord command", { name, guildId });
      command = existingCommand;

      // Update the adopted command with new properties
      logger.log("Updating adopted Discord command", { name, guildId });
      command = await updateCommand(
        api,
        app.id,
        existingCommand.id,
        commandPayload,
        guildId,
      );
    } else if (existingCommand) {
      // Update existing command
      logger.log("Updating existing Discord command", { name, guildId });
      command = await updateCommand(
        api,
        app.id,
        existingCommand.id,
        commandPayload,
        guildId,
      );
    } else {
      // Create new command
      logger.log("Creating new Discord command", { name, guildId });
      command = await createCommand(api, app.id, commandPayload, guildId);
    }

    return this({
      id: command.id,
      applicationId: command.application_id,
      version: command.version,
      guildId: command.guild_id,
      name: command.name,
      type: command.type,
    });
  },
);

/**
 * Get commands for an application.
 */
export async function getCommands(
  api: DiscordApi,
  applicationId: string,
  guildId?: string,
): Promise<any[]> {
  const path = guildId
    ? `applications/${applicationId}/guilds/${guildId}/commands`
    : `applications/${applicationId}/commands`;
  return api.get(path);
}

/**
 * Create a command for an application.
 */
export async function createCommand(
  api: DiscordApi,
  applicationId: string,
  data: any,
  guildId?: string,
): Promise<any> {
  const path = guildId
    ? `applications/${applicationId}/guilds/${guildId}/commands`
    : `applications/${applicationId}/commands`;
  return api.post(path, data);
}

/**
 * Update a command for an application.
 */
export async function updateCommand(
  api: DiscordApi,
  applicationId: string,
  commandId: string,
  data: any,
  guildId?: string,
): Promise<any> {
  const path = guildId
    ? `applications/${applicationId}/guilds/${guildId}/commands/${commandId}`
    : `applications/${applicationId}/commands/${commandId}`;
  return api.patch(path, data);
}

/**
 * Delete a command for an application.
 */
export async function deleteCommand(
  api: DiscordApi,
  applicationId: string,
  commandId: string,
  guildId?: string,
): Promise<any> {
  const path = guildId
    ? `applications/${applicationId}/guilds/${guildId}/commands/${commandId}`
    : `applications/${applicationId}/commands/${commandId}`;
  return api.delete(path);
}
