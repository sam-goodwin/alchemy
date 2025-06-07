---
title: Managing AWS GameLift Builds with Alchemy
description: Learn how to create, update, and manage AWS GameLift Builds using Alchemy Cloud Control.
---

# Build

The Build resource allows you to manage [AWS GameLift Builds](https://docs.aws.amazon.com/gamelift/latest/userguide/) for deploying and scaling game server applications.

## Minimal Example

Create a basic GameLift Build with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicBuild = await AWS.GameLift.Build("BasicBuild", {
  Name: "MyGameBuild",
  OperatingSystem: "WINDOWS_2012",
  Version: "1.0.0",
  StorageLocation: {
    Bucket: "my-game-builds",
    Key: "MyGameBuild.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftUploadRole"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Game", Value: "MySuperGame" }
  ]
});
```

## Advanced Configuration

Configure a GameLift Build with additional options like server SDK version.

```ts
const advancedBuild = await AWS.GameLift.Build("AdvancedBuild", {
  Name: "MyAdvancedGameBuild",
  OperatingSystem: "WINDOWS_2012",
  Version: "1.0.1",
  ServerSdkVersion: "v1.0.0",
  StorageLocation: {
    Bucket: "my-game-builds",
    Key: "MyAdvancedGameBuild.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftUploadRole"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Game", Value: "MySuperGame" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing GameLift Build into your management, you can do so by setting the `adopt` property.

```ts
const adoptBuild = await AWS.GameLift.Build("AdoptExistingBuild", {
  Name: "ExistingGameBuild",
  adopt: true
});
```

## Custom Storage Location

Create a GameLift Build with a custom storage location configuration.

```ts
const customStorageBuild = await AWS.GameLift.Build("CustomStorageBuild", {
  Name: "MyCustomStorageGameBuild",
  OperatingSystem: "LINUX",
  Version: "1.2.0",
  StorageLocation: {
    Bucket: "custom-bucket",
    Key: "MyCustomGameBuild.zip",
    RoleArn: "arn:aws:iam::123456789012:role/GameLiftUploadRole"
  },
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "GameDev" }
  ]
});
```