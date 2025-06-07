---
title: Managing AWS S3Tables TableBuckets with Alchemy
description: Learn how to create, update, and manage AWS S3Tables TableBuckets using Alchemy Cloud Control.
---

# TableBucket

The TableBucket resource lets you create and manage [AWS S3Tables TableBuckets](https://docs.aws.amazon.com/s3tables/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3tables-tablebucket.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tablebucket = await AWS.S3Tables.TableBucket("tablebucket-example", {
  TableBucketName: "tablebucket-tablebucket",
});
```

