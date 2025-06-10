---
title: WarmPool
description: Learn how to create, update, and manage AWS AutoScaling WarmPools using Alchemy Cloud Control.
---


The WarmPool resource lets you manage [AWS AutoScaling WarmPools](https://docs.aws.amazon.com/autoscaling/latest/userguide/) that help reduce the time it takes to launch EC2 instances in response to scaling events.

## Minimal Example

Create a basic WarmPool with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const warmPool = await AWS.AutoScaling.WarmPool("myWarmPool", {
  AutoScalingGroupName: "myAutoScalingGroup",
  MinSize: 2
});
```

## Advanced Configuration

Configure a WarmPool with additional settings including a reuse policy.

```ts
const advancedWarmPool = await AWS.AutoScaling.WarmPool("advancedWarmPool", {
  AutoScalingGroupName: "myAutoScalingGroup",
  MinSize: 2,
  MaxGroupPreparedCapacity: 5,
  InstanceReusePolicy: {
    ReuseOnScaleIn: true,
    ReuseOnScaleOut: false
  }
});
```

## Specific Use Case: Instance Reuse Policy

Create a WarmPool with a specific instance reuse policy for scaling in.

```ts
const reusePolicyWarmPool = await AWS.AutoScaling.WarmPool("reusePolicyWarmPool", {
  AutoScalingGroupName: "myAutoScalingGroup",
  MinSize: 3,
  InstanceReusePolicy: {
    ReuseOnScaleIn: true,
    ReuseOnScaleOut: true
  }
});
```

## Specific Use Case: Pool State Management

Set up a WarmPool with a defined pool state.

```ts
const stateManagedWarmPool = await AWS.AutoScaling.WarmPool("stateManagedWarmPool", {
  AutoScalingGroupName: "myAutoScalingGroup",
  MinSize: 1,
  PoolState: "Pending"
});
```
