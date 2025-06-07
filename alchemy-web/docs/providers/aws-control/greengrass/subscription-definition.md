---
title: Managing AWS Greengrass SubscriptionDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass SubscriptionDefinitions using Alchemy Cloud Control.
---

# SubscriptionDefinition

The SubscriptionDefinition resource lets you create and manage [AWS Greengrass SubscriptionDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-subscriptiondefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subscriptiondefinition = await AWS.Greengrass.SubscriptionDefinition(
  "subscriptiondefinition-example",
  { Name: "subscriptiondefinition-", Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a subscriptiondefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSubscriptionDefinition = await AWS.Greengrass.SubscriptionDefinition(
  "advanced-subscriptiondefinition",
  {
    Name: "subscriptiondefinition-",
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

