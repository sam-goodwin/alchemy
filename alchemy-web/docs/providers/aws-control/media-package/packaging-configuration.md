---
title: Managing AWS MediaPackage PackagingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS MediaPackage PackagingConfigurations using Alchemy Cloud Control.
---

# PackagingConfiguration

The PackagingConfiguration resource lets you create and manage [AWS MediaPackage PackagingConfigurations](https://docs.aws.amazon.com/mediapackage/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-packagingconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const packagingconfiguration = await AWS.MediaPackage.PackagingConfiguration(
  "packagingconfiguration-example",
  {
    Id: "example-id",
    PackagingGroupId: "example-packaginggroupid",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a packagingconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPackagingConfiguration = await AWS.MediaPackage.PackagingConfiguration(
  "advanced-packagingconfiguration",
  {
    Id: "example-id",
    PackagingGroupId: "example-packaginggroupid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

