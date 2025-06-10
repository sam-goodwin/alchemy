---
title: Worker
description: Learn how to deploy, configure, and manage Cloudflare Workers using Alchemy for serverless functions at the edge.
---


A [Cloudflare Worker](https://developers.cloudflare.com/workers/) is a serverless function that runs on Cloudflare's global network.

## Minimal Example

Create a basic HTTP handler worker:

```ts
import { Worker } from "alchemy/cloudflare";

const worker = await Worker("api", {
  name: "api-worker", 
  entrypoint: "./src/api.ts"
});
```

## With Bindings

Attach resources like KV, R2, or Durable Objects:

```ts
import { Worker, KVNamespace, DurableObjectNamespace } from "alchemy/cloudflare";

const kv = await KVNamespace("cache", { title: "cache-store" });
const users = new DurableObjectNamespace("users", { className: "Users" });

const worker = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts",
  bindings: {
    CACHE: kv,
    USERS: users
  }
});
```

## With Static Assets

Serve static files from a directory:

```ts
import { Worker, Assets } from "alchemy/cloudflare";

const assets = await Assets("static", {
  path: "./public"
});

const worker = await Worker("frontend", {
  name: "frontend-worker", 
  entrypoint: "./src/worker.ts",
  bindings: {
    ASSETS: assets
  }
});
```

## With Cron Triggers

Schedule recurring tasks:

```ts
import { Worker } from "alchemy/cloudflare";

const worker = await Worker("cron", {
  name: "cron-worker",
  entrypoint: "./src/cron.ts",
  crons: ["0 0 * * *"] // Run daily at midnight
});
```

## Bind to a Worker

Use a worker as a binding in another worker:

```ts
import { Worker } from "alchemy/cloudflare";

const api = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts"
});

const frontend = await Worker("frontend", {
  name: "frontend-worker",
  entrypoint: "./src/frontend.ts",
  bindings: {
    API: api
  }
});
```

## RPC Workers

Create a Worker with RPC capabilities using WorkerEntrypoint and typed RPC interfaces:

```ts
import { Worker, type } from "alchemy/cloudflare";
import type MyRPC from "./src/rpc.ts";

// Create an RPC worker with typed interface
const rpcWorker = await Worker("rpc-service", {
  name: "rpc-service-worker",
  entrypoint: "./src/rpc.ts",
  rpc: type<MyRPC>
});

// Use the RPC worker as a binding in another worker
const mainWorker = await Worker("main", {
  name: "main-worker",
  entrypoint: "./src/worker.ts",
  bindings: {
    RPC: rpcWorker
  }
});
```

The RPC worker's entrypoint should export a class extending `WorkerEntrypoint`:

```ts
// src/rpc.ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class MyRPC extends WorkerEntrypoint {
  async getData(id: string): Promise<{ data: string }> {
    return { data: `Data for ${id}` };
  }

  async processItem(item: { name: string; value: number }): Promise<boolean> {
    // Process the item
    return true;
  }
}
```

Then the main worker can call RPC methods with full type safety:

```ts
// src/worker.ts
export default {
  async fetch(request: Request, env: { RPC: MyRPC }): Promise<Response> {
    // Type-safe RPC calls
    const result = await env.RPC.getData("123");
    const success = await env.RPC.processItem({ name: "test", value: 42 });
    
    return new Response(JSON.stringify({ result, success }));
  }
};
```

## Cross-Script Durable Object Binding

Share durable objects between workers by defining them in one worker and accessing them from another:

```ts
import { Worker, DurableObjectNamespace } from "alchemy/cloudflare";

// Worker that defines and owns the durable object
const dataWorker = await Worker("data-worker", {
  entrypoint: "./src/data.ts",
  bindings: {
    // Bind to its own durable object
    STORAGE: new DurableObjectNamespace("storage", {
      className: "DataStorage"
    })
  }
});

// Worker that accesses the durable object from another worker
const apiWorker = await Worker("api-worker", {
  entrypoint: "./src/api.ts", 
  bindings: {
    // Cross-script binding to the data worker's durable object
    SHARED_STORAGE: dataWorker.bindings.STORAGE
  }
});
```

## With Custom Domain Routing

```ts
import { Worker, Route, Zone } from "alchemy/cloudflare";

const zone = await Zone("example-zone", {
  name: "example.com",
  type: "full",
});

const api = await Worker("api", {
  name: "api-worker",
  entrypoint: "./src/api.ts"
});

const route = await Route("route", {
  zoneId: zone.id,
  worker: api,
  pattern: "api.example.com/*"
});
```

## Reference Workers by Name

Use `WorkerRef` to reference an existing worker by its service name rather than by resource instance. This is useful for worker-to-worker bindings when you need to reference a worker that already exists.

```ts
import { Worker, WorkerRef } from "alchemy/cloudflare";

const callerWorker = await Worker("caller", {
  bindings: {
    TARGET_WORKER: WorkerRef({
      // reference the worker by name (not created with Alchemy)
      service: "target-worker"
    })
  },
});
```

### RPC Type

If you're using a WorkerEntrypoint RPC, you can provide its type:

```ts
import { Worker, WorkerRef } from "alchemy/cloudflare";
import type { MyWorkerEntrypoint } from "./src/worker.ts";

const callerWorker = await Worker("caller", {
  name: "caller-worker",
  bindings: {
    TARGET_WORKER: WorkerRef<MyWorkerEntrypoint>({
      service: "target-worker",
      environment: "production", // Optional
      namespace: "main"           // Optional
    })
  },
});
```
