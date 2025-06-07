---
title: Managing AWS S3Tables TableBucketPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3Tables TableBucketPolicys using Alchemy Cloud Control.
---

# TableBucketPolicy

The TableBucketPolicy resource lets you create and manage [AWS S3Tables TableBucketPolicys](https://docs.aws.amazon.com/s3tables/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3tables-tablebucketpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tablebucketpolicy = await AWS.S3Tables.TableBucketPolicy("tablebucketpolicy-example", {
  TableBucketARN: "example-tablebucketarn",
  ResourcePolicy: {},
});
```

