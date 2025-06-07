---
title: Managing AWS Logs DeliveryDestinations with Alchemy
description: Learn how to create, update, and manage AWS Logs DeliveryDestinations using Alchemy Cloud Control.
---

# DeliveryDestination

The DeliveryDestination resource lets you create and manage [AWS Logs DeliveryDestinations](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-deliverydestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deliverydestination = await AWS.Logs.DeliveryDestination("deliverydestination-example", {
  Name: "deliverydestination-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a deliverydestination with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeliveryDestination = await AWS.Logs.DeliveryDestination(
  "advanced-deliverydestination",
  {
    Name: "deliverydestination-",
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

