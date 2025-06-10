---
title: Website
description: Learn how to deploy and manage Cloudflare Pages websites using Alchemy for static and dynamic site hosting.
---

The Website resource deploys a static website to Cloudflare Pages with an optional Worker for server-side functionality.

## Minimal Example

Deploy a static site from a local directory:

```ts
import { Website } from "alchemy/cloudflare";

const site = await Website("my-site", {
  name: "my-site",
  command: "npm run build",
  assets: "./dist"
});
```

## With Custom Worker

Add server-side functionality with a Worker:

```ts
const site = await Website("my-site", {
  name: "my-site", 
  command: "npm run build",
  assets: "./dist",
  main: "./src/worker.ts",
  bindings: {
    DB: database,
    API_KEY: alchemy.secret(process.env.API_KEY)
  }
});
```

## With Advanced Configuration

Configure caching, routing and other options:

```ts
const site = await Website("my-site", {
  name: "my-site",
  command: "npm run build",
  assets: {
    dist: "./dist",
    html_handling: "force-trailing-slash",
    not_found_handling: "single-page-application",
    _headers: "/*\n  Cache-Control: public, max-age=3600",
    _redirects: "/old/* /new/:splat 301"
  },
  compatibilityFlags: ["nodejs_compat"],
  wrangler: true
});
```

## Bind to a Worker

Use the Website's assets in another Worker:

```ts
import { Worker, Website } from "alchemy/cloudflare";

const site = await Website("my-site", {
  command: "npm run build",
  assets: "./dist"
});

await Worker("api", {
  name: "api-worker",
  script: "console.log('Hello')",
  bindings: {
    ASSETS: site 
  }
});
```