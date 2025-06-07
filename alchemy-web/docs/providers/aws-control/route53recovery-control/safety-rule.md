---
title: Managing AWS Route53RecoveryControl SafetyRules with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryControl SafetyRules using Alchemy Cloud Control.
---

# SafetyRule

The SafetyRule resource lets you create and manage [AWS Route53RecoveryControl SafetyRules](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53recoverycontrol-safetyrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const safetyrule = await AWS.Route53RecoveryControl.SafetyRule("safetyrule-example", {
  ControlPanelArn: "example-controlpanelarn",
  RuleConfig: "example-ruleconfig",
  Name: "safetyrule-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a safetyrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSafetyRule = await AWS.Route53RecoveryControl.SafetyRule("advanced-safetyrule", {
  ControlPanelArn: "example-controlpanelarn",
  RuleConfig: "example-ruleconfig",
  Name: "safetyrule-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

