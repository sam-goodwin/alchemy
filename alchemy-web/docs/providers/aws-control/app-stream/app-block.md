---
title: Managing AWS AppStream AppBlocks with Alchemy
description: Learn how to create, update, and manage AWS AppStream AppBlocks using Alchemy Cloud Control.
---

# AppBlock

The AppBlock resource allows you to manage [AWS AppStream AppBlocks](https://docs.aws.amazon.com/appstream/latest/userguide/) which are containers for applications and their associated settings. AppBlocks are essential for delivering applications to users in a managed way.

## Minimal Example

This example demonstrates how to create a basic AppBlock with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicAppBlock = await AWS.AppStream.AppBlock("basic-appblock", {
  Name: "BasicAppBlock",
  SourceS3Location: {
    S3Bucket: "my-app-stream-bucket",
    S3Key: "app/my-basic-app.zip"
  },
  Description: "A basic AppBlock for demonstration purposes."
});
```

## Advanced Configuration

In this example, we configure an AppBlock with setup scripts and additional tags for better management.

```ts
const AdvancedAppBlock = await AWS.AppStream.AppBlock("advanced-appblock", {
  Name: "AdvancedAppBlock",
  SourceS3Location: {
    S3Bucket: "my-app-stream-bucket",
    S3Key: "app/my-advanced-app.zip"
  },
  SetupScriptDetails: {
    ExecutablePath: "setup-script.sh",
    ScriptS3Location: {
      S3Bucket: "my-app-stream-bucket",
      S3Key: "scripts/setup-script.sh"
    },
    TimeoutInSeconds: 300
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Custom Post-Setup Configuration

This example shows how to create an AppBlock with post-setup scripts to configure the application after installation.

```ts
const CustomPostSetupAppBlock = await AWS.AppStream.AppBlock("post-setup-appblock", {
  Name: "PostSetupAppBlock",
  SourceS3Location: {
    S3Bucket: "my-app-stream-bucket",
    S3Key: "app/my-post-setup-app.zip"
  },
  PostSetupScriptDetails: {
    ExecutablePath: "post-setup-script.sh",
    ScriptS3Location: {
      S3Bucket: "my-app-stream-bucket",
      S3Key: "scripts/post-setup-script.sh"
    },
    TimeoutInSeconds: 300
  },
  DisplayName: "Post Setup App Block"
});
```