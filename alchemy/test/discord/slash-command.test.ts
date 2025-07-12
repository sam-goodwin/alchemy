import { describe, expect } from "vitest";
import { alchemy } from "../../src/alchemy.ts";
import { destroy } from "../../src/destroy.ts";
import { Application } from "../../src/discord/application.ts";
import {
  CommandOptionType,
  CommandType,
  SlashCommand,
} from "../../src/discord/slash-command.ts";
import { secret } from "../../src/secret.ts";
import { BRANCH_PREFIX } from "../util.ts";

import "../../src/test/vitest.ts";

const test = alchemy.test(import.meta, {
  prefix: BRANCH_PREFIX,
});

describe("Discord SlashCommand", () => {
  test("create and update slash command", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const appId = `${BRANCH_PREFIX}-slash-test-app`;
    const commandId = `${BRANCH_PREFIX}-test-command`;

    let app: Application;
    let command: SlashCommand;

    try {
      // Create application first
      app = await Application(appId, {
        name: "Slash Command Test Bot",
        description: "Test bot for slash commands",
        botToken: secret(botToken),
      });

      // Create slash command
      command = await SlashCommand(commandId, {
        application: app,
        name: "testcommand",
        description: "A test command",
        type: CommandType.CHAT_INPUT,
      });

      expect(command).toMatchObject({
        id: expect.any(String),
        applicationId: app.id,
        version: expect.any(String),
        name: "testcommand",
        type: CommandType.CHAT_INPUT,
      });

      // Update slash command
      const updatedCommand = await SlashCommand(commandId, {
        application: app,
        name: "testcommand",
        description: "An updated test command",
        options: [
          {
            type: CommandOptionType.STRING,
            name: "message",
            description: "A message to echo",
            required: true,
          },
        ],
      });

      expect(updatedCommand.id).toBe(command.id);
      expect(updatedCommand.applicationId).toBe(app.id);
    } finally {
      await destroy(scope);
      // Note: Discord commands are automatically cleaned up when the application is deleted
    }
  });

  test("create guild-specific command", async (scope) => {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const guildId = process.env.DISCORD_TEST_GUILD_ID;

    const appId = `${BRANCH_PREFIX}-guild-test-app`;
    const commandId = `${BRANCH_PREFIX}-guild-command`;

    let app: Application;
    let command: SlashCommand;

    try {
      app = await Application(appId, {
        name: "Guild Command Test Bot",
        botToken: secret(botToken),
      });

      command = await SlashCommand(commandId, {
        application: app,
        name: "guildonly",
        description: "A guild-specific command",
        guildId: guildId,
        defaultMemberPermissions: "8", // Administrator permission
      });

      expect(command.guildId).toBe(guildId);
    } finally {
      await destroy(scope);
    }
  });

  test("validates command name", async () => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const app = await Application("validation-app", {
      name: "Validation Test Bot",
      botToken: secret(botToken),
    });

    await expect(
      SlashCommand("invalid-name", {
        application: app,
        name: "invalid name", // Contains space
        description: "Invalid command",
      }),
    ).rejects.toThrow("Command name must be 1-32 characters");

    await expect(
      SlashCommand("invalid-name-2", {
        application: app,
        name: "a".repeat(33), // Too long
        description: "Invalid command",
      }),
    ).rejects.toThrow("Command name must be 1-32 characters");
  });

  test("validates command description", async () => {
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const app = await Application("desc-validation-app", {
      name: "Description Validation Bot",
      botToken: secret(botToken),
    });

    await expect(
      SlashCommand("invalid-desc", {
        application: app,
        name: "validname",
        description: "", // Too short
      }),
    ).rejects.toThrow(
      "Command description must be between 1 and 100 characters",
    );

    await expect(
      SlashCommand("invalid-desc-2", {
        application: app,
        name: "validname2",
        description: "a".repeat(101), // Too long
      }),
    ).rejects.toThrow(
      "Command description must be between 1 and 100 characters",
    );
  });

  test("supports application ID reference", async () => {
    // Assuming we have an existing application ID
    const applicationId = process.env.DISCORD_TEST_APPLICATION_ID;

    const command = await SlashCommand("app-id-command", {
      application: applicationId!, // String reference
      name: "appidtest",
      description: "Test with application ID",
    });

    expect(command.applicationId).toBe(applicationId);
  });
});
