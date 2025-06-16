---
order: 3
title: SvelteKit
description: Step-by-step guide to deploying a SvelteKit application to Cloudflare Workers using Alchemy with KV storage and R2 buckets.
---

# SvelteKit

This guide walks through how to deploy a SvelteKit application to Cloudflare Workers with Alchemy.

## Create a new SvelteKit Project

Start by creating a new SvelteKit project using Alchemy:

::: code-group

```sh [bun]
bunx alchemy create my-sveltekit-app --template=sveltekit
cd my-sveltekit-app
```

```sh [npm]
npx alchemy create my-sveltekit-app --template=sveltekit
cd my-sveltekit-app
```

```sh [pnpm]
pnpm dlx alchemy create my-sveltekit-app --template=sveltekit
cd my-sveltekit-app
```

```sh [yarn]
yarn dlx alchemy create my-sveltekit-app --template=sveltekit
cd my-sveltekit-app
```

:::

The CLI will automatically:

- Create a new SvelteKit project with TypeScript
- Install all required dependencies including `@sveltejs/adapter-cloudflare`, `alchemy`, and `@cloudflare/workers-types`
- Configure SvelteKit for Cloudflare Workers deployment
- Generate the deployment configuration with Vite plugin setup

> [!NOTE]
> See Svelte's [Introduction](https://svelte.dev/docs/kit/introduction) guide for more details on SvelteKit applications.

## Explore the Generated Files

Let's explore the key files that were created for you:

### SvelteKit Configuration

The `svelte.config.js` file is already configured for Cloudflare deployment:

```js
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

### Vite Configuration

The `vite.config.ts` file is configured with Cloudflare Workers development support:

```ts
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
});
```

### Deployment Configuration

The `alchemy.run.ts` file contains your infrastructure setup:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { SvelteKit } from "alchemy/cloudflare";

const app = await alchemy("my-sveltekit-app");

export const worker = await SvelteKit("website", {
  command: "bun run build",
});

console.log({
  url: worker.url,
});

await app.finalize();
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

Let's enhance the `alchemy.run.ts` file to add KV storage and R2 buckets:

```typescript
import alchemy from "alchemy";
import { KVNamespace, R2Bucket, SvelteKit } from "alchemy/cloudflare";

const app = await alchemy("my-sveltekit-app", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

const website = await SvelteKit("sveltekit-website", {
  bindings: {
    AUTH_STORE: await KVNamespace("auth-store", {
      title: "my-sveltekit-auth-store",
    }),
    STORAGE: await R2Bucket("storage", {
      allowPublicAccess: false,
    }),
  },
  url: true,
});

console.log({
  url: website.url,
});

await app.finalize();
```

## Configure SvelteKit Types

Now that we have bindings, let's update the type configuration. The generated `types/env.d.ts` already provides the correct types, but let's also update `src/app.d.ts` to use these types:

```ts
import type { CloudflarePlatform } from "./env";

declare global {
  namespace App {
    interface Platform extends CloudflarePlatform {}
  }
}

export {};
```

Alternatively, you can define types directly in `src/app.d.ts`:

```ts
declare global {
  namespace App {
    interface Platform {
      env: {
        STORAGE: R2Bucket;
        AUTH_STORE: KVNamespace;
      };
      context: ExecutionContext;
      caches: CacheStorage & { default: Cache };
    }
  }
}

export {};
```

> [!NOTE]
> The `types/env.d.ts` approach provides better type safety since `.ts` files are type-checked, while `.d.ts` files are not. It also automatically derives types from your Alchemy configuration. The traditional `app.d.ts` approach is simpler but requires manual type definitions. Both approaches work with SvelteKit's adapter system by extending the `App.Platform` interface.

## Using Cloudflare Bindings

Both type configurations support two ways to access Cloudflare resources:

**Option 1: Direct runtime import (recommended)**

```ts
// +page.server.ts
import { env } from "cloudflare:workers";

export const load = async () => {
  const kvData = await env.AUTH_STORE?.get("some-key");
  const r2Object = await env.STORAGE?.get("some-file");
  return { kvData };
};
```

**Option 2: Via platform parameter**

```ts
// +page.server.ts
export const load = async ({ platform }) => {
  const kvData = await platform?.env?.AUTH_STORE?.get("some-key");
  const r2Object = await platform?.env?.STORAGE?.get("some-file");
  return { kvData };
};
```

## Log in to Cloudflare

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

Now we can run and deploy our Alchemy stack:

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

It should output the URL of your deployed site:

```sh
{
	url: "https://your-site.your-sub-domain.workers.dev",
}
```

## Local Development

To run your application locally:

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

## Destroy

For illustrative purposes, let's destroy the Alchemy stack:

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

You're done! Happy SvelteKit'ing 🚀
