---
title: Managing AWS KendraRanking ExecutionPlans with Alchemy
description: Learn how to create, update, and manage AWS KendraRanking ExecutionPlans using Alchemy Cloud Control.
---

# ExecutionPlan

The ExecutionPlan resource lets you create and manage [AWS KendraRanking ExecutionPlans](https://docs.aws.amazon.com/kendraranking/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendraranking-executionplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const executionplan = await AWS.KendraRanking.ExecutionPlan("executionplan-example", {
  Name: "executionplan-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A executionplan resource managed by Alchemy",
});
```

## Advanced Configuration

Create a executionplan with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedExecutionPlan = await AWS.KendraRanking.ExecutionPlan("advanced-executionplan", {
  Name: "executionplan-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A executionplan resource managed by Alchemy",
});
```

