---
title: ScalingPolicy
description: Learn how to create, update, and manage AWS AutoScaling ScalingPolicys using Alchemy Cloud Control.
---


The ScalingPolicy resource lets you manage [AWS AutoScaling ScalingPolicys](https://docs.aws.amazon.com/autoscaling/latest/userguide/) for automatically scaling your resources based on demand.

## Minimal Example

Create a basic scaling policy that adjusts the desired capacity of an Auto Scaling group.

```ts
import AWS from "alchemy/aws/control";

const basicScalingPolicy = await AWS.AutoScaling.ScalingPolicy("basicScalingPolicy", {
  AutoScalingGroupName: "my-auto-scaling-group",
  ScalingAdjustment: 1,
  AdjustmentType: "ChangeInCapacity",
  Cooldown: "300"
});
```

## Advanced Configuration

Configure a scaling policy with step adjustments and a cooldown period for more fine-tuned scaling behavior.

```ts
const advancedScalingPolicy = await AWS.AutoScaling.ScalingPolicy("advancedScalingPolicy", {
  AutoScalingGroupName: "my-auto-scaling-group",
  AdjustmentType: "ChangeInCapacity",
  StepAdjustments: [
    {
      MetricIntervalLowerBound: 0,
      MetricIntervalUpperBound: 10,
      ScalingAdjustment: 2
    },
    {
      MetricIntervalLowerBound: 10,
      ScalingAdjustment: 3
    }
  ],
  Cooldown: "300"
});
```

## Predictive Scaling Configuration

Create a scaling policy that includes predictive scaling configuration to proactively adjust capacity based on forecasted demand.

```ts
const predictiveScalingPolicy = await AWS.AutoScaling.ScalingPolicy("predictiveScalingPolicy", {
  AutoScalingGroupName: "my-auto-scaling-group",
  PredictiveScalingConfiguration: {
    PredefinedMetricPairSpecification: {
      PredefinedMetricType: "ASGAverageCPUUtilization",
      ResourceLabel: "my-auto-scaling-group"
    },
    TargetValue: 50.0,
    EstimatedInstanceWarmup: 300
  },
  ScalingAdjustment: 2,
  AdjustmentType: "ChangeInCapacity"
});
```

## Target Tracking Configuration

Establish a scaling policy that uses target tracking to maintain a specific metric, such as average CPU utilization.

```ts
const targetTrackingScalingPolicy = await AWS.AutoScaling.ScalingPolicy("targetTrackingScalingPolicy", {
  AutoScalingGroupName: "my-auto-scaling-group",
  TargetTrackingConfiguration: {
    TargetValue: 50.0,
    PredefinedMetricSpecification: {
      PredefinedMetricType: "ASGAverageCPUUtilization"
    },
    ScaleInCooldown: 300,
    ScaleOutCooldown: 300
  }
});
```
