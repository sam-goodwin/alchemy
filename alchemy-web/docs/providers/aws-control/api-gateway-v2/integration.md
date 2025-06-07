---
title: Managing AWS ApiGatewayV2 Integrations with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Integrations using Alchemy Cloud Control.
---

# Integration

The Integration resource lets you create and manage [AWS ApiGatewayV2 Integrations](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigatewayv2-integration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const integration = await AWS.ApiGatewayV2.Integration("integration-example", {
  ApiId: "example-apiid",
  IntegrationType: "example-integrationtype",
  Description: "A integration resource managed by Alchemy",
});
```

## Advanced Configuration

Create a integration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIntegration = await AWS.ApiGatewayV2.Integration("advanced-integration", {
  ApiId: "example-apiid",
  IntegrationType: "example-integrationtype",
  Description: "A integration resource managed by Alchemy",
});
```

