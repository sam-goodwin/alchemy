---
title: MailManagerArchive
description: Learn how to create, update, and manage AWS SES MailManagerArchives using Alchemy Cloud Control.
---


The MailManagerArchive resource lets you manage [AWS SES MailManagerArchives](https://docs.aws.amazon.com/ses/latest/userguide/) for storing and retaining email data securely.

## Minimal Example

Create a basic MailManagerArchive with essential properties.

```ts
import AWS from "alchemy/aws/control";

const mailManagerArchive = await AWS.SES.MailManagerArchive("basicArchive", {
  ArchiveName: "MyEmailArchive",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Retention: {
    Days: 30
  }
});
```

## Advanced Configuration

Configure a MailManagerArchive with additional tags and a longer retention period.

```ts
const advancedArchive = await AWS.SES.MailManagerArchive("advancedArchive", {
  ArchiveName: "AdvancedEmailArchive",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Retention: {
    Days: 365
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EmailRetention" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing MailManagerArchive if it already exists instead of failing.

```ts
const existingArchive = await AWS.SES.MailManagerArchive("existingArchive", {
  ArchiveName: "AdoptedEmailArchive",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  adopt: true
});
```

## Custom Retention Policy

Create a MailManagerArchive with a custom retention policy.

```ts
const customRetentionArchive = await AWS.SES.MailManagerArchive("customRetentionArchive", {
  ArchiveName: "CustomRetentionEmailArchive",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Retention: {
    Days: 90
  },
  Tags: [
    { Key: "Compliance", Value: "Archived" }
  ]
});
```
