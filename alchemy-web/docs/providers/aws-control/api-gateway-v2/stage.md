---
title: Managing AWS ApiGatewayV2 Stages with Alchemy
description: Learn how to create, update, and manage AWS ApiGatewayV2 Stages using Alchemy Cloud Control.
---

# Stage

The Stage resource lets you manage [AWS ApiGatewayV2 Stages](https://docs.aws.amazon.com/apigatewayv2/latest/userguide/) and their configurations for API Gateway. Stages allow you to define different deployment environments for your APIs, such as development, testing, and production.

## Minimal Example

Create a basic stage with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const ApiStage = await AWS.ApiGatewayV2.Stage("MyApiStage", {
  ApiId: "api-12345678",
  StageName: "development",
  Description: "Development stage for testing APIs"
});
```

## Advanced Configuration

Configure a stage with more advanced settings including access log settings and stage variables:

```ts
const AdvancedApiStage = await AWS.ApiGatewayV2.Stage("MyAdvancedApiStage", {
  ApiId: "api-12345678",
  StageName: "production",
  Description: "Production stage for live APIs",
  AccessLogSettings: {
    DestinationArn: "arn:aws:logs:us-east-1:123456789012:log-group:api-log-group",
    Format: "$context.requestId $context.identity.sourceIp"
  },
  StageVariables: {
    "Environment": "production",
    "Version": "v1.0"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "API Team" }
  ]
});
```

## Auto Deployment Configuration

Set up a stage with auto-deployment enabled to automatically deploy changes:

```ts
const AutoDeployApiStage = await AWS.ApiGatewayV2.Stage("MyAutoDeployApiStage", {
  ApiId: "api-12345678",
  StageName: "auto-deploy",
  AutoDeploy: true,
  RouteSettings: [
    {
      RouteId: "route-1234",
      DataTraceEnabled: true,
      DetailedMetricsEnabled: true
    }
  ]
});
```

## Access Policy Configuration

Define a stage with specific access policies to restrict API access:

```ts
const PolicyApiStage = await AWS.ApiGatewayV2.Stage("MyPolicyApiStage", {
  ApiId: "api-12345678",
  StageName: "restricted",
  AccessPolicyId: "policy-123456",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```