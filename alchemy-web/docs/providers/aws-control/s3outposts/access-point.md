---
title: Managing AWS S3Outposts AccessPoints with Alchemy
description: Learn how to create, update, and manage AWS S3Outposts AccessPoints using Alchemy Cloud Control.
---

# AccessPoint

The AccessPoint resource lets you create and manage [AWS S3Outposts AccessPoints](https://docs.aws.amazon.com/s3outposts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3outposts-accesspoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspoint = await AWS.S3Outposts.AccessPoint("accesspoint-example", {
  Bucket: "example-bucket",
  VpcConfiguration: "example-vpcconfiguration",
  Name: "accesspoint-",
});
```

## Advanced Configuration

Create a accesspoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAccessPoint = await AWS.S3Outposts.AccessPoint("advanced-accesspoint", {
  Bucket: "example-bucket",
  VpcConfiguration: "example-vpcconfiguration",
  Name: "accesspoint-",
  Policy: {
    Version: "2012-10-17",
    Statement: [{ Effect: "Allow", Action: ["s3:GetObject"], Resource: "*" }],
  },
});
```

