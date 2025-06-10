---
title: Budget
description: Learn how to create, update, and manage AWS Budgets Budgets using Alchemy Cloud Control.
---


The Budget resource lets you manage [AWS Budgets](https://docs.aws.amazon.com/budgets/latest/userguide/) for tracking your AWS spending and usage. You can set thresholds and get notified when your costs or usage exceed your budgeted amounts.

## Minimal Example

Create a basic budget with notifications for when your costs exceed a specified limit.

```ts
import AWS from "alchemy/aws/control";

const budget = await AWS.Budgets.Budget("monthlyBudget", {
  Budget: {
    BudgetName: "Monthly Cost Budget",
    BudgetLimit: {
      Amount: 1000,
      Unit: "USD"
    },
    TimeUnit: "MONTHLY",
    BudgetType: "COST"
  },
  NotificationsWithSubscribers: [
    {
      Notification: {
        NotificationType: "ACTUAL",
        ComparisonOperator: "GREATER_THAN",
        Threshold: 90
      },
      Subscribers: [
        {
          SubscriptionType: "EMAIL",
          Address: "notify@example.com"
        }
      ]
    }
  ],
  ResourceTags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a budget with both cost and usage notifications along with resource tags for better management.

```ts
const advancedBudget = await AWS.Budgets.Budget("advancedBudget", {
  Budget: {
    BudgetName: "Advanced Budget",
    BudgetLimit: {
      Amount: 500,
      Unit: "USD"
    },
    TimeUnit: "MONTHLY",
    BudgetType: "COST"
  },
  NotificationsWithSubscribers: [
    {
      Notification: {
        NotificationType: "FORECASTED",
        ComparisonOperator: "GREATER_THAN",
        Threshold: 80
      },
      Subscribers: [
        {
          SubscriptionType: "SNS",
          Address: "arn:aws:sns:us-east-1:123456789012:BudgetAlerts"
        }
      ]
    },
    {
      Notification: {
        NotificationType: "ACTUAL",
        ComparisonOperator: "GREATER_THAN",
        Threshold: 100
      },
      Subscribers: [
        {
          SubscriptionType: "EMAIL",
          Address: "alerts@example.com"
        }
      ]
    }
  ],
  ResourceTags: [
    {
      Key: "Project",
      Value: "NewApp"
    }
  ]
});
```

## Different Budget Types

Create a usage budget to track resource consumption.

```ts
const usageBudget = await AWS.Budgets.Budget("usageBudget", {
  Budget: {
    BudgetName: "Usage Budget",
    BudgetLimit: {
      Amount: 1000,
      Unit: "GB"
    },
    TimeUnit: "MONTHLY",
    BudgetType: "USAGE"
  },
  NotificationsWithSubscribers: [
    {
      Notification: {
        NotificationType: "ACTUAL",
        ComparisonOperator: "GREATER_THAN",
        Threshold: 75
      },
      Subscribers: [
        {
          SubscriptionType: "EMAIL",
          Address: "usage-alerts@example.com"
        }
      ]
    }
  ]
});
```

## Tagging for Cost Allocation

Set up a budget with specific resource tags to help track spending across different projects.

```ts
const projectBudget = await AWS.Budgets.Budget("projectBudget", {
  Budget: {
    BudgetName: "Project A Budget",
    BudgetLimit: {
      Amount: 1500,
      Unit: "USD"
    },
    TimeUnit: "MONTHLY",
    BudgetType: "COST"
  },
  ResourceTags: [
    {
      Key: "Project",
      Value: "ProjectA"
    }
  ],
  NotificationsWithSubscribers: [
    {
      Notification: {
        NotificationType: "ACTUAL",
        ComparisonOperator: "GREATER_THAN",
        Threshold: 60
      },
      Subscribers: [
        {
          SubscriptionType: "EMAIL",
          Address: "project-a-alerts@example.com"
        }
      ]
    }
  ]
});
```
