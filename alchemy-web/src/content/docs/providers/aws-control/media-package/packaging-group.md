---
title: PackagingGroup
description: Learn how to create, update, and manage AWS MediaPackage PackagingGroups using Alchemy Cloud Control.
---


The PackagingGroup resource lets you manage [AWS MediaPackage PackagingGroups](https://docs.aws.amazon.com/mediapackage/latest/userguide/) for organizing your media packaging configurations.

## Minimal Example

Create a basic PackagingGroup with a unique ID and no optional configurations:

```ts
import AWS from "alchemy/aws/control";

const basicPackagingGroup = await AWS.MediaPackage.PackagingGroup("basic-packaging-group", {
  Id: "basic-group-id"
});
```

## Enhanced Logging Configuration

Configure a PackagingGroup with Egress Access Logs for tracking access:

```ts
const loggingPackagingGroup = await AWS.MediaPackage.PackagingGroup("logging-packaging-group", {
  Id: "logging-group-id",
  EgressAccessLogs: {
    LogGroupName: "media-package-logs",
    LogRoleArn: "arn:aws:iam::123456789012:role/MediaPackageLoggingRole"
  }
});
```

## Authorization Settings

Set up a PackagingGroup with authorization settings for secure content delivery:

```ts
const authorizedPackagingGroup = await AWS.MediaPackage.PackagingGroup("authorized-packaging-group", {
  Id: "authorized-group-id",
  Authorization: {
    CdnIdentifierSecret: "your-cdn-secret",
    SecretsRoleArn: "arn:aws:iam::123456789012:role/MediaPackageAuthorizationRole"
  }
});
```

## Tagging for Resource Management

Create a PackagingGroup with tags for easier resource management and categorization:

```ts
const taggedPackagingGroup = await AWS.MediaPackage.PackagingGroup("tagged-packaging-group", {
  Id: "tagged-group-id",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Media" }
  ]
});
```
