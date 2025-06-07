---
title: Managing AWS ResilienceHub Apps with Alchemy
description: Learn how to create, update, and manage AWS ResilienceHub Apps using Alchemy Cloud Control.
---

# App

The App resource lets you create and manage [AWS ResilienceHub Apps](https://docs.aws.amazon.com/resiliencehub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resiliencehub-app.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const app = await AWS.ResilienceHub.App("app-example", {
  AppTemplateBody: "example-apptemplatebody",
  ResourceMappings: [],
  Name: "app-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A app resource managed by Alchemy",
});
```

## Advanced Configuration

Create a app with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApp = await AWS.ResilienceHub.App("advanced-app", {
  AppTemplateBody: "example-apptemplatebody",
  ResourceMappings: [],
  Name: "app-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A app resource managed by Alchemy",
});
```

