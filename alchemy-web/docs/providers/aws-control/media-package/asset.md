---
title: Managing AWS MediaPackage Assets with Alchemy
description: Learn how to create, update, and manage AWS MediaPackage Assets using Alchemy Cloud Control.
---

# Asset

The Asset resource lets you create and manage [AWS MediaPackage Assets](https://docs.aws.amazon.com/mediapackage/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-asset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const asset = await AWS.MediaPackage.Asset("asset-example", {
  SourceArn: "example-sourcearn",
  Id: "example-id",
  PackagingGroupId: "example-packaginggroupid",
  SourceRoleArn: "example-sourcerolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a asset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAsset = await AWS.MediaPackage.Asset("advanced-asset", {
  SourceArn: "example-sourcearn",
  Id: "example-id",
  PackagingGroupId: "example-packaginggroupid",
  SourceRoleArn: "example-sourcerolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

