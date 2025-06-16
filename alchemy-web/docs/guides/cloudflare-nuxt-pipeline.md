---
order: 4
title: Nuxt
description: Guide to deploying full-stack Nuxt 3 applications with data pipelines to Cloudflare. Learn how to set up R2, configure Nuxt, and use Cloudflare Pipeline.
---

# Nuxt

This guide walks through deploying a full-stack Nuxt 3 application with a backend Pipeline to Cloudflare using Alchemy.

## Create a new Nuxt 3 Project

Start by creating a new Nuxt 3 project using Alchemy:

::: code-group

```sh [bun]
bunx alchemy create my-nuxt-app --template=nuxt
cd my-nuxt-app
```

```sh [npm]
npx alchemy create my-nuxt-app --template=nuxt
cd my-nuxt-app
```

```sh [pnpm]
pnpm dlx alchemy create my-nuxt-app --template=nuxt
cd my-nuxt-app
```

```sh [yarn]
yarn dlx alchemy create my-nuxt-app --template=nuxt
cd my-nuxt-app
```

:::

The CLI will automatically:

- Create a new Nuxt 3 project structure
- Install all required dependencies including `alchemy` and `@cloudflare/workers-types`
- Configure Nuxt for Cloudflare Workers deployment
- Generate the deployment configuration

## Explore the Generated Files

Let's explore the key files that were created for you:

### Nuxt Configuration

The `nuxt.config.ts` file is already configured for Cloudflare deployment:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  modules: ["nitro-cloudflare-dev"],
});
```

### Deployment Configuration

The `alchemy.run.ts` file contains your infrastructure setup:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Nuxt } from "alchemy/cloudflare";

const app = await alchemy("my-nuxt-app");

export const worker = await Nuxt("website", {
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

### Server API and Middleware

The CLI also creates example server routes and middleware:

- `server/api/hello.ts` - Example API endpoint
- `server/middleware/hello.ts` - Request logging middleware
- `server/middleware/auth.ts` - Authentication context example

## Add Pipeline and R2 Storage

Now let's enhance the `alchemy.run.ts` file to add R2 storage and a data pipeline:

```typescript
/// <reference types="@types/node" />

import alchemy from "alchemy";
import { Pipeline, R2Bucket, Nuxt } from "alchemy/cloudflare";

const R2_BUCKET_NAME = "example-bucket";
const PIPELINE_NAME = "example-pipeline";

const app = await alchemy("nuxt-pipeline-app", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: !process.argv.includes("--verbose"),
  password: process.env.ALCHEMY_PASS,
});

// Create R2 bucket for data storage
const bucket = await R2Bucket("bucket", {
  name: R2_BUCKET_NAME,
});

// Configure data pipeline
const pipeline = await Pipeline("pipeline", {
  name: PIPELINE_NAME,
  source: [{ type: "binding", format: "json" }],
  destination: {
    type: "r2",
    format: "json",
    path: {
      bucket: bucket.name,
    },
    credentials: {
      accessKeyId: alchemy.secret(process.env.R2_ACCESS_KEY_ID),
      secretAccessKey: alchemy.secret(process.env.R2_SECRET_ACCESS_KEY),
    },
    batch: {
      maxMb: 10,
      maxSeconds: 5,
      maxRows: 100,
    },
  },
});

// Configure Nuxt website with bindings
export const worker = await Nuxt("website", {
  command: "bun run build",
  bindings: {
    R2_BUCKET: bucket,
    PIPELINE: pipeline,
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
```

> [!CAUTION]
> Set `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, and `ALCHEMY_PASS` environment variables before deployment.

## Add API Route for Pipeline

Create a new API route to send data to the pipeline:

```typescript
// server/api/pipeline.post.ts
import { env } from "cloudflare:workers";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const pipeline = env.PIPELINE;
    const data = body.data;

    if (!data) {
      throw new Error("Missing 'data' property in request body");
    }

    await pipeline.send([{ value: data }]);

    return { success: true, message: "Data sent to pipeline." };
  } catch (error) {
    console.error("Error sending data to pipeline:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : "Pipeline error",
    });
  }
});
```

## Create Frontend Interface

Update the main page to interact with the pipeline:

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>Nuxt 3 + Alchemy + Cloudflare Pipeline Demo</h1>
    <form @submit.prevent="sendToPipeline">
      <label for="dataInput">Data to send:</label>
      <input id="dataInput" v-model="dataToSend" type="text" required />
      <button type="submit" :disabled="loading">Send to Pipeline</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dataToSend = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

async function sendToPipeline() {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    const response = await fetch("/api/pipeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataToSend.value }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.statusMessage || "Failed to send data");
    }

    message.value = result.message || "Data sent successfully!";
    dataToSend.value = "";
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "An unknown error occurred.";
    console.error("Error sending to pipeline:", err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin-top: 20px;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Deploy Your Application

Login to Cloudflare:

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

Run your Alchemy script to deploy the application:

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
  url: "https://your-site.your-account.workers.dev"
}
```

Click the URL to see your site. Test sending data via the form; it should appear in your R2 bucket shortly after.

## Local Development

To run your application locally, use the Nuxt development server:

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

This will start a local development server:

```sh
Nuxt 3.9.0 with Nitro 2.8.1

  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose this
```

## Tear Down

When you're finished experimenting, you can tear down the application:

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
