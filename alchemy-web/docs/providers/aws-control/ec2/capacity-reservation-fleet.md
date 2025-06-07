---
title: Managing AWS EC2 CapacityReservationFleets with Alchemy
description: Learn how to create, update, and manage AWS EC2 CapacityReservationFleets using Alchemy Cloud Control.
---

# CapacityReservationFleet

The CapacityReservationFleet resource lets you create and manage [AWS EC2 CapacityReservationFleets](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-capacityreservationfleet.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const capacityreservationfleet = await AWS.EC2.CapacityReservationFleet(
  "capacityreservationfleet-example",
  {}
);
```

