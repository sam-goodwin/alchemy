---
title: Managing AWS ApiGateway Stages with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway Stages using Alchemy Cloud Control.
---

# Stage

The Stage resource lets you manage [AWS ApiGateway Stages](https://docs.aws.amazon.com/apigateway/latest/userguide/) for your APIs, enabling you to control deployment settings, configurations, and behaviors.

## Minimal Example

This example demonstrates creating a basic ApiGateway Stage with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicStage = await AWS.ApiGateway.Stage("BasicStage", {
  RestApiId: "abc1234",
  StageName: "production",
  Description: "Production stage for the API",
  MethodSettings: [{
    HttpMethod: "*",
    ResourcePath: "/*",
    ThrottlingBurstLimit: 100,
    ThrottlingRateLimit: 50
  }],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "API Project" }
  ]
});
```

## Advanced Configuration

This example shows how to set up an ApiGateway Stage with additional configurations like Canary settings and access logging.

```ts
const advancedStage = await AWS.ApiGateway.Stage("AdvancedStage", {
  RestApiId: "abc1234",
  StageName: "staging",
  Description: "Staging stage for the API",
  CanarySetting: {
    PercentTraffic: 10,
    DeploymentId: "xyz5678"
  },
  AccessLogSetting: {
    DestinationArn: "arn:aws:logs:us-east-1:123456789012:log-group:ApiAccessLogs",
    Format: "$context.identity.sourceIp - $context.identity.caller"
  },
  MethodSettings: [{
    HttpMethod: "*",
    ResourcePath: "/*",
    ThrottlingBurstLimit: 200,
    ThrottlingRateLimit: 100
  }]
});
```

## Using Cache Settings

This example illustrates how to enable caching for an ApiGateway Stage to improve performance.

```ts
const cacheEnabledStage = await AWS.ApiGateway.Stage("CacheEnabledStage", {
  RestApiId: "abc1234",
  StageName: "cached",
  CacheClusterEnabled: true,
  CacheClusterSize: "0.5",
  MethodSettings: [{
    HttpMethod: "*",
    ResourcePath: "/*",
    CachingEnabled: true,
    CacheTtlInSeconds: 300
  }]
});
```