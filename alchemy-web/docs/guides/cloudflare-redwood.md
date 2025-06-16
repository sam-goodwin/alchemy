---
order: 3
title: Redwood
description: Deploy RedwoodJS applications with Drizzle ORM and D1 database to Cloudflare Workers using Alchemy. Includes schema migration and local development setup.
---

# Redwood

This guide demonstrates how to deploy a Redwood application with Drizzle to Cloudflare using Alchemy.

## Create a new Redwood Project

Start by creating a new Redwood project using Alchemy:

::: code-group

```sh [bun]
bunx alchemy create my-cloudflare-app --template=rwsdk
cd my-cloudflare-app
```

```sh [npm]
npx alchemy create my-cloudflare-app --template=rwsdk
cd my-cloudflare-app
```

```sh [pnpm]
pnpm dlx alchemy create my-cloudflare-app --template=rwsdk
cd my-cloudflare-app
```

```sh [yarn]
yarn dlx alchemy create my-cloudflare-app --template=rwsdk
cd my-cloudflare-app
```

:::

The CLI will automatically:

- Create a new Redwood SDK project with Drizzle
- Install all required dependencies including `alchemy` and `@cloudflare/workers-types`
- Run the initial development setup
- Configure the deployment infrastructure with D1 database and Durable Objects

## Explore the Generated Files

Let's explore the key files that were created for you:

### Deployment Configuration

The `alchemy.run.ts` file contains your infrastructure setup with D1 database and Durable Objects:

```typescript
/// <reference types="@types/node" />
import alchemy from "alchemy";
import {
  D1Database,
  DurableObjectNamespace,
  Redwood,
} from "alchemy/cloudflare";

const app = await alchemy("my-cloudflare-app");

const database = await D1Database("database", {
  name: "my-cloudflare-app-db",
  migrationsDir: "drizzle",
});

export const worker = await Redwood("website", {
  name: "my-cloudflare-app-website",
  command: "bun run build",
  bindings: {
    AUTH_SECRET_KEY: alchemy.secret(process.env.AUTH_SECRET_KEY),
    DB: database,
    SESSION_DURABLE_OBJECT: new DurableObjectNamespace("session", {
      className: "SessionDurableObject",
    }),
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
```

### Type Definitions

The `types/env.d.ts` file provides type-safe access to Cloudflare bindings:

```typescript
// This file infers types for the cloudflare:workers environment from your Alchemy Worker.
// @see https://alchemy.run/docs/concepts/bindings.html#type-safe-bindings

import type { worker } from "../alchemy.run.ts";

export type CloudflareEnv = typeof worker.Env;

declare global {
  type Env = CloudflareEnv;
}

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends CloudflareEnv {}
  }
}
```

### Environment Configuration

The CLI also updated your `.env` and `.env.example` files with the required Alchemy password:

```sh
# .env
ALCHEMY_PASSWORD=change-me

# .env.example
ALCHEMY_PASSWORD=your-alchemy-password
```

### Package Scripts

The `package.json` has been updated with convenient deployment scripts:

```json
{
  "scripts": {
    "deploy": "tsx --env-file .env ./alchemy.run.ts",
    "destroy": "tsx --env-file .env ./alchemy.run.ts --destroy"
  }
}
```

## Working with Drizzle Schema and Migrations

The Redwood Drizzle template includes a database schema defined using Drizzle ORM. Let's explore and modify the schema.

### Understanding the Existing Schema

The schema files are located in the `api/db` directory. Take a look at the existing schema:

```sh
cat api/db/schema.ts
```

The default schema typically includes a basic user model. Let's modify this schema to add a posts table for a blog.

### Modifying the Schema

Edit the schema file to add a posts table:

```ts
// api/db/schema.ts
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  hashedPassword: text("hashed_password"),
  salt: text("salt"),
  resetToken: text("reset_token"),
  resetTokenExpiresAt: integer("reset_token_expires_at"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

// Add a new posts table
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  userId: text("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});
```

### Generating a Migration

After modifying the schema, generate a migration:

::: code-group

```sh [bun]
bun migrate:new
```

```sh [npm]
npm run migrate:new
```

```sh [pnpm]
pnpm migrate:new
```

```sh [yarn]
yarn migrate:new
```

:::

This will create a new migration file in the `drizzle` directory.

## Deploy Redwood Application

Login to Cloudflare:

::: code-group

```sh [bun]
bun wrangler login
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

Run the deploy script to deploy:

::: code-group

```sh [bun]
bun run deploy
```

```sh [npm]
npm run deploy
```

```sh [pnpm]
pnpm run deploy
```

```sh [yarn]
yarn run deploy
```

:::

It should log out the URL of your deployed site:

```sh
{
  url: "https://your-site.your-sub-domain.workers.dev",
}
```

Click the endpoint to see your Redwood application!

### Deploy with Migrations

Now that we've modified the schema and generated migrations, let's redeploy our application with the updated database schema:

::: code-group

```sh [bun]
bun run deploy
```

```sh [npm]
npm run deploy
```

```sh [pnpm]
pnpm run deploy
```

```sh [yarn]
yarn run deploy
```

:::

The D1Database resource will automatically apply migrations from the directory we specified earlier (`migrationsDir: "drizzle"`).

## Local Development

Redwood has integrated development tooling. Run the development server:

::: code-group

```sh [bun]
bun run dev
```

```sh [npm]
npm run dev
```

```sh [pnpm]
pnpm run dev
```

```sh [yarn]
yarn run dev
```

:::

This will start both the web and API sides of your Redwood application:

```sh
  VITE v6.3.2  ready in 2848 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Debug:   http://localhost:5173/__debug
  ➜  press h + enter to show help
^C%
```

## Tear Down

That's it! You can now tear down the app (if you want to):

::: code-group

```sh [bun]
bun run destroy
```

```sh [npm]
npm run destroy
```

```sh [pnpm]
pnpm run destroy
```

```sh [yarn]
yarn run destroy
```

:::
