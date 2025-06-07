---
title: Managing AWS GameLift Aliases with Alchemy
description: Learn how to create, update, and manage AWS GameLift Aliases using Alchemy Cloud Control.
---

# Alias

The Alias resource allows you to manage [AWS GameLift Aliases](https://docs.aws.amazon.com/gamelift/latest/userguide/) used for routing player sessions to different game servers. Aliases provide a way to simplify player connection requests and can be updated without changing the client.

## Minimal Example

Create a basic GameLift Alias with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const GameLiftAlias = await AWS.GameLift.Alias("basicAlias", {
  Name: "MyGameAlias",
  Description: "Alias for my game server",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-12345678" // Replace with actual fleet ID
  }
});
```

## Advanced Configuration

Configure an Alias with additional tags for better resource management:

```ts
const AdvancedGameLiftAlias = await AWS.GameLift.Alias("advancedAlias", {
  Name: "MyAdvancedGameAlias",
  Description: "Alias for my advanced game server setup",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-87654321" // Replace with actual fleet ID
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "GameDev" }
  ]
});
```

## Using a Complex Routing Strategy

Set up an Alias with a complex routing strategy for more control over session placements:

```ts
const ComplexRoutingGameLiftAlias = await AWS.GameLift.Alias("complexAlias", {
  Name: "MyComplexGameAlias",
  Description: "Alias for my game server with complex routing",
  RoutingStrategy: {
    Type: "TERMINAL",
    FleetId: "fleet-12345678", // Replace with actual fleet ID
    Message: "No available game servers"
  }
});
```

## Adopting an Existing Alias

Adopt an existing Alias instead of failing if it already exists:

```ts
const AdoptExistingAlias = await AWS.GameLift.Alias("existingAlias", {
  Name: "MyExistingGameAlias",
  Description: "Alias for the existing game server",
  RoutingStrategy: {
    Type: "SIMPLE",
    FleetId: "fleet-12345678" // Replace with actual fleet ID
  },
  adopt: true
});
```