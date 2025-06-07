---
title: Managing AWS S3 StorageLenss with Alchemy
description: Learn how to create, update, and manage AWS S3 StorageLenss using Alchemy Cloud Control.
---

# StorageLens

The StorageLens resource lets you create and manage [AWS S3 StorageLenss](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-storagelens.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storagelens = await AWS.S3.StorageLens("storagelens-example", {
  StorageLensConfiguration: "example-storagelensconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a storagelens with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStorageLens = await AWS.S3.StorageLens("advanced-storagelens", {
  StorageLensConfiguration: "example-storagelensconfiguration",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

