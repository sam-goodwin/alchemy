---
title: ObservabilityConfiguration
description: Learn how to create, update, and manage AWS AppRunner ObservabilityConfigurations using Alchemy Cloud Control.
---


The ObservabilityConfiguration resource allows you to manage the observability settings for AWS AppRunner services, enabling you to configure tracing and monitoring features. For more information, visit the [AWS AppRunner ObservabilityConfigurations documentation](https://docs.aws.amazon.com/apprunner/latest/userguide/).

## Minimal Example

Create a basic ObservabilityConfiguration with a trace configuration.

```ts
import AWS from "alchemy/aws/control";

const basicObservabilityConfig = await AWS.AppRunner.ObservabilityConfiguration("basicObservabilityConfig", {
  ObservabilityConfigurationName: "BasicConfig",
  TraceConfiguration: {
    Vendor: "AWS_XRAY",
    SamplingRule: {
      Name: "DefaultSamplingRule",
      Priority: 100,
      FixedRate: 0.05,
      ReservoirSize: 100
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Advanced Configuration

Configure an ObservabilityConfiguration with additional tracing options and multiple tags.

```ts
const advancedObservabilityConfig = await AWS.AppRunner.ObservabilityConfiguration("advancedObservabilityConfig", {
  ObservabilityConfigurationName: "AdvancedConfig",
  TraceConfiguration: {
    Vendor: "AWS_XRAY",
    SamplingRule: {
      Name: "CustomSamplingRule",
      Priority: 200,
      FixedRate: 0.1,
      ReservoirSize: 200
    }
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing ObservabilityConfiguration instead of creating a new one, set the `adopt` property to true.

```ts
const adoptExistingObservabilityConfig = await AWS.AppRunner.ObservabilityConfiguration("adoptExistingObservabilityConfig", {
  ObservabilityConfigurationName: "ExistingConfig",
  adopt: true
});
```
