---
title: SpotFleet
description: Learn how to create, update, and manage AWS EC2 SpotFleets using Alchemy Cloud Control.
---


The SpotFleet resource lets you manage [AWS EC2 SpotFleets](https://docs.aws.amazon.com/ec2/latest/userguide/) for efficiently provisioning and managing a fleet of EC2 Spot Instances.

## Minimal Example

Create a basic SpotFleet with default settings:

```ts
import AWS from "alchemy/aws/control";

const spotFleet = await AWS.EC2.SpotFleet("mySpotFleet", {
  SpotFleetRequestConfigData: {
    AllocationStrategy: "lowestPrice",
    TargetCapacity: 5,
    InstanceType: "t3.micro",
    LaunchSpecifications: [{
      ImageId: "ami-0abcdef1234567890",
      SubnetId: "subnet-0bb1c79de3EXAMPLE",
      IamFleetRole: "arn:aws:iam::123456789012:role/my-spot-fleet-role",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678",
        Priority: 1
      }]
    }]
  },
  adopt: false
});
```

## Advanced Configuration

Configure a SpotFleet with a more complex setup, including multiple instance types and tags:

```ts
const advancedSpotFleet = await AWS.EC2.SpotFleet("advancedSpotFleet", {
  SpotFleetRequestConfigData: {
    AllocationStrategy: "diversified",
    TargetCapacity: 10,
    InstanceType: "t3.micro",
    LaunchSpecifications: [{
      ImageId: "ami-0abcdef1234567890",
      SubnetId: "subnet-0bb1c79de3EXAMPLE",
      IamFleetRole: "arn:aws:iam::123456789012:role/my-spot-fleet-role",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678",
        Priority: 1
      }],
      TagSpecifications: [{
        ResourceType: "instance",
        Tags: [{
          Key: "Environment",
          Value: "Production"
        }]
      }]
    }, {
      InstanceType: "t3.small",
      ImageId: "ami-0abcdef1234567890",
      SubnetId: "subnet-0bb1c79de3EXAMPLE",
      IamFleetRole: "arn:aws:iam::123456789012:role/my-spot-fleet-role",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678",
        Priority: 1
      }]
    }]
  },
  adopt: true
});
```

## Scaling and Instance Fleets

Demonstrate how to adjust the target capacity and scaling policies for the SpotFleet:

```ts
const scalingSpotFleet = await AWS.EC2.SpotFleet("scalingSpotFleet", {
  SpotFleetRequestConfigData: {
    AllocationStrategy: "lowestPrice",
    TargetCapacity: 15,
    InstanceType: "t3.micro",
    LaunchSpecifications: [{
      ImageId: "ami-0abcdef1234567890",
      SubnetId: "subnet-0bb1c79de3EXAMPLE",
      IamFleetRole: "arn:aws:iam::123456789012:role/my-spot-fleet-role",
      KeyName: "my-key-pair",
      SecurityGroups: [{
        GroupId: "sg-0abcd1234efgh5678",
        Priority: 1
      }]
    }],
    SpotPrice: "0.05",
    TerminationPolicies: ["default"]
  },
  adopt: false
});
``` 

This example illustrates how to create a SpotFleet that can automatically scale based on demand and incorporate a spot price limit.
