---
title: Managing AWS EC2 SpotFleets with Alchemy
description: Learn how to create, update, and manage AWS EC2 SpotFleets using Alchemy Cloud Control.
---

# SpotFleet

The SpotFleet resource allows you to manage [AWS EC2 SpotFleets](https://docs.aws.amazon.com/ec2/latest/userguide/) which are collections of Spot Instances designed to meet specific capacity needs at the lowest possible cost.

## Minimal Example

Create a basic SpotFleet request with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicSpotFleet = await AWS.EC2.SpotFleet("BasicSpotFleet", {
  SpotFleetRequestConfigData: {
    TargetCapacity: 2,
    LaunchSpecifications: [{
      InstanceType: "t3.micro",
      SpotPrice: "0.012",
      ImageId: "ami-0abcdef1234567890",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678"
      }],
      SubnetId: "subnet-0abcd1234efgh5678"
    }],
    IamFleetRole: "arn:aws:iam::123456789012:role/my-spotfleet-role",
    TerminateInstancesWithExpiration: true,
    TagSpecifications: [{
      ResourceType: "spot-fleet-request",
      Tags: [
        { Key: "Environment", Value: "Development" },
        { Key: "Team", Value: "DevOps" }
      ]
    }]
  }
});
```

## Advanced Configuration

Configure a SpotFleet request with multiple launch specifications and additional options.

```ts
const AdvancedSpotFleet = await AWS.EC2.SpotFleet("AdvancedSpotFleet", {
  SpotFleetRequestConfigData: {
    TargetCapacity: 5,
    LaunchSpecifications: [{
      InstanceType: "t3.medium",
      SpotPrice: "0.020",
      ImageId: "ami-0abcdef1234567890",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678"
      }],
      SubnetId: "subnet-0abcd1234efgh5678"
    }, {
      InstanceType: "t3.large",
      SpotPrice: "0.025",
      ImageId: "ami-0abcdef1234567890",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678"
      }],
      SubnetId: "subnet-0abcd1234efgh5678"
    }],
    IamFleetRole: "arn:aws:iam::123456789012:role/my-spotfleet-role",
    AllocationStrategy: "lowestPrice",
    TerminateInstancesWithExpiration: true,
    TagSpecifications: [{
      ResourceType: "spot-fleet-request",
      Tags: [
        { Key: "Environment", Value: "Production" },
        { Key: "Team", Value: "Engineering" }
      ]
    }]
  }
});
```

## SpotFleet with Multiple Network Interfaces

This example demonstrates how to create a SpotFleet with instances that have multiple network interfaces.

```ts
const MultiENISpotFleet = await AWS.EC2.SpotFleet("MultiENISpotFleet", {
  SpotFleetRequestConfigData: {
    TargetCapacity: 3,
    LaunchSpecifications: [{
      InstanceType: "m5.large",
      SpotPrice: "0.050",
      ImageId: "ami-0abcdef1234567890",
      KeyName: "my-key-pair",
      NetworkInterfaces: [{
        AssociatePublicIpAddress: true,
        DeviceIndex: 0,
        SubnetId: "subnet-0abcd1234efgh5678",
        Groups: ["sg-0abcd1234efgh5678"]
      }, {
        DeviceIndex: 1,
        SubnetId: "subnet-0abcd1234efgh5678",
        Groups: ["sg-0abcd1234efgh5678"]
      }],
      TagSpecifications: [{
        ResourceType: "instance",
        Tags: [
          { Key: "Environment", Value: "Staging" },
          { Key: "Team", Value: "QA" }
        ]
      }]
    }],
    IamFleetRole: "arn:aws:iam::123456789012:role/my-spotfleet-role",
    TagSpecifications: [{
      ResourceType: "spot-fleet-request",
      Tags: [
        { Key: "Environment", Value: "Staging" },
        { Key: "Team", Value: "QA" }
      ]
    }]
  }
});
```