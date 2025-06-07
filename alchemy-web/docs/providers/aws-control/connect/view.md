---
title: Managing AWS Connect Views with Alchemy
description: Learn how to create, update, and manage AWS Connect Views using Alchemy Cloud Control.
---

# View

The View resource lets you create and manage [AWS Connect Views](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-view.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const view = await AWS.Connect.View("view-example", {
  Actions: ["example-actions-1"],
  InstanceArn: "example-instancearn",
  Name: "view-",
  Template: {},
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A view resource managed by Alchemy",
});
```

## Advanced Configuration

Create a view with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedView = await AWS.Connect.View("advanced-view", {
  Actions: ["example-actions-1"],
  InstanceArn: "example-instancearn",
  Name: "view-",
  Template: {},
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A view resource managed by Alchemy",
});
```

