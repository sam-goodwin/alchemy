---
title: Sentry Project
description: Learn how to create, configure, and manage Sentry projects using Alchemy.
---


Create and manage Sentry projects.

## Authentication

You can authenticate with Sentry in two ways:

1. Environment variable (recommended):
   ```bash
   # .env
   SENTRY_AUTH_TOKEN=your_auth_token
   ```

2. Pass the token directly:
   ```typescript
   const project = await Project("my-project", {
     authToken: alchemy.secret(process.env.SENTRY_AUTH_TOKEN),
     name: "My Project",
     organization: "my-org",
     team: "my-team",
   });
   ```

Get your auth token from [Sentry's API settings](https://sentry.io/settings/account/api/auth-tokens/).

## Examples 

### Minimal

```typescript
import { Project } from "alchemy/sentry";

const project = await Project("my-project", {
  name: "My Project",
  organization: "my-org"
  team: "my-team",
});
```

### Adopt

For when you have an existing Project in Sentry already.

```ts
const project = await Project("my-project", {
  adopt: true,
  name: "My Project",
  organization: "my-org",
  team: "my-team",
})
