---
title: Managing AWS ResourceExplorer2 Views with Alchemy
description: Learn how to create, update, and manage AWS ResourceExplorer2 Views using Alchemy Cloud Control.
---

# View

The View resource lets you create and manage [AWS ResourceExplorer2 Views](https://docs.aws.amazon.com/resourceexplorer2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourceexplorer2-view.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const view = await AWS.ResourceExplorer2.View("view-example", {
  ViewName: "view-view",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a view with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedView = await AWS.ResourceExplorer2.View("advanced-view", {
  ViewName: "view-view",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

