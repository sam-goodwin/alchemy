---
title: CapacityReservation
description: Learn how to create, update, and manage AWS EC2 CapacityReservations using Alchemy Cloud Control.
---


The CapacityReservation resource allows you to manage [AWS EC2 CapacityReservations](https://docs.aws.amazon.com/ec2/latest/userguide/) which provide dedicated capacity for EC2 instances in specific Availability Zones.

## Minimal Example

Create a basic EC2 CapacityReservation with essential properties.

```ts
import AWS from "alchemy/aws/control";

const capacityReservation = await AWS.EC2.CapacityReservation("myCapacityReservation", {
  instanceCount: 5,
  instanceType: "t3.medium",
  instancePlatform: "Linux/UNIX",
  availabilityZone: "us-west-2a"
});
```

## Advanced Configuration

Configure an EC2 CapacityReservation with additional options like EBS optimization and tagging.

```ts
const advancedCapacityReservation = await AWS.EC2.CapacityReservation("advancedCapacityReservation", {
  instanceCount: 10,
  instanceType: "m5.large",
  instancePlatform: "Linux/UNIX",
  availabilityZone: "us-west-2b",
  ebsOptimized: true,
  tagSpecifications: [{
    resourceType: "capacity-reservation",
    tags: {
      Name: "AdvancedCapacityReservation",
      Environment: "Production"
    }
  }]
});
```

## Specifying End Dates

Create a CapacityReservation with a specified end date and billing owner ID.

```ts
const timedCapacityReservation = await AWS.EC2.CapacityReservation("timedCapacityReservation", {
  instanceCount: 20,
  instanceType: "c5.xlarge",
  instancePlatform: "Linux/UNIX",
  availabilityZone: "us-east-1a",
  endDate: "2024-12-31T23:59:59Z",
  unusedReservationBillingOwnerId: "123456789012"
});
```

## Using Placement Groups

Configure a CapacityReservation to use a specific placement group.

```ts
const placementGroupCapacityReservation = await AWS.EC2.CapacityReservation("placementGroupCapacityReservation", {
  instanceCount: 6,
  instanceType: "r5.2xlarge",
  instancePlatform: "Linux/UNIX",
  availabilityZone: "us-east-1b",
  placementGroupArn: "arn:aws:ec2:us-east-1:123456789012:placement-group/myPlacementGroup"
});
```
