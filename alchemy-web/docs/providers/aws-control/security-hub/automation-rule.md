---
title: Managing AWS SecurityHub AutomationRules with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub AutomationRules using Alchemy Cloud Control.
---

# AutomationRule

The AutomationRule resource lets you create and manage [AWS SecurityHub AutomationRules](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-automationrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const automationrule = await AWS.SecurityHub.AutomationRule("automationrule-example", {
  Description: "A automationrule resource managed by Alchemy",
  Actions: [],
  Criteria: "example-criteria",
  RuleOrder: 1,
  RuleName: "automationrule-rule",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a automationrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAutomationRule = await AWS.SecurityHub.AutomationRule("advanced-automationrule", {
  Description: "A automationrule resource managed by Alchemy",
  Actions: [],
  Criteria: "example-criteria",
  RuleOrder: 1,
  RuleName: "automationrule-rule",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

