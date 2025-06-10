---
title: Project
description: Learn how to create and manage Vercel projects using Alchemy for deploying web applications with Git integration and environment variables.
---

Create and manage Vercel projects.

## Authentication

To use this resource, set `VERCEL_ACCESS_TOKEN` in your `.env` file or pass `accessToken` directly in your resource configuration.

## Examples

### With `accessToken`

```ts
const project = await Project("my-app", {
  accessToken: alchemy.secret(process.env.VERCEL_ACCESS_TOKEN),
  name: "my-app",
  framework: "astro",
});
```

### With GitHub

```typescript
const project = await Project("my-app", {
  name: "my-app",
  framework: "nextjs",
  gitRepository: {
    type: "github",
    repo: "username/my-app",
  },
});
```

### With Environment Variables

#### Plain Text

```ts
const project = await Project("my-app", {
  name: "my-app",
  environmentVariables: [
    {
      key: "PUBLIC_URL",
      target: ["production", "preview", "development"],
      // `type: "plain"` default when `value` is a string
      value: "https://example.com",
    },
  ],
});
```

#### Encrypted

```ts
const project = await Project("my-app", {
  name: "my-app",
  environmentVariables: [
    {
      key: "DATABASE_URL",
      target: ["production", "preview"],
      // `type: "encrypted"` is the default when `value` is a Secret
      value: alchemy.secret("DATABASE_URL"),
    },
  ],
});
```

#### Sensitive

> https://vercel.com/docs/environment-variables/sensitive-environment-variables

```ts
const project = await Project("my-app", {
  name: "my-app",
  environmentVariables: [
    {
      key: "DATABASE_URL",
      target: ["production", "preview"],
      type: "sensitive",
      value: alchemy.secret("DATABASE_URL"),
    },
  ],
});
```

### With Custom Build Settings

```ts
const project = await Project("my-app", {
  name: "my-app",
  buildCommand: "npm run build",
  outputDirectory: "dist",
  installCommand: "npm install",
  devCommand: "npm run dev",
});
```
