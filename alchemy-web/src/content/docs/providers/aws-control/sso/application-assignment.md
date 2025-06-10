---
title: ApplicationAssignment
description: Learn how to create, update, and manage AWS SSO ApplicationAssignments using Alchemy Cloud Control.
---


The ApplicationAssignment resource allows you to manage [AWS SSO ApplicationAssignments](https://docs.aws.amazon.com/sso/latest/userguide/) for assigning applications to users or groups within AWS Single Sign-On (SSO).

## Minimal Example

Create a basic application assignment for a user.

```ts
import AWS from "alchemy/aws/control";

const applicationAssignment = await AWS.SSO.ApplicationAssignment("userAppAssignment", {
  ApplicationArn: "arn:aws:sso:::application/12345678-abcd-efgh-ijkl-1234567890ab",
  PrincipalId: "user-12345678",
  PrincipalType: "USER",
  adopt: true // Adopt existing resource if already present
});
```

## Advanced Configuration

Assign an application to a group with additional properties.

```ts
const groupAppAssignment = await AWS.SSO.ApplicationAssignment("groupAppAssignment", {
  ApplicationArn: "arn:aws:sso:::application/87654321-abcd-efgh-ijkl-0987654321ba",
  PrincipalId: "group-87654321",
  PrincipalType: "GROUP",
  adopt: false // Do not adopt existing resource
});
```

## Updating an Existing Assignment

Update an existing application assignment for a user.

```ts
const updatedAssignment = await AWS.SSO.ApplicationAssignment("updateUserAppAssignment", {
  ApplicationArn: "arn:aws:sso:::application/12345678-abcd-efgh-ijkl-1234567890ab",
  PrincipalId: "user-12345678",
  PrincipalType: "USER",
  adopt: true // Adopt existing resource
});
```

## Assigning Multiple Applications

Demonstrate assigning multiple applications to a user.

```ts
const firstAppAssignment = await AWS.SSO.ApplicationAssignment("firstAppAssignment", {
  ApplicationArn: "arn:aws:sso:::application/12345678-abcd-efgh-ijkl-1234567890ab",
  PrincipalId: "user-12345678",
  PrincipalType: "USER",
  adopt: true
});

const secondAppAssignment = await AWS.SSO.ApplicationAssignment("secondAppAssignment", {
  ApplicationArn: "arn:aws:sso:::application/23456789-abcd-efgh-ijkl-2345678901bc",
  PrincipalId: "user-12345678",
  PrincipalType: "USER",
  adopt: true
});
```
