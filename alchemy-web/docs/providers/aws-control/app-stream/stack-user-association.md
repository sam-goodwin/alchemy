---
title: Managing AWS AppStream StackUserAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppStream StackUserAssociations using Alchemy Cloud Control.
---

# StackUserAssociation

The StackUserAssociation resource lets you manage [AWS AppStream StackUserAssociations](https://docs.aws.amazon.com/appstream/latest/userguide/) to associate users with specific AppStream stacks.

## Minimal Example

Create a basic StackUserAssociation with the required properties.

```ts
import AWS from "alchemy/aws/control";

const minimalStackUserAssociation = await AWS.AppStream.StackUserAssociation("MinimalStackUserAssociation", {
  UserName: "john.doe@example.com",
  StackName: "DevStack",
  AuthenticationType: "SAML",
  SendEmailNotification: true
});
```

## Advanced Configuration

Configure a StackUserAssociation with additional options, such as email notifications.

```ts
const advancedStackUserAssociation = await AWS.AppStream.StackUserAssociation("AdvancedStackUserAssociation", {
  UserName: "jane.doe@example.com",
  StackName: "TestStack",
  AuthenticationType: "API",
  SendEmailNotification: true,
  adopt: true
});
```

## Adoption of Existing Resource

If you want to adopt an existing StackUserAssociation instead of creating a new one, you can set the `adopt` property to `true`.

```ts
const adoptExistingStackUserAssociation = await AWS.AppStream.StackUserAssociation("AdoptExistingStackUserAssociation", {
  UserName: "existing.user@example.com",
  StackName: "ProductionStack",
  AuthenticationType: "SAML",
  SendEmailNotification: false,
  adopt: true
});
```