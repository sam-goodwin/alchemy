---
title: Managing AWS S3ObjectLambda AccessPoints with Alchemy
description: Learn how to create, update, and manage AWS S3ObjectLambda AccessPoints using Alchemy Cloud Control.
---

# AccessPoint

The AccessPoint resource lets you create and manage [AWS S3ObjectLambda AccessPoints](https://docs.aws.amazon.com/s3objectlambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspoint = await AWS.S3ObjectLambda.AccessPoint("accesspoint-example", {
  ObjectLambdaConfiguration: "example-objectlambdaconfiguration",
});
```

