---
title: RouteResponse
description: Learn how to create, update, and manage AWS ApiGatewayV2 RouteResponses using Alchemy Cloud Control.
---


The RouteResponse resource lets you manage AWS ApiGatewayV2 RouteResponses, which define how API responses are handled and formatted. For more details, you can refer to the [AWS ApiGatewayV2 RouteResponses](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) documentation.

## Minimal Example

Create a basic RouteResponse with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const routeResponse = await AWS.ApiGatewayV2.RouteResponse("basicRouteResponse", {
  RouteResponseKey: "200",
  RouteId: "123456",
  ApiId: "api-abcdef",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'"
  }
});
```

## Advanced Configuration

Configure a RouteResponse with additional properties to refine response handling.

```ts
const advancedRouteResponse = await AWS.ApiGatewayV2.RouteResponse("advancedRouteResponse", {
  RouteResponseKey: "404",
  RouteId: "123456",
  ApiId: "api-abcdef",
  ModelSelectionExpression: "$request.body.type",
  ResponseModels: {
    "application/json": "ErrorModel"
  }
});
```

## Custom Response Parameters

Create a RouteResponse that specifies custom response parameters for CORS.

```ts
const corsRouteResponse = await AWS.ApiGatewayV2.RouteResponse("corsRouteResponse", {
  RouteResponseKey: "200",
  RouteId: "123456",
  ApiId: "api-abcdef",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'https://example.com'",
    "method.response.header.Access-Control-Allow-Methods": "'GET, POST, OPTIONS'",
    "method.response.header.Access-Control-Allow-Headers": "'Content-Type'"
  }
});
```

## Response Model Example

Define a RouteResponse that leverages a specific response model for structured data.

```ts
const modelRouteResponse = await AWS.ApiGatewayV2.RouteResponse("modelRouteResponse", {
  RouteResponseKey: "200",
  RouteId: "123456",
  ApiId: "api-abcdef",
  ResponseModels: {
    "application/json": "MyResponseModel"
  }
});
```
