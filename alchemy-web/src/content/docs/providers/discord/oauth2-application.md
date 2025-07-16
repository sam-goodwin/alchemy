---
title: OAuth2Application
description: Configure OAuth2 authentication flows for Discord applications.
---

# OAuth2Application

Manages OAuth2 settings for Discord applications, enabling user authentication flows.

## Usage

```ts
import alchemy, { secret } from "alchemy";
import { Application, OAuth2Application } from "alchemy/discord";

const app = await Application("my-app", {
  name: "My App",
  botToken: secret(process.env.DISCORD_TOKEN!),
});

const oauth = await OAuth2Application("my-oauth", {
  application: app,
  redirectUris: ["https://myapp.com/auth/callback"],
  scopes: ["identify", "guilds"],
});

console.log(`Authorization URL: ${oauth.authorizationUrl}`);
```

## Properties

### Input

- `application` (string | Application, required) - Discord application reference
- `redirectUris` (string[], required) - OAuth2 redirect URIs
- `scopes` (string[], required) - Required OAuth2 scopes
- `permissions` (string) - Bot permission integer (for bot scope)
- `botToken` (Secret) - Bot token for authentication
- `delete` (boolean) - Whether to delete the resource when destroyed (default: false)
- `adopt` (boolean) - Whether to adopt an existing resource instead of creating new (default: false)

### Output

- `applicationId` (string) - Application ID
- `authorizationUrl` (string) - OAuth2 authorization URL
- `scopes` (string[]) - Configured scopes
- `permissions` (string) - Permission integer

## Examples

### Basic OAuth2 Setup

```ts
import { Application, OAuth2Application } from "alchemy/discord";

const oauth = await OAuth2Application("basic-oauth", {
  application: app,
  redirectUris: ["https://myapp.com/callback"],
  scopes: ["identify", "email"],
});
```

### Bot Authorization with Permissions

```ts
import { Application, OAuth2Application } from "alchemy/discord";

const oauth = await OAuth2Application("bot-oauth", {
  application: app,
  redirectUris: ["https://myapp.com/bot/callback"],
  scopes: ["bot", "applications.commands"],
  permissions: "326417590272", // Multiple permissions combined
});
```

### Multiple Redirect URIs

```ts
import { Application, OAuth2Application } from "alchemy/discord";

const oauth = await OAuth2Application("multi-redirect", {
  application: app,
  redirectUris: [
    "https://myapp.com/auth/callback",
    "https://staging.myapp.com/auth/callback",
    "http://localhost:3000/auth/callback",
  ],
  scopes: ["identify", "guilds", "guilds.members.read"],
});
```

### Full User + Bot Authorization

```ts
import { Application, OAuth2Application } from "alchemy/discord";

const oauth = await OAuth2Application("full-auth", {
  application: app,
  redirectUris: ["https://myapp.com/complete"],
  scopes: [
    "identify",
    "email",
    "guilds",
    "bot",
    "applications.commands",
  ],
  permissions: "8", // Administrator
});

// The authorization URL will include both user and bot scopes
console.log(oauth.authorizationUrl);
```

### Adopt Existing OAuth2 Settings

```ts
import { Application, OAuth2Application } from "alchemy/discord";

// Adopt existing OAuth2 configuration
const existingOAuth = await OAuth2Application("existing-oauth", {
  application: app,
  redirectUris: ["https://myapp.com/auth/callback"],
  scopes: ["identify", "guilds"],
  adopt: true, // Will adopt existing OAuth2 settings if they exist
});
```

### Auto-Delete OAuth2 Settings

```ts
import { Application, OAuth2Application } from "alchemy/discord";

// OAuth2 settings will be deleted when destroyed
const tempOAuth = await OAuth2Application("temp-oauth", {
  application: app,
  redirectUris: ["https://test.myapp.com/callback"],
  scopes: ["identify"],
  delete: true, // Delete OAuth2 settings when destroyed
});
```

## OAuth2 Scopes

Common scopes include:
- `identify` - Basic user information
- `email` - User's email address
- `guilds` - User's guild list
- `guilds.members.read` - Guild member information
- `bot` - Add bot to guilds
- `applications.commands` - Use slash commands
- `webhook.incoming` - Create webhooks

## Permission Calculations

Permissions are represented as a string containing the integer value:
- `"8"` - Administrator
- `"2048"` - Send Messages
- `"32768"` - Manage Messages
- `"1024"` - Read Message History

Multiple permissions are combined using bitwise OR.

## Notes

- Redirect URIs must exactly match during the OAuth2 flow
- The `bot` scope requires the `permissions` parameter
- Users can modify permissions during the authorization flow
- The authorization URL expires after some time and should be generated fresh