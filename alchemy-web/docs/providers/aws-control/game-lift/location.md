---
title: Managing AWS GameLift Locations with Alchemy
description: Learn how to create, update, and manage AWS GameLift Locations using Alchemy Cloud Control.
---

# Location

The Location resource lets you manage [AWS GameLift Locations](https://docs.aws.amazon.com/gamelift/latest/userguide/) which are essential for deploying game servers in specific geographic regions to reduce latency and improve player experience.

## Minimal Example

Create a basic GameLift Location with a defined name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const GameLiftLocation = await AWS.GameLift.Location("MainLocation", {
  LocationName: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Game", Value: "BattleRoyale" }
  ]
});
```

## Advanced Configuration

Configure a GameLift Location to adopt an existing resource.

```ts
const ExistingGameLiftLocation = await AWS.GameLift.Location("ExistingLocation", {
  LocationName: "us-east-1",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Game", Value: "AdventureQuest" }
  ]
});
```

## Location with Custom Tags

Create a GameLift Location with custom tags to track resources effectively.

```ts
const CustomTaggedLocation = await AWS.GameLift.Location("CustomTagLocation", {
  LocationName: "eu-central-1",
  Tags: [
    { Key: "Department", Value: "GameDevelopment" },
    { Key: "CostCenter", Value: "1234" }
  ]
});
```