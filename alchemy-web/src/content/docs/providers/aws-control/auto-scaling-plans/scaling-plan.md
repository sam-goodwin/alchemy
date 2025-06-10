---
title: ScalingPlan
description: Learn how to create, update, and manage AWS AutoScalingPlans ScalingPlans using Alchemy Cloud Control.
---


The ScalingPlan resource lets you create and manage [AWS AutoScalingPlans](https://docs.aws.amazon.com/autoscalingplans/latest/userguide/) for dynamically adjusting the capacity of your application based on demand.

## Minimal Example

Create a basic scaling plan with required properties and one optional property for adopting existing resources.

```ts
import AWS from "alchemy/aws/control";

const basicScalingPlan = await AWS.AutoScalingPlans.ScalingPlan("basicScalingPlan", {
  ApplicationSource: {
    SourceIdentifier: "my-application"
  },
  ScalingInstructions: [{
    ResourceId: "my-auto-scaling-group",
    ScalableDimension: "autoscaling:autoScalingGroup:DesiredCapacity",
    MinCapacity: 1,
    MaxCapacity: 10,
    TargetTrackingConfiguration: {
      TargetValue: 50.0,
      PredefinedMetricSpecification: {
        PredefinedMetricType: "ASGAverageCPUUtilization"
      }
    }
  }],
  adopt: true // Adopt existing resource
});
```

## Advanced Configuration

Configure a scaling plan with multiple scaling instructions for different resources.

```ts
const advancedScalingPlan = await AWS.AutoScalingPlans.ScalingPlan("advancedScalingPlan", {
  ApplicationSource: {
    SourceIdentifier: "my-advanced-application"
  },
  ScalingInstructions: [{
    ResourceId: "my-first-auto-scaling-group",
    ScalableDimension: "autoscaling:autoScalingGroup:DesiredCapacity",
    MinCapacity: 2,
    MaxCapacity: 20,
    TargetTrackingConfiguration: {
      TargetValue: 40.0,
      PredefinedMetricSpecification: {
        PredefinedMetricType: "ASGAverageCPUUtilization"
      }
    }
  },
  {
    ResourceId: "my-second-auto-scaling-group",
    ScalableDimension: "autoscaling:autoScalingGroup:DesiredCapacity",
    MinCapacity: 1,
    MaxCapacity: 15,
    TargetTrackingConfiguration: {
      TargetValue: 60.0,
      PredefinedMetricSpecification: {
        PredefinedMetricType: "ASGAverageNetworkIn"
      }
    }
  }],
  adopt: false // Do not adopt existing resources
});
```

## Use Case: Scheduled Scaling

Demonstrate how to set up scheduled scaling for peak hours.

```ts
const scheduledScalingPlan = await AWS.AutoScalingPlans.ScalingPlan("scheduledScalingPlan", {
  ApplicationSource: {
    SourceIdentifier: "my-scheduled-application"
  },
  ScalingInstructions: [{
    ResourceId: "my-scheduled-auto-scaling-group",
    ScalableDimension: "autoscaling:autoScalingGroup:DesiredCapacity",
    MinCapacity: 3,
    MaxCapacity: 30,
    ScheduledActionConfigurations: [{
      StartTime: "2023-12-01T08:00:00Z",
      EndTime: "2023-12-01T18:00:00Z",
      ScalableTargetAction: {
        DesiredCapacity: 20
      }
    }]
  }],
  adopt: true // Adopt existing resource
});
```

## Use Case: Dynamic Scaling with Step Scaling

Set up dynamic scaling with step scaling policies for finer control based on metrics.

```ts
const stepScalingPlan = await AWS.AutoScalingPlans.ScalingPlan("stepScalingPlan", {
  ApplicationSource: {
    SourceIdentifier: "my-step-application"
  },
  ScalingInstructions: [{
    ResourceId: "my-step-auto-scaling-group",
    ScalableDimension: "autoscaling:autoScalingGroup:DesiredCapacity",
    MinCapacity: 1,
    MaxCapacity: 10,
    StepScalingPolicyConfigurations: [{
      StepAdjustments: [{
        MetricIntervalLowerBound: 0,
        ScalingAdjustment: 2
      }, {
        MetricIntervalLowerBound: 50,
        ScalingAdjustment: 3
      }],
      TargetValue: 75.0,
      PredefinedMetricSpecification: {
        PredefinedMetricType: "ASGAverageCPUUtilization"
      }
    }]
  }],
  adopt: false // Do not adopt existing resources
});
```
