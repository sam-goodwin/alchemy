---
title: Managing AWS AutoScaling ScalingPolicys with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling ScalingPolicys using Alchemy Cloud Control.
---

# ScalingPolicy

The ScalingPolicy resource lets you create and manage [AWS AutoScaling ScalingPolicys](https://docs.aws.amazon.com/autoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-scalingpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scalingpolicy = await AWS.AutoScaling.ScalingPolicy("scalingpolicy-example", {
  AutoScalingGroupName: "scalingpolicy-autoscalinggroup",
});
```

