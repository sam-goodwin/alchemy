---
title: CustomDomain
description: Learn how to configure and manage Custom Domains for your Cloudflare services (like Pages, Workers) using Alchemy.
---

The CustomDomain resource lets you attach a [custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) to a Cloudflare Worker.

## Worker Domains

The simplest way to bind custom domains is directly on the Worker:

```ts
import { Worker } from "alchemy/cloudflare";

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
  domains: ["api.example.com", "admin.example.com"],
});

// Access the created domains
console.log(worker.domains); // Array of created CustomDomain resources
```

With additional options:

```ts
const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
  domains: [
    {
      domainName: "api.example.com",
      zoneId: "YOUR_ZONE_ID", // Optional - will be inferred if not provided
      adopt: true, // Adopt existing domain if it exists
    },
    "admin.example.com", // Zone ID will be inferred
  ],
});
```

## CustomDomain Resource

You can also create custom domains independently:

```ts
import { Worker, CustomDomain } from "alchemy/cloudflare";

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
});

const domain = await CustomDomain("api-domain", {
  name: "api.example.com",
  zoneId: "YOUR_ZONE_ID",
  workerName: worker.name,
});
```

### With Environment

Bind a domain to a specific worker environment:

```ts
import { Worker, CustomDomain } from "alchemy/cloudflare";

const domain = await CustomDomain("staging-domain", {
  name: "staging.example.com",
  zoneId: "YOUR_ZONE_ID",
  workerName: "my-worker",
  environment: "staging",
});
```

:::tip
See the [Routes and Domains](https://developers.cloudflare.com/workers/configuration/routing/#what-is-best-for-me) Cloudflare docs to help decide between when to use a Route vs a Domain.
:::
