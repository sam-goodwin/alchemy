---
title: Account
description: Learn how to create, update, and manage AWS CertificateManager Accounts using Alchemy Cloud Control.
---


The Account resource lets you manage [AWS CertificateManager Accounts](https://docs.aws.amazon.com/certificatemanager/latest/userguide/) for configuring certificate expiry notifications and other settings.

## Minimal Example

Create a basic AWS CertificateManager Account with required properties.

```ts
import AWS from "alchemy/aws/control";

const account = await AWS.CertificateManager.Account("default-account", {
  ExpiryEventsConfiguration: {
    DaysBeforeExpiry: 30,
    NotificationTarget: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
    SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure an AWS CertificateManager Account with a custom expiry event notification setup.

```ts
const advancedAccount = await AWS.CertificateManager.Account("advanced-account", {
  ExpiryEventsConfiguration: {
    DaysBeforeExpiry: 15,
    NotificationTarget: "email",
    SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MyEmailNotificationTopic"
  },
  adopt: false // Do not adopt existing resource
});
```

## Adoption of Existing Account

Demonstrate how to adopt an existing AWS CertificateManager Account without creating a new one.

```ts
const existingAccount = await AWS.CertificateManager.Account("existing-account", {
  ExpiryEventsConfiguration: {
    DaysBeforeExpiry: 45,
    NotificationTarget: "sms",
    SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySMSNotificationTopic"
  },
  adopt: true // This will adopt the existing resource
});
```
