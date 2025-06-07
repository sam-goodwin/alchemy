---
title: Managing AWS GameLift GameServerGroups with Alchemy
description: Learn how to create, update, and manage AWS GameLift GameServerGroups using Alchemy Cloud Control.
---

# GameServerGroup

The GameServerGroup resource lets you create and manage [AWS GameLift GameServerGroups](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gameservergroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gameservergroup = await AWS.GameLift.GameServerGroup("gameservergroup-example", {
  GameServerGroupName: "gameservergroup-gameservergroup",
  InstanceDefinitions: [],
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a gameservergroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGameServerGroup = await AWS.GameLift.GameServerGroup("advanced-gameservergroup", {
  GameServerGroupName: "gameservergroup-gameservergroup",
  InstanceDefinitions: [],
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

