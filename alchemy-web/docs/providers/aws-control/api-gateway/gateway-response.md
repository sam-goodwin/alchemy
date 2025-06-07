---
title: Managing AWS ApiGateway GatewayResponses with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway GatewayResponses using Alchemy Cloud Control.
---

# GatewayResponse

The GatewayResponse resource allows you to manage custom Gateway Responses for your [AWS ApiGateway](https://docs.aws.amazon.com/apigateway/latest/userguide/). This is useful for customizing the output of your API Gateway responses based on the status code and response type.

## Minimal Example

Create a basic GatewayResponse for handling unauthorized requests with a custom message.

```ts
import AWS from "alchemy/aws/control";

const UnauthorizedResponse = await AWS.ApiGateway.GatewayResponse("UnauthorizedResponse", {
  RestApiId: "123456abcdef",
  ResponseType: "UNAUTHORIZED",
  StatusCode: "401",
  ResponseTemplates: {
    "application/json": JSON.stringify({
      message: "You are not authorized to access this resource."
    })
  },
  ResponseParameters: {
    "gatewayresponse.header.Access-Control-Allow-Origin": "'*'"
  }
});
```

## Advanced Configuration

Configure a GatewayResponse with additional response parameters for better control over CORS settings.

```ts
const CustomErrorResponse = await AWS.ApiGateway.GatewayResponse("CustomErrorResponse", {
  RestApiId: "123456abcdef",
  ResponseType: "DEFAULT_4XX",
  StatusCode: "404",
  ResponseTemplates: {
    "application/json": JSON.stringify({
      error: "Resource not found",
      code: 404
    })
  },
  ResponseParameters: {
    "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
    "gatewayresponse.header.Content-Type": "'application/json'"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Customizing Responses for Specific Scenarios

Handle specific scenarios like missing API keys with custom responses.

```ts
const MissingApiKeyResponse = await AWS.ApiGateway.GatewayResponse("MissingApiKeyResponse", {
  RestApiId: "123456abcdef",
  ResponseType: "API_KEY_REQUIRED",
  StatusCode: "403",
  ResponseTemplates: {
    "application/json": JSON.stringify({
      error: "API key is required to access this endpoint."
    })
  },
  ResponseParameters: {
    "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
    "gatewayresponse.header.Retry-After": "'3600'"
  }
});
```