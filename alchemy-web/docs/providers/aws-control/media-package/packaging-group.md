---
title: Managing AWS MediaPackage PackagingGroups with Alchemy
description: Learn how to create, update, and manage AWS MediaPackage PackagingGroups using Alchemy Cloud Control.
---

# PackagingGroup

The PackagingGroup resource lets you create and manage [AWS MediaPackage PackagingGroups](https://docs.aws.amazon.com/mediapackage/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-packaginggroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const packaginggroup = await AWS.MediaPackage.PackagingGroup("packaginggroup-example", {
  Id: "example-id",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a packaginggroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPackagingGroup = await AWS.MediaPackage.PackagingGroup("advanced-packaginggroup", {
  Id: "example-id",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

