---
title: SafetyRule
description: Learn how to create, update, and manage AWS Route53RecoveryControl SafetyRules using Alchemy Cloud Control.
---


The SafetyRule resource lets you manage [AWS Route53RecoveryControl SafetyRules](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) that define the conditions under which traffic is allowed to flow to your resources.

## Minimal Example

Create a basic safety rule with required properties and an optional assertion rule.

```ts
import AWS from "alchemy/aws/control";

const safetyRule = await AWS.Route53RecoveryControl.SafetyRule("basicSafetyRule", {
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel:example-control-panel",
  RuleConfig: {
    Type: "ALL_REQUIRED", // Example rule config type
    Threshold: 2 // Minimum number of assertions for the rule to be satisfied
  },
  AssertionRule: {
    AssertedControls: [
      "arn:aws:route53-recovery-control::123456789012:control:example-control-1",
      "arn:aws:route53-recovery-control::123456789012:control:example-control-2"
    ]
  },
  Name: "BasicSafetyRule"
});
```

## Advanced Configuration

Configure a safety rule with a gating rule to control traffic flow under specific conditions.

```ts
const advancedSafetyRule = await AWS.Route53RecoveryControl.SafetyRule("advancedSafetyRule", {
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel:example-control-panel",
  RuleConfig: {
    Type: "ANY_REQUIRED",
    Threshold: 1
  },
  GatingRule: {
    GatingControls: [
      "arn:aws:route53-recovery-control::123456789012:control:example-control-3"
    ],
    WaitPeriodMs: 30000 // Wait period of 30 seconds for gating check
  },
  Name: "AdvancedSafetyRule"
});
```

## Tagging for Resource Management

Create a safety rule with tags for better resource management and identification.

```ts
const taggedSafetyRule = await AWS.Route53RecoveryControl.SafetyRule("taggedSafetyRule", {
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel:example-control-panel",
  RuleConfig: {
    Type: "ALL_REQUIRED",
    Threshold: 2
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  Name: "TaggedSafetyRule"
});
```
