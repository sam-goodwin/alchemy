---
title: Managing AWS AutoScalingPlans ScalingPlans with Alchemy
description: Learn how to create, update, and manage AWS AutoScalingPlans ScalingPlans using Alchemy Cloud Control.
---

# ScalingPlan

The ScalingPlan resource lets you create and manage [AWS AutoScalingPlans ScalingPlans](https://docs.aws.amazon.com/autoscalingplans/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscalingplans-scalingplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scalingplan = await AWS.AutoScalingPlans.ScalingPlan("scalingplan-example", {
  ApplicationSource: "example-applicationsource",
  ScalingInstructions: [],
});
```

