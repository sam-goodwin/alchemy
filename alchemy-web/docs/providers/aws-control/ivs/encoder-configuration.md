---
title: Managing AWS IVS EncoderConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IVS EncoderConfigurations using Alchemy Cloud Control.
---

# EncoderConfiguration

The EncoderConfiguration resource lets you create and manage [AWS IVS EncoderConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-encoderconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const encoderconfiguration = await AWS.IVS.EncoderConfiguration("encoderconfiguration-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a encoderconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEncoderConfiguration = await AWS.IVS.EncoderConfiguration(
  "advanced-encoderconfiguration",
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

