---
title: Managing AWS SageMaker EndpointConfigs with Alchemy
description: Learn how to create, update, and manage AWS SageMaker EndpointConfigs using Alchemy Cloud Control.
---

# EndpointConfig

The EndpointConfig resource lets you create and manage [AWS SageMaker EndpointConfigs](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-endpointconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const endpointconfig = await AWS.SageMaker.EndpointConfig("endpointconfig-example", {
  ProductionVariants: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a endpointconfig with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEndpointConfig = await AWS.SageMaker.EndpointConfig("advanced-endpointconfig", {
  ProductionVariants: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

