---
order: 21
title: Prisma
description: Get started with Prisma projects and database management using Alchemy's Infrastructure-as-Code approach for modern application development.
---

# Getting Started with Prisma

This guide will walk you through setting up a Prisma project for modern application development using Alchemy.

## Install

First, install Alchemy and the necessary dependencies:

::: code-group

```sh [bun]
bun add -D alchemy
```

```sh [npm]
npm install --save-dev alchemy
```

```sh [pnpm]
pnpm add -D alchemy
```

```sh [yarn]
yarn add --dev alchemy
```

:::

## Credentials

To use Prisma with Alchemy, you'll need:

1. **Prisma API Key**: Create an API key in your [Prisma Cloud Console](https://cloud.prisma.io)
2. **Organization ID** (optional): Your Prisma organization identifier

Add these to your `.env` file:

```sh
PRISMA_API_KEY=your_api_key_here
```

::: warning
Keep your API key secure and never commit it to version control. The API key provides full access to your Prisma projects and data.
:::

## Create a Prisma application

Initialize a new Node.js project and set up the basic structure:

::: code-group

```sh [bun]
mkdir my-prisma-app
cd my-prisma-app
bun init
```

```sh [npm]
mkdir my-prisma-app
cd my-prisma-app
npm init -y
```

```sh [pnpm]
mkdir my-prisma-app
cd my-prisma-app
pnpm init
```

```sh [yarn]
mkdir my-prisma-app
cd my-prisma-app
yarn init -y
```

:::

## Create `alchemy.run.ts`

Create your infrastructure configuration file:

```ts
import alchemy from "alchemy";
import { Project } from "alchemy/prisma";

const app = await alchemy("my-prisma-app");

// Create a Prisma project
const project = await Project("main-project", {
  name: "My Application",
  description: "A modern web application with Prisma",
  region: "us-east-1",
  private: false,
});

// Output project information
console.log("Prisma Project created successfully!");
console.log("Project ID:", project.id);
console.log("Project Name:", project.name);
console.log("Environments:", project.environments.length);

// List available environments
project.environments.forEach((env) => {
  console.log(`Environment: ${env.name} (${env.type})`);
  if (env.databaseUrl) {
    console.log(`Database URL: ${env.databaseUrl.unencrypted}`);
  }
});

await app.finalize();
```

For a more comprehensive setup with environment variables:

```ts
import alchemy from "alchemy";
import { Project } from "alchemy/prisma";

const app = await alchemy("my-prisma-app");

const project = await Project("main-project", {
  name: "My Application",
  description: "A production-ready application",
  organizationId: "my-org-id", // Optional
  region: "us-east-1",
  private: true,
  environmentVariables: {
    NODE_ENV: "production",
    LOG_LEVEL: "info",
  },
});

console.log("Project setup complete!");
console.log("Access your project at: https://cloud.prisma.io/projects/" + project.id);

await app.finalize();
```

## Deploy

Run the `alchemy.run.ts` script to deploy your infrastructure:

::: code-group

```sh [bun]
bun alchemy.run.ts
```

```sh [npm]
npx tsx alchemy.run.ts
```

```sh [pnpm]
pnpm tsx alchemy.run.ts
```

```sh [yarn]
yarn tsx alchemy.run.ts
```

:::

You should see output similar to:

```sh
Prisma Project created successfully!
Project ID: prj_abc123def456
Project Name: My Application
Environments: 1
Environment: production (production)
Access your project at: https://cloud.prisma.io/projects/prj_abc123def456
```

This creates:
- A new Prisma project in your organization
- Default environment configurations
- Project metadata and settings

## Next Steps

With your Prisma project created, you can now:

1. **Set up your database schema** using Prisma's schema definition language
2. **Configure environments** for development, staging, and production
3. **Connect your application** using the generated connection strings
4. **Deploy schema changes** and manage migrations

## Working with Environments

Once your project is created, you can access environment-specific database URLs:

```ts
// Access database connection for your application
const databaseUrl = project.environments[0].databaseUrl?.unencrypted;

// Use this URL in your Prisma client configuration
// DATABASE_URL=postgresql://user:pass@host:port/dbname
```

## Tear Down

When you're done experimenting, you can tear down all resources:

::: code-group

```sh [bun]
bun alchemy.run.ts --destroy
```

```sh [npm]
npx tsx alchemy.run.ts --destroy
```

```sh [pnpm]
pnpm tsx alchemy.run.ts --destroy
```

```sh [yarn]
yarn tsx alchemy.run.ts --destroy
```

:::

This will clean up all Prisma projects and associated resources created by Alchemy.

## Best Practices

- **Environment Isolation**: Create separate projects for development, staging, and production
- **Secret Management**: Use Alchemy's secret management for sensitive configuration
- **Resource Naming**: Use consistent naming conventions for easy identification
- **Documentation**: Document your schema and environment configurations

## Troubleshooting

**API Key Issues**: Ensure your `PRISMA_API_KEY` is correctly set and has the necessary permissions.

**Project Creation Fails**: Check that your organization has available quota and your account has project creation permissions.

**Environment Variables**: Verify that environment variables are properly formatted and contain valid values.

For more advanced configurations and additional resources, check out the [Prisma provider documentation](/docs/providers/prisma/).