---
title: Identity
description: Learn how to create, update, and manage AWS PinpointEmail Identitys using Alchemy Cloud Control.
---


The Identity resource allows you to manage [AWS PinpointEmail Identitys](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) for sending email messages. This resource helps in configuring email identity settings, including feedback forwarding and DKIM signing.

## Minimal Example

Create a basic email identity with essential properties such as name and DKIM signing enabled.

```ts
import AWS from "alchemy/aws/control";

const emailIdentity = await AWS.PinpointEmail.Identity("myEmailIdentity", {
  Name: "contact@example.com",
  DkimSigningEnabled: true,
  FeedbackForwardingEnabled: false
});
```

## Advanced Configuration

Configure an email identity with additional properties like MailFromAttributes and Tags.

```ts
const advancedEmailIdentity = await AWS.PinpointEmail.Identity("advancedEmailIdentity", {
  Name: "support@example.com",
  DkimSigningEnabled: true,
  FeedbackForwardingEnabled: true,
  MailFromAttributes: {
    MailFromDomain: "mail.example.com",
    BehaviorOnMxFailure: "UseDefaultValue"
  },
  Tags: [
    { Key: "Team", Value: "Support" },
    { Key: "Project", Value: "EmailMarketing" }
  ]
});
```

## Identity with Adoption

Create an email identity while adopting an existing resource instead of failing if it already exists.

```ts
const adoptedEmailIdentity = await AWS.PinpointEmail.Identity("adoptedEmailIdentity", {
  Name: "info@example.com",
  DkimSigningEnabled: false,
  FeedbackForwardingEnabled: true,
  adopt: true
});
```

## Configuring Tags for Email Identity

Add tags to an email identity for better organization and tracking.

```ts
const taggedEmailIdentity = await AWS.PinpointEmail.Identity("taggedEmailIdentity", {
  Name: "newsletter@example.com",
  DkimSigningEnabled: true,
  Tags: [
    { Key: "Purpose", Value: "Newsletter" },
    { Key: "Environment", Value: "Production" }
  ]
});
```
