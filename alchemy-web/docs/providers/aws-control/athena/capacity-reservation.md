---
title: Managing AWS Athena CapacityReservations with Alchemy
description: Learn how to create, update, and manage AWS Athena CapacityReservations using Alchemy Cloud Control.
---

# CapacityReservation

The CapacityReservation resource lets you create and manage [AWS Athena CapacityReservations](https://docs.aws.amazon.com/athena/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-athena-capacityreservation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const capacityreservation = await AWS.Athena.CapacityReservation("capacityreservation-example", {
  TargetDpus: 1,
  Name: "capacityreservation-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a capacityreservation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCapacityReservation = await AWS.Athena.CapacityReservation(
  "advanced-capacityreservation",
  {
    TargetDpus: 1,
    Name: "capacityreservation-",
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

