---
title: Scene
description: Learn how to create, update, and manage AWS IoTTwinMaker Scenes using Alchemy Cloud Control.
---


The Scene resource lets you manage [AWS IoTTwinMaker Scenes](https://docs.aws.amazon.com/iottwinmaker/latest/userguide/) for visualizing and interacting with digital twins of real-world systems.

## Minimal Example

Create a basic IoTTwinMaker Scene with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicScene = await AWS.IoTTwinMaker.Scene("basicScene", {
  SceneId: "myScene",
  ContentLocation: "s3://mybucket/mySceneContent",
  Description: "A basic IoTTwinMaker scene"
});
```

## Advanced Configuration

Configure a scene with additional metadata and capabilities for enhanced functionality.

```ts
const advancedScene = await AWS.IoTTwinMaker.Scene("advancedScene", {
  SceneId: "advancedScene",
  ContentLocation: "s3://mybucket/advancedSceneContent",
  SceneMetadata: {
    author: "Jane Doe",
    version: "1.2.0"
  },
  Capabilities: ["3D", "Interactive"],
  WorkspaceId: "workspace-123"
});
```

## Scene with Tags

Create a scene that includes tags for better organization and management.

```ts
const taggedScene = await AWS.IoTTwinMaker.Scene("taggedScene", {
  SceneId: "taggedScene",
  ContentLocation: "s3://mybucket/taggedSceneContent",
  Tags: {
    environment: "production",
    project: "IoTTwinMakerDemo"
  },
  WorkspaceId: "workspace-456"
});
```

## Scene Adoption

Create a scene that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedScene = await AWS.IoTTwinMaker.Scene("adoptedScene", {
  SceneId: "existingScene",
  ContentLocation: "s3://mybucket/existingSceneContent",
  adopt: true, // This will adopt the existing resource
  WorkspaceId: "workspace-789"
});
```
