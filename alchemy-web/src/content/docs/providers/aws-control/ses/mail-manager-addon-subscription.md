---
title: MailManagerAddonSubscription
description: Learn how to create, update, and manage AWS SES MailManagerAddonSubscriptions using Alchemy Cloud Control.
---


The MailManagerAddonSubscription resource allows you to manage subscriptions to various add-ons for Amazon Simple Email Service (SES). This resource is part of the AWS SES service, enabling you to enhance your email capabilities with additional features. For more details, refer to the official AWS documentation: [AWS SES MailManagerAddonSubscriptions](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic MailManagerAddonSubscription with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const mailManagerAddonSubscription = await AWS.SES.MailManagerAddonSubscription("basicSubscription", {
  AddonName: "EmailAnalytics",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a MailManagerAddonSubscription with additional properties, such as adopting an existing resource.

```ts
const advancedAddonSubscription = await AWS.SES.MailManagerAddonSubscription("advancedSubscription", {
  AddonName: "EmailDeliverability",
  adopt: true, // Adopt existing resource if it already exists
  Tags: [
    { Key: "Service", Value: "Email" },
    { Key: "Team", Value: "Marketing" }
  ]
});
```

## Subscription with Multiple Tags

Create a subscription while categorizing it with multiple tags for better resource management.

```ts
const taggedAddonSubscription = await AWS.SES.MailManagerAddonSubscription("taggedSubscription", {
  AddonName: "SpamProtection",
  Tags: [
    { Key: "Purpose", Value: "Security" },
    { Key: "Owner", Value: "DevOps" },
    { Key: "Project", Value: "EmailCampaign" }
  ]
});
```
