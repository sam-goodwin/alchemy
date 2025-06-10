---
title: Session
description: Learn how to create, update, and manage AWS Macie Sessions using Alchemy Cloud Control.
---


The Session resource lets you manage [AWS Macie Sessions](https://docs.aws.amazon.com/macie/latest/userguide/) for data security and compliance within your AWS environment. AWS Macie helps you discover and protect sensitive data in your AWS accounts.

## Minimal Example

Create a basic Macie session with default settings.

```ts
import AWS from "alchemy/aws/control";

const macieSession = await AWS.Macie.Session("basicMacieSession", {
  Status: "ENABLED",
  FindingPublishingFrequency: "FIFTEEN_MINUTES"
});
```

## Advanced Configuration

Configure a Macie session with an advanced setting for publishing findings.

```ts
const advancedMacieSession = await AWS.Macie.Session("advancedMacieSession", {
  Status: "ENABLED",
  FindingPublishingFrequency: "ONE_HOUR"
});
```

## Session with Adoption

Create a Macie session and adopt it if it already exists.

```ts
const adoptMacieSession = await AWS.Macie.Session("adoptMacieSession", {
  Status: "DISABLED",
  FindingPublishingFrequency: "SIX_HOURS",
  adopt: true
});
```
