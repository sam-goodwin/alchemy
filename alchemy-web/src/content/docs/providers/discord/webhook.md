---
title: Webhook
description: Set up webhooks to send messages to Discord channels programmatically.
---

# Webhook

Creates a webhook for sending messages to Discord channels programmatically.

## Usage

```ts
import { Webhook } from "alchemy/discord";

const webhook = await Webhook("notifications", {
  name: "System Notifications",
  channelId: "123456789012345678",
});

console.log(`Webhook URL: ${webhook.url}`);
```

## Properties

### Input

- `name` (string, required) - Webhook name (1-80 characters)
- `channelId` (string, required) - Target text channel ID
- `avatar` (string) - Base64 encoded avatar image
- `reason` (string) - Audit log reason
- `botToken` (Secret) - Bot token for authentication (defaults to DISCORD_BOT_TOKEN env var)
- `delete` (boolean) - Whether to delete the resource when destroyed (default: false)
- `adopt` (boolean) - Whether to adopt an existing resource instead of creating new (default: false)

### Output

- `id` (string) - Webhook ID
- `token` (string) - Webhook token for tokenized requests
- `url` (string) - Complete webhook URL
- `channelId` (string) - Channel ID
- `guildId` (string) - Guild ID

## Examples

### Basic Webhook

```ts
import { Webhook } from "alchemy/discord";

const alerts = await Webhook("alerts", {
  name: "Alert System",
  channelId: process.env.ALERTS_CHANNEL_ID!,
});
```

### Webhook with Custom Avatar

```ts
import { readFileSync } from "fs";
import { Webhook } from "alchemy/discord";

const avatar = readFileSync("./webhook-avatar.png", "base64");

const webhook = await Webhook("branded-webhook", {
  name: "Company Updates",
  channelId: "123456789012345678",
  avatar: `data:image/png;base64,${avatar}`,
  reason: "Setting up automated updates",
});
```

### Using the Webhook

Once created, you can send messages to the webhook URL:

```ts
import { Webhook } from "alchemy/discord";

const webhook = await Webhook("notifier", {
  name: "Notifications",
  channelId: channelId,
});

// Send a message using the webhook
await fetch(webhook.url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: "Hello from Alchemy!",
    embeds: [{
      title: "System Update",
      description: "Everything is running smoothly",
      color: 0x00ff00,
    }],
  }),
});
```

### Webhook with Thread Support

```ts
// Send to a specific thread
await fetch(`${webhook.url}?thread_id=${threadId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    content: "Thread message",
  }),
});
```

### Adopt Existing Webhook

```ts
import { Webhook } from "alchemy/discord";

// Adopt an existing webhook by name in the channel
const existingWebhook = await Webhook("adopted-webhook", {
  name: "System Notifications",
  channelId: "123456789012345678",
  adopt: true, // Will adopt existing webhook with this name if it exists
});
```

### Auto-Delete Webhook

```ts
import { Webhook } from "alchemy/discord";

// Webhook will be deleted when destroyed
const tempWebhook = await Webhook("temp-webhook", {
  name: "Temporary Webhook",
  channelId: "123456789012345678",
  delete: true, // Delete webhook when destroyed
  reason: "Temporary webhook for testing",
});
```

## Notes

- Webhooks can only be created in text channels
- The bot must have `MANAGE_WEBHOOKS` permission in the target channel
- Webhook URLs include both the ID and token for authentication
- Webhooks persist even if the bot is removed from the server
- Rate limits apply to webhook executions (5 requests per 2 seconds)