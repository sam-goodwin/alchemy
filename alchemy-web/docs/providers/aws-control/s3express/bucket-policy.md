---
title: Managing AWS S3Express BucketPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3Express BucketPolicys using Alchemy Cloud Control.
---

# BucketPolicy

The BucketPolicy resource lets you create and manage [AWS S3Express BucketPolicys](https://docs.aws.amazon.com/s3express/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3express-bucketpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bucketpolicy = await AWS.S3Express.BucketPolicy("bucketpolicy-example", {
  Bucket: "example-bucket",
  PolicyDocument: {},
});
```

