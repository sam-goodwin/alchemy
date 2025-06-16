---
order: 1.5
title: Vite.js
description: Step-by-step guide to deploying Vite.js React applications with API endpoints to Cloudflare Workers using Alchemy's Infrastructure-as-Code approach.
---

# Vite

This guide demonstrates how to deploy a Vite.js React TypeScript application with a Hono API to Cloudflare using Alchemy.

## Create a new Vite.js Project

Start by creating a new Vite.js project using Alchemy:

::: code-group

```sh [bun]
bunx alchemy create my-react-app --template=vite
cd my-react-app
```

```sh [npm]
npx alchemy create my-react-app --template=vite
cd my-react-app
```

```sh [pnpm]
pnpm dlx alchemy create my-react-app --template=vite
cd my-react-app
```

```sh [yarn]
yarn dlx alchemy create my-react-app --template=vite
cd my-react-app
```

:::

The CLI will automatically:

- Create a new Vite.js React TypeScript project
- Install all required dependencies including `alchemy`, `@cloudflare/workers-types`, and the Cloudflare Vite plugin
- Configure Vite for Cloudflare Workers deployment
- Generate the deployment configuration and Worker endpoint

## Explore the Generated Files

Let's explore the key files that were created for you:

### Vite Configuration

The `vite.config.ts` file is already configured with the Cloudflare plugin:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
});
```

### TypeScript Configuration

The `tsconfig.json` is configured for Cloudflare Workers:

```json
{
  "compilerOptions": {
    "target": "es2021",
    "lib": ["es2021"],
    "jsx": "react-jsx",
    "module": "es2022",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["@cloudflare/workers-types"]
  },
  "exclude": ["test"],
  "include": ["types/**/*.ts", "src/**/*.ts"]
}
```

### Worker API Endpoint

The `worker/index.ts` file contains a simple API endpoint:

```typescript
export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare",
      });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
```

### Deployment Configuration

The `alchemy.run.ts` file contains your infrastructure setup:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

const app = await alchemy("my-react-app");

export const worker = await Vite("website", {
  main: "./worker/index.ts",
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

## Deploy Static Site

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

Click the endpoint to see your site!

## Local Development

Cloudflare's Vite.js plugin can be run in `dev` mode:

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

The vite dev server will start as normal, along with your Worker and Cloudflare Resources running locally in miniflare (matching a deployment as closely as possible).

```sh
VITE v6.2.2  ready in 1114 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  Debug:   http://localhost:5173/__debug
➜  press h + enter to show help
```

> [!TIP]
> Cloudflare's Vite.js plugin needs a `wrangler.jsonc` which Alchemy's `Vite` resource generates automatically.
>
> You may wish to add it to `.gitignore`:
>
> ```
> # .gitignore
> wrangler.jsonc
> ```

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
