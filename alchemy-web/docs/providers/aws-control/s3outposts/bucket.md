---
title: Managing AWS S3Outposts Buckets with Alchemy
description: Learn how to create, update, and manage AWS S3Outposts Buckets using Alchemy Cloud Control.
---

# Bucket

The Bucket resource lets you create and manage [AWS S3Outposts Buckets](https://docs.aws.amazon.com/s3outposts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3outposts-bucket.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bucket = await AWS.S3Outposts.Bucket("bucket-example", {
  OutpostId: "example-outpostid",
  BucketName: "bucket-bucket",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a bucket with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedBucket = await AWS.S3Outposts.Bucket("advanced-bucket", {
  OutpostId: "example-outpostid",
  BucketName: "bucket-bucket",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

