---
title: Managing AWS S3ObjectLambda AccessPointPolicys with Alchemy
description: Learn how to create, update, and manage AWS S3ObjectLambda AccessPointPolicys using Alchemy Cloud Control.
---

# AccessPointPolicy

The AccessPointPolicy resource lets you create and manage [AWS S3ObjectLambda AccessPointPolicys](https://docs.aws.amazon.com/s3objectlambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3objectlambda-accesspointpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const accesspointpolicy = await AWS.S3ObjectLambda.AccessPointPolicy("accesspointpolicy-example", {
  PolicyDocument: {},
  ObjectLambdaAccessPoint: "example-objectlambdaaccesspoint",
});
```

