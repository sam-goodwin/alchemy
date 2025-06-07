---
title: Managing AWS AutoScaling AutoScalingGroups with Alchemy
description: Learn how to create, update, and manage AWS AutoScaling AutoScalingGroups using Alchemy Cloud Control.
---

# AutoScalingGroup

The AutoScalingGroup resource lets you create and manage [AWS AutoScaling AutoScalingGroups](https://docs.aws.amazon.com/autoscaling/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-autoscaling-autoscalinggroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const autoscalinggroup = await AWS.AutoScaling.AutoScalingGroup("autoscalinggroup-example", {
  MaxSize: "example-maxsize",
  MinSize: "example-minsize",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a autoscalinggroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAutoScalingGroup = await AWS.AutoScaling.AutoScalingGroup(
  "advanced-autoscalinggroup",
  {
    MaxSize: "example-maxsize",
    MinSize: "example-minsize",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

