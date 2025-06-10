---
title: Bucket
description: Learn how to create, update, and manage AWS Lightsail Buckets using Alchemy Cloud Control.
---


The Bucket resource lets you manage [AWS Lightsail Buckets](https://docs.aws.amazon.com/lightsail/latest/userguide/) for object storage in the cloud.

## Minimal Example

Create a basic Lightsail bucket with the required properties.

```ts
import AWS from "alchemy/aws/control";

const myBucket = await AWS.Lightsail.Bucket("my-first-bucket", {
  BundleId: "small_1",
  BucketName: "my-unique-bucket-name",
  ObjectVersioning: true
});
```

## Advanced Configuration

Configure a Lightsail bucket with access rules and tags.

```ts
const advancedBucket = await AWS.Lightsail.Bucket("advanced-bucket", {
  BundleId: "medium_2",
  BucketName: "my-advanced-bucket",
  ObjectVersioning: false,
  AccessRules: {
    AllowPublicRead: true,
    AllowPublicWrite: false
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Website" }
  ]
});
```

## Read-Only Access for Specific Accounts

Set up a bucket that allows read-only access for specific AWS accounts.

```ts
const readOnlyBucket = await AWS.Lightsail.Bucket("read-only-bucket", {
  BundleId: "micro_1",
  BucketName: "my-read-only-bucket",
  ReadOnlyAccessAccounts: ["123456789012", "987654321098"],
  ResourcesReceivingAccess: ["resource-1", "resource-2"]
});
```

## Tagging for Cost Management

Create a bucket with tags for better cost management.

```ts
const taggedBucket = await AWS.Lightsail.Bucket("tagged-bucket", {
  BundleId: "large_3",
  BucketName: "my-tagged-bucket",
  Tags: [
    { Key: "Department", Value: "Finance" },
    { Key: "CostCenter", Value: "12345" }
  ]
});
```
