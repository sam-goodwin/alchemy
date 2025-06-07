---
title: Managing AWS IoTTwinMaker Workspaces with Alchemy
description: Learn how to create, update, and manage AWS IoTTwinMaker Workspaces using Alchemy Cloud Control.
---

# Workspace

The Workspace resource lets you create and manage [AWS IoTTwinMaker Workspaces](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iottwinmaker-workspace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workspace = await AWS.IoTTwinMaker.Workspace("workspace-example", {
  Role: "example-role",
  WorkspaceId: "example-workspaceid",
  S3Location: "example-s3location",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workspace resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workspace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkspace = await AWS.IoTTwinMaker.Workspace("advanced-workspace", {
  Role: "example-role",
  WorkspaceId: "example-workspaceid",
  S3Location: "example-s3location",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A workspace resource managed by Alchemy",
});
```

