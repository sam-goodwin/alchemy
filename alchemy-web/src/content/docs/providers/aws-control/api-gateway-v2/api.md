---
title: Api
description: Learn how to create, update, and manage AWS ApiGatewayV2 Apis using Alchemy Cloud Control.
---


The Api resource allows you to create and manage [AWS ApiGatewayV2 Apis](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) for building and deploying APIs with various configurations.

## Minimal Example

Create a basic Api with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicApi = await AWS.ApiGatewayV2.Api("basicApi", {
  Name: "MyBasicApi",
  ProtocolType: "HTTP",
  Description: "A simple HTTP API for demonstration purposes",
  CorsConfiguration: {
    AllowOrigins: ["*"],
    AllowMethods: ["GET", "POST"],
    AllowHeaders: ["Content-Type"]
  }
});
```

## Advanced Configuration

Configure an Api with advanced options including custom route selection expressions and additional settings.

```ts
const advancedApi = await AWS.ApiGatewayV2.Api("advancedApi", {
  Name: "MyAdvancedApi",
  ProtocolType: "HTTP",
  RouteSelectionExpression: "$request.method $request.path",
  ApiKeySelectionExpression: "$request.header.x-api-key",
  FailOnWarnings: true,
  Tags: {
    Project: "Demo",
    Environment: "Development"
  }
});
```

## Custom CORS Configuration

Set up an Api with a detailed CORS configuration for better control over cross-origin requests.

```ts
const corsApi = await AWS.ApiGatewayV2.Api("corsApi", {
  Name: "MyCorsApi",
  ProtocolType: "HTTP",
  CorsConfiguration: {
    AllowOrigins: ["https://example.com"],
    AllowMethods: ["GET", "OPTIONS"],
    AllowHeaders: ["Content-Type", "Authorization"],
    ExposeHeaders: ["X-Custom-Header"],
    MaxAge: 600
  }
});
```

## API with Deployment Settings

Create an Api that includes specific deployment settings and an execution endpoint configuration.

```ts
const deployedApi = await AWS.ApiGatewayV2.Api("deployedApi", {
  Name: "MyDeployedApi",
  ProtocolType: "HTTP",
  Description: "An API with deployment settings",
  DisableExecuteApiEndpoint: false,
  BodyS3Location: {
    Bucket: "my-api-bucket",
    Key: "api-definition.yaml"
  }
});
```
