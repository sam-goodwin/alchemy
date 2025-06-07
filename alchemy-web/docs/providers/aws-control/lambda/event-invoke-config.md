---
title: Managing AWS Lambda EventInvokeConfigs with Alchemy
description: Learn how to create, update, and manage AWS Lambda EventInvokeConfigs using Alchemy Cloud Control.
---

# EventInvokeConfig

The EventInvokeConfig resource lets you create and manage [AWS Lambda EventInvokeConfigs](https://docs.aws.amazon.com/lambda/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-eventinvokeconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventinvokeconfig = await AWS.Lambda.EventInvokeConfig("eventinvokeconfig-example", {
  FunctionName: "eventinvokeconfig-function",
  Qualifier: "example-qualifier",
});
```

