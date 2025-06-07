---
title: Managing AWS SageMaker Workteams with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Workteams using Alchemy Cloud Control.
---

# Workteam

The Workteam resource lets you create and manage [AWS SageMaker Workteams](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-workteam.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const workteam = await AWS.SageMaker.Workteam("workteam-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A workteam resource managed by Alchemy",
});
```

## Advanced Configuration

Create a workteam with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWorkteam = await AWS.SageMaker.Workteam("advanced-workteam", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A workteam resource managed by Alchemy",
});
```

