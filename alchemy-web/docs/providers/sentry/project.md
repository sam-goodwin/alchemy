---
title: Managing Sentry Projects with Alchemy
description: Learn how to create, configure, and manage Sentry projects using Alchemy.
---

# Project

The Project resource lets you create and manage [Sentry](https://sentry.io) projects within your teams.

## Minimal Example

Create a basic Sentry project:

```ts
import { Project } from "alchemy/sentry";

const project = await Project("my-project", {
  name: "My Project",
  team: "my-team",
  organization: "my-org"
});
```

## Custom Platform

Create a project for a specific platform:

```ts
import { Project } from "alchemy/sentry";

const project = await Project("js-project", {
  name: "JavaScript Project",
  team: "my-team",
  organization: "my-org",
  platform: "javascript"
});
```

## Custom Slug and Rules

Create a project with a custom slug and disabled default rules:

```ts
import { Project } from "alchemy/sentry";

const project = await Project("custom-project", {
  name: "Custom Project",
  team: "my-team",
  organization: "my-org",
  slug: "custom-project-slug",
  defaultRules: false
});
```

## Adopt Existing Project

Create or adopt an existing project with the same slug:

```ts
import { Project } from "alchemy/sentry";

const project = await Project("existing-project", {
  name: "Existing Project",
  team: "my-team",
  organization: "my-org",
  adopt: true
});
``` 