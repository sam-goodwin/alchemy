---
title: Managing Fly.io Applications with Alchemy
description: Learn how to create, configure, and manage Fly.io applications using Alchemy.
---

# App

The App resource lets you create and manage [Fly.io applications](https://fly.io/docs/apps/).

## Minimal Example

Create a basic Fly.io app with default settings:

```ts
import { App } from "alchemy/fly";

const app = await App("my-app", {
  name: "my-web-app"
});
```

## App in Specific Organization and Region

Create an app with organization and region configuration:

```ts
import { App } from "alchemy/fly";

const app = await App("production-app", {
  name: "prod-web-app",
  orgSlug: "my-org",
  primaryRegion: "sea"
});
```

## App with Environment Variables

Create an app with environment configuration:

```ts
import { App } from "alchemy/fly";

const app = await App("env-app", {
  name: "api-server",
  env: {
    NODE_ENV: "production",
    DATABASE_URL: alchemy.secret("postgresql://...")
  }
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | No | Name of the app (defaults to resource ID) |
| `orgSlug` | `string` | No | Organization slug to create the app in |
| `primaryRegion` | `string` | No | Primary region for the app (default: "iad") |
| `env` | `Record<string, string \| Secret>` | No | Environment variables for the app |
| `apiToken` | `Secret` | No | API token (overrides FLY_API_TOKEN env var) |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The ID of the app |
| `name` | `string` | The name of the app |
| `hostname` | `string` | The hostname for accessing the app |
| `organization` | `object` | Organization information |
| `status` | `string` | App status |
| `created_at` | `string` | Time at which the app was created |
| `updated_at` | `string` | Time at which the app was last updated |