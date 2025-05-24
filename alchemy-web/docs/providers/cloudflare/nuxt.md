---
title: Nuxt with Alchemy
description: Creates and deploys a Nuxt application using the Cloudflare Workers preset. This resource simplifies deploying Nuxt applications by providing sensible defaults for the build command, main entrypoint, and assets directory based on the `cloudflare-module` preset output.
---

# Nuxt

Creates and deploys a Nuxt application using the Cloudflare Workers preset.

This resource simplifies deploying Nuxt applications by providing sensible
defaults for the build command, main entrypoint, and assets directory
based on the `cloudflare-module` preset output.

It wraps the underlying `Website` resource.


Represents the output of a Nuxt resource deployment.
It resolves to the underlying Cloudflare Worker type, ensuring type safety.
Prevents overriding the internal ASSETS binding.

## Examples

### A basic Nuxt site with default settings

```typescript
import { Nuxt } from "alchemy/cloudflare";

// Deploy a basic Nuxt site with default settings
const nuxtSite = await Nuxt("my-nuxt-app");
```

---

### With custom bindings and build command

```typescript
// Deploy with custom bindings and build command
const db = await D1Database("my-db");
const nuxtSiteWithDb = await Nuxt("my-nuxt-app-with-db", {
  command: "npm run build:cloudflare", // Specify a custom build command
  bindings: {
    DB: db, // Add custom bindings
  },
});
```


## Properties

### Nuxt

*Note: This includes properties from dependent resources: Assets, WebsiteProps.*

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `command` | `string` | Yes | The command to run to build the site (From WebsiteProps) | bun run build |
| `createdAt` | `number` | Yes | Time at which the assets were created (From Assets) |  |
| `files` | `AssetFile[]` | Yes | Asset files that were found (From Assets) |  |
| `id` | `string` | Yes | The ID of the assets bundle (From Assets) |  |
| `type` | `"assets"` | Yes | The type of binding (From Assets) |  |
| `updatedAt` | `number` | Yes | Time at which the assets were last updated (From Assets) |  |
| `assets` | `\| string \| ({ dist?: string; } & AssetsConfig)` | No | The directory containing your static assets (From WebsiteProps) | ./.output/public |
| `cwd` | `string` | No |  (From WebsiteProps) | process.cwd() |
| `main` | `string` | No | The entrypoint to your server (From WebsiteProps) | ./index.ts |
| `name` | `string` | No | The name of the worker (From WebsiteProps) | id |
| `wrangler` | `\| boolean \| string \| { path?: string; // override main main?: string; }` | No | Write a wrangler.jsonc file (From WebsiteProps) | true |


## Dependent Types

*These types are used by this resource and may provide additional configuration options:*

### Assets

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `type` | `"assets"` | Yes | The type of binding |  |
| `id` | `string` | Yes | The ID of the assets bundle |  |
| `files` | `AssetFile[]` | Yes | Asset files that were found |  |
| `createdAt` | `number` | Yes | Time at which the assets were created |  |
| `updatedAt` | `number` | Yes | Time at which the assets were last updated |  |

### WebsiteProps

| Name | Type | Required | Description | Default |
|------|------|----------|-------------|---------|
| `command` | `string` | Yes | The command to run to build the site |  |
| `name` | `string` | No | The name of the worker | id |
| `main` | `string` | No | The entrypoint to your server | - a simple server that serves static assets is generated |
| `assets` | `\| string \| ({ dist?: string; } & AssetsConfig)` | No | The directory containing your static assets | "./dist" |
| `cwd` | `string` | No |  | process.cwd() |
| `wrangler` | `\| boolean \| string \| { path?: string; // override main main?: string; }` | No | Write a wrangler.jsonc file | - no wrangler.jsonc file is written |

