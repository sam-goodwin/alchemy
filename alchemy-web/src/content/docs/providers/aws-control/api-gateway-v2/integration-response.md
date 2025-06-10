---
title: IntegrationResponse
description: Learn how to create, update, and manage AWS ApiGatewayV2 IntegrationResponses using Alchemy Cloud Control.
---


The IntegrationResponse resource allows you to manage [AWS ApiGatewayV2 IntegrationResponses](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) which define how to handle responses from integrations with backend services.

## Minimal Example

Create a basic IntegrationResponse with required properties and common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("basicIntegrationResponse", {
  IntegrationId: "12345678-abcd-ef00-1234-56789abcdef0",
  IntegrationResponseKey: "200",
  ApiId: "abcdefghij",
  ResponseParameters: {
    "method.response.header.Access-Control-Allow-Origin": "'*'"
  },
  ResponseTemplates: {
    "application/json": "{ \"message\": \"Success\" }"
  }
});
```

## Advanced Configuration

Configure an IntegrationResponse with additional options like content handling strategy and template selection expression.

```ts
const advancedIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("advancedIntegrationResponse", {
  IntegrationId: "12345678-abcd-ef00-1234-56789abcdef0",
  IntegrationResponseKey: "200",
  ApiId: "abcdefghij",
  ContentHandlingStrategy: "CONVERT_TO_BINARY",
  TemplateSelectionExpression: "$.statusCode",
  ResponseParameters: {
    "method.response.header.Content-Type": "'application/json'"
  },
  ResponseTemplates: {
    "application/json": "{ \"status\": \"OK\" }"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing IntegrationResponse rather than failing if it already exists, you can set the `adopt` property.

```ts
const adoptExistingIntegrationResponse = await AWS.ApiGatewayV2.IntegrationResponse("adoptIntegrationResponse", {
  IntegrationId: "12345678-abcd-ef00-1234-56789abcdef0",
  IntegrationResponseKey: "200",
  ApiId: "abcdefghij",
  adopt: true
});
```

## Custom Response Parameters

Define custom response parameters to map backend responses to the API Gateway.

```ts
const customResponseParameters = await AWS.ApiGatewayV2.IntegrationResponse("customResponseParameters", {
  IntegrationId: "12345678-abcd-ef00-1234-56789abcdef0",
  IntegrationResponseKey: "404",
  ApiId: "abcdefghij",
  ResponseParameters: {
    "method.response.header.X-Custom-Header": "'CustomHeaderValue'",
    "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
  },
  ResponseTemplates: {
    "application/json": "{ \"error\": \"Resource not found\" }"
  }
});
```
