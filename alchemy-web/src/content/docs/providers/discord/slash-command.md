---
title: SlashCommand
description: Create and manage Discord slash commands, user commands, and message commands.
---

# SlashCommand

Creates and manages Discord application commands including slash commands, user commands, and message commands.

## Usage

```ts
import alchemy, { secret } from "alchemy";
import { Application, SlashCommand, CommandOptionType } from "alchemy/discord";

const app = await Application("my-bot", {
  name: "My Bot",
  botToken: secret(process.env.DISCORD_TOKEN!),
});

const pingCommand = await SlashCommand("ping", {
  application: app,
  name: "ping",
  description: "Replies with pong!",
});
```

## Properties

### Input

- `application` (string | Application, required) - Discord application reference
- `name` (string, required) - Command name (1-32 characters, lowercase, no spaces)
- `description` (string, required) - Command description (1-100 characters)
- `type` (CommandType) - Type of command (CHAT_INPUT, USER, MESSAGE), defaults to CHAT_INPUT
- `options` (CommandOption[]) - Command parameters
- `defaultMemberPermissions` (string) - Bitfield of required permissions
- `dmPermission` (boolean) - Available in DMs (default: true)
- `nsfw` (boolean) - Age-restricted command
- `guildId` (string) - Guild ID for guild-specific command (otherwise global)
- `delete` (boolean) - Whether to delete the resource when destroyed (default: false)
- `adopt` (boolean) - Whether to adopt an existing resource instead of creating new (default: false)

### Output

- `id` (string) - Command ID
- `applicationId` (string) - Application ID
- `version` (string) - Autoincrementing version identifier
- `guildId` (string) - Guild ID if guild-specific

## Examples

### Simple Command

```ts
import { Application, SlashCommand } from "alchemy/discord";

const helloCommand = await SlashCommand("hello", {
  application: app,
  name: "hello",
  description: "Say hello!",
});
```

### Command with Options

```ts
import { Application, SlashCommand, CommandOptionType } from "alchemy/discord";

const greetCommand = await SlashCommand("greet", {
  application: app,
  name: "greet",
  description: "Greet someone",
  options: [
    {
      type: CommandOptionType.STRING,
      name: "name",
      description: "Name to greet",
      required: true,
    },
    {
      type: CommandOptionType.BOOLEAN,
      name: "loud",
      description: "Shout the greeting",
      required: false,
    },
  ],
});
```

### User Context Command

```ts
import { Application, SlashCommand, CommandType } from "alchemy/discord";

const infoCommand = await SlashCommand("user-info", {
  application: app,
  name: "User Info",
  type: CommandType.USER,
  description: "", // Not shown for context menu commands
});
```

### Guild-Specific Command

```ts
import { Application, SlashCommand } from "alchemy/discord";

const adminCommand = await SlashCommand("admin", {
  application: app,
  name: "admin",
  description: "Admin only command",
  guildId: "123456789012345678",
  defaultMemberPermissions: "8", // ADMINISTRATOR
});
```

### Command with Choices

```ts
import { Application, SlashCommand, CommandOptionType } from "alchemy/discord";

const colorCommand = await SlashCommand("color", {
  application: app,
  name: "color",
  description: "Pick a color",
  options: [
    {
      type: CommandOptionType.STRING,
      name: "choice",
      description: "Your favorite color",
      required: true,
      choices: [
        { name: "Red", value: "red" },
        { name: "Green", value: "green" },
        { name: "Blue", value: "blue" },
      ],
    },
  ],
});
```

### Adopt Existing Command

```ts
import { Application, SlashCommand } from "alchemy/discord";

// Adopt an existing command instead of creating a new one
const existingCommand = await SlashCommand("existing-ping", {
  application: app,
  name: "ping",
  description: "Ping command",
  adopt: true, // Will adopt existing 'ping' command if it exists
});
```

### Auto-Delete Command

```ts
import { Application, SlashCommand } from "alchemy/discord";

// Command will be deleted when destroyed
const tempCommand = await SlashCommand("temp-cmd", {
  application: app,
  name: "temporary",
  description: "Temporary command for testing",
  delete: true, // Delete command when destroyed
  guildId: "123456789012345678", // Guild-specific for instant updates
});
```

## Command Types

- `CommandType.CHAT_INPUT` (1) - Slash commands
- `CommandType.USER` (2) - User context menu commands
- `CommandType.MESSAGE` (3) - Message context menu commands

## Option Types

- `CommandOptionType.SUB_COMMAND` (1)
- `CommandOptionType.SUB_COMMAND_GROUP` (2)
- `CommandOptionType.STRING` (3)
- `CommandOptionType.INTEGER` (4)
- `CommandOptionType.BOOLEAN` (5)
- `CommandOptionType.USER` (6)
- `CommandOptionType.CHANNEL` (7)
- `CommandOptionType.ROLE` (8)
- `CommandOptionType.MENTIONABLE` (9)
- `CommandOptionType.NUMBER` (10)
- `CommandOptionType.ATTACHMENT` (11)

## Notes

- Global commands may take up to 1 hour to propagate
- Guild-specific commands update instantly
- Command names must be unique within their scope
- Context menu commands (USER, MESSAGE) don't show descriptions