---
# Top-level doc metadata
order: 0
title: Overview
description: Alchemy is a TypeScript library that creates and manages cloud infrastructure when you run it.
sidebar:
  order: 0
---

Alchemy is a TypeScript library that creates and manages cloud infrastructure when you run it. Instead of using opinionated CLIs or configuration files, you write and run a regular TypeScript program.

## How it works

You start with an `alchemy.run.ts` file (or any other name you want) that contains your infrastructure code:

```typescript
import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

// Create an app
const app = await alchemy("my-app");

// Create resources
const worker = await Worker("api", {
  entrypoint: "./src/api.ts"
});

// Clean up orphaned resources
await app.finalize();
```

You then "deploy" your infrastructure by running the script with `alchemy deploy` or manually with `bun` or `node`:

```bash
alchemy deploy                      # deploy to cloud
bun ./alchemy.run.ts                # <- equivalent to `alchemy deploy`
bun ./alchemy.run.ts --destroy      # tear down (destroy all resources)
bun ./alchemy.run.ts --read         # read-only mode (dry run)
bun ./alchemy.run.ts --stage prod   # deploy to specific stage

alchemy destroy                     # tear down (destroy all resources)
bun ./alchemy.run.ts --destroy      # <- equivalent to `alchemy destroy`

# local dev & hot redeployment
alchemy dev                         # local development with hot redeployment
bun --watch ./alchemy.run.ts        # <- equivalent to `alchemy dev`
bun --watch ./alchemy.run.ts --dev  # local development with hot redeployment
```

:::tip
See the [CLI](/concepts/cli) documentation for all available options and environment variables.
:::

## Embeddable

Since Alchemy is a TypeScript library, you can override any CLI arguments programmatically. Explicit options always take precedence over CLI arguments:

```typescript
// CLI args are parsed automatically
const app = await alchemy("my-app");

// Override CLI args with explicit options
const app = await alchemy("my-app", {
  phase: "up",        // Overrides --destroy or --read
  stage: "prod",      // Overrides --stage
  quiet: false,       // Overrides --quiet
  password: "secret", // Overrides ALCHEMY_PASSWORD env var
  dev: true,          // Overrides --dev detection
});
```

This makes Alchemy embeddable in larger applications where you need programmatic control over infrastructure deployment.

## Resources

Resources are async functions that create infrastructure. Each resource handles its own lifecycle:

```typescript
// Create a KV namespace
const kv = await KVNamespace("cache", {
  title: "My Cache"
});

// Create a worker with the KV binding
const worker = await Worker("api", {
  entrypoint: "./src/worker.ts",
  bindings: {
    CACHE: kv
  }
});
```

## State

By default, Alchemy tracks what it creates in `.alchemy/` directory:

```
.alchemy/
  my-app/
    dev/
      cache.json
      api.json
```

You can also use a remote state store like Durable Objects, R2, S3, etc. See [State](../concepts/state) for more information.


## Phases

Your script can run in three phases:

- **up** (default) - Create, update, or delete resources
- **read** - Read existing resources without changes
- **destroy** - Delete all resources

```typescript
const app = await alchemy("my-app", {
  phase: "destroy" // or pass --destroy flag
});
```

:::tip
See the [Phases](/concepts/phase) documentation for more information.
:::

## Scopes

Resources are organized in scopes - like folders for your infrastructure:

```typescript
const app = await alchemy("my-app"); // app scope

// Resources here are in the app/dev scope
const db = await Database("main");

// Create a nested scope
await alchemy.run("backend", async () => {
  // Resources here are in app/dev/backend scope
  const api = await Worker("api");
});
```

## Secrets

Alchemy provides built-in encryption for sensitive data like API keys, passwords, and credentials:

```typescript
const app = await alchemy("my-app", {
  password: process.env.SECRET_PASSPHRASE, // Used to encrypt secrets
});

// Create encrypted secrets from environment variables
const apiKey = alchemy.secret(process.env.API_KEY);
const databaseUrl = alchemy.secret(process.env.DATABASE_URL);
```

Secrets are automatically encrypted when stored in state files and can be safely used in your infrastructure.

:::tip
See the [Secrets](/concepts/secret) documentation for more information.
:::

## Bindings

Connect resources together:

```typescript
const kv = await KVNamespace("data");
const queue = await Queue("tasks");

const worker = await Worker("processor", {
  entrypoint: "./processor.ts",
  bindings: {
    DATA: kv,      // KV namespace binding
    TASKS: queue,  // Queue binding
    API_KEY: alchemy.secret(process.env.API_KEY) // Secret
  }
});
```

:::tip
Alchemy does not use code-generation for bindings. Instead, the runtime types of bindings can be inferred from the `worker`:

```ts
type Env = typeof worker.Env;

export default {
  fetch(request: Request, env: Env) {
    return new Response("Hello, world!");
  }
}
```

See the [Type-safe Bindings](/concepts/bindings#type-safe-bindings) documentation for more information.
:::

## Local Development

Run locally with hot reloading:

```bash
bun ./alchemy.run.ts --dev
```

Resources can run locally or connect to remote services:

```typescript
const db = await D1Database("app-db", {
  dev: { remote: true } // Use real D1 in dev mode
});
```

:::caution
Not all resources support local development. See the [Local Development](/concepts/dev) documentation for more information.
:::

## Resource Adoption

When creating a resource, Alchemy will fail if a resource with the same name already exists. You can opt in to adopt existing resources instead:

```typescript
// Without adoption - fails if bucket already exists
const bucket = await R2Bucket("my-bucket", {
  name: "existing-bucket",
});

// With adoption - uses existing bucket if it exists
const bucket = await R2Bucket("my-bucket", {
  name: "existing-bucket",
  adopt: true,
});
```

This is useful when you want to manage existing infrastructure with Alchemy.

:::tip
See the [Resource Adoption](/concepts/adoption) documentation for more information.
:::

## Resource Replacement

Sometimes it's impossible to update a resource (like renaming an R2 bucket). In these cases, Alchemy can replace the resource by:

1. Creating a new version of the resource
2. Updating all references to point to the new resource
3. Deleting the old resource during finalization

```typescript
// If you change immutable properties, Alchemy will automatically
// trigger a replacement during the update phase
const bucket = await R2Bucket("data", {
  name: "new-bucket-name" // This will trigger replacement
});
```

The replacement happens seamlessly - downstream resources are updated to reference the new resource before the old one is deleted.

:::tip
See the [Resource Replacement](/concepts/replace) documentation for more information.
:::

## Custom Resources

All resources in Alchemy are equal - they're just async functions that handle create, update, and delete operations. This means you can easily create your own resources for any service or API:

```typescript
export const MyResource = Resource(
  "my-service::MyResource",
  async function(this: Context<MyResource>, id: string, props: MyResourceProps): Promise<MyResource> {
    if (this.phase === "delete") {
      // Delete logic
      return this.destroy();
    } else if (this.phase === "update") {
      // Update logic
      return this({ ...props, id: this.output.id });
    } else {
      // Create logic
      return this({ ...props, id: "new-id" });
    }
  }
);
```

Resources handle their own lifecycle and can integrate with any API or service. All built-in Alchemy resources use the same pattern.

:::tip
See the [Resource](/concepts/resource) documentation for detailed implementation guidance and [Custom Resources](/guides/custom-resources) for a step-by-step guide.
:::

## Testing

Test your own custom resources with Alchemy's built-in test helper that :

```typescript
import { alchemy, destroy } from "alchemy";
import "alchemy/test/vitest";

const test = alchemy.test(import.meta);

test("create worker", async (scope) => {
  try {
    const worker = await Worker("test-worker", {
      script: "export default { fetch() { return new Response('ok') } }"
    });
    const response = await fetch(worker.url);
    expect(response.status).toBe(200);
  } finally {
    await destroy(scope); // Clean up test resources
  }
});
```

:::tip
See the [Testing](/concepts/testing) documentation for comprehensive test setup and best practices.
:::

## Available Providers

- **Cloudflare**: Worker, KV, R2, D1, Queue, Durable Objects
- **AWS**: S3, DynamoDB, Lambda, ECS, VPC
- **Others**: Docker, GitHub, Stripe, Vercel, Neon, PlanetScale

## Next Steps

- [Getting Started](/getting-started) - Deploy your first worker
- [Concepts](/concepts/resource) - Deep dive into how Alchemy works
- [Guides](/guides/cloudflare-worker) - Build real applications

Happy transmutation! ✨
