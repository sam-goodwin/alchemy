---
title: Managing AWS AppRunner ObservabilityConfigurations with Alchemy
description: Learn how to create, update, and manage AWS AppRunner ObservabilityConfigurations using Alchemy Cloud Control.
---

# ObservabilityConfiguration

The ObservabilityConfiguration resource lets you create and manage [AWS AppRunner ObservabilityConfigurations](https://docs.aws.amazon.com/apprunner/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-observabilityconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const observabilityconfiguration = await AWS.AppRunner.ObservabilityConfiguration(
  "observabilityconfiguration-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a observabilityconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedObservabilityConfiguration = await AWS.AppRunner.ObservabilityConfiguration(
  "advanced-observabilityconfiguration",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

