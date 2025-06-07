---
title: Managing AWS SageMaker AppImageConfigs with Alchemy
description: Learn how to create, update, and manage AWS SageMaker AppImageConfigs using Alchemy Cloud Control.
---

# AppImageConfig

The AppImageConfig resource lets you create and manage [AWS SageMaker AppImageConfigs](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-appimageconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const appimageconfig = await AWS.SageMaker.AppImageConfig("appimageconfig-example", {
  AppImageConfigName: "appimageconfig-appimageconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a appimageconfig with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAppImageConfig = await AWS.SageMaker.AppImageConfig("advanced-appimageconfig", {
  AppImageConfigName: "appimageconfig-appimageconfig",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

