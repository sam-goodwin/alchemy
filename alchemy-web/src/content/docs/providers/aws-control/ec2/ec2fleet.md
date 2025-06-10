---
title: EC2Fleet
description: Learn how to create, update, and manage AWS EC2 EC2Fleets using Alchemy Cloud Control.
---


The EC2Fleet resource allows you to manage [AWS EC2 Fleets](https://docs.aws.amazon.com/ec2/latest/userguide/) for deploying and scaling Amazon EC2 instances across different instance types and purchasing options. This resource provides a way to create a fleet of EC2 instances that can include both On-Demand and Spot instances.

## Minimal Example

Create a basic EC2 Fleet with required properties and some common optional configurations:

```ts
import AWS from "alchemy/aws/control";

const ec2Fleet = await AWS.EC2.EC2Fleet("myEc2Fleet", {
  TargetCapacitySpecification: {
    TotalTargetCapacity: 5,
    OnDemandTargetCapacity: 3,
    SpotTargetCapacity: 2
  },
  LaunchTemplateConfigs: [
    {
      LaunchTemplateSpecification: {
        LaunchTemplateId: "lt-0123456789abcdef0",
        Version: "$Latest"
      },
      Overrides: [
        {
          InstanceType: "t3.micro",
          WeightedCapacity: "1"
        },
        {
          InstanceType: "t3.small",
          WeightedCapacity: "1"
        }
      ]
    }
  ],
  OnDemandOptions: {
    MaxTotalPrice: "10.00",
    AllocationStrategy: "lowestPrice"
  }
});
```

## Advanced Configuration

Configure an EC2 Fleet with more advanced options like Spot instance settings and termination policies:

```ts
const advancedEc2Fleet = await AWS.EC2.EC2Fleet("advancedEc2Fleet", {
  TargetCapacitySpecification: {
    TotalTargetCapacity: 10,
    OnDemandTargetCapacity: 5,
    SpotTargetCapacity: 5
  },
  LaunchTemplateConfigs: [
    {
      LaunchTemplateSpecification: {
        LaunchTemplateId: "lt-0123456789abcdef1",
        Version: "$Latest"
      },
      Overrides: [
        {
          InstanceType: "t3.medium",
          WeightedCapacity: "2"
        },
        {
          InstanceType: "t3.large",
          WeightedCapacity: "3"
        }
      ]
    }
  ],
  SpotOptions: {
    AllocationStrategy: "capacityOptimized",
    InstanceInterruptionBehavior: "terminate",
    MaxPrice: "0.05"
  },
  Type: "instant",
  ExcessCapacityTerminationPolicy: "noTermination",
  ReplaceUnhealthyInstances: true,
  TagSpecifications: [
    {
      ResourceType: "instance",
      Tags: [
        {
          Key: "Environment",
          Value: "Production"
        }
      ]
    }
  ]
});
```

## Termination with Expiration

Create an EC2 Fleet that automatically terminates instances after a specified expiration time:

```ts
const expiringEc2Fleet = await AWS.EC2.EC2Fleet("expiringEc2Fleet", {
  TargetCapacitySpecification: {
    TotalTargetCapacity: 4
  },
  LaunchTemplateConfigs: [
    {
      LaunchTemplateSpecification: {
        LaunchTemplateId: "lt-9876543210abcdef0",
        Version: "$Latest"
      },
      Overrides: [
        {
          InstanceType: "t3.small",
          WeightedCapacity: "1"
        }
      ]
    }
  ],
  ValidFrom: new Date().toISOString(),
  ValidUntil: new Date(Date.now() + 3600000).toISOString(), // valid for 1 hour
  TerminateInstancesWithExpiration: true
});
```
