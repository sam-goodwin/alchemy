---
title: Managing AWS SSO ApplicationAssignments with Alchemy
description: Learn how to create, update, and manage AWS SSO ApplicationAssignments using Alchemy Cloud Control.
---

# ApplicationAssignment

The ApplicationAssignment resource allows you to manage [AWS SSO ApplicationAssignments](https://docs.aws.amazon.com/sso/latest/userguide/) that associate users or groups with specific applications. This enables streamlined access management for applications across your organization.

## Minimal Example

Create a basic application assignment for a user to access an application:

```ts
import AWS from "alchemy/aws/control";

const UserApplicationAssignment = await AWS.SSO.ApplicationAssignment("UserAppAssignment", {
  ApplicationArn: "arn:aws:sso:us-west-2:123456789012:application/12345678-abcd-efgh-ijkl-123456789012",
  PrincipalId: "user-1234abcd",
  PrincipalType: "USER",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Create an application assignment for a group with additional configurations:

```ts
const GroupApplicationAssignment = await AWS.SSO.ApplicationAssignment("GroupAppAssignment", {
  ApplicationArn: "arn:aws:sso:us-west-2:123456789012:application/87654321-lkjh-gfed-cba-098765432109",
  PrincipalId: "group-5678efgh",
  PrincipalType: "GROUP",
  adopt: true // Adopt existing resource if it already exists
});
```

## Multiple Assignments

You can create multiple application assignments for different principals (users or groups) as needed:

```ts
const UserAssignment1 = await AWS.SSO.ApplicationAssignment("UserAssignment1", {
  ApplicationArn: "arn:aws:sso:us-west-2:123456789012:application/12345678-abcd-efgh-ijkl-123456789012",
  PrincipalId: "user-1234abcd",
  PrincipalType: "USER",
  adopt: true
});

const UserAssignment2 = await AWS.SSO.ApplicationAssignment("UserAssignment2", {
  ApplicationArn: "arn:aws:sso:us-west-2:123456789012:application/12345678-abcd-efgh-ijkl-123456789012",
  PrincipalId: "user-5678efgh",
  PrincipalType: "USER",
  adopt: true
});

const GroupAssignment = await AWS.SSO.ApplicationAssignment("GroupAssignment", {
  ApplicationArn: "arn:aws:sso:us-west-2:123456789012:application/87654321-lkjh-gfed-cba-098765432109",
  PrincipalId: "group-5678efgh",
  PrincipalType: "GROUP",
  adopt: true
});
```