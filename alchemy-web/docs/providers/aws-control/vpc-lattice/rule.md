---
title: Managing AWS VpcLattice Rules with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you create and manage [AWS VpcLattice Rules](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-rule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rule = await AWS.VpcLattice.Rule("rule-example", {
  Action: "example-action",
  Priority: 1,
  Match: "example-match",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a rule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRule = await AWS.VpcLattice.Rule("advanced-rule", {
  Action: "example-action",
  Priority: 1,
  Match: "example-match",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

