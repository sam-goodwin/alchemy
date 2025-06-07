---
title: Managing AWS ApiGatewayV2 ApiGatewayManagedOverridess with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 ApiGatewayManagedOverridess using Alchemy Cloud Control.
---

# ApiGatewayManagedOverrides

The ApiGatewayManagedOverrides resource lets you create and manage [AWS ApiGatewayV2 ApiGatewayManagedOverridess](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apigatewaymanagedoverrides.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apigatewaymanagedoverrides = await AWS.ApiGatewayV2.ApiGatewayManagedOverrides(
  "apigatewaymanagedoverrides-example",
  { ApiId: "example-apiid" }
);
```

