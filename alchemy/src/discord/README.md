# Discord Provider Design

## Overview

The Discord provider enables Infrastructure-as-Code provisioning of Discord bots, applications, and webhook integrations. This provider focuses on creating Discord applications with bot users that can receive interactions via HTTP endpoints, particularly optimized for Cloudflare Workers deployment.

## Architecture

Discord offers two primary methods for bot interactions:
1. **Gateway Connection**: Traditional WebSocket-based bot connection
2. **HTTP Interactions**: Webhook endpoint approach for receiving interactions

This provider focuses on the HTTP Interactions approach, which is ideal for serverless environments like Cloudflare Workers.

## Resources

### 1. Application

Manages a Discord application with bot user.

> **Note**: Discord applications must be created manually through the Developer Portal first. This resource manages existing applications and provides convenient access to properties like `publicKey`, `inviteUrl`, etc.

**Input Props:**
- `name: string` - Application name (1-32 characters)
- `description?: string` - Application description (1-400 characters)
- `icon?: string` - Base64 encoded icon image
- `botPublic?: boolean` - Whether the bot can be added by anyone (default: false)
- `botRequireCodeGrant?: boolean` - Whether bot requires OAuth2 code grant (default: false)
- `interactionsEndpointUrl?: string` - URL for receiving interactions via HTTP POST

**Output Attributes:**
- `id: string` - Application ID
- `publicKey: string` - Ed25519 public key for signature verification
- `botId: string` - Bot user ID
- `botToken: string` - Bot authentication token (sensitive)
- `clientId: string` - OAuth2 client ID
- `clientSecret: string` - OAuth2 client secret (sensitive)

**Discord APIs:**
- Get: `GET /applications/@me` (using bot token)
- Update: `PATCH /applications/{application.id}`
- Get Current User: `GET /users/@me` (to get bot info)

> **Note**: Discord doesn't provide public endpoints to create or delete applications programmatically.

### 2. SlashCommand

Manages application commands (slash commands, user commands, message commands).

**Input Props:**
- `application: string | Application` - Discord application reference
- `name: string` - Command name (1-32 characters, lowercase, no spaces)
- `description: string` - Command description (1-100 characters)
- `type?: CommandType` - Type of command (CHAT_INPUT, USER, MESSAGE)
- `options?: CommandOption[]` - Command parameters
- `defaultMemberPermissions?: string` - Bitfield of required permissions
- `dmPermission?: boolean` - Available in DMs (default: true)
- `nsfw?: boolean` - Age-restricted command
- `guildId?: string` - Guild ID for guild-specific command (otherwise global)

**Output Attributes:**
- `id: string` - Command ID
- `applicationId: string` - Application ID
- `version: string` - Autoincrementing version identifier
- `guildId?: string` - Guild ID if guild-specific

**Discord APIs:**
- Create Global: `POST /applications/{application.id}/commands`
- Create Guild: `POST /applications/{application.id}/guilds/{guild.id}/commands`
- Update Global: `PATCH /applications/{application.id}/commands/{command.id}`
- Update Guild: `PATCH /applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
- Delete Global: `DELETE /applications/{application.id}/commands/{command.id}`
- Delete Guild: `DELETE /applications/{application.id}/guilds/{guild.id}/commands/{command.id}`

### 3. Webhook

Creates a webhook for sending messages to Discord channels.

**Input Props:**
- `name: string` - Webhook name (1-80 characters)
- `channelId: string` - Target text channel ID
- `avatar?: string` - Base64 encoded avatar image
- `reason?: string` - Audit log reason

**Output Attributes:**
- `id: string` - Webhook ID
- `token: string` - Webhook token (for tokenized requests)
- `url: string` - Complete webhook URL
- `channelId: string` - Channel ID
- `guildId: string` - Guild ID

**Discord APIs:**
- Create: `POST /channels/{channel.id}/webhooks`
- Update: `PATCH /webhooks/{webhook.id}`
- Delete: `DELETE /webhooks/{webhook.id}`
- Execute: `POST /webhooks/{webhook.id}/{webhook.token}`

### 4. OAuth2Application

Manages OAuth2 settings for Discord applications.

**Input Props:**
- `application: string | Application` - Discord application reference
- `redirectUris: string[]` - OAuth2 redirect URIs
- `scopes: string[]` - Required OAuth2 scopes (identify, bot, applications.commands, etc.)
- `permissions?: string` - Bot permission integer

**Output Attributes:**
- `authorizationUrl: string` - OAuth2 authorization URL
- `scopes: string[]` - Configured scopes
- `permissions: string` - Permission integer

**Discord APIs:**
- Uses Application APIs with OAuth2 specific fields

## Integration Example

```typescript
// Create Discord application
const app = await Application("my-bot", {
  name: "My Bot",
  description: "A bot powered by Alchemy",
  botPublic: true,
  interactionsEndpointUrl: "https://my-worker.workers.dev/interactions"
});

// Create slash command
const command = await SlashCommand("ping", {
  application: app,
  name: "ping",
  description: "Replies with pong!",
  type: CommandType.CHAT_INPUT
});

// Create webhook for notifications
const webhook = await Webhook("notifications", {
  name: "My Notifications",
  channelId: "1234567890",
  avatar: await readFile("./avatar.png", "base64")
});
```

Worker implementation:
```javascript
export default {
  async fetch(request, env) {
    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');
    const body = await request.text();
    
    // Verify signature using PUBLIC_KEY from env
    if (!verifyDiscordSignature(body, signature, timestamp, env.DISCORD_PUBLIC_KEY)) {
      return new Response('Invalid signature', { status: 401 });
    }
    
    const interaction = JSON.parse(body);
    
    // Handle PING
    if (interaction.type === 1) {
      return Response.json({ type: 1 });
    }
    
    // Handle slash command
    if (interaction.type === 2 && interaction.data.name === 'ping') {
      return Response.json({
        type: 4,
        data: {
          content: 'Pong!'
        }
      });
    }
  }
}
```

## Type Definitions

```typescript
interface CommandOption {
  type: CommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: CommandChoice[];
  options?: CommandOption[]; // For subcommands
  channelTypes?: ChannelType[];
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  autocomplete?: boolean;
}

interface CommandChoice {
  name: string;
  value: string | number;
}

enum CommandType {
  CHAT_INPUT = 1,  // Slash command
  USER = 2,        // User context menu
  MESSAGE = 3      // Message context menu
}

enum CommandOptionType {
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
  ATTACHMENT = 11
}
```

## Security Considerations

1. **Request Verification**: All interaction endpoints must verify Discord's Ed25519 signatures
2. **Token Management**: Bot tokens are sensitive and stored as Worker secrets
3. **Rate Limiting**: Discord enforces rate limits on API calls
4. **Permissions**: Follow principle of least privilege for bot permissions

## Implementation Notes

1. **Idempotency**: All resources support idempotent create/update operations
2. **Cleanup**: Proper cleanup of Discord resources on deletion
3. **Error Handling**: Graceful handling of Discord API errors and rate limits
4. **Testing**: Use Discord test servers for development
5. **API Base URL**: `https://discord.com/api/v10`
6. **Authentication**: Use `Authorization: Bot {token}` header for API requests

## API References

- [Discord Developer Portal](https://discord.com/developers/docs)
- [Discord Applications API](https://discord.com/developers/docs/resources/application)
- [Discord Webhooks API](https://discord.com/developers/docs/resources/webhook)
- [Discord Application Commands](https://discord.com/developers/docs/interactions/application-commands)
- [Discord Interactions](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Discord OAuth2](https://discord.com/developers/docs/topics/oauth2)

## Future Enhancements

1. **Guild Resource**: Managing Discord servers
2. **Role Resource**: Discord roles and permissions
3. **Channel Resource**: Text/voice channel management
4. **Member Resource**: Guild member management
5. **MessageComponent Resource**: Buttons, select menus, modals