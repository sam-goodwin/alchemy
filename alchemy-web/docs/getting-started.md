---
title: Getting Started with Alchemy
description: Quick start guide to using Alchemy, the TypeScript-native Infrastructure-as-Code library. Deploy your first Cloudflare Worker with type-safe infrastructure code.
---

# Getting Started with Alchemy

This guide walks you through deploying your first Cloudflare Worker using Alchemy, demonstrating Infrastructure-as-Code principles with a real-world, practical example.

> [!TIP]
> Read [What is Alchemy](./what-is-alchemy.md) to get an overview of Alchemy and how it's different than traditional IaC

## Prerequisites

You'll need:
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)

## Create a New TypeScript Project

Start by creating an empty TypeScript project:

::: code-group

```sh [bun]
mkdir my-alchemy-app
cd my-alchemy-app
bun init -y
```

```sh [npm]
mkdir my-alchemy-app
cd my-alchemy-app
npm init -y
npm install -D typescript @types/node tsx
```

```sh [pnpm]
mkdir my-alchemy-app
cd my-alchemy-app
pnpm init
pnpm add -D typescript @types/node tsx
```

```sh [yarn]
mkdir my-alchemy-app
cd my-alchemy-app
yarn init -y
yarn add -D typescript @types/node tsx
```

:::

## Install Dependencies

Install Alchemy and the Wrangler CLI:

::: code-group

```sh [bun]
bun add alchemy
bun add -g wrangler
```

```sh [npm]
npm install alchemy
npm install -g wrangler
```

```sh [pnpm]
pnpm add alchemy
pnpm add -g wrangler
```

```sh [yarn]
yarn add alchemy
yarn global add wrangler
```

:::

## Login to Cloudflare

Authenticate with Cloudflare using wrangler:

```sh
wrangler login
```

This will open your browser to authenticate with your Cloudflare account.

> [!TIP]
> Alchemy automatically uses your wrangler OAuth token. See the [Cloudflare Auth](./guides/cloudflare-auth.md) guide for alternative authentication methods.

## Create Your First Alchemy App

Create a file named `alchemy.run.ts` in your project directory:

> [!TIP]
> `alchemy.run.ts` is just a convention - you can run Alchemy in any script or JavaScript environment.

### Step 1: Initialize the Alchemy Application Scope

```typescript
import alchemy from "alchemy";

// Initialize the Alchemy application scope
const app = await alchemy("my-first-app", {
  stage: "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});
```

> [!NOTE]
> Learn more about Alchemy scopes in [Concepts: Scope](./concepts/scope.md)

### Step 2: Create a Cloudflare Worker

```typescript
import { Worker } from "alchemy/cloudflare";

// Create a simple worker
const worker = await Worker("hello-worker", {
  entrypoint: "./src/worker.ts",
  url: true, // Enable workers.dev subdomain
});

console.log(`Worker deployed at: ${worker.url}`);
```

> [!NOTE]
> Learn more about Alchemy resources in [Concepts: Resource](./concepts/resource.md)

### Step 3: Finalize the Application

```typescript
// Finalize the app to apply changes
await app.finalize();
```

This is necessary for deleting what are called "orphaned resources" when resources are removed.

> [!NOTE]
> Learn more about finalization and destroying resources in [Concepts: Destroy](./concepts/destroy.md)

### Step 4: Create the Worker Script

Create a `src/worker.ts` file with your worker code:

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === "/hello") {
      return Response.json({ 
        message: "Hello from Alchemy!",
        timestamp: new Date().toISOString(),
        location: request.cf?.colo 
      });
    }
    
    return new Response("Welcome to Alchemy! Try /hello", { 
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  },
};
```

## Deploy Your Worker

Run the Alchemy script to deploy your worker:

::: code-group

```sh [bun]
bun ./alchemy.run.ts
```

```sh [npm]
npx tsx ./alchemy.run.ts
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts
```

```sh [yarn]
yarn tsx ./alchemy.run.ts
```

:::

You will see output similar to:

```
Create:  "my-first-app/dev/hello-worker"
Created: "my-first-app/dev/hello-worker"
Worker deployed at: https://hello-worker.your-subdomain.workers.dev
```

Visit the URL to see your worker in action! Try visiting `/hello` for the JSON response.

> [!TIP]
> If you're familiar with other IaC tools, this should feel similar to `terraform apply`, `pulumi up`, `cdk deploy` or `sst deploy`

## Understanding State

After running your app, Alchemy creates a `.alchemy` directory to store state:

```sh
.alchemy/
  my-first-app/         # app
    dev/                # stage
      hello-worker.json # resource state
```

State files help Alchemy determine whether to create, update, delete, or skip resources on subsequent runs.

> [!NOTE]
> Learn more about Alchemy state in [Concepts: State](./concepts/state.md)

## Generate wrangler.json for Local Development

Add wrangler.json generation to your `alchemy.run.ts`:

```typescript
import { Worker, WranglerJson } from "alchemy/cloudflare";

// ... existing code ...

const worker = await Worker("hello-worker", {
  entrypoint: "./src/worker.ts",
  url: true,
});

// Generate wrangler.json for local development
await WranglerJson("wrangler.json", {
  worker,
});

console.log(`Worker deployed at: ${worker.url}`);

await app.finalize();
```

Run the script again to generate the `wrangler.json`:

::: code-group

```sh [bun]
bun ./alchemy.run.ts
```

```sh [npm]
npx tsx ./alchemy.run.ts
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts
```

```sh [yarn]
yarn tsx ./alchemy.run.ts
```

:::

## Local Development

Now you can run your worker locally using `wrangler dev`:

```sh
wrangler dev
```

This starts a local development server that mirrors your deployed worker environment:

```
⛅️ wrangler 3.78.12
-------------------
Your worker has access to the following bindings:
- Vars:
  - (none)
- Browser Rendering:
  - (disabled)
⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8787
```

Visit `http://localhost:8787` to test your worker locally!

## Update Your Worker

Let's update our worker script to add more functionality:

```typescript
// src/worker.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === "/hello") {
      return Response.json({ 
        message: "Hello from Alchemy!",
        timestamp: new Date().toISOString(),
        location: request.cf?.colo,
        version: "2.0"
      });
    }

    if (url.pathname === "/api/time") {
      return Response.json({
        time: new Date().toISOString(),
        timezone: "UTC"
      });
    }
    
    return new Response(`
      <h1>Welcome to Alchemy!</h1>
      <p>Try these endpoints:</p>
      <ul>
        <li><a href="/hello">/hello</a> - JSON greeting</li>
        <li><a href="/api/time">/api/time</a> - Current time</li>
      </ul>
    `, { 
      status: 200,
      headers: { "Content-Type": "text/html" }
    });
  },
};
```

Deploy the update:

::: code-group

```sh [bun]
bun ./alchemy.run.ts
```

```sh [npm]
npx tsx ./alchemy.run.ts
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts
```

```sh [yarn]
yarn tsx ./alchemy.run.ts
```

:::

You'll see:
```
Update:  "my-first-app/dev/hello-worker"
Updated: "my-first-app/dev/hello-worker"
```

The beauty of Infrastructure-as-Code: Alchemy automatically detects changes and updates only what's necessary!

## Tear Down

When you're done, you can destroy all resources:

::: code-group

```sh [bun]
bun ./alchemy.run.ts --destroy
```

```sh [npm]
npx tsx ./alchemy.run.ts --destroy
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts --destroy
```

```sh [yarn]
yarn tsx ./alchemy.run.ts --destroy
```

:::

Output:
```
Delete:  "my-first-app/dev/hello-worker"
Deleted: "my-first-app/dev/hello-worker"
```

Your worker is now removed from Cloudflare.

## Next Steps

You've successfully deployed your first Cloudflare Worker with Alchemy! Here are some next steps:

- [Deploy a ViteJS site to Cloudflare](./guides/cloudflare-vitejs) - Build full-stack applications
- [Learn about Cloudflare Workers](./guides/cloudflare-worker) - Advanced worker features
- [Build your own Custom Resource](./guides/custom-resources.md) - Extend Alchemy
