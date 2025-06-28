---
title: Route
description: Learn how to configure Cloudflare Routes for your Workers using Alchemy to map URL patterns to Worker scripts.
---

Routes map URL patterns to [Cloudflare Workers](https://developers.cloudflare.com/workers/configuration/routing/routes/), controlling which requests are handled by your Workers.

## Worker Routes

The most convenient way to create routes is by defining them directly on your Worker.

```ts
import { Worker, Zone } from "alchemy/cloudflare";

// Create zone first so it exists for inference
const zone = await Zone("example-zone", {
  name: "example.com",
});

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
  routes: [
    {
      pattern: "api.example.com/*", // Zone ID inferred from example.com
    },
    {
      pattern: "admin.example.com/*", // Also inferred from example.com
    },
  ],
});

// Routes are accessible on the worker
console.log(worker.routes); // Array of created Route resources
```

:::note
Zone IDs are inferred from the domain from the pattern and finding the matching zone in your Cloudflare account.
:::

## Explicit Zone ID

For more control, you can explicitly specify zone IDs:

```ts
import { Worker, Zone } from "alchemy/cloudflare";

const zone = await Zone("example-zone", {
  name: "example.com",
});

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
  routes: [
    {
      pattern: "api.example.com/*",
      zoneId: zone.id, // Explicit zone ID
    },
  ],
});
```

## `Route` Resource

You can create and manage Routes independently with the `Route` resource:

```ts
import { Route, Zone, Worker } from "alchemy/cloudflare";

const zone = await Zone("example-zone", {
  name: "example.com",
});

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
});

const route = await Route("api-route", {
  pattern: "api.example.com/*",
  script: worker, // Can use Worker resource directly
  zoneId: zone.id,
});
```

Standalone routes also support automatic zone ID inference:

```ts
const route = await Route("auto-route", {
  pattern: "api.example.com/*", // Zone ID inferred
  script: "my-worker",
});
```
