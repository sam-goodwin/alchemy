---
order: 1.4
title: Astro
description: Step-by-step guide to deploying Astro applications with server-side rendering to Cloudflare Workers using Alchemy's Infrastructure-as-Code approach.
---

# Astro

This guide demonstrates how to deploy an Astro application with server-side rendering to Cloudflare using Alchemy.

## Create a new Astro Project

Start by creating a new Astro project using Alchemy:

::: code-group

```sh [bun]
bunx alchemy create my-astro-app --template=astro
cd my-astro-app
```

```sh [npm]
npx alchemy create my-astro-app --template=astro
cd my-astro-app
```

```sh [pnpm]
pnpm dlx alchemy create my-astro-app --template=astro
cd my-astro-app
```

```sh [yarn]
yarn dlx alchemy create my-astro-app --template=astro
cd my-astro-app
```

:::

The CLI will automatically:

- Create a new Astro project with TypeScript
- Install all required dependencies including `@astrojs/cloudflare`, `alchemy`, and `@cloudflare/workers-types`
- Configure Astro for Cloudflare Workers deployment with server-side rendering
- Generate the deployment configuration and example API routes

## Explore the Generated Files

Let's explore the key files that were created for you:

### Astro Configuration

The `astro.config.mjs` file is already configured for Cloudflare deployment:

```js
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
});
```

### Deployment Configuration

The `alchemy.run.ts` file contains your infrastructure setup:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("my-astro-app");

export const worker = await Astro("website", {
  command: "bun run build",
});

console.log({
  url: worker.url,
});

await app.finalize();
```

### Example API Route

The CLI creates an example API route at `src/pages/api/hello.ts`:

```ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  // Access Cloudflare runtime context
  const runtime = request.cf;

  return new Response(
    JSON.stringify({
      message: "Hello from Astro API on Cloudflare!",
      timestamp: new Date().toISOString(),
      colo: runtime?.colo || "unknown",
      country: runtime?.country || "unknown",
      city: runtime?.city || "unknown",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
```

### Type Definitions

The `types/env.d.ts` file provides type-safe access to Cloudflare bindings:

```typescript
// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/docs/concepts/bindings.html#type-safe-bindings

import type { worker } from "../alchemy.run.ts";

export type CloudflareEnv = typeof worker.Env;

declare global {
  type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}
```

## Add Cloudflare Resources

Let's enhance the `alchemy.run.ts` file to add some Cloudflare resources like R2 storage and KV:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Astro, KVNamespace, R2Bucket } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-astro", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

// Create some Cloudflare resources for your app
export const [storage, cache] = await Promise.all([
  R2Bucket("astro-storage", {
    allowPublicAccess: false,
  }),
  KVNamespace("CACHE", {
    title: "astro-cache",
  }),
]);

export const worker = await Astro("astro-website", {
  command: "bun run build",
  bindings: {
    STORAGE: storage,
    CACHE: cache,
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
```

### Update Type Definitions

Now that we've added bindings, the `types/env.d.ts` file will automatically provide types for your new resources. You can access them in your Astro components and API routes.

## Login to Cloudflare

Before you can deploy, you need to authenticate by running `wrangler login`.

::: code-group

```sh [bun]
bun wrangler login
```

```sh [npm]
npx wrangler login
```

```sh [pnpm]
pnpm wrangler login
```

```sh [yarn]
yarn wrangler login
```

:::

> [!TIP]
> Alchemy will by default try and use your wrangler OAuth token and Refresh Token to connect but see the [Cloudflare Auth](../guides/cloudflare-auth.md) for other methods.

## Deploy

Run the deploy script to deploy:

::: code-group

```sh [bun]
bun run deploy
```

```sh [npm]
npm run deploy
```

```sh [pnpm]
pnpm run deploy
```

```sh [yarn]
yarn run deploy
```

:::

It should log out the URL of your deployed site:

```sh
{
  url: "https://your-site.your-sub-domain.workers.dev",
}
```

Click the endpoint to see your site! Try visiting `/api/hello` to see the API endpoint in action.

## Local Development

Run the Astro development server:

::: code-group

```sh [bun]
bun run dev
```

```sh [npm]
npm run dev
```

```sh [pnpm]
pnpm run dev
```

```sh [yarn]
yarn run dev
```

:::

The Astro dev server will start:

```sh
🚀  astro  v5.1.3 ready in 892 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

┃ Watch mode enabled! Edit a file to see changes.
```

> [!TIP]
> For production-like local development with Cloudflare Workers, you can use `wrangler dev` after building your Astro site.

## Tear Down

That's it! You can now tear down the app (if you want to):

::: code-group

```sh [bun]
bun run destroy
```

```sh [npm]
npm run destroy
```

```sh [pnpm]
pnpm run destroy
```

```sh [yarn]
yarn run destroy
```

:::
