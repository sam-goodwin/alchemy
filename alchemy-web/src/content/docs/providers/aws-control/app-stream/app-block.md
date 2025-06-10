---
title: AppBlock
description: Learn how to create, update, and manage AWS AppStream AppBlocks using Alchemy Cloud Control.
---


The AppBlock resource allows you to create and manage [AWS AppStream AppBlocks](https://docs.aws.amazon.com/appstream/latest/userguide/), which are used to define the applications that can be streamed to users. AppBlocks contain the applications and their associated settings.

## Minimal Example

Create a basic AppBlock with the required properties and a few optional configurations.

```ts
import AWS from "alchemy/aws/control";

const appBlock = await AWS.AppStream.AppBlock("basicAppBlock", {
  Name: "BasicAppBlock",
  SourceS3Location: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-app.zip"
  },
  DisplayName: "Basic Application Block",
  Description: "An AppBlock for a basic application setup."
});
```

## Advanced Configuration

Configure an AppBlock with setup and post-setup script details for additional customization.

```ts
const advancedAppBlock = await AWS.AppStream.AppBlock("advancedAppBlock", {
  Name: "AdvancedAppBlock",
  SourceS3Location: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-advanced-app.zip"
  },
  SetupScriptDetails: {
    ScriptS3Location: {
      S3Bucket: "my-scripts-bucket",
      S3Key: "setup-script.sh"
    },
    TimeoutInSeconds: 300
  },
  PostSetupScriptDetails: {
    ScriptS3Location: {
      S3Bucket: "my-scripts-bucket",
      S3Key: "post-setup-script.sh"
    },
    TimeoutInSeconds: 300
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Resource Adoption

Create an AppBlock that adopts an existing resource if it is already present.

```ts
const adoptAppBlock = await AWS.AppStream.AppBlock("adoptAppBlock", {
  Name: "ExistingAppBlock",
  SourceS3Location: {
    S3Bucket: "another-app-bucket",
    S3Key: "existing-app.zip"
  },
  adopt: true
});
```

## Packaging Type Configuration

Specify a packaging type when creating an AppBlock to define how the application will be delivered.

```ts
const packagedAppBlock = await AWS.AppStream.AppBlock("packagedAppBlock", {
  Name: "PackagedAppBlock",
  SourceS3Location: {
    S3Bucket: "my-packaged-app-bucket",
    S3Key: "packaged-app.zip"
  },
  PackagingType: "WINDOWS"
});
```
