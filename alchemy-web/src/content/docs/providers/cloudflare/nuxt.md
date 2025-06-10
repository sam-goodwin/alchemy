---
title: Nuxt
description: Learn how to deploy Nuxt.js applications to Cloudflare Pages/Workers using Alchemy for a seamless experience.
---


Deploy a [Nuxt](https://nuxt.com) application to Cloudflare Pages with automatically configured defaults.

## Minimal Example

Deploy a basic Nuxt site with default settings.

```ts
import { Nuxt } from "alchemy/cloudflare";

const nuxtSite = await Nuxt("my-nuxt-app");
```

## Custom Bindings

Add database and other bindings to your Nuxt app.

```ts
import { Nuxt, D1Database } from "alchemy/cloudflare";

const db = await D1Database("my-db", {
  name: "my-db"
});

const nuxtSiteWithDb = await Nuxt("my-nuxt-app-with-db", {
  command: "npm run build:cloudflare", // Custom build command
  bindings: {
    DB: db // Add custom bindings
  }
});
```

## Bind to a Worker

Bind a Nuxt app to a Cloudflare Worker.

```ts
import { Worker, Nuxt } from "alchemy/cloudflare";

const nuxtApp = await Nuxt("my-nuxt-app", {
  command: "npm run build"
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    NUXT: nuxtApp
  }
});
```
