---
title: Managing AWS Cognito UserPoolUserToGroupAttachments with Alchemy
description: Learn how to create, update, and manage AWS Cognito UserPoolUserToGroupAttachments using Alchemy Cloud Control.
---

# UserPoolUserToGroupAttachment

The UserPoolUserToGroupAttachment resource allows you to manage user-to-group relationships within an Amazon Cognito User Pool. This enables you to assign users to specific groups, allowing for easier management of user permissions and attributes. For more information, see the [AWS Cognito UserPoolUserToGroupAttachments](https://docs.aws.amazon.com/cognito/latest/userguide/).

## Minimal Example

Create a simple attachment of a user to a group in a Cognito User Pool with the required properties.

```ts
import AWS from "alchemy/aws/control";

const UserPoolUserToGroupAttachmentExample = await AWS.Cognito.UserPoolUserToGroupAttachment("UserGroupAttachmentExample", {
  GroupName: "Admins",
  UserPoolId: "us-west-2_aBcDeFgHi", 
  Username: "john.doe"
});
```

## Advanced Configuration

In this example, we demonstrate how to include the optional `adopt` property, allowing for the adoption of an existing resource if it already exists.

```ts
const AdoptExistingUserGroupAttachment = await AWS.Cognito.UserPoolUserToGroupAttachment("ExistingUserGroupAttachment", {
  GroupName: "Moderators",
  UserPoolId: "us-west-2_aBcDeFgHi", 
  Username: "jane.doe",
  adopt: true // Adopt existing resource instead of failing
});
```

## Handling Multiple Users in a Batch

If you need to attach multiple users to a single group, you can create multiple `UserPoolUserToGroupAttachment` resources as shown below.

```ts
const UserGroupAttachment1 = await AWS.Cognito.UserPoolUserToGroupAttachment("UserGroupAttachment1", {
  GroupName: "Developers",
  UserPoolId: "us-west-2_aBcDeFgHi", 
  Username: "alice.smith"
});

const UserGroupAttachment2 = await AWS.Cognito.UserPoolUserToGroupAttachment("UserGroupAttachment2", {
  GroupName: "Developers",
  UserPoolId: "us-west-2_aBcDeFgHi", 
  Username: "bob.jones"
});
```