---
title: CapacityReservationFleet
description: Learn how to create, update, and manage AWS EC2 CapacityReservationFleets using Alchemy Cloud Control.
---


The CapacityReservationFleet resource allows you to manage [EC2 Capacity Reservation Fleets](https://docs.aws.amazon.com/ec2/latest/userguide/) in AWS, enabling you to reserve capacity for your EC2 instances in a scalable manner.

## Minimal Example

Create a basic Capacity Reservation Fleet with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const capacityReservationFleet = await AWS.EC2.CapacityReservationFleet("myCapacityReservationFleet", {
  TotalTargetCapacity: 10,
  Tenancy: "default",
  InstanceTypeSpecifications: [
    {
      InstanceType: "t3.micro",
      TotalTargetCapacity: 10
    }
  ]
});
```

## Advanced Configuration

Configure a Capacity Reservation Fleet with multiple instance types and an allocation strategy.

```ts
const advancedCapacityReservationFleet = await AWS.EC2.CapacityReservationFleet("advancedCapacityReservationFleet", {
  TotalTargetCapacity: 20,
  AllocationStrategy: "open",
  InstanceTypeSpecifications: [
    {
      InstanceType: "t3.micro",
      TotalTargetCapacity: 10
    },
    {
      InstanceType: "t3.small",
      TotalTargetCapacity: 10
    }
  ],
  TagSpecifications: [
    {
      ResourceType: "capacity-reservation-fleet",
      Tags: [
        {
          Key: "Environment",
          Value: "Production"
        },
        {
          Key: "Project",
          Value: "WebApp"
        }
      ]
    }
  ]
});
```

## Configuring End Dates

Create a Capacity Reservation Fleet with a specified end date and settings to manage its lifecycle.

```ts
const timedCapacityReservationFleet = await AWS.EC2.CapacityReservationFleet("timedCapacityReservationFleet", {
  TotalTargetCapacity: 15,
  InstanceTypeSpecifications: [
    {
      InstanceType: "t3.medium",
      TotalTargetCapacity: 15
    }
  ],
  EndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  NoRemoveEndDate: false
});
```
