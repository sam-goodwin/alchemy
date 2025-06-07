---
title: Managing AWS Connect Rules with Alchemy
description: Learn how to create, update, and manage AWS Connect Rules using Alchemy Cloud Control.
---

# Rule

The Rule resource lets you create and manage [AWS Connect Rules](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-rule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rule = await AWS.Connect.Rule("rule-example", {
  Function: "example-function",
  TriggerEventSource: "example-triggereventsource",
  Actions: "example-actions",
  InstanceArn: "example-instancearn",
  Name: "rule-",
  PublishStatus: "example-publishstatus",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a rule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRule = await AWS.Connect.Rule("advanced-rule", {
  Function: "example-function",
  TriggerEventSource: "example-triggereventsource",
  Actions: "example-actions",
  InstanceArn: "example-instancearn",
  Name: "rule-",
  PublishStatus: "example-publishstatus",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

