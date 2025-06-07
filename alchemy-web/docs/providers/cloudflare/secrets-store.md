---
title: Managing Cloudflare Secrets Store with Alchemy
description: Learn how to create and manage Cloudflare Secrets Store for secure, centralized secret storage.
---

# SecretsStore

A [Cloudflare Secrets Store](https://developers.cloudflare.com/secrets-store/) is a secure, centralized location for storing account-level secrets.

## Minimal Example

Create a basic secrets store with an inline secret:

```ts
import { SecretsStore } from "alchemy/cloudflare";
import alchemy from "alchemy";

const store = await SecretsStore("my-secrets", {
  name: "production-secrets",
  secrets: {
    API_KEY: alchemy.secret("my-secret-api-key")
  }
});
```

## With Initial Secrets

Create a secrets store with initial secrets:

```ts
import { SecretsStore } from "alchemy/cloudflare";
import alchemy from "alchemy";

const store = await SecretsStore("my-secrets", {
  name: "production-secrets",
  secrets: {
    API_KEY: alchemy.secret(process.env.API_KEY),
    DATABASE_URL: alchemy.secret(process.env.DATABASE_URL),
    JWT_SECRET: alchemy.secret(process.env.JWT_SECRET)
  }
});
```

## Adopt Existing Store

Adopt an existing store if it already exists:

```ts
import { SecretsStore } from "alchemy/cloudflare";

const existingStore = await SecretsStore("existing-store", {
  name: "existing-secrets-store",
  adopt: true,
  secrets: {
    NEW_SECRET: alchemy.secret("new-value")
  }
});
```

## Preserve Store on Destroy

When removing from Alchemy state, keep the store in Cloudflare:

```ts
import { SecretsStore } from "alchemy/cloudflare";

const preservedStore = await SecretsStore("preserve-store", {
  name: "preserved-secrets-store",
  delete: false
});
```

## Use in Worker Binding

Bind the secrets store to a Worker to access secrets:

```ts
import { SecretsStore, Worker } from "alchemy/cloudflare";

const store = await SecretsStore("secrets", {
  name: "production-secrets",
  secrets: {
    API_KEY: alchemy.secret(process.env.API_KEY),
    DATABASE_URL: alchemy.secret(process.env.DATABASE_URL)
  }
});

const worker = await Worker("my-worker", {
  bindings: {
    SECRETS: store
  },
  entrypoint: "./src/worker.ts"
});
```

Worker code (`./src/worker.ts`):

```ts
export default {
  async fetch(request: Request, env: { SECRETS: any }): Promise<Response> {
    const apiKey = await env.SECRETS.get("API_KEY");
    const dbUrl = await env.SECRETS.get("DATABASE_URL");
    return new Response(apiKey ? "Secrets found" : "No secrets");
  }
};
```

## Adding Individual Secrets

Use the [Secret](./secret.md) resource to add individual secrets to an existing store:

```ts
import { SecretsStore, Secret } from "alchemy/cloudflare";

const store = await SecretsStore("my-store", {
  name: "production-secrets"
});

// Add individual secrets
await Secret("oauth-secret", {
  store: store,
  value: alchemy.secret(process.env.OAUTH_SECRET)
});

await Secret("webhook-secret", {
  store: store,
  value: alchemy.secret(process.env.WEBHOOK_SECRET)
});
```

## Access Secrets in Worker Code

Once bound to a Worker, access secrets using the `.get()` method:

```ts
// worker.ts
export default {
  async fetch(request: Request, env: { SECRETS: any }): Promise<Response> {
    // Get individual secrets
    const apiKey = await env.SECRETS.get("API_KEY");
    const dbUrl = await env.SECRETS.get("DATABASE_URL");
    
    if (!apiKey || !dbUrl) {
      return new Response("Missing required secrets", { status: 500 });
    }
    
    // Use secrets in your application logic
    const response = await fetch("https://api.example.com/data", {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });
    
    return new Response("Success");
  }
};
```