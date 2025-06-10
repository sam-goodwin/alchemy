---
title: ProjectDomain
description: Learn how to add and manage custom domains for your Vercel projects using Alchemy.
---

Add and manage domains for Vercel projects.

## Authentication

To use this resource, you must authenticate with Vercel. You can do this in one of two ways:

1. **Environment Variable:** Set `VERCEL_ACCESS_TOKEN` in your `.env` file.
2. **Direct Prop:** Pass `accessToken` directly in your resource configuration.

## Examples

### Minimal

```ts
const domain = await ProjectDomain("my-app.com", {
  name: "my-app.com",
  project: "prj_123",
});
```

### With `accessToken`

```ts
const domain = await ProjectDomain("my-app.com", {
  accessToken: alchemy.secret(process.env.VERCEL_ACCESS_TOKEN),
  name: "my-app.com",
  project: "prj_123",
});
```

### With `redirect`

```ts
const domain = await ProjectDomain("my-app.com", {
  name: "my-app.com",
  project: "prj_123",
  gitBranch: "main",
  redirect: "https://example.com",
  redirectStatusCode: 301,
});
```
