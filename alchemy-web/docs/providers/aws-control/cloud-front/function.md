---
title: Managing AWS CloudFront Functions with Alchemy
description: Learn how to create, update, and manage AWS CloudFront Functions using Alchemy Cloud Control.
---

# Function

The Function resource lets you create and manage [AWS CloudFront Functions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-function.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const awsFunction = await AWS.CloudFront.Function("awsFunction-example", {
  FunctionConfig: "example-functionconfig",
  FunctionCode: "example-functioncode",
  Name: "function-",
});
```

