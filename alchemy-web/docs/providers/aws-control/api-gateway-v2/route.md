---
title: Managing AWS ApiGatewayV2 Routes with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Routes using Alchemy Cloud Control.
---

# Route

The Route resource allows you to manage [AWS ApiGatewayV2 Routes](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) for your HTTP APIs, enabling you to define how requests are routed to your backend services.

## Minimal Example

Create a basic route with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.ApiGatewayV2.Route("BasicRoute", {
  ApiId: "myApiId", 
  RouteKey: "GET /items", 
  Target: "integrations/myIntegrationId", 
  ApiKeyRequired: false
});
```

## Advanced Configuration

Configure a route with additional options such as authorization and response selection expression:

```ts
const advancedRoute = await AWS.ApiGatewayV2.Route("AdvancedRoute", {
  ApiId: "myApiId", 
  RouteKey: "POST /items", 
  Target: "integrations/myIntegrationId", 
  AuthorizerId: "myAuthorizerId", 
  RouteResponseSelectionExpression: "${statusCode}",
  AuthorizationScopes: ["scope1", "scope2"],
  RequestModels: {
    "application/json": "MyRequestModel"
  }
});
```

## Route with Request Parameters

Define a route that includes request parameters and a model selection expression:

```ts
const parameterizedRoute = await AWS.ApiGatewayV2.Route("ParameterizedRoute", {
  ApiId: "myApiId", 
  RouteKey: "GET /items/{itemId}", 
  Target: "integrations/myIntegrationId", 
  RequestParameters: {
    "itemId": true
  },
  ModelSelectionExpression: "${request.content.type}"
});
```

## Route with API Key Requirement and Authorization

Create a route that requires an API key and includes authorization settings:

```ts
const securedRoute = await AWS.ApiGatewayV2.Route("SecuredRoute", {
  ApiId: "myApiId", 
  RouteKey: "DELETE /items/{itemId}", 
  Target: "integrations/myIntegrationId", 
  ApiKeyRequired: true, 
  AuthorizerId: "myAuthorizerId", 
  AuthorizationScopes: ["delete:items"]
});
```