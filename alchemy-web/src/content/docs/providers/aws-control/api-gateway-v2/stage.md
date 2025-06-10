---
title: Stage
description: Learn how to create, update, and manage AWS ApiGatewayV2 Stages using Alchemy Cloud Control.
---


The Stage resource lets you manage [AWS ApiGatewayV2 Stages](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) and their configurations for API deployments.

## Minimal Example

Create a basic stage with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayStage = await AWS.ApiGatewayV2.Stage("myApiStage", {
  ApiId: "abc1234xyz",
  StageName: "production",
  Description: "Production stage for the API",
  AutoDeploy: true
});
```

## Advanced Configuration

Configure a stage with logging settings and stage variables.

```ts
const advancedStage = await AWS.ApiGatewayV2.Stage("advancedApiStage", {
  ApiId: "abc1234xyz",
  StageName: "development",
  Description: "Development stage with detailed logging",
  AccessLogSettings: {
    DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:/aws/apigateway/myApiLogGroup",
    Format: "$context.identity.sourceIp - $context.requestId"
  },
  StageVariables: {
    "version": "1.0",
    "featureFlag": "true"
  }
});
```

## Custom Route Settings

Create a stage with custom route settings to fine-tune API behavior.

```ts
const customRouteStage = await AWS.ApiGatewayV2.Stage("customRouteStage", {
  ApiId: "abc1234xyz",
  StageName: "custom",
  RouteSettings: [{
    RouteId: "route123",
    DataTraceEnabled: true,
    DetailedMetricsEnabled: true
  }]
});
```

## Access Control Policy

Define an access policy that restricts access to specific IP addresses.

```ts
const accessPolicyStage = await AWS.ApiGatewayV2.Stage("policyStage", {
  ApiId: "abc1234xyz",
  StageName: "secured",
  AccessPolicyId: "policyId123",
  Tags: {
    "Environment": "production",
    "Department": "engineering"
  }
});
```
