---
title: Managing AWS DataSync LocationS3s with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationS3s using Alchemy Cloud Control.
---

# LocationS3

The LocationS3 resource lets you create and manage [AWS DataSync LocationS3s](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locations3.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locations3 = await AWS.DataSync.LocationS3("locations3-example", {
  S3Config: "example-s3config",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a locations3 with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationS3 = await AWS.DataSync.LocationS3("advanced-locations3", {
  S3Config: "example-s3config",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

