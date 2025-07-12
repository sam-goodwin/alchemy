---
title: Application
description: Manage Discord applications with bot users for building interactive bots.
---

# Application

Manages an existing Discord application with bot user. This resource provides a convenient way to reference application properties and update configurations.

:::tip[Why use this resource?]
While Discord applications must be created manually, this resource provides important benefits:
- **Centralized configuration**: Update application settings like name, description, and interactions endpoint
- **Property references**: Access important values like `publicKey`, `inviteUrl`, and `clientId` 
- **Type-safe bindings**: Pass the application to other resources like `SlashCommand`
- **Automated invite URLs**: Generates bot invite links with proper permissions
:::

:::note[Manual Creation Required]
Discord doesn't provide a public API to create applications programmatically. You must first:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and create your app
3. Navigate to the "Bot" section
4. Click "Reset Token" to generate a bot token
5. Use the token with this resource to manage the application

See Discord's [Getting Started guide](https://discord.com/developers/docs/getting-started) for detailed instructions.
:::

## Usage

```ts
import alchemy, { secret } from "alchemy";
import { Application } from "alchemy/discord";

const discord = await Application("my-bot", {
  name: "My Discord Bot",
  description: "A bot powered by Alchemy",
  botToken: secret(process.env.DISCORD_TOKEN!),
});

console.log(`Bot invite URL: ${discord.inviteUrl}`);
```

## Properties

### Input

- `name` (string, required) - Application name (1-32 characters)
- `description` (string) - Application description (1-400 characters)
- `icon` (string) - Base64 encoded icon image
- `botPublic` (boolean) - Whether the bot can be added by anyone (default: false)
- `botRequireCodeGrant` (boolean) - Whether bot requires OAuth2 code grant (default: false)
- `interactionsEndpointUrl` (string) - URL for receiving interactions via HTTP POST
- `botToken` (Secret) - Discord bot token for authentication
- `delete` (boolean) - Whether to delete the resource when destroyed (default: false)

### Output

- `id` (string) - Application ID
- `publicKey` (string) - Ed25519 public key for signature verification
- `botId` (string) - Bot user ID
- `botToken` (Secret) - Bot authentication token
- `clientId` (string) - OAuth2 client ID
- `clientSecret` (Secret) - OAuth2 client secret
- `inviteUrl` (string) - Bot invite URL with default permissions

## Examples

### Basic Bot Application

```ts
import alchemy, { secret } from "alchemy";
import { Application } from "alchemy/discord";

const bot = await Application("simple-bot", {
  name: "Simple Bot",
  description: "A simple Discord bot",
  botToken: secret(process.env.DISCORD_TOKEN!),
});
```

### Bot with Interactions Endpoint

```ts
import { Worker } from "alchemy/cloudflare";

const worker = await Worker("bot-handler", {
  entrypoint: "./bot.ts",
});

const bot = await Application("interaction-bot", {
  name: "Interaction Bot",
  description: "Handles slash commands via HTTP",
  botPublic: true,
  botToken: secret(process.env.DISCORD_TOKEN!),
  interactionsEndpointUrl: worker.url,
});
```

### Bot with Custom Icon

```ts
import { readFileSync } from "fs";
import alchemy, { secret } from "alchemy";
import { Application } from "alchemy/discord";

const icon = readFileSync("./icon.png", "base64");

const bot = await Application("branded-bot", {
  name: "Branded Bot",
  description: "A bot with custom branding",
  icon: `data:image/png;base64,${icon}`,
  botToken: secret(process.env.DISCORD_TOKEN!),
});
```

### Auto-Delete on Destroy

```ts
import alchemy, { secret } from "alchemy";
import { Application } from "alchemy/discord";

// This bot will be deleted when destroyed
const tempBot = await Application("temp-bot", {
  name: "Temporary Bot",
  description: "A bot for testing",
  botToken: secret(process.env.DISCORD_TOKEN!),
  delete: true, // Delete the application when destroyed
});
```

## Notes

- The bot token is required and can be obtained from the Bot section of your application
- The `inviteUrl` output includes basic bot permissions and application.commands scope
- Interaction endpoints must verify Discord's Ed25519 signatures for security
- Updates to application properties are applied immediately via Discord's API

:::info[API Limitations]
The Discord API allows updating these application properties:
- `name` - Application name
- `description` - Application description  
- `icon` - Application icon
- `interactionsEndpointUrl` - Webhook URL for receiving interactions
- `botPublic` - Whether the bot can be added by anyone
- `botRequireCodeGrant` - OAuth2 code grant requirement

Other properties like `publicKey` and `id` are read-only and set by Discord.
:::