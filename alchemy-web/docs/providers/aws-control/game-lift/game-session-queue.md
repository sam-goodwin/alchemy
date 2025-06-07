---
title: Managing AWS GameLift GameSessionQueues with Alchemy
description: Learn how to create, update, and manage AWS GameLift GameSessionQueues using Alchemy Cloud Control.
---

# GameSessionQueue

The GameSessionQueue resource lets you create and manage [AWS GameLift GameSessionQueues](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-gamesessionqueue.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gamesessionqueue = await AWS.GameLift.GameSessionQueue("gamesessionqueue-example", {
  Name: "gamesessionqueue-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a gamesessionqueue with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGameSessionQueue = await AWS.GameLift.GameSessionQueue("advanced-gamesessionqueue", {
  Name: "gamesessionqueue-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

