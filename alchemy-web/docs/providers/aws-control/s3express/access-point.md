---
title: Managing AWS S3Express AccessPoints with Alchemy
description: Learn how to create, update, and manage AWS S3Express AccessPoints using Alchemy Cloud Control.
---

# AccessPoint

The AccessPoint resource lets you create and manage [AWS S3Express AccessPoints](https://docs.aws.amazon.com/s3express/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3express-accesspoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspoint = await AWS.S3Express.AccessPoint("accesspoint-example", {
  Bucket: "example-bucket",
});
```

## Advanced Configuration

Create a accesspoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAccessPoint = await AWS.S3Express.AccessPoint("advanced-accesspoint", {
  Bucket: "example-bucket",
  Policy: {
    Version: "2012-10-17",
    Statement: [{ Effect: "Allow", Action: ["s3:GetObject"], Resource: "*" }],
  },
});
```

