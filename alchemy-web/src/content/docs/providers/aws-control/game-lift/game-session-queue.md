---
title: GameSessionQueue
description: Learn how to create, update, and manage AWS GameLift GameSessionQueues using Alchemy Cloud Control.
---


The GameSessionQueue resource allows you to manage [AWS GameLift GameSessionQueues](https://docs.aws.amazon.com/gamelift/latest/userguide/) for organizing game sessions and managing server resources effectively.

## Minimal Example

Create a basic GameSessionQueue with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const gameSessionQueue = await AWS.GameLift.GameSessionQueue("simpleQueue", {
  name: "MyGameSessionQueue",
  timeoutInSeconds: 300,
  destinations: [
    {
      destinationArn: "arn:aws:gamelift:us-west-2::fleet/my-fleet-id"
    }
  ]
});
```

## Advanced Configuration

Configure a GameSessionQueue with player latency policies and notification targets for enhanced management.

```ts
const advancedQueue = await AWS.GameLift.GameSessionQueue("advancedQueue", {
  name: "AdvancedGameSessionQueue",
  timeoutInSeconds: 600,
  playerLatencyPolicies: [
    {
      maximumIndividualPlayerLatencyMilliseconds: 100,
      policyDurationSeconds: 30
    },
    {
      maximumIndividualPlayerLatencyMilliseconds: 200,
      policyDurationSeconds: 60
    }
  ],
  destinations: [
    {
      destinationArn: "arn:aws:gamelift:us-west-2::fleet/my-fleet-id-2"
    }
  ],
  notificationTarget: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  customEventData: "GameSessionQueue created with advanced settings"
});
```

## Using Tags and Filter Configuration

Create a GameSessionQueue that includes tagging for resource management and filter configuration for session management.

```ts
const taggedQueue = await AWS.GameLift.GameSessionQueue("taggedQueue", {
  name: "TaggedGameSessionQueue",
  timeoutInSeconds: 300,
  destinations: [
    {
      destinationArn: "arn:aws:gamelift:us-west-2::fleet/my-fleet-id-3"
    }
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "GameType", value: "BattleRoyale" }
  ],
  filterConfiguration: {
    allowedPlayerIds: ["player1", "player2", "player3"]
  }
});
```
