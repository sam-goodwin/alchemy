---
title: Managing AWS SES MailManagerAddonSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS SES MailManagerAddonSubscriptions using Alchemy Cloud Control.
---

# MailManagerAddonSubscription

The MailManagerAddonSubscription resource lets you manage [AWS SES MailManagerAddonSubscriptions](https://docs.aws.amazon.com/ses/latest/userguide/) to enhance your email sending capabilities with additional features and tools.

## Minimal Example

Create a MailManagerAddonSubscription with the required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const MailManagerAddonSubscription = await AWS.SES.MailManagerAddonSubscription("MyAddonSubscription", {
  AddonName: "EmailAnalytics",
  Tags: [
    { Key: "Environment", Value: "production" }
  ],
  adopt: false // Optional: Set to true to adopt an existing resource
});
```

## Advanced Configuration

Configure a MailManagerAddonSubscription with multiple tags for better resource management.

```ts
const AdvancedAddonSubscription = await AWS.SES.MailManagerAddonSubscription("AdvancedAddonSubscription", {
  AddonName: "DeliverabilityDashboard",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Marketing" }
  ],
  adopt: true // Adopt existing resource if applicable
});
```

## Using Tags for Resource Management

Leverage tags to categorize your MailManagerAddonSubscription for better visibility across environments.

```ts
const TaggedAddonSubscription = await AWS.SES.MailManagerAddonSubscription("TaggedAddonSubscription", {
  AddonName: "ContentFiltering",
  Tags: [
    { Key: "Project", Value: "EmailCampaign" },
    { Key: "Owner", Value: "Alice" },
    { Key: "CostCenter", Value: "Marketing" }
  ],
  adopt: false
});
```