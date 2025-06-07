---
title: Managing AWS AppStream Applications with Alchemy
description: Learn how to create, update, and manage AWS AppStream Applications using Alchemy Cloud Control.
---

# Application

The Application resource allows you to create and manage [AWS AppStream Applications](https://docs.aws.amazon.com/appstream/latest/userguide/) that provide users with access to hosted applications. You can configure various properties such as the application launch path, instance families, and associated app blocks.

## Minimal Example

Create a basic AppStream application with the required properties and a few common optional properties.

```ts
import AWS from "alchemy/aws/control";

const BasicAppStreamApplication = await AWS.AppStream.Application("BasicApp", {
  Name: "MyApp",
  AppBlockArn: "arn:aws:appstream:us-west-2:123456789012:app-block/MyAppBlock",
  LaunchPath: "C:\\Program Files\\MyApp\\MyApp.exe",
  Platforms: ["WINDOWS"],
  InstanceFamilies: ["general"],
  IconS3Location: {
    S3Bucket: "my-app-icons",
    S3Key: "myapp-icon.png"
  },
  Description: "This is a sample AppStream application."
});
```

## Advanced Configuration

Configure an AppStream application with additional settings such as launch parameters and tags.

```ts
const AdvancedAppStreamApplication = await AWS.AppStream.Application("AdvancedApp", {
  Name: "MyAdvancedApp",
  AppBlockArn: "arn:aws:appstream:us-west-2:123456789012:app-block/MyAdvancedAppBlock",
  LaunchPath: "C:\\Program Files\\MyAdvancedApp\\MyAdvancedApp.exe",
  Platforms: ["WINDOWS"],
  InstanceFamilies: ["compute"],
  LaunchParameters: "--config /path/to/config",
  IconS3Location: {
    S3Bucket: "my-app-icons",
    S3Key: "myadvancedapp-icon.png"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Resource Adoption

Create an AppStream application that adopts an existing resource instead of failing if the resource already exists.

```ts
const AdoptedAppStreamApplication = await AWS.AppStream.Application("AdoptedApp", {
  Name: "MyAdoptedApp",
  AppBlockArn: "arn:aws:appstream:us-west-2:123456789012:app-block/MyAdoptedAppBlock",
  LaunchPath: "C:\\Program Files\\MyAdoptedApp\\MyAdoptedApp.exe",
  Platforms: ["WINDOWS"],
  InstanceFamilies: ["streaming"],
  IconS3Location: {
    S3Bucket: "my-app-icons",
    S3Key: "myadoptedapp-icon.png"
  },
  adopt: true
});
```

## Updating Attributes

Update an existing AppStream application by specifying attributes to delete.

```ts
const UpdateAppStreamApplication = await AWS.AppStream.Application("UpdateApp", {
  Name: "MyUpdatedApp",
  AppBlockArn: "arn:aws:appstream:us-west-2:123456789012:app-block/MyUpdatedAppBlock",
  LaunchPath: "C:\\Program Files\\MyUpdatedApp\\MyUpdatedApp.exe",
  Platforms: ["WINDOWS"],
  InstanceFamilies: ["small"],
  AttributesToDelete: ["Description"],
  IconS3Location: {
    S3Bucket: "my-app-icons",
    S3Key: "myupdatedapp-icon.png"
  }
});
```