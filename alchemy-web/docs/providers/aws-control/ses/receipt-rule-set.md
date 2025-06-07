---
title: Managing AWS SES ReceiptRuleSets with Alchemy
description: Learn how to create, update, and manage AWS SES ReceiptRuleSets using Alchemy Cloud Control.
---

# ReceiptRuleSet

The ReceiptRuleSet resource lets you create and manage [AWS SES ReceiptRuleSets](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const receiptruleset = await AWS.SES.ReceiptRuleSet("receiptruleset-example", {});
```

