---
title: Managing AWS ApiGatewayV2 Apis with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Apis using Alchemy Cloud Control.
---

# Api

The Api resource allows you to create and manage [AWS ApiGatewayV2 Apis](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) for building and deploying APIs. This resource is essential for enabling serverless applications to communicate over HTTP and WebSocket protocols.

## Minimal Example

Create a basic Api with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicApi = await AWS.ApiGatewayV2.Api("BasicApi", {
  Name: "BasicApi",
  ProtocolType: "HTTP",
  Description: "This is a basic HTTP API for demonstration purposes.",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "API-Development" }
  ]
});
```

## Advanced Configuration

Configure an Api with additional settings such as CORS and Route Selection Expression.

```ts
const AdvancedApi = await AWS.ApiGatewayV2.Api("AdvancedApi", {
  Name: "AdvancedApi",
  ProtocolType: "HTTP",
  Description: "An advanced HTTP API with CORS enabled.",
  CorsConfiguration: {
    AllowOrigins: ["https://example.com"],
    AllowMethods: ["GET", "POST"],
    AllowHeaders: ["Content-Type"],
    MaxAge: 3600
  },
  RouteSelectionExpression: "${request.method} ${request.path}"
});
```

## Using S3 for API Definition

Define an Api using an S3 location for the API body.

```ts
const S3Api = await AWS.ApiGatewayV2.Api("S3Api", {
  Name: "S3Api",
  ProtocolType: "HTTP",
  BodyS3Location: {
    Bucket: "my-api-definitions",
    Key: "api-definition.yaml"
  },
  Description: "API definition stored in S3."
});
```

## WebSocket API Example

Create a WebSocket API for real-time communication.

```ts
const WebSocketApi = await AWS.ApiGatewayV2.Api("WebSocketApi", {
  Name: "WebSocketApi",
  ProtocolType: "WEBSOCKET",
  Description: "WebSocket API for real-time applications.",
  RouteSelectionExpression: "$request.body.action",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "RealTime-Dev" }
  ]
});
```

## Secure API with IAM Roles

Create an API that uses IAM roles for authorization.

```ts
const SecureApi = await AWS.ApiGatewayV2.Api("SecureApi", {
  Name: "SecureApi",
  ProtocolType: "HTTP",
  Description: "Secure API with IAM roles for access control.",
  CredentialsArn: "arn:aws:iam::123456789012:role/myApiRole",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```