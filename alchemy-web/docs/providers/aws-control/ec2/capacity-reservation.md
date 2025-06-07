---
title: Managing AWS EC2 CapacityReservations with Alchemy
description: Learn how to create, update, and manage AWS EC2 CapacityReservations using Alchemy Cloud Control.
---

# CapacityReservation

The CapacityReservation resource lets you manage [AWS EC2 Capacity Reservations](https://docs.aws.amazon.com/ec2/latest/userguide/) for reserving capacity for your Amazon EC2 instances in a specific Availability Zone.

## Minimal Example

Create a basic capacity reservation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicCapacityReservation = await AWS.EC2.CapacityReservation("BasicCapacityReservation", {
  InstanceCount: 5,
  InstanceType: "t3.medium",
  InstancePlatform: "Linux/UNIX",
  AvailabilityZone: "us-west-2a",
  EbsOptimized: true
});
```

## Advanced Configuration

Configure a capacity reservation with additional optional properties for better control and tagging.

```ts
const AdvancedCapacityReservation = await AWS.EC2.CapacityReservation("AdvancedCapacityReservation", {
  InstanceCount: 10,
  InstanceType: "m5.large",
  InstancePlatform: "Linux/UNIX",
  AvailabilityZone: "us-east-1b",
  Tenancy: "dedicated",
  TagSpecifications: [
    {
      ResourceType: "capacity-reservation",
      Tags: [
        { Key: "Environment", Value: "production" },
        { Key: "Team", Value: "DevOps" }
      ]
    }
  ]
});
```

## Example with End Date Configuration

Create a capacity reservation that specifies an end date for the reservation.

```ts
const TimedCapacityReservation = await AWS.EC2.CapacityReservation("TimedCapacityReservation", {
  InstanceCount: 3,
  InstanceType: "c5.xlarge",
  InstancePlatform: "Linux/UNIX",
  AvailabilityZone: "eu-central-1a",
  EndDateType: "limited",
  EndDate: new Date("2024-12-31T23:59:59Z").toISOString()
});
```

## Example with Outpost Configuration

Create a capacity reservation for an Outpost with specific configurations.

```ts
const OutpostCapacityReservation = await AWS.EC2.CapacityReservation("OutpostCapacityReservation", {
  InstanceCount: 2,
  InstanceType: "r5.large",
  InstancePlatform: "Linux/UNIX",
  AvailabilityZone: "us-west-2a",
  OutPostArn: "arn:aws:outposts:us-west-2:123456789012:outpost/op-abcdefgh",
  TagSpecifications: [
    {
      ResourceType: "capacity-reservation",
      Tags: [
        { Key: "Environment", Value: "staging" },
        { Key: "Project", Value: "Migration" }
      ]
    }
  ]
});
```