---
title: Managing AWS IVSChat Rooms with Alchemy
description: Learn how to create, update, and manage AWS IVSChat Rooms using Alchemy Cloud Control.
---

# Room

The Room resource lets you create and manage [AWS IVSChat Rooms](https://docs.aws.amazon.com/ivschat/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivschat-room.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const room = await AWS.IVSChat.Room("room-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a room with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRoom = await AWS.IVSChat.Room("advanced-room", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

