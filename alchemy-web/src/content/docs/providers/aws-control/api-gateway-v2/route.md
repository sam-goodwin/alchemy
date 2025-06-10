---
title: Route
description: Learn how to create, update, and manage AWS ApiGatewayV2 Routes using Alchemy Cloud Control.
---


The Route resource allows you to manage [AWS ApiGatewayV2 Routes](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) and their configuration settings for HTTP APIs.

## Minimal Example

Create a basic route with essential properties including a route key and API ID.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.ApiGatewayV2.Route("basicRoute", {
  ApiId: "myApiId",
  RouteKey: "GET /users",
  Target: "integrations/myIntegrationId",
  ApiKeyRequired: true
});
```

## Advanced Configuration

Configure a route with advanced options such as authorization settings and response selection expressions.

```ts
const advancedRoute = await AWS.ApiGatewayV2.Route("advancedRoute", {
  ApiId: "myApiId",
  RouteKey: "POST /orders",
  Target: "integrations/myIntegrationId",
  AuthorizerId: "myAuthorizerId",
  AuthorizationScopes: ["read:orders", "write:orders"],
  RouteResponseSelectionExpression: "$default"
});
```

## Route with Request Parameters

Create a route that includes request parameters to handle dynamic input.

```ts
const paramRoute = await AWS.ApiGatewayV2.Route("paramRoute", {
  ApiId: "myApiId",
  RouteKey: "GET /users/{userId}",
  Target: "integrations/myIntegrationId",
  RequestParameters: {
    "method.request.path.userId": true
  },
  ModelSelectionExpression: "$request.body.type"
});
```

## Route with Custom Request Models

Set up a route that specifies custom request models for input validation.

```ts
const modelRoute = await AWS.ApiGatewayV2.Route("modelRoute", {
  ApiId: "myApiId",
  RouteKey: "PUT /products/{productId}",
  Target: "integrations/myIntegrationId",
  RequestModels: {
    "application/json": "ProductModel"
  },
  RouteResponseSelectionExpression: "$default"
});
```
