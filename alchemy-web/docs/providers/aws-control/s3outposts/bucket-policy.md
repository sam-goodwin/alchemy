---
title: Managing AWS S3Outposts BucketPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3Outposts BucketPolicys using Alchemy Cloud Control.
---

# BucketPolicy

The BucketPolicy resource lets you create and manage [AWS S3Outposts BucketPolicys](https://docs.aws.amazon.com/s3outposts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3outposts-bucketpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const bucketpolicy = await AWS.S3Outposts.BucketPolicy("bucketpolicy-example", {
  Bucket: "example-bucket",
  PolicyDocument: {},
});
```

