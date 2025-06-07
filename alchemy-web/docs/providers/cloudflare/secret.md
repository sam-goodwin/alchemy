---
title: Managing Cloudflare Secrets with Alchemy
description: Learn how to add individual secrets to Cloudflare Secrets Store for fine-grained secret management.
---

# Secret

A [Cloudflare Secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/) represents an individual secret stored in a Secrets Store.

Use this resource to add individual secrets to an existing [SecretsStore](./secrets-store.md), providing fine-grained control over secret management.

## Basic Usage

Add a secret to an existing secrets store:

```ts
import { SecretsStore, Secret } from "alchemy/cloudflare";
import alchemy from "alchemy";

// Create a secrets store first
const store = await SecretsStore("my-store", {
  name: "production-secrets"
});

// Add individual secrets to the store
const apiKey = await Secret("api-key", {
  store: store,
  value: alchemy.secret(process.env.API_KEY)
});

const dbUrl = await Secret("database-url", {
  store: store,
  value: process.env.DATABASE_URL
});
```

## Multiple Secrets

Add multiple secrets to the same store:

```ts
import { SecretsStore, Secret } from "alchemy/cloudflare";

const store = await SecretsStore("shared-store", {
  name: "shared-secrets"
});

// Add various secrets incrementally
await Secret("oauth-client-id", {
  store: store,
  value: alchemy.secret(process.env.OAUTH_CLIENT_ID)
});

await Secret("oauth-client-secret", {
  store: store,
  value: alchemy.secret(process.env.OAUTH_CLIENT_SECRET)
});

await Secret("webhook-secret", {
  store: store,
  value: alchemy.secret(process.env.WEBHOOK_SECRET)
});

await Secret("encryption-key", {
  store: store,
  value: alchemy.secret(process.env.ENCRYPTION_KEY)
});
```

## Preserve Secret on Destroy

When removing from Alchemy state, keep the secret in Cloudflare:

```ts
import { Secret } from "alchemy/cloudflare";

const preservedSecret = await Secret("preserve-secret", {
  store: myStore,
  value: "preserved-value",
  delete: false
});
```

## Access in Worker

Once secrets are added to a store, access them in your Worker code:

```ts
import { SecretsStore, Secret, Worker } from "alchemy/cloudflare";

const store = await SecretsStore("app-secrets", {
  name: "app-secrets"
});

// Add secrets using the Secret resource
await Secret("stripe-secret-key", {
  store: store,
  value: alchemy.secret(process.env.STRIPE_SECRET_KEY)
});

await Secret("sendgrid-api-key", {
  store: store,
  value: alchemy.secret(process.env.SENDGRID_API_KEY)
});

const worker = await Worker("api-worker", {
  bindings: {
    SECRETS: store
  },
  code: `
    export default {
      async fetch(request, env) {
        const stripeKey = await env.SECRETS.get("stripe-secret-key");
        const sendgridKey = await env.SECRETS.get("sendgrid-api-key");
        
        // Use secrets in your application
        return new Response("Secrets loaded successfully");
      }
    }
  `
});
```

## Combined with SecretsStore

You can combine both approaches - define some secrets in the [SecretsStore](./secrets-store.md) and add others individually:

```ts
import { SecretsStore, Secret } from "alchemy/cloudflare";

// Create store with some initial secrets
const store = await SecretsStore("mixed-secrets", {
  name: "mixed-secrets",
  secrets: {
    API_KEY: alchemy.secret(process.env.API_KEY),
    DATABASE_URL: alchemy.secret(process.env.DATABASE_URL)
  }
});

// Add additional secrets individually
await Secret("third-party-token", {
  store: store,
  value: alchemy.secret(process.env.THIRD_PARTY_TOKEN)
});

await Secret("webhook-signing-secret", {
  store: store,
  value: alchemy.secret(process.env.WEBHOOK_SIGNING_SECRET)
});
```

## Use Cases

The Secret resource is particularly useful for:

- **Conditional secrets**: Adding secrets based on environment or configuration
- **Dynamic secret management**: Adding secrets in response to other resource creation
- **Modular configuration**: Organizing secrets across different parts of your application
- **Secret rotation**: Updating individual secrets without affecting others

## Notes

- Secrets are stored securely in Cloudflare's encrypted storage
- Secret names must be unique within each Secrets Store
- Secret values are encrypted at rest and in transit
- Use `alchemy.secret()` for proper secret handling and encryption