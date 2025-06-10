---
title: MatchmakingConfiguration
description: Learn how to create, update, and manage AWS GameLift MatchmakingConfigurations using Alchemy Cloud Control.
---


The MatchmakingConfiguration resource allows you to manage [AWS GameLift MatchmakingConfigurations](https://docs.aws.amazon.com/gamelift/latest/userguide/) for creating and managing multiplayer game sessions. This resource provides various properties that define the matchmaking settings, including game properties and player count configurations.

## Minimal Example

Create a basic matchmaking configuration with required properties and a few optional settings.

```ts
import AWS from "alchemy/aws/control";

const matchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("basicMatchmakingConfig", {
  name: "BasicMatchmaking",
  ruleSetName: "defaultRuleSet",
  requestTimeoutSeconds: 30,
  acceptanceRequired: true,
  additionalPlayerCount: 2,
  gameProperties: [
    {
      key: "GameMode",
      value: "TeamDeathmatch"
    }
  ]
});
```

## Advanced Configuration

Configure a matchmaking setup with advanced settings including notifications and custom event data.

```ts
const advancedMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("advancedMatchmakingConfig", {
  name: "AdvancedMatchmaking",
  ruleSetName: "advancedRuleSet",
  requestTimeoutSeconds: 60,
  acceptanceRequired: true,
  notificationTarget: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  customEventData: JSON.stringify({ eventType: "MatchmakingStarted" }),
  gameProperties: [
    {
      key: "GameMode",
      value: "CaptureTheFlag"
    }
  ],
  gameSessionData: "sessionDataExample"
});
```

## Backfill Mode Example

Create a matchmaking configuration that uses backfill mode to allow new players to join existing game sessions.

```ts
const backfillMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("backfillMatchmakingConfig", {
  name: "BackfillMatchmaking",
  ruleSetName: "backfillRuleSet",
  requestTimeoutSeconds: 30,
  acceptanceRequired: true,
  backfillMode: "ALLOW",
  gameSessionQueueArns: [
    "arn:aws:gamelift:us-west-2:123456789012:gamesessionqueue/MyGameSessionQueue"
  ],
  additionalPlayerCount: 1
});
```

## Custom Event Data

Set up a matchmaking configuration with custom event data to track specific game events.

```ts
const customEventMatchmakingConfig = await AWS.GameLift.MatchmakingConfiguration("customEventMatchmakingConfig", {
  name: "CustomEventMatchmaking",
  ruleSetName: "customEventRuleSet",
  requestTimeoutSeconds: 45,
  acceptanceRequired: true,
  customEventData: JSON.stringify({ eventID: "GameStart", playerCount: 10 }),
  gameProperties: [
    {
      key: "Map",
      value: "DesertMap"
    }
  ]
});
```
