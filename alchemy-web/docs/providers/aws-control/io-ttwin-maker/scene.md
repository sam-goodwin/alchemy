---
title: Managing AWS IoTTwinMaker Scenes with Alchemy
description: Learn how to create, update, and manage AWS IoTTwinMaker Scenes using Alchemy Cloud Control.
---

# Scene

The Scene resource lets you create and manage [AWS IoTTwinMaker Scenes](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iottwinmaker-scene.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scene = await AWS.IoTTwinMaker.Scene("scene-example", {
  SceneId: "example-sceneid",
  ContentLocation: "example-contentlocation",
  WorkspaceId: "example-workspaceid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A scene resource managed by Alchemy",
});
```

## Advanced Configuration

Create a scene with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedScene = await AWS.IoTTwinMaker.Scene("advanced-scene", {
  SceneId: "example-sceneid",
  ContentLocation: "example-contentlocation",
  WorkspaceId: "example-workspaceid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A scene resource managed by Alchemy",
});
```

