---
title: Managing AWS CloudWatch InsightRules with Alchemy
description: Learn how to create, update, and manage AWS CloudWatch InsightRules using Alchemy Cloud Control.
---

# InsightRule

The InsightRule resource lets you create and manage [AWS CloudWatch InsightRules](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudwatch-insightrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const insightrule = await AWS.CloudWatch.InsightRule("insightrule-example", {
  RuleState: "example-rulestate",
  RuleBody: "example-rulebody",
  RuleName: "insightrule-rule",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a insightrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedInsightRule = await AWS.CloudWatch.InsightRule("advanced-insightrule", {
  RuleState: "example-rulestate",
  RuleBody: "example-rulebody",
  RuleName: "insightrule-rule",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

