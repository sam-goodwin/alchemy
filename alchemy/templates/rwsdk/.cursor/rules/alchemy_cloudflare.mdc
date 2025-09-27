---
description: Core Alchemy development guidelines and patterns
globs: *.ts
alwaysApply: true
---
# Alchemy - TypeScript-native Infrastructure as Code

Alchemy is a TypeScript-native Infrastructure-as-Code framework that allows you to define cloud resources using familiar TypeScript patterns. This guide focuses on Cloudflare integration.

## Core Concepts

**Resources**: Async functions that manage cloud infrastructure lifecycle (create, update, delete)
**Bindings**: Type-safe connections between resources (workers, KV stores, databases)
**State Management**: Tracks resource state for consistent deployments
**Finalization**: Always call `app.finalize()` to clean up orphaned resources

## Basic Setup

### Project Structure
```typescript
// alchemy.run.ts - Your infrastructure definition
import alchemy from "alchemy";
import { Worker, KVNamespace } from "alchemy/cloudflare";

const app = await alchemy("my-app");

export const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  bindings: {
    CACHE: await KVNamespace("cache", { title: "cache-store" })
  }
});

console.log({ url: worker.url });
await app.finalize(); // ⚠️ ALWAYS call finalize()
```

### Environment Setup
```bash
# .env - Required for secret encryption
ALCHEMY_PASSWORD=your-secure-password

# Optional: Use Cloudflare state store in production
ALCHEMY_STATE_STORE=cloudflare
```

### Commands
```bash
bun alchemy deploy            # Deploy
bun alchemy dev               # Local development
bun alchemy destroy           # Destroy all resources
```

## Workers

### Basic Worker
```typescript
const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  url: true, // Get public URL
});
```

### Worker with Bindings
```typescript
const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  bindings: {
    // Resource bindings
    CACHE: kvNamespace,
    STORAGE: r2Bucket,
    COUNTER: durableObjectNamespace,
    QUEUE: queue,
    API: otherWorker,
    
    // Environment variables
    API_KEY: alchemy.secret(process.env.API_KEY),
    DEBUG: "true"
  }
});
```

### Worker Implementation
```typescript
// src/worker.ts
import type { worker } from "../alchemy.run";

export default {
  async fetch(request: Request, env: typeof worker.Env): Promise<Response> {
    // Type-safe access to all bindings
    const cached = await env.CACHE.get("key");
    const apiKey = env.API_KEY;
    
    return new Response("Hello World");
  }
};
```

### Type Safety Setup
```typescript
// types/env.d.ts
import type { worker } from "../alchemy.run";

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends typeof worker.Env {}
  }
}
```

## Durable Objects

### Creating Durable Object Namespace
```typescript
// Use 'new' instead of 'await' for DurableObjectNamespace
const counter = DurableObjectNamespace("counter", {
  className: "Counter",
  sqlite: true, // Enable SQLite storage
});

const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  bindings: {
    COUNTER: counter, // Bind to worker
  }
});
```

### Durable Object Implementation
```typescript
// src/counter.ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
  async increment(): Promise<number> {
    let count = (await this.ctx.storage.get("count")) || 0;
    count++;
    await this.ctx.storage.put("count", count);
    return count;
  }

  async fetch(request: Request): Promise<Response> {
    const count = await this.increment();
    return new Response(JSON.stringify({ count }));
  }
}
```

### Using Durable Objects in Worker
```typescript
// src/worker.ts
export default {
  async fetch(request: Request, env: typeof worker.Env) {
    // Get a Durable Object instance
    const id = env.COUNTER.idFromName("global-counter");
    const obj = env.COUNTER.get(id);
    
    // Call the Durable Object
    return obj.fetch(request);
  }
};
```

### Cross-Script Durable Objects
```typescript
// Method 1: Re-export from provider worker
const sharedCounter = host.bindings.SHARED_COUNTER;

// Method 2: Reference by worker script name
const counter = DurableObjectNamespace("counter", {
  className: "Counter",
  scriptName: "provider-worker"
});
```

## Key Resources

### KV Namespace
```typescript
const cache = await KVNamespace("cache", {
  title: "my-cache-store"
});

// Usage in worker
const value = await env.CACHE.get("key");
await env.CACHE.put("key", "value", { expirationTtl: 3600 });
```

### R2 Bucket
```typescript
const storage = await R2Bucket("storage", {
  allowPublicAccess: false
});

// Usage in worker
const object = await env.STORAGE.get("file.txt");
await env.STORAGE.put("file.txt", "content");
```

### Queue
```typescript
// Typed queue
const queue = await Queue<{ name: string; email: string }>("notifications");

// Producer worker
const producer = await Worker("producer", {
  bindings: { QUEUE: queue },
  // Queue sending code
});

// Consumer worker
const consumer = await Worker("consumer", {
  eventSources: [queue], // Register as consumer
  // Queue processing code
});

// Worker implementation for queue processing
export default {
  async queue(batch: typeof queue.Batch, env: Env) {
    for (const message of batch.messages) {
      console.log("Processing:", message.body);
      message.ack(); // Acknowledge message
    }
  }
};
```

### Custom Domains
```typescript
const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  routes: [
    { pattern: "api.example.com/*", zone: "example.com" },
    { pattern: "example.com/api/*", zone: "example.com" }
  ]
});
```

## Converting Existing Cloudflare Projects

### 1. Migrate wrangler.toml Configuration
```toml
# Old wrangler.toml
name = "my-worker"
main = "src/index.js"

[env.production]
kv_namespaces = [
  { binding = "CACHE", id = "abc123" }
]

[[env.production.r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"
```

```typescript
// New alchemy.run.ts
const worker = await Worker("my-worker", {
  entrypoint: "./src/index.js",
  bindings: {
    CACHE: await KVNamespace("cache", { 
      title: "cache-store",
      adopt: true // Use existing KV namespace
    }),
    STORAGE: await R2Bucket("storage", {
      name: "my-bucket",
      adopt: true // Use existing bucket
    })
  }
});
```

### 2. Enable Development Compatibility
```typescript
// Generate wrangler.json for local development
await WranglerJson({
  worker,
});
```

### 3. Adopt Existing Resources
```typescript
// Use adopt: true to use existing resources instead of failing
const bucket = await R2Bucket("storage", {
  name: "existing-bucket-name",
  adopt: true // Won't fail if bucket already exists
});
```

### 4. State Store Migration
```typescript
// Local development (default)
const app = await alchemy("my-app");

// Production with Cloudflare state store
const app = await alchemy("my-app", {
  stateStore: process.env.NODE_ENV === "production" 
    ? (scope) => new DOStateStore(scope)
    : undefined
});
```

## Advanced Patterns

### Framework Integration (Vite/React/etc.)
```typescript
const website = await Vite("website", {
  entrypoint: "./src/worker.ts",
  command: "bun run build", // Build command
  bindings: {
    API: await Worker("api", { entrypoint: "./api/worker.ts" }),
    STORAGE: await R2Bucket("assets")
  }
});
```

### Resource Scoping
```typescript
// Organize resources into logical groups
await alchemy.run("backend", async () => {
  await Worker("api", { entrypoint: "./api.ts" });
  await KVNamespace("cache", { title: "api-cache" });
});

await alchemy.run("frontend", async () => {
  await Vite("website", { entrypoint: "./src/worker.ts" });
});
```

### Testing Pattern
```typescript
import { alchemy } from "../../src/alchemy";
const test = alchemy.test(import.meta, { prefix: "test" });

describe("Worker Tests", () => {
  test("creates worker", async (scope) => {
    const worker = await Worker("test-worker", {
      entrypoint: "./src/worker.ts"
    });
    
    expect(worker.url).toBeTruthy();
    // Resources auto-cleaned after test
  });
});
```

## Best Practices

1. **Always call finalize()**: `await app.finalize()` at the end of your script
2. **Use adoption for migrations**: `adopt: true` when converting existing projects  
3. **Type-safe bindings**: Set up env.d.ts for full type safety
4. **Resource naming**: Use consistent, descriptive names for resources
5. **State store**: Use DOStateStore for production deployments
6. **Secrets**: Use `alchemy.secret()` for sensitive values
7. **Scoping**: Organize related resources using `alchemy.run()`
8. **Testing**: Use `alchemy.test()` for integration tests

## Common Issues

- **Missing finalize()**: Resources won't be cleaned up properly
- **Wrong DurableObject syntax**: Use `DurableObjectNamespace()` not `await`
- **Type errors**: Set up env.d.ts file for binding types
- **State conflicts**: Use different stages/prefixes for different environments
- **Resource adoption**: Use `adopt: true` when migrating existing resources

## Development Workflow

```bash
# Create new project
bunx alchemy create my-app --template=vite
cd my-app

# Set up authentication (one-time)
bun wrangler login

# Deploy infrastructure
bun run deploy

# Local development
bun run dev

# Clean up
bun run destroy
```