---
title: Build
description: Learn how to create, update, and manage AWS GameLift Builds using Alchemy Cloud Control.
---


The Build resource lets you manage [AWS GameLift Builds](https://docs.aws.amazon.com/gamelift/latest/userguide/) for deploying your game server binaries to the GameLift service.

## Minimal Example

Create a basic GameLift build with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const gameLiftBuild = await AWS.GameLift.Build("myGameLiftBuild", {
  Name: "MyAwesomeGame",
  OperatingSystem: "WINDOWS_2012",
  StorageLocation: {
    Bucket: "my-game-builds",
    Key: "game-build.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftAccessRole"
  }
});
```

## Advanced Configuration

Configure a GameLift build with more advanced options like specifying a version and server SDK version.

```ts
const advancedGameLiftBuild = await AWS.GameLift.Build("advancedGameLiftBuild", {
  Name: "MyAwesomeGame",
  OperatingSystem: "WINDOWS_2012",
  Version: "1.0.0",
  ServerSdkVersion: "v1.0.0",
  StorageLocation: {
    Bucket: "my-game-builds",
    Key: "game-build.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftAccessRole"
  },
  Tags: [
    { Key: "GameType", Value: "Multiplayer" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Tagging for Organization

Demonstrate how to tag builds for better organization and tracking.

```ts
const taggedGameLiftBuild = await AWS.GameLift.Build("taggedGameLiftBuild", {
  Name: "MyAwesomeGame",
  OperatingSystem: "LINUX",
  StorageLocation: {
    Bucket: "my-game-builds-linux",
    Key: "game-build-linux.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftAccessRole"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Resource Adoption

Show how to adopt an existing GameLift build if it already exists.

```ts
const adoptedGameLiftBuild = await AWS.GameLift.Build("adoptedGameLiftBuild", {
  Name: "MyExistingGameLiftBuild",
  OperatingSystem: "WINDOWS_2012",
  StorageLocation: {
    Bucket: "my-existing-game-builds",
    Key: "existing-build.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftAccessRole"
  },
  adopt: true // This will adopt the existing resource instead of failing
});
```
