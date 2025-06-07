---
title: Managing AWS S3 StorageLensGroups with Alchemy
description: Learn how to create, update, and manage AWS S3 StorageLensGroups using Alchemy Cloud Control.
---

# StorageLensGroup

The StorageLensGroup resource lets you create and manage [AWS S3 StorageLensGroups](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-storagelensgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storagelensgroup = await AWS.S3.StorageLensGroup("storagelensgroup-example", {
  Filter: "example-filter",
  Name: "storagelensgroup-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a storagelensgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStorageLensGroup = await AWS.S3.StorageLensGroup("advanced-storagelensgroup", {
  Filter: "example-filter",
  Name: "storagelensgroup-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

