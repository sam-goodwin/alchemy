---
title: Alias
description: Learn how to create, update, and manage AWS GameLift Aliases using Alchemy Cloud Control.
---


The Alias resource lets you manage [AWS GameLift Aliases](https://docs.aws.amazon.com/gamelift/latest/userguide/) to route player traffic to game server fleets.

## Minimal Example

Create a basic GameLift alias with a routing strategy.

```ts
import AWS from "alchemy/aws/control";

const gameLiftAlias = await AWS.GameLift.Alias("basicAlias", {
  Name: "BasicGameAlias",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-12345678"
  }
});
```

## Enhanced Description and Tags

Configure an alias with a description and tags for better management.

```ts
const taggedAlias = await AWS.GameLift.Alias("taggedAlias", {
  Name: "TaggedGameAlias",
  Description: "This alias routes traffic to the main game server fleet.",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-87654321"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Game", Value: "MyAwesomeGame" }
  ]
});
```

## Advanced Routing Strategy

Create an alias with a complex routing strategy that includes multiple fleet options.

```ts
const advancedAlias = await AWS.GameLift.Alias("advancedAlias", {
  Name: "AdvancedGameAlias",
  Description: "Routes players based on player count.",
  RoutingStrategy: {
    Type: "TARGET_BASED",
    FleetId: "fleet-11223344",
    Message: "Directing traffic to the best available server based on load."
  }
});
```

## Adoption of Existing Resources

Create an alias while adopting an existing resource if it already exists.

```ts
const existingAlias = await AWS.GameLift.Alias("existingAlias", {
  Name: "ExistingGameAlias",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-55667788"
  },
  adopt: true
});
```
