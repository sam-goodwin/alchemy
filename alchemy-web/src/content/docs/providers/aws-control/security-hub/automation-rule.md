---
title: AutomationRule
description: Learn how to create, update, and manage AWS SecurityHub AutomationRules using Alchemy Cloud Control.
---


The AutomationRule resource lets you manage [AWS SecurityHub AutomationRules](https://docs.aws.amazon.com/securityhub/latest/userguide/) for automating responses to security findings in your AWS environment.

## Minimal Example

Create a basic automation rule with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAutomationRule = await AWS.SecurityHub.AutomationRule("basicAutomationRule", {
  Description: "A basic automation rule for managing security findings.",
  Actions: [
    {
      ActionType: "SNS",
      TargetArn: "arn:aws:sns:us-west-2:123456789012:security-notifications"
    }
  ],
  Criteria: {
    Criterion: {
      "aws/securityhub/SeverityLabel": {
        Eq: ["HIGH"]
      }
    }
  },
  RuleOrder: 1,
  RuleName: "HighSeverityFindings"
});
```

## Advanced Configuration

Configure an automation rule with additional settings such as terminal state and tags.

```ts
const advancedAutomationRule = await AWS.SecurityHub.AutomationRule("advancedAutomationRule", {
  Description: "An advanced automation rule with additional configuration.",
  Actions: [
    {
      ActionType: "Lambda",
      TargetArn: "arn:aws:lambda:us-west-2:123456789012:function:processFindings"
    }
  ],
  IsTerminal: true,
  RuleStatus: "ENABLED",
  Criteria: {
    Criterion: {
      "aws/securityhub/ResourceType": {
        Eq: ["AWS::EC2::Instance"]
      }
    }
  },
  RuleOrder: 2,
  RuleName: "EC2InstanceFindings",
  Tags: {
    Environment: "Production",
    Team: "Security"
  }
});
```

## Terminal State Example

Create an automation rule that defines terminal states for specific findings.

```ts
const terminalAutomationRule = await AWS.SecurityHub.AutomationRule("terminalAutomationRule", {
  Description: "A terminal automation rule for specific findings.",
  Actions: [
    {
      ActionType: "SQS",
      TargetArn: "arn:aws:sqs:us-west-2:123456789012:security-alerts"
    }
  ],
  IsTerminal: true,
  RuleStatus: "ENABLED",
  Criteria: {
    Criterion: {
      "aws/securityhub/SeverityLabel": {
        Eq: ["CRITICAL"]
      }
    }
  },
  RuleOrder: 3,
  RuleName: "CriticalFindings",
  Tags: {
    Project: "Compliance"
  }
});
```
