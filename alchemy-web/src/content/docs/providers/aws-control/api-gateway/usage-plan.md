---
title: UsagePlan
description: Learn how to create, update, and manage AWS ApiGateway UsagePlans using Alchemy Cloud Control.
---


The UsagePlan resource lets you manage [AWS ApiGateway UsagePlans](https://docs.aws.amazon.com/apigateway/latest/userguide/) which define a set of limits on how the APIs can be accessed.

## Minimal Example

Create a basic usage plan with a name and description, along with some throttling settings.

```ts
import AWS from "alchemy/aws/control";

const basicUsagePlan = await AWS.ApiGateway.UsagePlan("basicUsagePlan", {
  UsagePlanName: "BasicUsagePlan",
  Description: "A basic usage plan for limited API access",
  Throttle: {
    BurstLimit: 100,
    RateLimit: 50
  }
});
```

## Advanced Configuration

Configure an advanced usage plan that includes quota settings and multiple API stages.

```ts
const advancedUsagePlan = await AWS.ApiGateway.UsagePlan("advancedUsagePlan", {
  UsagePlanName: "AdvancedUsagePlan",
  Description: "An advanced usage plan with quotas and multiple stages",
  Quota: {
    Limit: 1000,
    Period: "MONTH"
  },
  ApiStages: [
    {
      ApiId: "1234567890",
      Stage: "prod"
    },
    {
      ApiId: "0987654321",
      Stage: "dev"
    }
  ],
  Throttle: {
    BurstLimit: 200,
    RateLimit: 100
  }
});
```

## Usage Plan with Tags

Create a usage plan that includes tags for better organization and tracking.

```ts
const taggedUsagePlan = await AWS.ApiGateway.UsagePlan("taggedUsagePlan", {
  UsagePlanName: "TaggedUsagePlan",
  Description: "A usage plan with tags for identification",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "API Development"
    }
  ],
  Throttle: {
    BurstLimit: 50,
    RateLimit: 25
  }
});
```

## Usage Plan with Adoption

Create a usage plan that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedUsagePlan = await AWS.ApiGateway.UsagePlan("adoptedUsagePlan", {
  UsagePlanName: "ExistingUsagePlan",
  Description: "An existing usage plan that should be adopted",
  adopt: true,
  Throttle: {
    BurstLimit: 150,
    RateLimit: 75
  }
});
```
