---
title: Managing AWS ApiGatewayV2 IntegrationResponses with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 IntegrationResponses using Alchemy Cloud Control.
---

# IntegrationResponse

The IntegrationResponse resource allows you to manage [AWS ApiGatewayV2 IntegrationResponses](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) which define how the API Gateway responds to requests from clients.

## Minimal Example

Create a basic IntegrationResponse with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("BasicIntegrationResponse", {
  ApiId: "api-1234567890",
  IntegrationId: "integration-1234567890",
  IntegrationResponseKey: "200",
  ResponseTemplates: {
    "application/json": "{ \"message\": \"Success\" }"
  }
});
```

## Advanced Configuration

Configure an IntegrationResponse with additional properties for content handling and parameter selection:

```ts
const advancedIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("AdvancedIntegrationResponse", {
  ApiId: "api-1234567890",
  IntegrationId: "integration-1234567890",
  IntegrationResponseKey: "200",
  ResponseTemplates: {
    "application/json": "{ \"message\": \"Success with advanced settings\" }"
  },
  TemplateSelectionExpression: "$.statusCode",
  ContentHandlingStrategy: "CONVERT_TO_TEXT"
});
```

## Response Parameters

Specify response parameters to customize the response further:

```ts
const parameterizedIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("ParameterizedIntegrationResponse", {
  ApiId: "api-1234567890",
  IntegrationId: "integration-1234567890",
  IntegrationResponseKey: "200",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'"
  },
  ResponseTemplates: {
    "application/json": "{ \"message\": \"Response with headers\" }"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing IntegrationResponse instead of creating a new one, you can set the `adopt` property:

```ts
const adoptedIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("AdoptedIntegrationResponse", {
  ApiId: "api-1234567890",
  IntegrationId: "integration-1234567890",
  IntegrationResponseKey: "200",
  ResponseTemplates: {
    "application/json": "{ \"message\": \"Adopted existing resource\" }"
  },
  adopt: true
});
```