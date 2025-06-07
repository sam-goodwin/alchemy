---
title: Managing AWS IVS StorageConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IVS StorageConfigurations using Alchemy Cloud Control.
---

# StorageConfiguration

The StorageConfiguration resource lets you create and manage [AWS IVS StorageConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-storageconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storageconfiguration = await AWS.IVS.StorageConfiguration("storageconfiguration-example", {
  S3: "example-s3",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a storageconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStorageConfiguration = await AWS.IVS.StorageConfiguration(
  "advanced-storageconfiguration",
  {
    S3: "example-s3",
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

