---
title: Managing AWS SES MailManagerRuleSets with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerRuleSets using Alchemy Cloud Control.
---

# MailManagerRuleSet

The MailManagerRuleSet resource lets you create and manage [AWS SES MailManagerRuleSets](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanagerruleset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanagerruleset = await AWS.SES.MailManagerRuleSet("mailmanagerruleset-example", {
  Rules: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a mailmanagerruleset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerRuleSet = await AWS.SES.MailManagerRuleSet("advanced-mailmanagerruleset", {
  Rules: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

