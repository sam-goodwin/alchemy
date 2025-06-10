---
title: GameServerGroup
description: Learn how to create, update, and manage AWS GameLift GameServerGroups using Alchemy Cloud Control.
---


The GameServerGroup resource lets you manage [AWS GameLift GameServerGroups](https://docs.aws.amazon.com/gamelift/latest/userguide/) for deploying and scaling game servers effectively.

## Minimal Example

Create a basic GameServerGroup with required properties and a couple of optional configurations.

```ts
import AWS from "alchemy/aws/control";

const gameServerGroup = await AWS.GameLift.GameServerGroup("myGameServerGroup", {
  GameServerGroupName: "MyGameServerGroup",
  InstanceDefinitions: [
    {
      InstanceType: "c5.large",
      WeightedCapacity: "1"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/GameLiftServerRole",
  MinSize: 1,
  MaxSize: 5,
  VpcSubnets: ["10.0.0.0/24"]
});
```

## Advanced Configuration

Configure a GameServerGroup with an Auto Scaling Policy and specific balancing strategy.

```ts
const advancedGameServerGroup = await AWS.GameLift.GameServerGroup("advancedGameServerGroup", {
  GameServerGroupName: "AdvancedGameServerGroup",
  InstanceDefinitions: [
    {
      InstanceType: "c5.large",
      WeightedCapacity: "1"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/GameLiftServerRole",
  AutoScalingPolicy: {
    TargetValue: 50.0,
    ScaleUpInterval: 60,
    ScaleDownInterval: 60,
    ScaleUpThreshold: 70,
    ScaleDownThreshold: 30
  },
  BalancingStrategy: "SPOT",
  VpcSubnets: ["10.0.0.0/24"]
});
```

## Game Server Protection Policy

Create a GameServerGroup with a protection policy to safeguard game servers from termination.

```ts
const protectedGameServerGroup = await AWS.GameLift.GameServerGroup("protectedGameServerGroup", {
  GameServerGroupName: "ProtectedGameServerGroup",
  InstanceDefinitions: [
    {
      InstanceType: "c5.large",
      WeightedCapacity: "1"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/GameLiftServerRole",
  GameServerProtectionPolicy: "FULLY_PROTECTED",
  VpcSubnets: ["10.0.0.0/24"]
});
```

## Tagging Resources

Add tags to your GameServerGroup for better management and organization.

```ts
const taggedGameServerGroup = await AWS.GameLift.GameServerGroup("taggedGameServerGroup", {
  GameServerGroupName: "TaggedGameServerGroup",
  InstanceDefinitions: [
    {
      InstanceType: "c5.large",
      WeightedCapacity: "1"
    }
  ],
  RoleArn: "arn:aws:iam::123456789012:role/GameLiftServerRole",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Game",
      Value: "MyAwesomeGame"
    }
  ]
});
```
