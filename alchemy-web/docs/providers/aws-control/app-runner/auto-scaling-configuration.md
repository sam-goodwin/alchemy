---
title: Managing AWS AppRunner AutoScalingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS AppRunner AutoScalingConfigurations using Alchemy Cloud Control.
---

# AutoScalingConfiguration

The AutoScalingConfiguration resource allows you to configure automatic scaling for your AWS AppRunner services, enabling you to manage application performance and resource usage efficiently. For more detailed information, please refer to the [AWS AppRunner AutoScalingConfigurations documentation](https://docs.aws.amazon.com/apprunner/latest/userguide/).

## Minimal Example

Create a basic AutoScalingConfiguration with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("BasicAutoScalingConfig", {
  MinSize: 1,
  MaxSize: 5,
  AutoScalingConfigurationName: "MyAutoScalingConfig"
});
```

## Advanced Configuration

Configure an AutoScalingConfiguration with additional options like maximum concurrency and tags for better resource management.

```ts
const advancedAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("AdvancedAutoScalingConfig", {
  MinSize: 2,
  MaxSize: 10,
  MaxConcurrency: 5,
  AutoScalingConfigurationName: "AdvancedAutoScalingConfig",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Existing Resources

Adopt an existing AutoScalingConfiguration instead of creating a new one, which is useful for managing resources in a shared environment.

```ts
const existingAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("ExistingAutoScalingConfig", {
  MinSize: 3,
  MaxSize: 8,
  AutoScalingConfigurationName: "ExistingAutoScalingConfig",
  adopt: true
});
```