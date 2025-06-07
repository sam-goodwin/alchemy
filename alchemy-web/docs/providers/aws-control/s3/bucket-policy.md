---
title: Managing AWS S3 BucketPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3 BucketPolicys using Alchemy Cloud Control.
---

# BucketPolicy

The BucketPolicy resource lets you create and manage [AWS S3 BucketPolicys](https://docs.aws.amazon.com/s3/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3-bucketpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bucketpolicy = await AWS.S3.BucketPolicy("bucketpolicy-example", {
  Bucket: "example-bucket",
  PolicyDocument: {},
});
```

