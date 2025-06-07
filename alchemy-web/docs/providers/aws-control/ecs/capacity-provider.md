---
title: Managing AWS ECS CapacityProviders with Alchemy
description: Learn how to create, update, and manage AWS ECS CapacityProviders using Alchemy Cloud Control.
---

# CapacityProvider

The CapacityProvider resource allows you to manage [AWS ECS CapacityProviders](https://docs.aws.amazon.com/ecs/latest/userguide/) for your container orchestration needs, enabling automatic scaling of your cluster.

## Minimal Example

Create a basic ECS CapacityProvider with an Auto Scaling Group provider and a tag.

```ts
import AWS from "alchemy/aws/control";

const MyCapacityProvider = await AWS.ECS.CapacityProvider("MyCapacityProvider", {
  AutoScalingGroupProvider: {
    AutoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-1234567890ab:autoScalingGroupName/MyAutoScalingGroup",
    ManagedScaling: {
      Status: "ENABLED",
      TargetCapacity: 80,
      MinimumScalingStepSize: 1,
      MaximumScalingStepSize: 100
    }
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DevOps" }
  ],
  Name: "MyCapacityProvider"
});
```

## Advanced Configuration

Configure a CapacityProvider with additional settings for managed scaling and a more complex Auto Scaling Group provider.

```ts
const AdvancedCapacityProvider = await AWS.ECS.CapacityProvider("AdvancedCapacityProvider", {
  AutoScalingGroupProvider: {
    AutoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-1234567890ab:autoScalingGroupName/MyAdvancedAutoScalingGroup",
    ManagedScaling: {
      Status: "ENABLED",
      TargetCapacity: 100,
      MinimumScalingStepSize: 2,
      MaximumScalingStepSize: 50
    },
    ManagedTerminationProtection: "ENABLED"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Platform" }
  ],
  Name: "AdvancedCapacityProvider"
});
```

## Example with Existing Resource Adoption

Create a CapacityProvider that adopts an existing Auto Scaling Group if it already exists.

```ts
const AdoptedCapacityProvider = await AWS.ECS.CapacityProvider("AdoptedCapacityProvider", {
  AutoScalingGroupProvider: {
    AutoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-1234567890ab:autoScalingGroupName/MyAdoptedAutoScalingGroup",
    ManagedScaling: {
      Status: "ENABLED",
      TargetCapacity: 75
    }
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "QA" }
  ],
  Name: "AdoptedCapacityProvider",
  adopt: true
});
```