---
title: Managing AWS ApplicationAutoScaling ScalableTargets with Alchemy
description: Learn how to create, update, and manage AWS ApplicationAutoScaling ScalableTargets using Alchemy Cloud Control.
---

# ScalableTarget

The ScalableTarget resource lets you create and manage [AWS ApplicationAutoScaling ScalableTargets](https://docs.aws.amazon.com/applicationautoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-applicationautoscaling-scalabletarget.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scalabletarget = await AWS.ApplicationAutoScaling.ScalableTarget("scalabletarget-example", {
  ResourceId: "example-resourceid",
  ServiceNamespace: "scalabletarget-servicespace",
  ScalableDimension: "example-scalabledimension",
  MinCapacity: 1,
  MaxCapacity: 1,
});
```

