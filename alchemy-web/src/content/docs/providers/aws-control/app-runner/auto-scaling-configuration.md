---
title: AutoScalingConfiguration
description: Learn how to create, update, and manage AWS AppRunner AutoScalingConfigurations using Alchemy Cloud Control.
---


The AutoScalingConfiguration resource allows you to manage the scaling settings for AWS AppRunner services. This resource can configure the minimum and maximum number of instances as well as concurrency settings. For more information, refer to the [AWS AppRunner AutoScalingConfigurations documentation](https://docs.aws.amazon.com/apprunner/latest/userguide/).

## Minimal Example

Create a basic AutoScalingConfiguration with minimum size and maximum size properties.

```ts
import AWS from "alchemy/aws/control";

const basicAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("basicAutoScalingConfig", {
  MinSize: 1,
  MaxSize: 5,
});
```

## Advanced Configuration

Configure an AutoScalingConfiguration with additional options such as max concurrency and a custom name.

```ts
const advancedAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("advancedAutoScalingConfig", {
  MinSize: 2,
  MaxSize: 10,
  MaxConcurrency: 5,
  AutoScalingConfigurationName: "MyCustomScalingConfig",
});
```

## With Tags

Create an AutoScalingConfiguration that includes tags for better resource management.

```ts
const taggedAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("taggedAutoScalingConfig", {
  MinSize: 1,
  MaxSize: 3,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Adoption of Existing Configuration

If you want to adopt an existing AutoScalingConfiguration instead of failing when a resource already exists, you can set the `adopt` property to true.

```ts
const adoptedAutoScalingConfig = await AWS.AppRunner.AutoScalingConfiguration("adoptedAutoScalingConfig", {
  MinSize: 1,
  MaxSize: 5,
  adopt: true
});
```
