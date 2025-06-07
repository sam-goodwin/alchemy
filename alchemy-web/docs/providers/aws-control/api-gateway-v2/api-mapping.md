---
title: Managing AWS ApiGatewayV2 ApiMappings with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 ApiMappings using Alchemy Cloud Control.
---

# ApiMapping

The ApiMapping resource lets you create and manage [AWS ApiGatewayV2 ApiMappings](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-apimapping.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apimapping = await AWS.ApiGatewayV2.ApiMapping("apimapping-example", {
  DomainName: "apimapping-domain",
  Stage: "example-stage",
  ApiId: "example-apiid",
});
```

