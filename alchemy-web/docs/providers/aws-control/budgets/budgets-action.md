---
title: Managing AWS Budgets BudgetsActions with Alchemy
description: Learn how to create, update, and manage AWS Budgets BudgetsActions using Alchemy Cloud Control.
---

# BudgetsAction

The BudgetsAction resource lets you create and manage [AWS Budgets BudgetsActions](https://docs.aws.amazon.com/budgets/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-budgets-budgetsaction.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const budgetsaction = await AWS.Budgets.BudgetsAction("budgetsaction-example", {
  ExecutionRoleArn: "example-executionrolearn",
  ActionType: "example-actiontype",
  NotificationType: "example-notificationtype",
  ActionThreshold: "example-actionthreshold",
  Definition: "example-definition",
  Subscribers: [],
  BudgetName: "budgetsaction-budget",
});
```

