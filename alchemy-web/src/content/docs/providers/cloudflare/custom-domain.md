---
title: CustomDomain
description: Learn how to configure and manage Custom Domains for your Cloudflare services (like Pages, Workers) using Alchemy.
---

The CustomDomain resource lets you attach a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) to a Cloudflare Worker.

## Minimal Example

Bind a domain to a worker:

```ts
import { Worker, CustomDomain } from "alchemy/cloudflare";

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts"
});

const domain = await CustomDomain("api-domain", {
  name: "api.example.com", 
  zoneId: "YOUR_ZONE_ID",
  workerName: worker.name
});
```

## With Environment

Bind a domain to a specific worker environment:

```ts
import { Worker, CustomDomain } from "alchemy/cloudflare";

const domain = await CustomDomain("staging-domain", {
  name: "staging.example.com",
  zoneId: "YOUR_ZONE_ID", 
  workerName: "my-worker",
  environment: "staging"
});
```