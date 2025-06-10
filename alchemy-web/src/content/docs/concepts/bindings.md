---
title: Bindings
description: Connect your infrastructure resources with type-safe bindings. Learn how to bind KV namespaces, Durable Objects, R2 buckets, and environment variables to Cloudflare Workers.
sidebar:
  order: 100
---


Bindings allow resources to connect to each other in a type-safe way. In Alchemy, bindings are most commonly used with Cloudflare Workers to give them access to other resources.

## What are Bindings?

Bindings expose resources to your code at runtime. For example, they allow a Cloudflare Worker to access:

- KV Namespaces
- Durable Objects
- R2 Buckets
- Secrets and variables

## Using Bindings in Workers

```typescript
// alchemy.run.ts
import { Worker, KVNamespace } from "alchemy/cloudflare";

// Create a KV namespace
const myKV = await KVNamespace("MY_KV", {
  title: "my-kv-namespace"
});

// Bind the KV namespace to a worker
const myWorker = await Worker("my-worker", {
  name: "my-worker",
  entrypoint: "./src/worker.ts",
  bindings: {
    MY_KV: myKV,
    API_KEY: "secret-key",
    DEBUG_MODE: true
  }
});
```

The worker can then access these bindings through the `env` parameter:

```typescript
// src/worker.ts
export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Access the KV namespace binding
    const value = await env.MY_KV.get("key");
    
    // Access other bindings
    const apiKey = env.API_KEY;
    const isDebug = env.DEBUG_MODE;
    
    return new Response(`Value: ${value}`);
  }
};
```

## Type-Safe Bindings

To make bindings type-safe, create an `env.ts` file:

```typescript
import type { myWorker } from "./alchemy.run";

export type WorkerEnv = typeof myWorker.Env;

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends WorkerEnv {}
  }
}
```

Register `env.ts` in your `tsconfig.json`'s `types`.
```json
{
  "compilerOptions": {
    "types": ["@cloudflare/workers-types", "./src/env.ts"]
  }
}
```

Then, use the type in your worker:

```typescript
// src/worker.ts
export default {
  async fetch(request: Request, env: WorkerEnv, ctx: any) {
    // Type-safe access to bindings
    const value = await env.MY_KV.get("key");
    const apiKey = env.API_KEY;
    
    return new Response(`Value: ${value}`);
  }
};
```

Or use the global import:
```ts
import { env } from "cloudflare:workers";

await env.MY_KV.get("key")
```

## Binding Types

Alchemy supports several binding types:

| Binding Type | Description | Example |
|--------------|-------------|---------|
| KV Namespace | Key-value storage | `MY_KV: myKV` |
| Durable Object | Stateful objects | `COUNTER: counter` |
| R2 Bucket | Object storage | `STORAGE: bucket` |
| Secret | Sensitive value | `API_KEY: alchemy.secret("key")` |
| Variable | Plain text value | `DEBUG: "true"` |

## Binding Resources vs Values

Alchemy handles bindings differently based on what's being bound:

```typescript
const worker = await Worker("worker", {
  // ...
  bindings: {
    // Resource bindings (automatically set up in Cloudflare)
    KV_STORE: kvNamespace,
    COUNTER: durableObject,
    BUCKET: r2Bucket,
    
    // Value bindings (passed as environment variables)
    API_KEY: alchemy.secret(process.env.API_KEY),
    DEBUG: "true",
    VERSION: "1.0.0"
  }
});
```
