---
title: Managing AWS SES ReceiptRules with Alchemy
description: Learn how to create, update, and manage AWS SES ReceiptRules using Alchemy Cloud Control.
---

# ReceiptRule

The ReceiptRule resource lets you create and manage [AWS SES ReceiptRules](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const receiptrule = await AWS.SES.ReceiptRule("receiptrule-example", {
  Rule: "example-rule",
  RuleSetName: "receiptrule-ruleset",
});
```

