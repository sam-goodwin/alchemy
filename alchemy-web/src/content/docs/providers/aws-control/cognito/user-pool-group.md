---
title: UserPoolGroup
description: Learn how to create, update, and manage AWS Cognito UserPoolGroups using Alchemy Cloud Control.
---


The UserPoolGroup resource lets you manage [AWS Cognito UserPoolGroups](https://docs.aws.amazon.com/cognito/latest/userguide/) to organize users and control their access to resources.

## Minimal Example

Create a basic user pool group with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const userPoolGroup = await AWS.Cognito.UserPoolGroup("myUserPoolGroup", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  GroupName: "Admins",
  Description: "Administrators group with full access"
});
```

## Advanced Configuration

Configure a user pool group with a specific role and precedence:

```ts
const advancedUserPoolGroup = await AWS.Cognito.UserPoolGroup("adminUserPoolGroup", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  GroupName: "SuperAdmins",
  Description: "Super Administrators with elevated privileges",
  RoleArn: "arn:aws:iam::123456789012:role/Cognito_SuperAdmin_Role",
  Precedence: 1
});
```

## Adopting Existing Resources

If you want to adopt an existing user pool group instead of failing when it already exists, you can set the `adopt` property:

```ts
const adoptedUserPoolGroup = await AWS.Cognito.UserPoolGroup("existingUserPoolGroup", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  GroupName: "ExistingGroup",
  adopt: true // Adopts the existing resource
});
```

## Group Management Example

Demonstrate managing group members by using the `RoleArn` property to assign permissions:

```ts
const groupWithRole = await AWS.Cognito.UserPoolGroup("roleAssignedGroup", {
  UserPoolId: "us-west-2_aBcDeFgHi",
  GroupName: "Editors",
  Description: "Editors group for content management",
  RoleArn: "arn:aws:iam::123456789012:role/Cognito_Editor_Role"
});
```
