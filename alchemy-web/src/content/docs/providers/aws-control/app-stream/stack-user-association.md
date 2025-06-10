---
title: StackUserAssociation
description: Learn how to create, update, and manage AWS AppStream StackUserAssociations using Alchemy Cloud Control.
---


The StackUserAssociation resource allows you to manage user associations with AppStream stacks, enabling users to access applications and resources. For more information, refer to the [AWS AppStream StackUserAssociations documentation](https://docs.aws.amazon.com/appstream/latest/userguide/).

## Minimal Example

Create a basic user association with required properties and one optional property for email notification.

```ts
import AWS from "alchemy/aws/control";

const userAssociation = await AWS.AppStream.StackUserAssociation("basicUserAssociation", {
  UserName: "john.doe",
  StackName: "MarketingStack",
  AuthenticationType: "USERPOOL",
  SendEmailNotification: true // Optional: Send email notification to the user
});
```

## Advanced Configuration

Configure a user association with the option to adopt existing resources if they already exist.

```ts
const advancedUserAssociation = await AWS.AppStream.StackUserAssociation("advancedUserAssociation", {
  UserName: "jane.smith",
  StackName: "SalesStack",
  AuthenticationType: "SAML",
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Email Notification Disabled

Create a user association without sending an email notification.

```ts
const noEmailUserAssociation = await AWS.AppStream.StackUserAssociation("noEmailUserAssociation", {
  UserName: "alice.brown",
  StackName: "DevOpsStack",
  AuthenticationType: "USERPOOL",
  SendEmailNotification: false // Email notification disabled
});
```

## User Association with Different Authentication Types

Demonstrate how to create user associations with different authentication types.

```ts
const samlUserAssociation = await AWS.AppStream.StackUserAssociation("samlUserAssociation", {
  UserName: "bob.johnson",
  StackName: "EngineeringStack",
  AuthenticationType: "SAML"
});

const userPoolUserAssociation = await AWS.AppStream.StackUserAssociation("userPoolUserAssociation", {
  UserName: "carol.white",
  StackName: "HRStack",
  AuthenticationType: "USERPOOL"
});
```
