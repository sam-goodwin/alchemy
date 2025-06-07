---
title: Managing AWS SES MailManagerTrafficPolicys with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerTrafficPolicys using Alchemy Cloud Control.
---

# MailManagerTrafficPolicy

The MailManagerTrafficPolicy resource lets you create and manage [AWS SES MailManagerTrafficPolicys](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanagertrafficpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanagertrafficpolicy = await AWS.SES.MailManagerTrafficPolicy(
  "mailmanagertrafficpolicy-example",
  {
    DefaultAction: "example-defaultaction",
    PolicyStatements: [],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a mailmanagertrafficpolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerTrafficPolicy = await AWS.SES.MailManagerTrafficPolicy(
  "advanced-mailmanagertrafficpolicy",
  {
    DefaultAction: "example-defaultaction",
    PolicyStatements: [],
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

