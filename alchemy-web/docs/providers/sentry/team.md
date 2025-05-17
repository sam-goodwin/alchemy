---
title: Managing Sentry Teams with Alchemy
description: Learn how to create, configure, and manage Sentry teams using Alchemy.
---

# Team

The Team resource lets you create and manage [Sentry](https://sentry.io) teams within your organization.

## Minimal Example

Create a basic Sentry team:

```ts
import { Team } from "alchemy/sentry";

const team = await Team("my-team", {
  name: "My Team",
  organization: "my-org"
});
```

## Custom Slug

Create a team with a custom slug:

```ts
import { Team } from "alchemy/sentry";

const team = await Team("custom-team", {
  name: "Custom Team",
  organization: "my-org",
  slug: "custom-team-slug"
});
```

## Adopt Existing Team

Create or adopt an existing team with the same slug:

```ts
import { Team } from "alchemy/sentry";

const team = await Team("existing-team", {
  name: "Existing Team",
  organization: "my-org",
  adopt: true
});
``` 