---
title: User
description: Learn how to create, update, and manage AWS IAM Users using Alchemy Cloud Control.
---


The User resource lets you manage [AWS IAM Users](https://docs.aws.amazon.com/iam/latest/userguide/) and their associated permissions, policies, and attributes.

## Minimal Example

Create a basic IAM user with a username and a path, including a managed policy.

```ts
import AWS from "alchemy/aws/control";

const basicUser = await AWS.IAM.User("basicUser", {
  UserName: "john.doe",
  Path: "/users/",
  ManagedPolicyArns: [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
});
```

## Adding Policies

Demonstrate how to attach inline policies to an IAM user.

```ts
const userWithPolicies = await AWS.IAM.User("userWithPolicies", {
  UserName: "jane.smith",
  Path: "/users/",
  Policies: [{
    PolicyName: "S3AccessPolicy",
    PolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Action: "s3:*",
        Resource: "*"
      }]
    })
  }]
});
```

## Group Membership

Create an IAM user that is a member of specific groups.

```ts
const groupMemberUser = await AWS.IAM.User("groupMemberUser", {
  UserName: "alice.johnson",
  Groups: ["Developers", "Admins"]
});
```

## Login Profile

Configure a login profile for an IAM user to enable console access.

```ts
const userWithLoginProfile = await AWS.IAM.User("userWithLoginProfile", {
  UserName: "bob.brown",
  LoginProfile: {
    Password: "ComplexPassword123!",
    PasswordResetRequired: true
  }
});
```

## Tags and Permissions Boundary

Create a user with tags and a permissions boundary.

```ts
const taggedUser = await AWS.IAM.User("taggedUser", {
  UserName: "charlie.white",
  Tags: [
    { Key: "Department", Value: "Engineering" },
    { Key: "Project", Value: "ProjectX" }
  ],
  PermissionsBoundary: "arn:aws:iam::123456789012:policy/BoundaryPolicy"
});
```

## Adopt Existing User

Demonstrate how to adopt an existing IAM user instead of creating a new one.

```ts
const existingUser = await AWS.IAM.User("existingUser", {
  UserName: "existing.user",
  adopt: true
});
```
