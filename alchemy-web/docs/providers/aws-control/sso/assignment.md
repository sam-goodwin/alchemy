---
title: Managing AWS SSO Assignments with Alchemy
description: Learn how to create, update, and manage AWS SSO Assignments using Alchemy Cloud Control.
---

# Assignment

The Assignment resource allows you to manage [AWS SSO Assignments](https://docs.aws.amazon.com/sso/latest/userguide/) for users or groups to access AWS accounts and services. This resource facilitates the assignment of permission sets to principals within your AWS organization.

## Minimal Example

Create a basic SSO assignment for a user to access a specific AWS account with a permission set.

```ts
import AWS from "alchemy/aws/control";

const SsoAssignment = await AWS.SSO.Assignment("UserAssignment", {
  PrincipalId: "user-1234567890abcdef",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-1234567890abcdef",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionset/ssops-abcdef1234567890",
  PrincipalType: "USER",
  TargetId: "123456789012"
});
```

## Advanced Configuration

Assign a permission set to a group with options to adopt existing resources.

```ts
const GroupSsoAssignment = await AWS.SSO.Assignment("GroupAssignment", {
  PrincipalId: "group-abcdef1234567890",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-1234567890abcdef",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: "arn:aws:sso:::permissionset/ssops-abcdef1234567890",
  PrincipalType: "GROUP",
  TargetId: "123456789012",
  adopt: true
});
```

## Bulk Assignment

Create multiple assignments for a group of users to access different AWS accounts.

```ts
const UserAssignments = ["user-abc123", "user-def456", "user-ghi789"];
const PermissionSetArn = "arn:aws:sso:::permissionset/ssops-abcdef1234567890";

for (const UserId of UserAssignments) {
  await AWS.SSO.Assignment(`AssignmentFor${UserId}`, {
    PrincipalId: UserId,
    InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-1234567890abcdef",
    TargetType: "AWS_ACCOUNT",
    PermissionSetArn: PermissionSetArn,
    PrincipalType: "USER",
    TargetId: "123456789012"
  });
}
```

## Custom Permissions

Assign a custom permission set to a user with specific access rights.

```ts
const CustomPermissionSetArn = "arn:aws:sso:::permissionset/ssops-custom1234567890";

const CustomUserAssignment = await AWS.SSO.Assignment("CustomUserAssignment", {
  PrincipalId: "user-custom123456",
  InstanceArn: "arn:aws:sso:us-west-2:123456789012:instance/ssoins-1234567890abcdef",
  TargetType: "AWS_ACCOUNT",
  PermissionSetArn: CustomPermissionSetArn,
  PrincipalType: "USER",
  TargetId: "123456789012"
});
```