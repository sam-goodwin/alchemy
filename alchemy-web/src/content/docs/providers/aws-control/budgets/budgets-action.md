---
title: BudgetsAction
description: Learn how to create, update, and manage AWS Budgets BudgetsActions using Alchemy Cloud Control.
---


The BudgetsAction resource allows you to manage [AWS Budgets BudgetsActions](https://docs.aws.amazon.com/budgets/latest/userguide/) that automate actions based on budget thresholds.

## Minimal Example

Create a basic BudgetsAction that specifies an execution role and action type:

```ts
import AWS from "alchemy/aws/control";

const basicBudgetsAction = await AWS.Budgets.BudgetsAction("basicBudgetsAction", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/BudgetsActionRole",
  ActionType: "CANCEL",
  NotificationType: "ACTUAL",
  ActionThreshold: {
    Type: "PERCENTAGE",
    Threshold: 80
  },
  Definition: {
    Enable: true,
    Action: {
      Type: "CANCEL",
      ResourceIds: ["arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678"]
    }
  },
  Subscribers: [
    {
      Address: "user@example.com",
      Type: "EMAIL"
    }
  ],
  BudgetName: "MonthlyBudget"
});
```

## Advanced Configuration

Configure a BudgetsAction with an approval model and additional resource tags:

```ts
const advancedBudgetsAction = await AWS.Budgets.BudgetsAction("advancedBudgetsAction", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/BudgetsActionRole",
  ActionType: "SAVE",
  NotificationType: "FORECASTED",
  ActionThreshold: {
    Type: "ABSOLUTE",
    Threshold: 1000
  },
  Definition: {
    Enable: true,
    Action: {
      Type: "SAVE",
      ResourceIds: ["arn:aws:s3:::my-budget-bucket"]
    }
  },
  ApprovalModel: "AUTOMATIC",
  ResourceTags: [
    {
      Key: "Project",
      Value: "BudgetManagement"
    }
  ],
  Subscribers: [
    {
      Address: "team@example.com",
      Type: "EMAIL"
    }
  ],
  BudgetName: "QuarterlyBudget"
});
```

## Custom Subscriber Notifications

Set up the BudgetsAction with multiple subscribers for notifications:

```ts
const customSubscriberBudgetsAction = await AWS.Budgets.BudgetsAction("customSubscriberBudgetsAction", {
  ExecutionRoleArn: "arn:aws:iam::123456789012:role/BudgetsActionRole",
  ActionType: "CANCEL",
  NotificationType: "ACTUAL",
  ActionThreshold: {
    Type: "PERCENTAGE",
    Threshold: 90
  },
  Definition: {
    Enable: true,
    Action: {
      Type: "CANCEL",
      ResourceIds: ["arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678"]
    }
  },
  Subscribers: [
    {
      Address: "devops@example.com",
      Type: "EMAIL"
    },
    {
      Address: "finance@example.com",
      Type: "EMAIL"
    }
  ],
  BudgetName: "AnnualBudget"
});
```
