---
title: Sentry Client Key
description: Learn how to create, configure, and manage Sentry client keys using Alchemy.
---


Create and manage Sentry client keys.

## Authentication

You can authenticate with Sentry in two ways:

1. Environment variable (recommended):

   ```bash
   # .env
   SENTRY_AUTH_TOKEN=your_auth_token
   ```

2. Pass the token directly:

   ```typescript
   const key = await ClientKey("my-key", {
     authToken: alchemy.secret(process.env.SENTRY_AUTH_TOKEN),
     name: "My Key",
     project: "my-project",
     organization: "my-org",
   });
   ```

Get your [Sentry User Auth Token](https://sentry.io/settings/account/api/auth-tokens/).

## Examples

### Minimal Example

Create a basic Sentry client key:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("my-key", {
  name: "My Key",
  project: "my-project",
  organization: "my-org"
});
```

### Rate Limited Key

Create a client key with rate limiting:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("rate-limited-key", {
  name: "Rate Limited Key",
  project: "my-project",
  organization: "my-org",
  rateLimit: {
    window: 3600, // 1 hour
    count: 1000   // 1000 events per hour
  }
});
```

### Use Case Specific Key

Create a client key for a specific use case:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("profiling-key", {
  name: "Profiling Key",
  project: "my-project",
  organization: "my-org",
  useCase: "profiling"
});
```

### Adopt Existing Key

Create or adopt an existing key with the same name:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("existing-key", {
  adopt: true
  name: "Existing Key",
  project: "my-project",
  organization: "my-org",
});
``` 
