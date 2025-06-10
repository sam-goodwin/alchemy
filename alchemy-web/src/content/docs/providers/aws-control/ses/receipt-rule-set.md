---
title: ReceiptRuleSet
description: Learn how to create, update, and manage AWS SES ReceiptRuleSets using Alchemy Cloud Control.
---


The ReceiptRuleSet resource allows you to manage [AWS SES ReceiptRuleSets](https://docs.aws.amazon.com/ses/latest/userguide/) and their associated rules for handling incoming email.

## Minimal Example

Create a basic receipt rule set with a specified name:

```ts
import AWS from "alchemy/aws/control";

const receiptRuleSet = await AWS.SES.ReceiptRuleSet("myReceiptRuleSet", {
  RuleSetName: "MyReceiptRuleSet",
});
```

## Advanced Configuration

Configure a receipt rule set with an option to adopt an existing resource:

```ts
const existingReceiptRuleSet = await AWS.SES.ReceiptRuleSet("existingReceiptRuleSet", {
  RuleSetName: "ExistingReceiptRuleSet",
  adopt: true // Adopts the existing receipt rule set instead of failing
});
```

## Adding Rules to the ReceiptRuleSet

Create a receipt rule set and add rules for processing incoming emails:

```ts
const receiptRuleSetWithRules = await AWS.SES.ReceiptRuleSet("ruleSetWithRules", {
  RuleSetName: "RuleSetWithEmailProcessing",
  adopt: true
});

// Assume you have a method to add rules to the rule set
await addEmailProcessingRule(receiptRuleSetWithRules, {
  ruleName: "MyEmailProcessingRule",
  recipients: ["user@example.com"],
  actions: [
    {
      type: "S3",
      bucketName: "my-email-bucket",
      objectKeyPrefix: "emails/"
    },
    {
      type: "SNS",
      topicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
    }
  ],
  scanEnabled: true
});
```

This example demonstrates how to add rules to the receipt rule set for processing incoming emails, including storing them in an S3 bucket and notifying via SNS.
