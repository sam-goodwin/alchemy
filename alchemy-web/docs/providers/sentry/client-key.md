---
title: Managing Sentry Client Keys with Alchemy
description: Learn how to create, configure, and manage Sentry client keys using Alchemy.
---

# ClientKey

The ClientKey resource lets you create and manage [Sentry](https://sentry.io) client keys for your projects.

## Minimal Example

Create a basic Sentry client key:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("my-key", {
  name: "My Key",
  project: "my-project",
  organization: "my-org"
});
```

## Rate Limited Key

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

## Use Case Specific Key

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

## Adopt Existing Key

Create or adopt an existing key with the same name:

```ts
import { ClientKey } from "alchemy/sentry";

const key = await ClientKey("existing-key", {
  name: "Existing Key",
  project: "my-project",
  organization: "my-org",
  adopt: true
});
``` 