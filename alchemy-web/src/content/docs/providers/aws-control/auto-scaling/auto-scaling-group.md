---
title: AutoScalingGroup
description: Learn how to create, update, and manage AWS AutoScaling AutoScalingGroups using Alchemy Cloud Control.
---


The AutoScalingGroup resource allows you to manage [AWS AutoScaling AutoScalingGroups](https://docs.aws.amazon.com/autoscaling/latest/userguide/) that automatically adjust the number of EC2 instances in response to demand.

## Minimal Example

Create a basic AutoScalingGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAutoScalingGroup = await AWS.AutoScaling.AutoScalingGroup("basicAutoScalingGroup", {
  MaxSize: "5",
  MinSize: "1",
  DesiredCapacity: "2",
  VPCZoneIdentifier: ["subnet-abc12345", "subnet-def67890"],
  LaunchConfigurationName: "myLaunchConfiguration"
});
```

## Advanced Configuration

Configure an AutoScalingGroup with lifecycle hooks and notification configurations for better management.

```ts
const advancedAutoScalingGroup = await AWS.AutoScaling.AutoScalingGroup("advancedAutoScalingGroup", {
  MaxSize: "10",
  MinSize: "2",
  DesiredCapacity: "5",
  VPCZoneIdentifier: ["subnet-abc12345"],
  LaunchConfigurationName: "myLaunchConfiguration",
  LifecycleHookSpecificationList: [{
    LifecycleTransition: "autoscaling:EC2_INSTANCE_LAUNCHING",
    NotificationTargetARN: "arn:aws:sns:us-east-1:123456789012:mySNSTopic",
    RoleARN: "arn:aws:iam::123456789012:role/myRole"
  }],
  NotificationConfigurations: [{
    TopicARN: "arn:aws:sns:us-east-1:123456789012:mySNSTopic",
    NotificationTypes: ["autoscaling:EC2_INSTANCE_LAUNCHED", "autoscaling:EC2_INSTANCE_TERMINATED"]
  }]
});
```

## Mixed Instances Policy

Create an AutoScalingGroup with a mixed instances policy to utilize multiple instance types for cost efficiency.

```ts
const mixedInstancesAutoScalingGroup = await AWS.AutoScaling.AutoScalingGroup("mixedInstancesAutoScalingGroup", {
  MaxSize: "10",
  MinSize: "2",
  LaunchTemplate: {
    LaunchTemplateId: "lt-0123456789abcdef0",
    Version: "$Latest"
  },
  MixedInstancesPolicy: {
    InstancesDistribution: {
      OnDemandAllocationStrategy: "prioritized",
      OnDemandBaseCapacity: 1,
      OnDemandPercentageAboveBaseCapacity: 50,
      SpotAllocationStrategy: "lowest-price",
      SpotInstancePools: 2
    },
    LaunchTemplate: {
      LaunchTemplateSpecification: {
        LaunchTemplateId: "lt-0123456789abcdef0",
        Version: "$Latest"
      },
      Overrides: [{
        InstanceType: "t3.micro"
      }, {
        InstanceType: "t3.small"
      }]
    }
  },
  VPCZoneIdentifier: ["subnet-abc12345", "subnet-def67890"]
});
```
