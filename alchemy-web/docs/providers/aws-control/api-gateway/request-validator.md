---
title: Managing AWS ApiGateway RequestValidators with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway RequestValidators using Alchemy Cloud Control.
---

# RequestValidator

The RequestValidator resource lets you create and manage [AWS ApiGateway RequestValidators](https://docs.aws.amazon.com/apigateway/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-requestvalidator.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const requestvalidator = await AWS.ApiGateway.RequestValidator("requestvalidator-example", {
  RestApiId: "example-restapiid",
});
```

