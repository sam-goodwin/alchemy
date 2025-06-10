---
title: Workspace
description: Learn how to create, update, and manage AWS IoTTwinMaker Workspaces using Alchemy Cloud Control.
---


The Workspace resource allows you to manage [AWS IoTTwinMaker Workspaces](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) that serve as environments for modeling and managing digital twins of physical systems.

## Minimal Example

Create a basic IoTTwinMaker workspace with required properties.

```ts
import AWS from "alchemy/aws/control";

const workspace = await AWS.IoTTwinMaker.Workspace("myWorkspace", {
  Role: "arn:aws:iam::123456789012:role/MyIoTTwinMakerRole",
  WorkspaceId: "myWorkspaceId",
  S3Location: "s3://my-bucket/my-workspace/",
  Description: "A workspace for managing my IoT models",
  Tags: {
    project: "IoTProject",
    environment: "development"
  }
});
```

## Advanced Configuration

Configure a workspace with an IAM role and custom tags for better resource management.

```ts
const advancedWorkspace = await AWS.IoTTwinMaker.Workspace("advancedWorkspace", {
  Role: "arn:aws:iam::123456789012:role/AdvancedIoTTwinMakerRole",
  WorkspaceId: "advancedWorkspaceId",
  S3Location: "s3://my-bucket/advanced-workspace/",
  Description: "An advanced workspace for IoT project",
  Tags: {
    project: "AdvancedIoTProject",
    environment: "production",
    owner: "team-lead"
  }
});
```

## Adopting Existing Resources

Specify the adoption of an existing workspace instead of failing if it already exists.

```ts
const adoptWorkspace = await AWS.IoTTwinMaker.Workspace("adoptWorkspace", {
  Role: "arn:aws:iam::123456789012:role/AdoptIoTTwinMakerRole",
  WorkspaceId: "existingWorkspaceId",
  S3Location: "s3://my-bucket/adopted-workspace/",
  Description: "Adopting an existing workspace",
  adopt: true // Set to true to adopt an existing resource
});
```
