---
title: Integration
description: Learn how to create, update, and manage AWS ApiGatewayV2 Integrations using Alchemy Cloud Control.
---


The Integration resource allows you to manage [AWS ApiGatewayV2 Integrations](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) for your API Gateway, enabling you to connect various backend services to your API.

## Minimal Example

Create a basic API Gateway Integration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayIntegration = await AWS.ApiGatewayV2.Integration("myApiIntegration", {
  ApiId: "myApiId",
  IntegrationType: "AWS_PROXY",
  IntegrationUri: "arn:aws:lambda:us-east-1:123456789012:function:myLambdaFunction",
  Description: "Integration with my Lambda function"
});
```

## Advanced Configuration

Configure an API Gateway Integration with additional properties, such as request templates and response parameters.

```ts
const advancedIntegration = await AWS.ApiGatewayV2.Integration("advancedApiIntegration", {
  ApiId: "myApiId",
  IntegrationType: "AWS_PROXY",
  IntegrationUri: "arn:aws:lambda:us-east-1:123456789012:function:myAdvancedLambdaFunction",
  RequestTemplates: {
    "application/json": '{"statusCode": 200, "body": $input.json("$")}'
  },
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'"
  }
});
```

## Custom Timeout and Connection Settings

Set a custom timeout and connection settings for your integration.

```ts
const customTimeoutIntegration = await AWS.ApiGatewayV2.Integration("timeoutIntegration", {
  ApiId: "myApiId",
  IntegrationType: "HTTP",
  IntegrationUri: "https://api.example.com/resource",
  TimeoutInMillis: 3000,
  ConnectionType: "VPC_LINK",
  ConnectionId: "myVpcLinkId"
});
```

## Using TLS Configuration

Configure the integration with TLS settings for secure connections.

```ts
const tlsIntegration = await AWS.ApiGatewayV2.Integration("tlsIntegration", {
  ApiId: "myApiId",
  IntegrationType: "HTTP",
  IntegrationUri: "https://secure-api.example.com/resource",
  TlsConfig: {
    ServerNameToVerify: "secure-api.example.com",
    Insecure: false
  }
});
```
