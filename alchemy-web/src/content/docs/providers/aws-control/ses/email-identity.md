---
title: EmailIdentity
description: Learn how to create, update, and manage AWS SES EmailIdentitys using Alchemy Cloud Control.
---


The EmailIdentity resource lets you manage [AWS SES EmailIdentitys](https://docs.aws.amazon.com/ses/latest/userguide/) for sending email using the Amazon Simple Email Service (SES).

## Minimal Example

Create a basic EmailIdentity with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const emailIdentity = await AWS.SES.EmailIdentity("myEmailIdentity", {
  EmailIdentity: "user@example.com",
  FeedbackAttributes: {
    ForwardingEnabled: true
  },
  DkimSigningAttributes: {
    SigningEnabled: true
  }
});
```

## Advanced Configuration

Configure an EmailIdentity with additional options for DKIM attributes and mail forwarding.

```ts
const advancedEmailIdentity = await AWS.SES.EmailIdentity("advancedEmailIdentity", {
  EmailIdentity: "admin@example.com",
  DkimAttributes: {
    DkimEnabled: true,
    DkimTokens: ["token1", "token2", "token3"]
  },
  MailFromAttributes: {
    MailFromDomain: "mail.example.com",
    BehaviorOnMxFailure: "UseDefaultValue"
  }
});
```

## Adoption of Existing Email Identity

If an EmailIdentity already exists, you can adopt it instead of failing.

```ts
const existingEmailIdentity = await AWS.SES.EmailIdentity("existingEmailIdentity", {
  EmailIdentity: "contact@example.com",
  adopt: true
});
```
