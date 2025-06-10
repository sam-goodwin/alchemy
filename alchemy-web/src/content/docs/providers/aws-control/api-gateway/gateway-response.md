---
title: GatewayResponse
description: Learn how to create, update, and manage AWS ApiGateway GatewayResponses using Alchemy Cloud Control.
---


The GatewayResponse resource allows you to manage custom responses from the AWS ApiGateway, enabling you to tailor error messages and responses for your API clients. For more details, visit the [AWS ApiGateway GatewayResponses documentation](https://docs.aws.amazon.com/apigateway/latest/userguide/).

## Minimal Example

Create a basic GatewayResponse that customizes the response for unauthorized requests.

```ts
import AWS from "alchemy/aws/control";

const unauthorizedResponse = await AWS.ApiGateway.GatewayResponse("UnauthorizedResponse", {
  RestApiId: "myApiId123",
  ResponseType: "UNAUTHORIZED",
  ResponseTemplates: {
    "application/json": "{\"message\": \"Access denied.\"}"
  },
  ResponseParameters: {
    "gatewayresponse.header.Access-Control-Allow-Origin": "'*'"
  }
});
```

## Advanced Configuration

Configure a GatewayResponse to handle internal server errors with a customized message and specific headers.

```ts
const internalServerErrorResponse = await AWS.ApiGateway.GatewayResponse("InternalServerErrorResponse", {
  RestApiId: "myApiId123",
  ResponseType: "INTERNAL_SERVER_ERROR",
  StatusCode: "500",
  ResponseTemplates: {
    "application/json": "{\"error\": \"Internal server error occurred.\"}"
  },
  ResponseParameters: {
    "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
    "gatewayresponse.header.Content-Type": "'application/json'"
  }
});
```

## Customizing Other Response Types

You can also customize the response for not found errors in a flexible way.

```ts
const notFoundResponse = await AWS.ApiGateway.GatewayResponse("NotFoundResponse", {
  RestApiId: "myApiId123",
  ResponseType: "RESOURCE_NOT_FOUND",
  StatusCode: "404",
  ResponseTemplates: {
    "application/json": "{\"error\": \"Resource not found.\"}"
  }
});
```

## Using Adopt Option

If you want to ensure that your resource is created or updated without failing when it already exists, you can use the adopt option.

```ts
const adoptResponse = await AWS.ApiGateway.GatewayResponse("AdoptResponse", {
  RestApiId: "myApiId123",
  ResponseType: "DEFAULT_4XX",
  adopt: true,
  ResponseTemplates: {
    "application/json": "{\"error\": \"An error occurred.\"}"
  }
});
```
