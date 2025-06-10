---
title: Cloudflare Workers
description: Deploy serverless functions at the edge with Cloudflare Workers. Learn how to build fast, scalable applications with Alchemy's Cloudflare Worker resources.
sidebar:
  order: 1
---

Alchemy provides comprehensive support for Cloudflare Workers, enabling you to deploy serverless functions at the edge with powerful features like Durable Objects and Workflows.

## Basic Worker

Create a simple Cloudflare Worker with Alchemy:

```ts
import { Worker } from "alchemy/cloudflare";

export const worker = await Worker("ApiWorker", {
  name: "my-api",
  entrypoint: "./src/worker.ts",
  url: true, // Enable workers.dev subdomain
});
```

Your worker script (`./src/worker.ts`):

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/hello") {
      return Response.json({
        message: "Hello from the edge!",
        location: request.cf?.colo,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
```

## Environment Variables

Configure environment variables for your workers:

```ts
export const worker = await Worker("ApiWorker", {
  name: "my-api",
  entrypoint: "./src/worker.ts",
  env: {
    API_KEY: "your-secret-key",
    DEBUG: "true",
  },
});
```

## Durable Objects

Add persistent state and coordination to your workers with Durable Objects:

```ts
import { Worker, DurableObjectNamespace } from "alchemy/cloudflare";

const worker = await Worker("CounterApp", {
  entrypoint: "./worker.ts",
  bindings: {
    COUNTER: new DurableObjectNamespace("counter", {
      className: "Counter",
      sqlite: true,
    }),
  },
});

// In your worker.ts
export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let count = (await this.state.storage.get("count")) || 0;
    count++;
    await this.state.storage.put("count", count);
    return Response.json({ count });
  }
}
```

[Learn more about Durable Objects →](./cloudflare-durable-objects)

## Workflows

Orchestrate long-running, complex processes with Cloudflare Workflows:

```ts
import { Worker, Workflow } from "alchemy/cloudflare";

const worker = await Worker("OrderProcessor", {
  entrypoint: "./worker.ts",
  bindings: {
    ORDER_WORKFLOW: new Workflow("order-processor", {
      className: "OrderProcessor",
      workflowName: "process-order-workflow",
    }),
  },
});

// In your worker.ts
export class OrderProcessor {
  async run(event, step) {
    const payment = await step.do("process-payment", async () => {
      return { success: true, transactionId: "tx_123" };
    });

    const shipping = await step.do("schedule-shipping", async () => {
      return { trackingNumber: "1Z999AA1234567890" };
    });

    return { payment, shipping };
  }
}
```

[Learn more about Workflows →](./cloudflare-workflows)

## Bindings

Bindings connect your Workers to other resources like KV namespaces, Durable Objects, and environment variables. They provide type-safe access to external resources within your worker code:

```ts
import { Worker, KVNamespace } from "alchemy/cloudflare";

// Create resources
const myKV = await KVNamespace("UserSessions", {
  title: "user-sessions",
});

// Bind resources to your worker
const worker = await Worker("ApiWorker", {
  name: "my-api",
  entrypoint: "./src/worker.ts",
  bindings: {
    USER_SESSIONS: myKV, // KV namespace binding
    API_KEY: "secret-key", // Environment variable
    DEBUG_MODE: true, // Boolean value
  },
});
```

Access bindings in your worker code:

```ts
// src/worker.ts
import { env } from "cloudflare:workers";

export default {
  async fetch(request: Request): Promise<Response> {
    // Use bound resources
    const session = await env.USER_SESSIONS.get("user123");
    const apiKey = env.API_KEY;

    return Response.json({ session, debug: env.DEBUG_MODE });
  },
};
```

[Learn more about Bindings →](../concepts/bindings)

## Type Safety

Configure TypeScript types for your worker environment:

```ts
// src/env.d.ts
import type { worker } from "./alchemy.run";

export type WorkerEnv = typeof worker.Env;

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends WorkerEnv {}
  }
}
```

This provides full type safety for bindings, environment variables, and Cloudflare-specific APIs.
