---
title: Managing AWS SES MailManagerRelays with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerRelays using Alchemy Cloud Control.
---

# MailManagerRelay

The MailManagerRelay resource lets you create and manage [AWS SES MailManagerRelays](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanagerrelay.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanagerrelay = await AWS.SES.MailManagerRelay("mailmanagerrelay-example", {
  Authentication: "example-authentication",
  ServerName: "mailmanagerrelay-server",
  ServerPort: 443,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a mailmanagerrelay with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerRelay = await AWS.SES.MailManagerRelay("advanced-mailmanagerrelay", {
  Authentication: "example-authentication",
  ServerName: "mailmanagerrelay-server",
  ServerPort: 443,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

