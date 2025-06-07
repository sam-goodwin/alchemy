---
title: Managing AWS AutoScaling LifecycleHooks with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling LifecycleHooks using Alchemy Cloud Control.
---

# LifecycleHook

The LifecycleHook resource lets you create and manage [AWS AutoScaling LifecycleHooks](https://docs.aws.amazon.com/autoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-lifecyclehook.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const lifecyclehook = await AWS.AutoScaling.LifecycleHook("lifecyclehook-example", {
  LifecycleTransition: "example-lifecycletransition",
  AutoScalingGroupName: "lifecyclehook-autoscalinggroup",
});
```

