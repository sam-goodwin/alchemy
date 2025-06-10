---
title: ScalingPolicy
description: Learn how to create, update, and manage AWS ApplicationAutoScaling ScalingPolicys using Alchemy Cloud Control.
---


The ScalingPolicy resource lets you manage [AWS ApplicationAutoScaling ScalingPolicys](https://docs.aws.amazon.com/applicationautoscaling/latest/userguide/) for automatically adjusting the capacity of scalable resources.

## Minimal Example

Create a basic scaling policy for an ECS service with target tracking.

```ts
import AWS from "alchemy/aws/control";

const scalingPolicy = await AWS.ApplicationAutoScaling.ScalingPolicy("ecsServiceScalingPolicy", {
  PolicyType: "TargetTrackingScaling",
  PolicyName: "ecsServiceScalingPolicy",
  ResourceId: "service/default/sample-ecs-service",
  ScalableDimension: "ecs:Service:DesiredCount",
  ServiceNamespace: "ecs",
  TargetTrackingScalingPolicyConfiguration: {
    TargetValue: 50.0,
    PredefinedMetricSpecification: {
      PredefinedMetricType: "ECSServiceAverageCPUUtilization"
    },
    ScaleOutCooldown: 60,
    ScaleInCooldown: 60
  }
});
```

## Advanced Configuration

Configure a scaling policy with step scaling adjustments.

```ts
const stepScalingPolicy = await AWS.ApplicationAutoScaling.ScalingPolicy("stepScalingPolicy", {
  PolicyType: "StepScaling",
  PolicyName: "stepScalingPolicy",
  ResourceId: "app/my-application",
  ScalableDimension: "elasticmapreduce:InstanceGroup:DesiredSize",
  ServiceNamespace: "elasticmapreduce",
  StepScalingPolicyConfiguration: {
    AdjustmentType: "PercentChangeInCapacity",
    StepAdjustments: [
      {
        MetricIntervalLowerBound: 0,
        ScalingAdjustment: 10
      },
      {
        MetricIntervalLowerBound: 10,
        ScalingAdjustment: 20
      }
    ],
    Cooldown: 300
  }
});
```

## Predictive Scaling

Set up a predictive scaling policy for an application.

```ts
const predictiveScalingPolicy = await AWS.ApplicationAutoScaling.ScalingPolicy("predictiveScalingPolicy", {
  PolicyType: "PredictiveScaling",
  PolicyName: "predictiveScalingPolicy",
  ResourceId: "application/my-app",
  ScalableDimension: "dynamodb:table:ReadCapacityUnits",
  ServiceNamespace: "dynamodb",
  PredictiveScalingPolicyConfiguration: {
    PredictiveScalingMaxCapacity: 20,
    PredictiveScalingMinCapacity: 5,
    PredictiveScalingMode: "ForecastAndScale",
    ScheduledActionBufferTime: 300
  }
});
```

This document provides a practical guide to creating and configuring scaling policies using AWS ApplicationAutoScaling with Alchemy, helping you to effectively manage resource scaling in your applications.
