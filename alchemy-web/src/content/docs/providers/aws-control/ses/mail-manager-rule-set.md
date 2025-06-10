---
title: MailManagerRuleSet
description: Learn how to create, update, and manage AWS SES MailManagerRuleSets using Alchemy Cloud Control.
---


The MailManagerRuleSet resource lets you manage [AWS SES MailManagerRuleSets](https://docs.aws.amazon.com/ses/latest/userguide/) for handling incoming emails and applying specific rules to them.

## Minimal Example

Create a basic MailManagerRuleSet with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicRuleSet = await AWS.SES.MailManagerRuleSet("basic-rule-set", {
  RuleSetName: "DefaultRuleSet",
  Rules: [
    {
      RuleName: "FirstRule",
      Actions: [
        {
          S3Action: {
            BucketName: "my-email-bucket",
            ObjectKeyPrefix: "emails/"
          }
        }
      ],
      Enabled: true
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a MailManagerRuleSet with multiple rules and complex actions.

```ts
const advancedRuleSet = await AWS.SES.MailManagerRuleSet("advanced-rule-set", {
  RuleSetName: "AdvancedRulesSet",
  Rules: [
    {
      RuleName: "SecondRule",
      Actions: [
        {
          S3Action: {
            BucketName: "my-email-bucket",
            ObjectKeyPrefix: "processed/"
          }
        },
        {
          SNSAction: {
            TopicArn: "arn:aws:sns:us-east-1:123456789012:EmailNotifications",
            Encoding: "UTF-8"
          }
        }
      ],
      Enabled: true
    },
    {
      RuleName: "ThirdRule",
      Actions: [
        {
          LambdaAction: {
            FunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:ProcessEmail",
            InvocationType: "RequestResponse"
          }
        }
      ],
      Enabled: false
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "EmailProcessing"
    }
  ],
  adopt: true
});
```

## Specific Use Case: Rule for Spam Filtering

Create a MailManagerRuleSet that filters spam emails based on specific conditions.

```ts
const spamFilterRuleSet = await AWS.SES.MailManagerRuleSet("spam-filter-rule-set", {
  RuleSetName: "SpamFilterRules",
  Rules: [
    {
      RuleName: "SpamFilterRule",
      Actions: [
        {
          BounceAction: {
            Message: "Your email has been identified as spam.",
            Sender: "no-reply@example.com",
            SmtpReplyCode: "550"
          }
        }
      ],
      Enabled: true,
      ScanEnabled: true
    }
  ],
  Tags: [
    {
      Key: "Purpose",
      Value: "Spam Filtering"
    }
  ]
});
```
