---
title: Managing AWS ApiGateway UsagePlans with Alchemy
description: Learn how to create, update, and manage AWS ApiGateway UsagePlans using Alchemy Cloud Control.
---

# UsagePlan

The UsagePlan resource lets you manage [AWS ApiGateway UsagePlans](https://docs.aws.amazon.com/apigateway/latest/userguide/) that define the usage limits and access for different API consumers.

## Minimal Example

Create a basic UsagePlan with a name and description, along with a simple throttle configuration.

```ts
import AWS from "alchemy/aws/control";

const BasicUsagePlan = await AWS.ApiGateway.UsagePlan("BasicUsagePlan", {
  UsagePlanName: "BasicPlan",
  Description: "A basic usage plan for limited API access.",
  Throttle: {
    BurstLimit: 100,
    RateLimit: 50
  }
});
```

## Advanced Configuration

Configure a UsagePlan with quota limits and tags for better management and tracking.

```ts
const AdvancedUsagePlan = await AWS.ApiGateway.UsagePlan("AdvancedUsagePlan", {
  UsagePlanName: "AdvancedPlan",
  Description: "An advanced usage plan with quota limits.",
  Quota: {
    Limit: 1000,
    Period: "MONTH",
    Offset: 0
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "API-Development" }
  ],
  Throttle: {
    BurstLimit: 200,
    RateLimit: 100
  }
});
```

## Integrating with API Stages

Create a UsagePlan that integrates with specific API stages to control access for different environments.

```ts
const StagedUsagePlan = await AWS.ApiGateway.UsagePlan("StagedUsagePlan", {
  UsagePlanName: "StagedPlan",
  Description: "Usage plan linked to specific API stages.",
  ApiStages: [
    {
      ApiId: "abc123xyz",
      Stage: "prod"
    },
    {
      ApiId: "abc123xyz",
      Stage: "dev"
    }
  ],
  Throttle: {
    BurstLimit: 300,
    RateLimit: 150
  }
});
```

## Adoption of Existing Resources

If you want to adopt an existing UsagePlan if it already exists, you can set the adopt property to true.

```ts
const AdoptExistingPlan = await AWS.ApiGateway.UsagePlan("AdoptExistingPlan", {
  UsagePlanName: "PreExistingPlan",
  adopt: true,
  Description: "This plan will adopt the existing usage plan if it exists."
});
```