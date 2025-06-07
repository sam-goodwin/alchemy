---
title: Managing AWS APS Workspaces with Alchemy
description: Learn how to create, update, and manage AWS APS Workspaces using Alchemy Cloud Control.
---

# Workspace

The Workspace resource lets you create and manage [AWS APS Workspaces](https://docs.aws.amazon.com/aps/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-aps-workspace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workspace = await AWS.APS.Workspace("workspace-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a workspace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkspace = await AWS.APS.Workspace("advanced-workspace", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

