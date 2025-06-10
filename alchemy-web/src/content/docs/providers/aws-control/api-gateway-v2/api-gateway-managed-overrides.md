---
title: ApiGatewayManagedOverrides
description: Learn how to create, update, and manage AWS ApiGatewayV2 ApiGatewayManagedOverrides using Alchemy Cloud Control.
---


The ApiGatewayManagedOverrides resource allows you to configure and manage overrides for API Gateway, including integration settings, stage configurations, and routing options. For more details, refer to the [AWS ApiGatewayV2 ApiGatewayManagedOverrides documentation](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ApiGatewayManagedOverrides resource with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayOverrides = await AWS.ApiGatewayV2.ApiGatewayManagedOverrides("defaultOverrides", {
  ApiId: "myApiId123",
  Integration: {
    IntegrationType: "AWS_PROXY",
    IntegrationUri: "arn:aws:lambda:us-east-1:123456789012:function:myFunction",
    PayloadFormatVersion: "2.0"
  }
});
```

## Advanced Configuration

In this example, we enhance the configuration by including stage overrides and route options to further customize the API Gateway settings.

```ts
const advancedApiGatewayOverrides = await AWS.ApiGatewayV2.ApiGatewayManagedOverrides("advancedOverrides", {
  ApiId: "myApiId456",
  Integration: {
    IntegrationType: "HTTP",
    IntegrationUri: "https://example.com/api",
    RequestParameters: {
      "method.request.header.Authorization": "method.request.header.Authorization"
    }
  },
  Stage: {
    StageName: "production",
    Description: "Production stage with overrides"
  },
  Route: {
    RouteId: "route123",
    RouteKey: "GET /myresource"
  }
});
```

## Integration with IAM Policies

This example shows how to integrate IAM policy settings within the ApiGatewayManagedOverrides for fine-grained access control.

```ts
const apiWithPolicyOverrides = await AWS.ApiGatewayV2.ApiGatewayManagedOverrides("policyOverrides", {
  ApiId: "myApiId789",
  Integration: {
    IntegrationType: "AWS_PROXY",
    IntegrationUri: "arn:aws:lambda:us-east-1:123456789012:function:myFunction",
    RequestParameters: {
      "method.request.header.Authorization": "method.request.header.Authorization"
    }
  },
  Stage: {
    StageName: "dev",
    Description: "Development stage with policy overrides"
  },
  adopt: true // Adopt existing resource if present
});
```
