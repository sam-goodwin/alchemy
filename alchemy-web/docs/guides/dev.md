---
order: 7
title: Development Mode
description: Learn how to use Alchemy's development mode to run your application locally.
---

# Development Mode (Beta)

Alchemy's development mode provides a powerful local development experience for Cloudflare Workers, featuring hot reloading, local resource emulation, and seamless integration with remote Cloudflare services.

> **Note:** Development mode is currently in beta. Some features may not work as expected.

## Overview

To run Alchemy in development mode, use the `--dev` flag when running your `alchemy.run.ts` script:

```bash
bun run alchemy.run.ts --dev
npx tsx alchemy.run.ts --dev
```

This starts Alchemy in development mode, which will:

- Emulate Cloudflare Workers and associated resources locally using Miniflare
- Hot reload Workers when you make changes to your code

### Watching Your Alchemy Configuration

Alchemy does not watch your `alchemy.run.ts` file for changes. To automatically apply changes to your configuration, you can the watch mode associated with your runtime environment. For example:

```bash
# Using bun's watch mode
bun run --watch alchemy.run.ts

# Using Node.js watch mode
npx tsx --watch alchemy.run.ts
```

Development mode is enabled automatically when the `--watch` flag is detected.

### Programmatic Configuration

You can also enable dev mode programmatically by setting the `dev` option:

```typescript
const app = await alchemy("my-app", {
  dev: true
});
```

## Configuration

When running in dev mode, Alchemy runs your Cloudflare Workers locally using Miniflare, and will be available on a randomly selected port. You can specify the port by setting the `port` property on the `Worker` resource:

```typescript
const worker = await Worker("my-worker", {
  entrypoint: "worker.ts",
  dev: {
    port: 3000
  }
});

console.log(worker.url); // http://localhost:3000
```

## Website Development

When using the `Website` resource in development mode, you can specify a custom development command that Alchemy will run locally:

```typescript
const website = await Website("my-website", {
  dev: {
    command: "npm run dev",
    url: "http://localhost:5173",
  }
});
```

If no command is specified, Alchemy will automatically detect and run the appropriate dev command based on your project's package manager:

- **bun**: `bun vite dev`
- **npm**: `npx vite dev`
- **pnpm**: `pnpm vite dev`
- **yarn**: `yarn vite dev`

### Vite Integration

For projects using Vite, Alchemy integrates with the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/development-testing/vite/) to provide enhanced local development capabilities. This integration enables better support for certain binding types when running locally.

To enable Vite integration, configure your `vite.config.ts` with the Cloudflare plugin:

```typescript
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    cloudflare({
      persistState: process.env.ALCHEMY_CLOUDFLARE_PERSIST_PATH
        ? {
            path: process.env.ALCHEMY_CLOUDFLARE_PERSIST_PATH,
          }
        : undefined,
    }),
  ],
});
```

The Vite integration provides improved support for the following binding types (marked with ✅ in the "Vite" column of the supported resources table below).

## Bindings

By default, Alchemy emulates resources such as [D1 Databases](../providers/cloudflare/d1-database.md), [KV Namespaces](../providers/cloudflare/kv-namespace.md), and [R2 Buckets](../providers/cloudflare/bucket.md) locally.

Alchemy also supports [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) for select resources. For resources that allow either local or remote execution, you can set the `dev` property on the resource to `{ remote: true }`:

```typescript
const db = await D1Database("my-db", {
  dev: { remote: true }
});

const kv = await KVNamespace("my-kv", {
  dev: { remote: true }
});

const r2 = await R2Bucket("my-r2", {
  dev: { remote: true }
});
```

Some resources only support remote execution, such as [AI Gateways](../providers/cloudflare/ai-gateway.md). These resources will automatically be run remotely, so usage will be billed the same as if you were running them in production.

### Supported Resources

The following bindings are supported in dev mode:

| Resource | Local | Remote | Vite |
|----------|-------|--------|------|
| AI | ❌ | ✅ | ❌ |
| Analytics Engine | ✅ | ❌ | ❌ |
| Assets | ✅ | ❌ | ❌ |
| Browser Rendering | ❌ | ✅ | ❌ |
| Container | ✅ | ✅ | ❌ |
| D1 Database | ✅ | ✅ | ✅ |
| Dispatch Namespace | ❌ | ✅ | ❌ |
| Durable Object Namespace | ✅ | ❌ | ❌ |
| Hyperdrive | ✅ | ❌ | ❌ |
| Images | ✅ | ✅ | ❌ |
| JSON | ✅ | ❌ | ❌ |
| KV Namespace | ✅ | ✅ | ✅ |
| Pipeline | ✅ | ❌ | ❌ |
| Queue | ✅ | ✅ | ❌ |
| R2 Bucket | ✅ | ✅ | ✅ |
| Secret | ✅ | ❌ | ❌ |
| Secret Key | ❌ | ❌ | ❌ |
| Service | ✅ | ✅ | ❌ |
| Vectorize Index | ❌ | ✅ | ❌ |
| Version Metadata | ✅ | ❌ | ❌ |
| Workflow | ✅ | ❌ | ❌ |
| Text | ✅ | ❌ | ❌ |

## Limitations

- Hot reloading for Workers is only supported when the `entrypoint` property is set. To hot reload an inline script, you must use an external watcher to monitor your `alchemy.run.ts` file.
- Local Workers can push to remote queues, but cannot consume from them.
- Hyperdrive support is experimental. Hyperdrive configurations that use Cloudflare Access are not supported, and only configurations provisioned in the same `alchemy.run.ts` file will work. This is a [limitation from Cloudflare that is actively being worked on](https://developers.cloudflare.com/workers/development-testing/#unsupported-remote-bindings).
- Container bindings with `dev: { remote: true }` cannot be used as local bindings in development mode.
- You may see "Connection refused" errors in the console when containers are starting up - these can be safely ignored.

## Best Practices

1. **Use local resources for development** - Faster iteration and no API costs
2. **Test with remote resources** - Validate integration before deployment
3. **Leverage hot reloading** - Use entrypoint files for automatic rebuilds
4. **Monitor build output** - Watch for compilation errors and warnings
5. **Configure Worker ports explicitly** - Avoid conflicts in multi-worker setups
6. **Use external watchers** - For automatic restarts when configuration changes
