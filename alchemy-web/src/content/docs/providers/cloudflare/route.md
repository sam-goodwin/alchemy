---
title: Route
description: Learn how to configure Cloudflare Routes for your Workers using Alchemy to map URL patterns to Worker scripts.
---


The Route resource lets you map URL patterns to [Cloudflare Workers](https://developers.cloudflare.com/workers/configuration/routing/routes/).

## Minimal Example

Map a domain pattern to a Worker:

```ts
import { Route } from "alchemy/cloudflare";

const route = await Route("api-route", {
  pattern: "api.example.com/*", 
  script: "my-worker",
  zoneId: "your-zone-id"
});
```

## Route with Worker Resource

Use a Worker resource directly:

```ts
import { Worker, Route } from "alchemy/cloudflare";

const worker = await Worker("api", {
  script: `
    export default {
      fetch(request) {
        return new Response("Hello from API!");
      }
    }
  `
});

const route = await Route("api-route", {
  pattern: "api.example.com/*",
  script: worker,
  zoneId: "your-zone-id"
});
```

## Adopt Existing Routes

Use the `adopt` option to take control of existing routes instead of failing with a conflict:

```ts
import { Route } from "alchemy/cloudflare";

// This will adopt an existing route if one with the same pattern exists
const route = await Route("existing-route", {
  pattern: "api.example.com/*",
  script: "my-worker", 
  zoneId: "your-zone-id",
  adopt: true  // Adopts existing route instead of throwing 409 error
});
```

When `adopt: true` is set and a route with the same pattern already exists, the resource will:
- Find the existing route by pattern
- Adopt it into your Alchemy state
- Update it with the specified script if different

This is useful when migrating existing Cloudflare configurations to Alchemy or working with routes created outside of Alchemy.

## Bind to a Worker

Routes are automatically bound to the specified Worker:

```ts
import { Worker, Route } from "alchemy/cloudflare";

const route = await Route("my-route", {
  pattern: "api.example.com/*",
  script: "my-worker",
  zoneId: "your-zone-id"
});

await Worker("my-worker", {
  name: "my-worker",
  script: "console.log('Hello, world!')",
  bindings: {
    myRoute: route
  }
});
```
