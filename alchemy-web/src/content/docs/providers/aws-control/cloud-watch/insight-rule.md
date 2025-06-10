---
title: InsightRule
description: Learn how to create, update, and manage AWS CloudWatch InsightRules using Alchemy Cloud Control.
---


The InsightRule resource lets you manage [AWS CloudWatch InsightRules](https://docs.aws.amazon.com/cloudwatch/latest/userguide/) for monitoring and analyzing log data in real-time.

## Minimal Example

Create a basic InsightRule with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicInsightRule = await AWS.CloudWatch.InsightRule("basic-insight-rule", {
  RuleState: "ACTIVE",
  RuleBody: "fields @timestamp, @message | sort @timestamp desc | limit 20",
  RuleName: "BasicLogRule",
  Tags: {
    Environment: "Development"
  }
});
```

## Advanced Configuration

Configure an InsightRule with additional properties and multiple tags for better resource management.

```ts
const advancedInsightRule = await AWS.CloudWatch.InsightRule("advanced-insight-rule", {
  RuleState: "ACTIVE",
  RuleBody: "fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 50",
  RuleName: "ErrorLogRule",
  Tags: {
    Environment: "Production",
    Team: "DevOps"
  },
  adopt: true // Adopt an existing resource if it already exists
});
```

## Resource Adoption

Create an InsightRule that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptedInsightRule = await AWS.CloudWatch.InsightRule("adopted-insight-rule", {
  RuleState: "ACTIVE",
  RuleBody: "fields @timestamp, @message | filter @message like /WARNING/ | sort @timestamp desc | limit 30",
  RuleName: "WarningLogRule",
  Tags: {
    Environment: "Staging"
  },
  adopt: true // This ensures it adopts the existing InsightRule
});
```

## Updating an Existing InsightRule

Demonstrate how to update an existing InsightRule with a new rule body and state.

```ts
const updatedInsightRule = await AWS.CloudWatch.InsightRule("existing-insight-rule", {
  RuleState: "INACTIVE", // Change the state to INACTIVE
  RuleBody: "fields @timestamp, @message | filter @message like /CRITICAL/ | sort @timestamp desc | limit 10",
  RuleName: "CriticalLogRuleUpdated",
  Tags: {
    Environment: "Testing"
  }
});
```
