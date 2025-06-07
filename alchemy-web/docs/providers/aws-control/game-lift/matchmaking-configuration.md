---
title: Managing AWS GameLift MatchmakingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS GameLift MatchmakingConfigurations using Alchemy Cloud Control.
---

# MatchmakingConfiguration

The MatchmakingConfiguration resource allows you to create and manage matchmaking configurations for AWS GameLift. This resource is essential for defining how players are matched in your multiplayer games. For more information, visit the [AWS GameLift MatchmakingConfigurations documentation](https://docs.aws.amazon.com/gamelift/latest/userguide/).

## Minimal Example

Create a basic matchmaking configuration with required properties and some common options.

```ts
import AWS from "alchemy/aws/control";

const BasicMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("BasicMatchmakingConfig", {
  Name: "MyGameMatchmaking",
  RuleSetName: "MyGameRuleSet",
  AcceptanceRequired: true,
  RequestTimeoutSeconds: 30,
  GameProperties: [
    { Key: "MapName", Value: "Desert" },
    { Key: "GameMode", Value: "TeamDeathmatch" }
  ],
  AdditionalPlayerCount: 2,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "GameDev" }
  ]
});
```

## Advanced Configuration

Configure a matchmaking setup with advanced options such as custom event data and notifications.

```ts
const AdvancedMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("AdvancedMatchmakingConfig", {
  Name: "AdvancedGameMatchmaking",
  RuleSetName: "AdvancedGameRules",
  AcceptanceRequired: true,
  RequestTimeoutSeconds: 60,
  NotificationTarget: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  CustomEventData: "PlayerData",
  GameSessionData: "SessionData",
  AcceptanceTimeoutSeconds: 15,
  GameSessionQueueArns: [
    "arn:aws:gamelift:us-west-2:123456789012:gamesessionqueue/MyGameSessionQueue"
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Backfill Mode Example

Create a matchmaking configuration with backfill mode enabled for ongoing games.

```ts
const BackfillMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("BackfillMatchmakingConfig", {
  Name: "BackfillMatchmaking",
  RuleSetName: "BackfillGameRules",
  AcceptanceRequired: false,
  RequestTimeoutSeconds: 45,
  BackfillMode: "AUTOMATIC",
  GameSessionQueueArns: [
    "arn:aws:gamelift:us-west-2:123456789012:gamesessionqueue/BackfillQueue"
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Operations" }
  ]
});
```

## Custom Event Data Example

Demonstrate setting up custom event data for player sessions.

```ts
const CustomEventMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("CustomEventMatchmakingConfig", {
  Name: "CustomEventMatchmaking",
  RuleSetName: "CustomEventRules",
  AcceptanceRequired: true,
  RequestTimeoutSeconds: 30,
  CustomEventData: JSON.stringify({ gameMode: "CaptureTheFlag", maxPlayers: 10 }),
  GameSessionData: "CustomSessionData",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Development" }
  ]
});
```