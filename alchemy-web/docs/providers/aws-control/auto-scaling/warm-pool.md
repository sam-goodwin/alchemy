---
title: Managing AWS AutoScaling WarmPools with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling WarmPools using Alchemy Cloud Control.
---

# WarmPool

The WarmPool resource lets you create and manage [AWS AutoScaling WarmPools](https://docs.aws.amazon.com/autoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-warmpool.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const warmpool = await AWS.AutoScaling.WarmPool("warmpool-example", {
  AutoScalingGroupName: "warmpool-autoscalinggroup",
});
```

