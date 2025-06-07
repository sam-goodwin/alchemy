---
title: Managing AWS SES MailManagerIngressPoints with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerIngressPoints using Alchemy Cloud Control.
---

# MailManagerIngressPoint

The MailManagerIngressPoint resource lets you create and manage [AWS SES MailManagerIngressPoints](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanageringresspoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanageringresspoint = await AWS.SES.MailManagerIngressPoint(
  "mailmanageringresspoint-example",
  {
    RuleSetId: "example-rulesetid",
    Type: "example-type",
    TrafficPolicyId: "example-trafficpolicyid",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a mailmanageringresspoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerIngressPoint = await AWS.SES.MailManagerIngressPoint(
  "advanced-mailmanageringresspoint",
  {
    RuleSetId: "example-rulesetid",
    Type: "example-type",
    TrafficPolicyId: "example-trafficpolicyid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

