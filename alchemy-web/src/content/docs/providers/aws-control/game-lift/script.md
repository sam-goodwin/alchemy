---
title: Script
description: Learn how to create, update, and manage AWS GameLift Scripts using Alchemy Cloud Control.
---


The Script resource allows you to manage [AWS GameLift Scripts](https://docs.aws.amazon.com/gamelift/latest/userguide/) that define the executable code for your game servers.

## Minimal Example

Create a basic GameLift Script with required properties and an optional name:

```ts
import AWS from "alchemy/aws/control";

const gameLiftScript = await AWS.GameLift.Script("myGameLiftScript", {
  StorageLocation: {
    Bucket: "my-game-scripts-bucket",
    Key: "scripts/myGameLiftScript.zip"
  },
  Name: "MyGameLiftScript",
  Version: "1.0.0"
});
```

## Advanced Configuration

Update a GameLift Script with additional tags and a specified version:

```ts
const updatedGameLiftScript = await AWS.GameLift.Script("myGameLiftScript", {
  StorageLocation: {
    Bucket: "my-game-scripts-bucket",
    Key: "scripts/myGameLiftScript_v2.zip"
  },
  Version: "2.0.0",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "GameType", Value: "Battle Royale" }
  ]
});
```

## Adopting Existing Resources

If you want to adopt an existing GameLift Script without failing, use the `adopt` property:

```ts
const adoptedGameLiftScript = await AWS.GameLift.Script("existingGameLiftScript", {
  StorageLocation: {
    Bucket: "my-game-scripts-bucket",
    Key: "scripts/existingGameLiftScript.zip"
  },
  adopt: true
});
```

## Managing Script Versions

You can manage different versions of a GameLift Script by specifying the version in the properties:

```ts
const versionedGameLiftScript = await AWS.GameLift.Script("myVersionedGameLiftScript", {
  StorageLocation: {
    Bucket: "my-game-scripts-bucket",
    Key: "scripts/myVersionedGameLiftScript.zip"
  },
  Version: "1.1.0" // Specify a new version
});
```
