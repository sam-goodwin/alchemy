---
title: Managing AWS Budgets Budgets with Alchemy
description: Learn how to create, update, and manage AWS Budgets Budgets using Alchemy Cloud Control.
---

# Budget

The Budget resource lets you create and manage [AWS Budgets Budgets](https://docs.aws.amazon.com/budgets/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-budgets-budget.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const budget = await AWS.Budgets.Budget("budget-example", { Budget: "example-budget" });
```

