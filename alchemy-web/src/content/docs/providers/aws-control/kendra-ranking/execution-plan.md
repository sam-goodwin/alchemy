---
title: ExecutionPlan
description: Learn how to create, update, and manage AWS KendraRanking ExecutionPlans using Alchemy Cloud Control.
---


The ExecutionPlan resource allows you to create, update, and manage AWS KendraRanking ExecutionPlans. For more information, refer to the [AWS KendraRanking ExecutionPlans documentation](https://docs.aws.amazon.com/kendraranking/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ExecutionPlan with a name and a description.

```ts
import AWS from "alchemy/aws/control";

const basicExecutionPlan = await AWS.KendraRanking.ExecutionPlan("basicExecutionPlan", {
  name: "BasicExecutionPlan",
  description: "This is a basic execution plan for KendraRanking",
  capacityUnits: {
    queryCapacityUnits: 5,
    documentCapacityUnits: 10
  }
});
```

## Advanced Configuration

Here’s how to create an ExecutionPlan with tags and more detailed capacity configuration.

```ts
const advancedExecutionPlan = await AWS.KendraRanking.ExecutionPlan("advancedExecutionPlan", {
  name: "AdvancedExecutionPlan",
  description: "An advanced execution plan with detailed capacity and tags",
  capacityUnits: {
    queryCapacityUnits: 10,
    documentCapacityUnits: 20
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DataScience" }
  ]
});
```

## Adopting Existing Resources

In this example, we demonstrate how to adopt an existing ExecutionPlan if it already exists.

```ts
const adoptedExecutionPlan = await AWS.KendraRanking.ExecutionPlan("adoptedExecutionPlan", {
  name: "ExistingExecutionPlan",
  description: "Adopting an existing execution plan.",
  adopt: true
});
```

## Custom Capacity Units

This example shows how to create an ExecutionPlan with custom capacity units for specialized needs.

```ts
const customCapacityExecutionPlan = await AWS.KendraRanking.ExecutionPlan("customCapacityExecutionPlan", {
  name: "CustomCapacityExecutionPlan",
  description: "Execution plan with custom capacity units for high-demand queries",
  capacityUnits: {
    queryCapacityUnits: 15,
    documentCapacityUnits: 30
  }
});
```
