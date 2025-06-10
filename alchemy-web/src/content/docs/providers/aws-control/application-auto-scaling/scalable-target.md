---
title: ScalableTarget
description: Learn how to create, update, and manage AWS ApplicationAutoScaling ScalableTargets using Alchemy Cloud Control.
---


The ScalableTarget resource allows you to configure and manage scalable targets for various AWS services that support Application Auto Scaling. This enables you to automatically adjust the capacity of your applications based on demand. For more details, refer to the [AWS ApplicationAutoScaling ScalableTargets documentation](https://docs.aws.amazon.com/applicationautoscaling/latest/userguide/).

## Minimal Example

Create a basic scalable target for an Amazon ECS service with default settings.

```ts
import AWS from "alchemy/aws/control";

const scalableTarget = await AWS.ApplicationAutoScaling.ScalableTarget("myEcsScalableTarget", {
  ResourceId: "service/default/sample-ecs-service",
  ServiceNamespace: "ecs",
  ScalableDimension: "ecs:service:DesiredCount",
  MinCapacity: 1,
  MaxCapacity: 10
});
```

## Advanced Configuration

Configure a scalable target with scheduled actions and a suspended state for a more controlled scaling experience.

```ts
import AWS from "alchemy/aws/control";

const advancedScalableTarget = await AWS.ApplicationAutoScaling.ScalableTarget("advancedEcsScalableTarget", {
  ResourceId: "service/default/sample-ecs-service",
  ServiceNamespace: "ecs",
  ScalableDimension: "ecs:service:DesiredCount",
  MinCapacity: 2,
  MaxCapacity: 8,
  ScheduledActions: [{
    // Define your scheduled actions here
    ScheduledActionName: "ScaleUp",
    Schedule: "cron(0 10 * * ? *)", // Every day at 10 AM UTC
    ScalableTargetAction: {
      MinCapacity: 5,
      MaxCapacity: 10
    }
  }],
  SuspendedState: {
    // Prevent scaling activities
    DynamicScalingInSuspended: true,
    DynamicScalingOutSuspended: false
  }
});
```

## Using IAM Role

Create a scalable target that specifies an IAM role for permissions to modify the scalable target.

```ts
import AWS from "alchemy/aws/control";

const roleBasedScalableTarget = await AWS.ApplicationAutoScaling.ScalableTarget("roleBasedScalableTarget", {
  ResourceId: "service/default/sample-ecs-service",
  ServiceNamespace: "ecs",
  ScalableDimension: "ecs:service:DesiredCount",
  MinCapacity: 1,
  MaxCapacity: 5,
  RoleARN: "arn:aws:iam::123456789012:role/MyApplicationAutoScalingRole"
});
```
