---
title: Managing Fly.io Secrets with Alchemy
description: Learn how to create, configure, and manage Fly.io application secrets using Alchemy.
---

# FlySecret

The FlySecret resource lets you create and manage [Fly.io application secrets](https://fly.io/docs/apps/secrets/) for storing sensitive environment variables.

## Basic Secret

Create a simple secret for your application:

```ts
import { FlySecret } from "alchemy/fly";

const secret = await FlySecret("database-url", {
  app: "my-app",
  name: "DATABASE_URL",
  value: alchemy.secret("postgresql://...")
});
```

## Multiple Secrets

Create multiple secrets for configuration:

```ts
import { FlySecret } from "alchemy/fly";

const apiKey = await FlySecret("api-key", {
  app: myApp,
  name: "API_KEY",
  value: alchemy.secret("sk_test_...")
});

const jwtSecret = await FlySecret("jwt-secret", {
  app: myApp,
  name: "JWT_SECRET",
  value: alchemy.secret("super-secret-key")
});
```

## Environment-Specific Secrets

Create secrets with environment-specific values:

```ts
import { FlySecret } from "alchemy/fly";

const dbSecret = await FlySecret("db-password", {
  app: productionApp,
  name: "DB_PASSWORD",
  value: alchemy.secret(process.env.PRODUCTION_DB_PASSWORD!)
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `app` | `string \| App` | Yes | App this secret belongs to |
| `name` | `string` | Yes | Secret name/key |
| `value` | `Secret` | Yes | Secret value |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Secret name/key |
| `digest` | `string` | Secret digest (hash of the value) |
| `created_at` | `string` | Time at which the secret was created |
| `updated_at` | `string` | Time at which the secret was last updated |

## Notes

- Secrets are encrypted at rest and in transit
- Secret values are never returned by the API after creation
- Secrets are automatically injected as environment variables into machines
- Updating a secret will cause machines to restart if they reference it
- Secret names must be valid environment variable names (alphanumeric + underscore)