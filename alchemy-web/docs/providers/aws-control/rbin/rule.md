---
title: Managing AWS Rbin Rules with Alchemy
description: Learn how to create, update, and manage AWS Rbin Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you create and manage [AWS Rbin Rules](https://docs.aws.amazon.com/rbin/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rbin-rule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rule = await AWS.Rbin.Rule("rule-example", {
  ResourceType: "example-resourcetype",
  RetentionPeriod: "example-retentionperiod",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A rule resource managed by Alchemy",
});
```

## Advanced Configuration

Create a rule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRule = await AWS.Rbin.Rule("advanced-rule", {
  ResourceType: "example-resourcetype",
  RetentionPeriod: "example-retentionperiod",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A rule resource managed by Alchemy",
});
```

