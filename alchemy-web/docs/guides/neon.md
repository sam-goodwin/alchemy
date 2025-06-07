---
order: 6
title: Neon
description: Step-by-step guide to creating and managing Neon PostgreSQL databases with Cloudflare Workers using Alchemy's Infrastructure-as-Code approach.
---

# Getting Started with Neon

This guide demonstrates how to create a serverless PostgreSQL database with Neon and connect it to a Cloudflare Worker via Hyperdrive for optimal performance.

## Install

Create a new project and install the required dependencies:

::: code-group

```sh [bun]
bun create cloudflare@latest my-neon-app -- --framework=hono --platform=workers --no-deploy
cd my-neon-app
bun add -D alchemy @neondatabase/serverless
```

```sh [npm]
npm create cloudflare@latest my-neon-app -- --framework=hono --platform=workers --no-deploy
cd my-neon-app
npm install --save-dev alchemy @neondatabase/serverless
```

```sh [pnpm]
pnpm create cloudflare@latest my-neon-app -- --framework=hono --platform=workers --no-deploy
cd my-neon-app
pnpm add -D alchemy @neondatabase/serverless
```

```sh [yarn]
yarn create cloudflare@latest my-neon-app -- --framework=hono --platform=workers --no-deploy
cd my-neon-app
yarn add -D alchemy @neondatabase/serverless
```

:::

## Credentials

You'll need a Neon API key to manage your databases. Get one from the [Neon Console](https://console.neon.tech):

1. Go to [console.neon.tech](https://console.neon.tech)
2. Navigate to **Account Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the key and store it in your environment:

```bash
export NEON_API_KEY=your_neon_api_key_here
```

## Login to Cloudflare

Authenticate with Cloudflare to deploy your Worker:

::: code-group

```sh [bun]
bunx wrangler login
```

```sh [npm]
npx wrangler login
```

```sh [pnpm]
pnpm wrangler login
```

```sh [yarn]
yarn wrangler login
```

:::

## Create `alchemy.run.ts`

Create an `alchemy.run.ts` file to define your infrastructure:

```ts
/// <reference types="node" />

import alchemy from "alchemy";
import { Project, Branch, Database } from "alchemy/neon";
import { Worker, Hyperdrive } from "alchemy/cloudflare";

const app = await alchemy("my-neon-app", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

// Create a Neon PostgreSQL project
export const project = await Project("my-database", {
  name: "My Application Database",
  regionId: "aws-us-east-1",
  pgVersion: 16,
});

// Create a development branch for isolated development
export const devBranch = await Branch("dev-branch", {
  project: project,
  name: "development",
});

// Create the main application database
export const database = await Database("app-db", {
  project: project,
  branch: devBranch,
  name: "myapp",
  ownerName: project.roles[0].name,
});

// Create a Hyperdrive connection for faster database access
export const hyperdrive = await Hyperdrive("neon-hyperdrive", {
  name: "neon-database",
  connectionString: project.connectionUris[0].connectionUri,
});

// Deploy a Cloudflare Worker that uses the database
export const worker = await Worker("neon-api", {
  main: "./src/index.ts",
  bindings: {
    HYPERDRIVE: hyperdrive,
  },
});

console.log({
  workerUrl: worker.url,
  databaseHost: project.endpoints[0].host,
});

await app.finalize();
```

## Update your Worker

Replace the contents of `src/index.ts` with a simple API that uses your Neon database:

```ts
import { Hono } from 'hono';
import { neon } from '@neondatabase/serverless';

type Bindings = {
  HYPERDRIVE: Hyperdrive;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  // Use Hyperdrive connection string for faster database access
  const sql = neon(c.env.HYPERDRIVE.connectionString);
  
  try {
    // Create a simple table and insert a record
    await sql`
      CREATE TABLE IF NOT EXISTS greetings (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await sql`
      INSERT INTO greetings (message) 
      VALUES ('Hello from Neon and Cloudflare!')
      ON CONFLICT DO NOTHING
    `;
    
    const greetings = await sql`SELECT * FROM greetings ORDER BY created_at DESC LIMIT 5`;
    
    return c.json({
      message: 'Connected to Neon PostgreSQL via Hyperdrive!',
      greetings: greetings,
      database: {
        host: c.env.HYPERDRIVE.host,
        database: c.env.HYPERDRIVE.database,
      }
    });
  } catch (error) {
    return c.json({ 
      error: 'Database connection failed', 
      details: error.message 
    }, 500);
  }
});

export default app;
```

## Deploy

Run the `alchemy.run.ts` script to deploy your infrastructure:

::: code-group

```sh [bun]
bun ./alchemy.run
```

```sh [npm]
npx tsx ./alchemy.run
```

```sh [pnpm]
pnpm tsx ./alchemy.run
```

```sh [yarn]
yarn tsx ./alchemy.run
```

:::

It should log out the URL of your deployed API and database information:

```sh
{
  workerUrl: "https://neon-api.your-subdomain.workers.dev",
  databaseHost: "ep-cool-darkness-123456.us-east-1.aws.neon.tech"
}
```

Visit the URL to see your API working with the Neon database!

## Key Features

This setup demonstrates several powerful Neon features:

- **Instant Branching**: The development branch is created instantly as a copy-on-write clone
- **Serverless Scaling**: Your database automatically scales compute and storage
- **Global Performance**: Hyperdrive provides connection pooling and caching
- **Type Safety**: Full TypeScript support with the Neon serverless driver

## Tear Down

That's it! You can now tear down the infrastructure (if you want to):

::: code-group

```sh [bun]
bun ./alchemy.run --destroy
```

```sh [npm]
npx tsx ./alchemy.run --destroy
```

```sh [pnpm]
pnpm tsx ./alchemy.run --destroy
```

```sh [yarn]
yarn tsx ./alchemy.run --destroy
```

:::

This will clean up all the Neon and Cloudflare resources that were created.