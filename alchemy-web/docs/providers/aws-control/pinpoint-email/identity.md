---
title: Managing AWS PinpointEmail Identitys with Alchemy
description: Learn how to create, update, and manage AWS PinpointEmail Identitys using Alchemy Cloud Control.
---

# Identity

The Identity resource lets you manage [AWS PinpointEmail Identitys](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) for sending emails through Amazon Pinpoint Email. This includes configuring feedback forwarding, DKIM signing, and other identity attributes.

## Minimal Example

Create a basic identity with a name and enable feedback forwarding.

```ts
import AWS from "alchemy/aws/control";

const BasicIdentity = await AWS.PinpointEmail.Identity("BasicIdentity", {
  Name: "no-reply@example.com",
  FeedbackForwardingEnabled: true
});
```

## Advanced Configuration

Configure an identity with DKIM signing and custom tags.

```ts
const AdvancedIdentity = await AWS.PinpointEmail.Identity("AdvancedIdentity", {
  Name: "support@example.com",
  DkimSigningEnabled: true,
  FeedbackForwardingEnabled: false,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "EmailMarketing" }
  ]
});
```

## Custom MailFrom Attributes

Set custom MailFrom attributes for an identity.

```ts
const CustomMailFromIdentity = await AWS.PinpointEmail.Identity("CustomMailFromIdentity", {
  Name: "custom@example.com",
  MailFromAttributes: {
    MailFromDomain: "mail.example.com",
    BehaviorOnMxFailure: "UseDefaultValue"
  }
});
```

## Adoption of Existing Resource

Adopt an existing identity if it already exists instead of failing.

```ts
const AdoptedIdentity = await AWS.PinpointEmail.Identity("AdoptedIdentity", {
  Name: "existing@example.com",
  adopt: true
});
```