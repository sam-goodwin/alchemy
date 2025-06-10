---
title: ReceiptRule
description: Learn how to create, update, and manage AWS SES ReceiptRules using Alchemy Cloud Control.
---


The ReceiptRule resource lets you manage [AWS SES ReceiptRules](https://docs.aws.amazon.com/ses/latest/userguide/) for processing incoming email. Receipt rules enable you to define actions for incoming messages, such as storing them in S3, triggering Lambda functions, or sending notifications.

## Minimal Example

Create a basic receipt rule that stores incoming emails in an S3 bucket:

```ts
import AWS from "alchemy/aws/control";

const receiptRule = await AWS.SES.ReceiptRule("basicReceiptRule", {
  Rule: {
    Name: "StoreIncomingEmails",
    Actions: [
      {
        S3Action: {
          BucketName: "my-email-bucket",
          ObjectKeyPrefix: "emails/",
        }
      }
    ],
    Recipients: ["info@example.com"],
    Enabled: true,
    TlsPolicy: "Optional"
  },
  RuleSetName: "default-rule-set",
  After: "previousRule" // Optional: specify a rule to place this rule after
});
```

## Advanced Configuration

Configure a receipt rule to trigger a Lambda function for processing incoming emails:

```ts
const lambdaReceiptRule = await AWS.SES.ReceiptRule("lambdaReceiptRule", {
  Rule: {
    Name: "ProcessIncomingEmails",
    Actions: [
      {
        LambdaAction: {
          FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:processEmail",
          InvocationType: "Event"
        }
      }
    ],
    Recipients: ["support@example.com"],
    Enabled: true,
    TlsPolicy: "Require"
  },
  RuleSetName: "default-rule-set"
});
```

## Notification Configuration

Create a receipt rule that sends notifications to an Amazon SNS topic:

```ts
const snsReceiptRule = await AWS.SES.ReceiptRule("snsReceiptRule", {
  Rule: {
    Name: "NotifyOnIncomingEmails",
    Actions: [
      {
        SnsAction: {
          TopicArn: "arn:aws:sns:us-west-2:123456789012:EmailNotifications",
          Encoding: "UTF-8"
        }
      }
    ],
    Recipients: ["alerts@example.com"],
    Enabled: true,
    TlsPolicy: "Optional"
  },
  RuleSetName: "default-rule-set"
});
```

## Chaining Receipt Rules

Demonstrate how to create a series of receipt rules that chain actions together:

```ts
const firstRule = await AWS.SES.ReceiptRule("firstRule", {
  Rule: {
    Name: "FirstRule",
    Actions: [
      {
        S3Action: {
          BucketName: "my-email-bucket",
          ObjectKeyPrefix: "first/"
        }
      }
    ],
    Recipients: ["chain@example.com"],
    Enabled: true,
    TlsPolicy: "Optional"
  },
  RuleSetName: "default-rule-set"
});

const secondRule = await AWS.SES.ReceiptRule("secondRule", {
  Rule: {
    Name: "SecondRule",
    Actions: [
      {
        SnsAction: {
          TopicArn: "arn:aws:sns:us-west-2:123456789012:EmailChainNotifications",
          Encoding: "UTF-8"
        }
      }
    ],
    Recipients: ["chain@example.com"],
    Enabled: true,
    TlsPolicy: "Require"
  },
  RuleSetName: "default-rule-set",
  After: firstRule.name // Place this rule after the first rule
});
```
