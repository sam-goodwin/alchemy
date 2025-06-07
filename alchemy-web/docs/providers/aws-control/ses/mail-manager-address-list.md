---
title: Managing AWS SES MailManagerAddressLists with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerAddressLists using Alchemy Cloud Control.
---

# MailManagerAddressList

The MailManagerAddressList resource lets you create and manage [AWS SES MailManagerAddressLists](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-mailmanageraddresslist.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const mailmanageraddresslist = await AWS.SES.MailManagerAddressList(
  "mailmanageraddresslist-example",
  { Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a mailmanageraddresslist with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMailManagerAddressList = await AWS.SES.MailManagerAddressList(
  "advanced-mailmanageraddresslist",
  {
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

