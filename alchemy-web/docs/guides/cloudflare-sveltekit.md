---
order: 3
title: SvelteKit
description: Step-by-step guide to deploying a SvelteKit application to Cloudflare Workers using Alchemy with KV storage and R2 buckets.
---

# SvelteKit

This guide walks through how to deploy a SvelteKit application to Cloudflare Workers with Alchemy.

## Create a new SvelteKit Project

Start by creating a new SvelteKit project:

::: code-group

```sh [bun]
bun create svelte@latest my-sveltekit-app
cd my-sveltekit-app
bun install
```

```sh [npm]
npm create svelte@latest my-sveltekit-app
cd my-sveltekit-app
npm install
```

```sh [pnpm]
pnpm create svelte@latest my-sveltekit-app
cd my-sveltekit-app
pnpm install
```

```sh [yarn]
yarn create svelte@latest my-sveltekit-app
cd my-sveltekit-app
yarn install
```

:::

> [!NOTE]
> See Svelte's [Introduction](https://svelte.dev/docs/kit/introduction) guide for more details on SvelteKit applications.

## Install Cloudflare Adapter and Dependencies

Install the required dependencies:

::: code-group

```sh [bun]
bun add @sveltejs/adapter-cloudflare alchemy cloudflare
bun add -D @cloudflare/workers-types
```

```sh [npm]
npm install @sveltejs/adapter-cloudflare alchemy cloudflare
npm install --save-dev @cloudflare/workers-types
```

```sh [pnpm]
pnpm add @sveltejs/adapter-cloudflare alchemy cloudflare
pnpm add -D @cloudflare/workers-types
```

```sh [yarn]
yarn add @sveltejs/adapter-cloudflare alchemy cloudflare
yarn add -D @cloudflare/workers-types
```

:::

## Configure SvelteKit for Cloudflare

Update your `svelte.config.js` to use the Cloudflare adapter:

```js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
```

Create or update your `vite.config.ts` to configure the `cloudflare:workers` module:

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { cloudflareWorkersDevEnvironmentShim, external } from 'alchemy/cloudflare';

export default defineConfig({
	plugins: [
		sveltekit(),
		cloudflareWorkersDevEnvironmentShim()
	],
	define: {
		global: 'globalThis',
	},
	build: {
		rollupOptions: {
			external
		}
	}
});
```

## Create `alchemy.run.ts`

Create an `alchemy.run.ts` file in the root of your project:

```ts
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

Create `src/env.ts` to define your Cloudflare bindings with type safety:

```ts
import type { website } from "../alchemy.run.js";

export interface CloudflarePlatform {
  env: typeof website.Env;
  context: ExecutionContext;
  caches: CacheStorage & { default: Cache };
}

declare global {
  export type CloudflareEnv = typeof website.Env;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}
```

Then update `src/app.d.ts` to use these types:

```ts
import type { CloudflarePlatform } from './env';

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
> The `src/env.ts` approach provides better type safety since `.ts` files are type-checked, while `.d.ts` files are not. It also automatically derives types from your Alchemy configuration. The traditional `app.d.ts` approach is simpler but requires manual type definitions. Both approaches work with SvelteKit's adapter system by extending the `App.Platform` interface.

## Using Cloudflare Bindings

Both type configurations support two ways to access Cloudflare resources:

**Option 1: Direct runtime import (recommended)**
```ts
// +page.server.ts
import { env } from "cloudflare:workers";

export const load = async () => {
	const kvData = await env.AUTH_STORE?.get('some-key');
	const r2Object = await env.STORAGE?.get('some-file');
	return { kvData };
};
```

**Option 2: Via platform parameter**
```ts
// +page.server.ts
export const load = async ({ platform }) => {
	const kvData = await platform?.env?.AUTH_STORE?.get('some-key');
	const r2Object = await platform?.env?.STORAGE?.get('some-file');
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
bun ./alchemy.run
```

```sh [npm]
npx tsx ./alchemy.run
```

```sh [pnpm]
pnpm tsx ./alchemy.run
```

```sh [yarn]
yarn tsx ./alchemy.run
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

```sh
bun ./alchemy.run --destroy
```

You're done! Happy SvelteKit'ing 🚀 