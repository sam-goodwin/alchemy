---
title: Managing AWS S3 AccessGrants with Alchemy
description: Learn how to create, update, and manage AWS S3 AccessGrants using Alchemy Cloud Control.
---

# AccessGrant

The AccessGrant resource lets you create and manage [AWS S3 AccessGrants](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-accessgrant.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accessgrant = await AWS.S3.AccessGrant("accessgrant-example", {
  Grantee: "example-grantee",
  Permission: "example-permission",
  AccessGrantsLocationId: "example-accessgrantslocationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a accessgrant with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAccessGrant = await AWS.S3.AccessGrant("advanced-accessgrant", {
  Grantee: "example-grantee",
  Permission: "example-permission",
  AccessGrantsLocationId: "example-accessgrantslocationid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

