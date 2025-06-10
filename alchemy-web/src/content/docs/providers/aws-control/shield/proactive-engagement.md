---
title: ProactiveEngagement
description: Learn how to create, update, and manage AWS Shield ProactiveEngagements using Alchemy Cloud Control.
---


The ProactiveEngagement resource allows you to configure AWS Shield Proactive Engagement settings, which enable you to receive alerts and notifications during DDoS attacks. This resource is essential for maintaining the security and availability of your applications by ensuring that your emergency contacts are promptly notified. For more information, refer to the [AWS Shield ProactiveEngagements documentation](https://docs.aws.amazon.com/shield/latest/userguide/).

## Minimal Example

Create a basic Proactive Engagement configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const proactiveEngagement = await AWS.Shield.ProactiveEngagement("defaultProactiveEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "ops-team@example.com",
      ContactId: "1234567890"
    },
    {
      EmailAddress: "security-team@example.com",
      ContactId: "0987654321"
    }
  ]
});
```

## Advanced Configuration

Configure a Proactive Engagement with additional optional properties such as adopting existing resources.

```ts
const advancedProactiveEngagement = await AWS.Shield.ProactiveEngagement("advancedProactiveEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "devops@example.com",
      ContactId: "1122334455"
    }
  ],
  adopt: true // Allows adopting an existing resource instead of failing
});
```

## Handling Multiple Contacts

Set up multiple emergency contacts to ensure redundancy in notifications.

```ts
const multiContactProactiveEngagement = await AWS.Shield.ProactiveEngagement("multiContactProactiveEngagement", {
  ProactiveEngagementStatus: "ENABLED",
  EmergencyContactList: [
    {
      EmailAddress: "contact1@example.com",
      ContactId: "abc123"
    },
    {
      EmailAddress: "contact2@example.com",
      ContactId: "def456"
    },
    {
      EmailAddress: "contact3@example.com",
      ContactId: "ghi789"
    }
  ]
});
```

## Disabling Proactive Engagement

Example of disabling Proactive Engagement while retaining the emergency contacts.

```ts
const disableProactiveEngagement = await AWS.Shield.ProactiveEngagement("disableProactiveEngagement", {
  ProactiveEngagementStatus: "DISABLED",
  EmergencyContactList: [
    {
      EmailAddress: "retained-contact@example.com",
      ContactId: "xyz123"
    }
  ]
});
```
