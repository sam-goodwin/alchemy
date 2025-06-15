---
title: Cloudflare OpenAuth
description: Learn how to create OAuth authentication workers using OpenAuth and Hono on Cloudflare Workers with Alchemy.
---

# OpenAuth

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) that serves an [OpenAuth](https://openauth.js.org/) Hono application for OAuth authentication with multiple providers.

OpenAuth provides a secure, edge-compatible authentication solution with support for GitHub, Google, Discord, Facebook, and other OAuth providers. It integrates seamlessly with Cloudflare KV for session storage and Hono for API routing.

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
```

## Multiple OAuth Providers

Support both GitHub and Google authentication:

```ts
import { OpenAuth, alchemy } from "alchemy/cloudflare";

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET),
      scopes: ["user:email"]
    },
    google: {
      clientId: alchemy.secret(process.env.GOOGLE_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GOOGLE_CLIENT_SECRET),
      scopes: ["profile", "email"]
    }
  }
});
```

## Custom Success Handler

Add custom post-authentication logic:

```ts
import { OpenAuth, alchemy } from "alchemy/cloudflare";

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET)
    }
  },
  onSuccess: async (ctx, value) => {
    // Custom user processing
    console.log("User signed in:", value.user.login);
    
    return {
      id: value.user.id.toString(),
      name: value.user.name || value.user.login,
      email: value.user.email,
      avatar: value.user.avatar_url,
      githubUsername: value.user.login
    };
  }
});
```

## Custom API Routes

Add custom routes to the Hono app:

```ts
import { OpenAuth, alchemy } from "alchemy/cloudflare";

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET)
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

auth.app.post("/api/logout", async (c) => {
  // Custom logout logic
  return c.json({ success: true });
});
```

## Integration with Other Resources

Use OpenAuth with additional Cloudflare bindings:

```ts
import { 
  OpenAuth, 
  KVNamespace, 
  D1Database, 
  alchemy 
} from "alchemy/cloudflare";

const database = await D1Database("db", { name: "my-app-db" });
const cache = await KVNamespace("cache", { title: "app-cache" });

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET)
    }
  },
  bindings: {
    DATABASE: database,
    CACHE: cache
  },
  onSuccess: async (ctx, value) => {
    // Store user in database
    await ctx.env.DATABASE.prepare(
      "INSERT OR REPLACE INTO users (id, name, email) VALUES (?, ?, ?)"
    ).bind(
      value.user.id, 
      value.user.name, 
      value.user.email
    ).run();
    
    return {
      id: value.user.id.toString(),
      name: value.user.name,
      email: value.user.email
    };
  }
});

// Access the auth store that was automatically created
console.log("Auth store:", auth.store.title);
```

## TTL Configuration

Configure token and session lifetimes:

```ts
import { OpenAuth, alchemy } from "alchemy/cloudflare";

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: alchemy.secret(process.env.GITHUB_CLIENT_ID),
      clientSecret: alchemy.secret(process.env.GITHUB_CLIENT_SECRET)
    }
  },
  ttl: {
    reuse: 120 // Token reuse time in seconds
  }
});
```

## Supported Providers

OpenAuth supports the following OAuth providers out of the box:

- **GitHub** - `providers.github`
- **Google** - `providers.google` 
- **Discord** - `providers.discord`
- **Facebook** - `providers.facebook`

Each provider accepts:
- `clientId` - OAuth client ID (Secret)
- `clientSecret` - OAuth client secret (Secret)
- `scopes` - Array of OAuth scopes to request

## Authentication Flow

OpenAuth provides a complete OAuth authentication flow with built-in endpoints and session management. For detailed information about the authentication flow, endpoints, and advanced configuration, see the [official OpenAuth documentation](https://openauth.js.org/docs/).

## Requirements

To use OpenAuth, you need:

1. **OAuth App** configured with your provider (GitHub, Google, etc.)
2. **Client credentials** stored as secrets

> [!NOTE]
> A KV Namespace for session storage is automatically created and managed by OpenAuth. You can access it via the `store` property of the returned OpenAuth resource.

## Dependencies

The OpenAuth worker automatically includes:

- `@openauthjs/openauth` - Core OpenAuth library
- `hono` - Web framework for API routes
- `valibot` - Schema validation library

## Notes

> [!TIP]
> OpenAuth is designed for edge compatibility and works seamlessly with Cloudflare Workers' runtime.

> [!NOTE]
> The `import.meta` parameter is required to pass the current module's metadata to the worker for proper bundling.

> [!WARNING]  
> Ensure your OAuth app's callback URLs are configured to match your worker's endpoints: `https://your-worker.workers.dev/auth/{provider}/callback`