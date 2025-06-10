---
title: Assignment
description: Learn how to create, update, and manage AWS SSO Assignments using Alchemy Cloud Control.
---


The Assignment resource lets you manage [AWS SSO Assignments](https://docs.aws.amazon.com/sso/latest/userguide/) that link users or groups to permission sets for specific AWS accounts. This simplifies access management in AWS Single Sign-On.

## Minimal Example

Create a basic SSO assignment for a user linking them to a permission set in an AWS account.

```ts
import AWS from "alchemy/aws/control";

const ssoAssignment = await AWS.SSO.Assignment("user-assignment", {
  PrincipalId: "user-123456",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-12345678",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionSet/ssoins-12345678/ps-12345678",
  PrincipalType: "USER",
  TargetId: "account-123456"
});
```

## Advanced Configuration

Assign a user with the option to adopt existing resources if they already exist.

```ts
const advancedAssignment = await AWS.SSO.Assignment("advanced-user-assignment", {
  PrincipalId: "user-987654",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-87654321",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionSet/ssoins-87654321/ps-87654321",
  PrincipalType: "USER",
  TargetId: "account-987654",
  adopt: true // Adopt existing resource if it already exists
});
```

## Assigning a Group to a Permission Set

Assign a group to a specific permission set, allowing multiple users to gain access through their group association.

```ts
const groupAssignment = await AWS.SSO.Assignment("group-assignment", {
  PrincipalId: "group-123456",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-12345678",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionSet/ssoins-12345678/ps-12345678",
  PrincipalType: "GROUP",
  TargetId: "account-123456"
});
```

## Updating an Existing Assignment

You can also update an existing assignment by modifying its properties.

```ts
const updateAssignment = await AWS.SSO.Assignment("update-user-assignment", {
  PrincipalId: "user-123456",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-12345678",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionSet/ssoins-12345678/ps-87654321", // Updated permission set
  PrincipalType: "USER",
  TargetId: "account-123456"
});
```
