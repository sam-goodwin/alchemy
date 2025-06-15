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
import { OpenAuth, KVNamespace, secret } from "alchemy/cloudflare";

const authStore = await KVNamespace("auth-sessions", {
  title: "auth-sessions"
});

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET,
      scopes: ["user:email", "read:user"]
    }
  },
  storage: authStore
});
```

## Multiple OAuth Providers

Support both GitHub and Google authentication:

```ts
import { OpenAuth, KVNamespace, secret } from "alchemy/cloudflare";

const authStore = await KVNamespace("auth-sessions", {
  title: "auth-sessions"
});

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET,
      scopes: ["user:email"]
    },
    google: {
      clientId: secret.env.GOOGLE_CLIENT_ID,
      clientSecret: secret.env.GOOGLE_CLIENT_SECRET,
      scopes: ["profile", "email"]
    }
  },
  storage: authStore
});
```

## Custom Success Handler

Add custom post-authentication logic:

```ts
import { OpenAuth, KVNamespace, secret } from "alchemy/cloudflare";

const authStore = await KVNamespace("auth-sessions", {
  title: "auth-sessions"
});

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET
    }
  },
  storage: authStore,
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
import { OpenAuth, KVNamespace, secret } from "alchemy/cloudflare";

const authStore = await KVNamespace("auth-sessions", {
  title: "auth-sessions"
});

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET
    }
  },
  storage: authStore,
  routes: {
    "/api/me": `
      return c.json({ 
        user: c.get("user"), 
        authenticated: true 
      });
    `,
    "/api/logout": `
      // Custom logout logic
      return c.json({ success: true });
    `
  }
});
```

## Integration with Other Resources

Use OpenAuth with additional Cloudflare bindings:

```ts
import { 
  OpenAuth, 
  KVNamespace, 
  D1Database, 
  secret 
} from "alchemy/cloudflare";

const database = await D1Database("db", { name: "my-app-db" });
const cache = await KVNamespace("cache", { title: "app-cache" });
const authStore = await KVNamespace("auth", { title: "auth-sessions" });

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET
    }
  },
  storage: authStore,
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
```

## TTL Configuration

Configure token and session lifetimes:

```ts
import { OpenAuth, KVNamespace, secret } from "alchemy/cloudflare";

const authStore = await KVNamespace("auth-sessions", {
  title: "auth-sessions"
});

const auth = await OpenAuth("auth", import.meta, {
  providers: {
    github: {
      clientId: secret.env.GITHUB_CLIENT_ID,
      clientSecret: secret.env.GITHUB_CLIENT_SECRET
    }
  },
  storage: authStore,
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

The OpenAuth worker automatically provides these endpoints:

- `/auth/{provider}` - Initiate OAuth flow for a provider
- `/auth/{provider}/callback` - OAuth callback endpoint
- `/auth/session` - Get current session info
- `/auth/logout` - Clear session

Example usage:
```ts
// Redirect user to GitHub login
window.location.href = `${auth.url}/auth/github`;

// Check if user is authenticated
const response = await fetch(`${auth.url}/auth/session`);
const session = await response.json();
```

## Environment Variables

The following environment variables are automatically set based on your provider configuration:

- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` 
- `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET`
- `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET`

## Requirements

To use OpenAuth, you need:

1. **KV Namespace** for session storage
2. **OAuth App** configured with your provider (GitHub, Google, etc.)
3. **Client credentials** stored as secrets

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