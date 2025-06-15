---
title: Cloudflare OpenAuth
description: Learn how to create OAuth authentication workers using OpenAuth and Hono on Cloudflare Workers with Alchemy.
---

# OpenAuth

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) that serves an [OpenAuth](https://openauth.js.org/) Hono application for OAuth authentication with multiple providers.

OpenAuth provides a secure, edge-compatible authentication solution with support for multiple OAuth providers. It integrates seamlessly with Cloudflare KV for session storage and Hono for API routing.

## Minimal Example

Create a basic OpenAuth worker with GitHub authentication:

```ts
import { OpenAuth, alchemy } from "alchemy/cloudflare";

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET),
      scopes: ["user:email", "read:user"]
    }
  }
});

// Add custom routes to the Hono app
auth.app.get("/api/me", async (c) => {
  return c.json({ 
    user: c.get("user"), 
    authenticated: true 
  });
});
```

## Documentation

For comprehensive documentation on OpenAuth.js, including all supported providers, authentication patterns, and advanced configuration options, visit the [official OpenAuth.js website](https://openauth.js.org/).

## Key Features

- **Multi-provider support**: GitHub, Google, Discord, Facebook, Twitter, Microsoft, Apple, LinkedIn, Spotify, Twitch, Slack, Auth0, Amazon
- **Auto-created KV storage**: Session storage is automatically configured
- **Hono app integration**: Direct access to the Hono app for custom routes
- **Edge-compatible**: Designed for Cloudflare Workers runtime