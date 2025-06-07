---
title: Managing AWS ImageBuilder DistributionConfigurations with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder DistributionConfigurations using Alchemy Cloud Control.
---

# DistributionConfiguration

The DistributionConfiguration resource lets you create and manage [AWS ImageBuilder DistributionConfigurations](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-imagebuilder-distributionconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const distributionconfiguration = await AWS.ImageBuilder.DistributionConfiguration(
  "distributionconfiguration-example",
  {
    Name: "distributionconfiguration-",
    Distributions: [],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A distributionconfiguration resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a distributionconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDistributionConfiguration = await AWS.ImageBuilder.DistributionConfiguration(
  "advanced-distributionconfiguration",
  {
    Name: "distributionconfiguration-",
    Distributions: [],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A distributionconfiguration resource managed by Alchemy",
  }
);
```

