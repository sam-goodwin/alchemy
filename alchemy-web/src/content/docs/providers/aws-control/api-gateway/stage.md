---
title: Stage
description: Learn how to create, update, and manage AWS ApiGateway Stages using Alchemy Cloud Control.
---


The Stage resource allows you to manage [AWS ApiGateway Stages](https://docs.aws.amazon.com/apigateway/latest/userguide/) for your API deployments, enabling you to define different environments like development, testing, and production.

## Minimal Example

Create a basic ApiGateway Stage with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const apiStage = await AWS.ApiGateway.Stage("myApiStage", {
  RestApiId: "1234567890",
  StageName: "dev",
  Description: "Development stage for testing new features"
});
```

## Advanced Configuration

Configure a stage with additional settings like method settings and tracing enabled for better monitoring.

```ts
const advancedApiStage = await AWS.ApiGateway.Stage("advancedApiStage", {
  RestApiId: "1234567890",
  StageName: "prod",
  Description: "Production stage with enhanced monitoring",
  TracingEnabled: true,
  MethodSettings: [{
    HttpMethod: "*",
    ResourceId: "abcdef1234",
    ThrottlingBurstLimit: 100,
    ThrottlingRateLimit: 50
  }]
});
```

## Canary Release

Set up a stage with canary release settings to gradually deploy changes.

```ts
const canaryApiStage = await AWS.ApiGateway.Stage("canaryApiStage", {
  RestApiId: "1234567890",
  StageName: "canary",
  DeploymentId: "deployment123",
  CanarySetting: {
    PercentTraffic: 10,
    StageVariableOverrides: {
      "newFeatureEnabled": "true"
    }
  }
});
```

## Access Logging

Enable access logging for the stage to monitor API requests.

```ts
const loggingApiStage = await AWS.ApiGateway.Stage("loggingApiStage", {
  RestApiId: "1234567890",
  StageName: "prod",
  AccessLogSetting: {
    DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-api-logs",
    Format: "${context.requestId} - ${context.identity.sourceIp} - ${context.httpMethod} ${context.path}"
  }
});
```
