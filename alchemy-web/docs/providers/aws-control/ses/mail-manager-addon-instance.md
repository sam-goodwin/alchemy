---
title: Managing AWS SES MailManagerAddonInstances with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerAddonInstances using Alchemy Cloud Control.
---

# MailManagerAddonInstance

The MailManagerAddonInstance resource allows you to manage AWS SES Mail Manager Add-on Instances, which facilitate the integration of email management features into your applications. For more information, refer to the official AWS documentation: [AWS SES MailManagerAddonInstances](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic MailManagerAddonInstance with the required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicMailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("BasicMailManager", {
  AddonSubscriptionId: "sub-123456",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a MailManagerAddonInstance with an additional tag and the option to adopt an existing resource if it already exists.

```ts
const AdvancedMailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("AdvancedMailManager", {
  AddonSubscriptionId: "sub-654321",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EmailService" }
  ],
  adopt: true
});
```

## Resource Management

Manage an existing MailManagerAddonInstance by updating its tags.

```ts
const UpdateMailManagerAddonInstance = await AWS.SES.MailManagerAddonInstance("UpdateMailManager", {
  AddonSubscriptionId: "sub-987654",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Marketing" }
  ],
  adopt: true // Adopt the existing resource
});
```