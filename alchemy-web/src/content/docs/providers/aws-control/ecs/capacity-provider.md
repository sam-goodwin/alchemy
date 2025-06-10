---
title: CapacityProvider
description: Learn how to create, update, and manage AWS ECS CapacityProviders using Alchemy Cloud Control.
---


The CapacityProvider resource lets you manage [AWS ECS CapacityProviders](https://docs.aws.amazon.com/ecs/latest/userguide/) for your containerized applications, enabling you to control the scaling and availability of your resources.

## Minimal Example

Create a basic ECS CapacityProvider with an Auto Scaling Group provider and a name:

```ts
import AWS from "alchemy/aws/control";

const basicCapacityProvider = await AWS.ECS.CapacityProvider("basicCapacityProvider", {
  autoScalingGroupProvider: {
    autoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-123456789012:autoScalingGroupName/my-asg",
    managedScaling: {
      status: "ENABLED",
      targetCapacity: 80,
      minimumScalingStepSize: 1,
      maximumScalingStepSize: 100
    },
    managedTerminationProtection: "ENABLED"
  },
  name: "BasicCapacityProvider"
});
```

## Advanced Configuration

Configure an ECS CapacityProvider with tags to help organize your resources:

```ts
const advancedCapacityProvider = await AWS.ECS.CapacityProvider("advancedCapacityProvider", {
  autoScalingGroupProvider: {
    autoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-123456789012:autoScalingGroupName/my-asg",
    managedScaling: {
      status: "ENABLED",
      targetCapacity: 90,
      minimumScalingStepSize: 1,
      maximumScalingStepSize: 50
    },
    managedTerminationProtection: "DISABLED"
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Project",
      value: "MyECSProject"
    }
  ],
  name: "AdvancedCapacityProvider"
});
```

## Scaling Configuration

Create a capacity provider that specifies scaling configurations for better cost management:

```ts
const scalingCapacityProvider = await AWS.ECS.CapacityProvider("scalingCapacityProvider", {
  autoScalingGroupProvider: {
    autoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-123456789012:autoScalingGroupName/my-asg",
    managedScaling: {
      status: "ENABLED",
      targetCapacity: 70,
      minimumScalingStepSize: 1,
      maximumScalingStepSize: 10
    },
    managedTerminationProtection: "ENABLED"
  },
  tags: [
    {
      key: "Environment",
      value: "Staging"
    }
  ],
  name: "ScalingCapacityProvider"
});
```

## Using Existing Resources

Adopt an existing ECS CapacityProvider instead of failing when the resource already exists:

```ts
const existingCapacityProvider = await AWS.ECS.CapacityProvider("existingCapacityProvider", {
  autoScalingGroupProvider: {
    autoScalingGroupArn: "arn:aws:autoscaling:us-west-2:123456789012:autoScalingGroup:abcd1234-abcd-1234-abcd-123456789012:autoScalingGroupName/my-existing-asg",
    managedScaling: {
      status: "DISABLED"
    },
    managedTerminationProtection: "DISABLED"
  },
  adopt: true,
  name: "ExistingCapacityProvider"
});
```
