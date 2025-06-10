---
title: MailManagerAddonInstance
description: Learn how to create, update, and manage AWS SES MailManagerAddonInstances using Alchemy Cloud Control.
---


The MailManagerAddonInstance resource allows you to manage AWS SES Mail Manager Addon Instances, which provide additional capabilities for sending and managing email. For more information, refer to the [AWS SES MailManagerAddonInstances documentation](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic MailManagerAddonInstance with the required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const mailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("myMailManagerAddon", {
  AddonSubscriptionId: "sub-1234567890abcdef",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a MailManagerAddonInstance with additional properties, including tags for better organization.

```ts
const advancedMailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("advancedMailManagerAddon", {
  AddonSubscriptionId: "sub-abcdef1234567890",
  Tags: [
    {
      Key: "Project",
      Value: "EmailCampaign"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ],
  adopt: true // Allows adopting an existing resource if it already exists
});
```

## Adoption of Existing Resource

Adopt an existing MailManagerAddonInstance instead of failing if it already exists.

```ts
const existingMailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("adoptExistingMailManagerAddon", {
  AddonSubscriptionId: "sub-0987654321fedcba",
  adopt: true
});
```
