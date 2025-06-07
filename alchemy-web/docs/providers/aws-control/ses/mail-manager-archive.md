---
title: Managing AWS SES MailManagerArchives with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerArchives using Alchemy Cloud Control.
---

# MailManagerArchive

The MailManagerArchive resource lets you create and manage [AWS SES MailManagerArchives](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanagerarchive.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanagerarchive = await AWS.SES.MailManagerArchive("mailmanagerarchive-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a mailmanagerarchive with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerArchive = await AWS.SES.MailManagerArchive("advanced-mailmanagerarchive", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

