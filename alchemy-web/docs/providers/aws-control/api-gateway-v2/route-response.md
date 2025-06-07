---
title: Managing AWS ApiGatewayV2 RouteResponses with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 RouteResponses using Alchemy Cloud Control.
---

# RouteResponse

The RouteResponse resource allows you to manage [AWS ApiGatewayV2 RouteResponses](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) which are used to define the responses that can be returned by an API route.

## Minimal Example

Create a basic RouteResponse with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicRouteResponse = await AWS.ApiGatewayV2.RouteResponse("BasicRouteResponse", {
  ApiId: "myApiId",
  RouteId: "myRouteId",
  RouteResponseKey: "200",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'"
  }
});
```

## Advanced Configuration

Configure a RouteResponse with additional options such as model selection expression and response models.

```ts
import AWS from "alchemy/aws/control";

const AdvancedRouteResponse = await AWS.ApiGatewayV2.RouteResponse("AdvancedRouteResponse", {
  ApiId: "myApiId",
  RouteId: "myRouteId",
  RouteResponseKey: "200",
  ModelSelectionExpression: "$request.body.type",
  ResponseModels: {
    "application/json": "MyJsonModel"
  },
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'",
    "method.response.header.Access-Control-Allow-Methods": "'GET, POST'"
  }
});
```

## Example with Adoption

Create a RouteResponse that adopts an existing resource while specifying response parameters.

```ts
import AWS from "alchemy/aws/control";

const AdoptedRouteResponse = await AWS.ApiGatewayV2.RouteResponse("AdoptedRouteResponse", {
  ApiId: "myApiId",
  RouteId: "myRouteId",
  RouteResponseKey: "404",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'",
    "method.response.header.Content-Type": "'application/json'"
  },
  adopt: true
});
```