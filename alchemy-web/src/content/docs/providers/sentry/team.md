---
title: Sentry Team
description: Learn how to create, configure, and manage Sentry teams using Alchemy.
---


Create and manage Sentry teams.

## Authentication

You can authenticate with Sentry in two ways:

1. Environment variable (recommended):
   ```bash
   # .env
   SENTRY_AUTH_TOKEN=your_auth_token
   ```

2. Pass the token directly:
   ```typescript
   const team = await Team("my-team", {
     authToken: alchemy.secret(process.env.SENTRY_AUTH_TOKEN),
     name: "My Team",
     organization: "my-org",
   });
   ```

Get your auth token from [Sentry's API settings](https://sentry.io/settings/account/api/auth-tokens/).

## Examples 

### Minimal

```typescript
import { Team } from "alchemy/sentry";

const team = await Team("my-team", {
  name: "My Team",
  organization: "my-org",
});
```

### Adopt

For when you have an existing Team within Sentry:

```typescript
import { Team } from "alchemy/sentry";

const team = await Team("my-team", {
  adopt: true,
  name: "My Team",
  organization: "my-org",
});
```
