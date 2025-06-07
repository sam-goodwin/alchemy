---
title: Managing AWS PinpointEmail ConfigurationSets with Alchemy
description: Learn how to create, update, and manage AWS PinpointEmail ConfigurationSets using Alchemy Cloud Control.
---

# ConfigurationSet

The ConfigurationSet resource lets you create and manage [AWS PinpointEmail ConfigurationSets](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpointemail-configurationset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationset = await AWS.PinpointEmail.ConfigurationSet("configurationset-example", {
  Name: "configurationset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a configurationset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfigurationSet = await AWS.PinpointEmail.ConfigurationSet(
  "advanced-configurationset",
  {
    Name: "configurationset-",
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

