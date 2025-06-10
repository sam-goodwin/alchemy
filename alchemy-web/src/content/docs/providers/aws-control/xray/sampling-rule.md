---
title: SamplingRule
description: Learn how to create, update, and manage AWS XRay SamplingRules using Alchemy Cloud Control.
---


The SamplingRule resource lets you manage [AWS XRay SamplingRules](https://docs.aws.amazon.com/xray/latest/userguide/) for controlling the amount of data recorded by AWS XRay. SamplingRules help optimize the cost and performance of tracing requests in your applications.

## Minimal Example

Create a basic SamplingRule with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicSamplingRule = await AWS.XRay.SamplingRule("basicSamplingRule", {
  SamplingRule: {
    RuleName: "BasicRule",
    Priority: 1,
    ReservoirSize: 100,
    FixedRate: 0.05,
    ServiceName: "MyService",
    ServiceType: "backend",
    HttpMethod: "*",
    UrlPath: "/api/*"
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a SamplingRule with additional parameters for finer control over sampling.

```ts
const advancedSamplingRule = await AWS.XRay.SamplingRule("advancedSamplingRule", {
  SamplingRule: {
    RuleName: "AdvancedRule",
    Priority: 2,
    ReservoirSize: 200,
    FixedRate: 0.1,
    ServiceName: "AdvancedService",
    ServiceType: "backend",
    HttpMethod: "GET",
    UrlPath: "/v1/resource/*",
    Version: 1,
    Attributes: {
      "user": "admin",
      "region": "us-west-2"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevOps" }
  ]
});
```

## Conditional Sampling

Create a SamplingRule that applies conditional sampling based on specific attributes.

```ts
const conditionalSamplingRule = await AWS.XRay.SamplingRule("conditionalSamplingRule", {
  SamplingRule: {
    RuleName: "ConditionalRule",
    Priority: 3,
    ReservoirSize: 150,
    FixedRate: 0.2,
    ServiceName: "ConditionalService",
    ServiceType: "frontend",
    HttpMethod: "POST",
    UrlPath: "/api/v1/submit",
    Attributes: {
      "userType": "premium"
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```
