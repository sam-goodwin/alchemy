---
title: Managing AWS ApplicationAutoScaling ScalingPolicys with Alchemy
description: Learn how to create, update, and manage AWS ApplicationAutoScaling ScalingPolicys using Alchemy Cloud Control.
---

# ScalingPolicy

The ScalingPolicy resource lets you create and manage [AWS ApplicationAutoScaling ScalingPolicys](https://docs.aws.amazon.com/applicationautoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-applicationautoscaling-scalingpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scalingpolicy = await AWS.ApplicationAutoScaling.ScalingPolicy("scalingpolicy-example", {
  PolicyType: "example-policytype",
  PolicyName: "scalingpolicy-policy",
});
```

