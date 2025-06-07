---
title: Managing AWS IAM ManagedPolicys with Alchemy
description: Learn how to create, update, and manage AWS IAM ManagedPolicys using Alchemy Cloud Control.
---

# ManagedPolicy

The ManagedPolicy resource lets you manage [AWS IAM Managed Policies](https://docs.aws.amazon.com/iam/latest/userguide/) which are used to define permissions for users, groups, and roles.

## Minimal Example

Create a basic managed policy with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicManagedPolicy = await AWS.IAM.ManagedPolicy("BasicPolicy", {
  ManagedPolicyName: "BasicS3Access",
  Description: "A policy that allows basic access to S3 resources.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "s3:*",
      Resource: "*"
    }]
  }
});
```

## Advanced Configuration

Configure a managed policy with multiple statements and a specific path.

```ts
const AdvancedManagedPolicy = await AWS.IAM.ManagedPolicy("AdvancedPolicy", {
  ManagedPolicyName: "AdvancedS3AndDynamoDBAccess",
  Path: "/custom/policies/",
  Description: "A policy that allows access to both S3 and DynamoDB.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "*"
      },
      {
        Effect: "Allow",
        Action: "dynamodb:*",
        Resource: "*"
      }
    ]
  }
});
```

## Associating with Users, Groups, and Roles

Create a managed policy and associate it with specific users, groups, and roles.

```ts
const UserManagedPolicy = await AWS.IAM.ManagedPolicy("UserPolicy", {
  ManagedPolicyName: "UserAccessPolicy",
  Description: "A policy that grants access to IAM users.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: [
        "iam:ListUsers",
        "iam:GetUser"
      ],
      Resource: "*"
    }]
  },
  Users: ["User1", "User2"],
  Groups: ["AdminGroup"],
  Roles: ["AppRole"]
});
```