---
title: Role
description: Learn how to create, update, and manage AWS IAM Roles using Alchemy to grant permissions to services and applications.
---


The Role resource lets you create and manage [AWS IAM Roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) that define permissions for AWS services and users.

## Minimal Example

Create a basic Lambda execution role with permissions to write logs:

```ts
import { Role } from "alchemy/aws";

const role = await Role("lambda-role", {
  roleName: "lambda-role",
  assumeRolePolicy: {
    Version: "2012-10-17", 
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  policies: [{
    policyName: "logs",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream", 
          "logs:PutLogEvents"
        ],
        Resource: "*"
      }]
    }
  }]
});
```

## With Managed Policies

Attach AWS managed policies to grant common permissions:

```ts
import { Role } from "alchemy/aws";

const role = await Role("readonly-role", {
  roleName: "readonly-role", 
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  managedPolicyArns: [
    "arn:aws:iam::aws:policy/ReadOnlyAccess"
  ]
});
```

## Multiple Inline Policies

Create a role with multiple inline policies and custom session duration:

```ts
import { Role } from "alchemy/aws";

const role = await Role("custom-role", {
  roleName: "custom-role",
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  maxSessionDuration: 7200,
  policies: [
    {
      policyName: "logs",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [{
          Effect: "Allow",
          Action: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          Resource: "*"
        }]
      }
    },
    {
      policyName: "s3",
      policyDocument: {
        Version: "2012-10-17", 
        Statement: [{
          Effect: "Allow",
          Action: "s3:ListBucket",
          Resource: "*"
        }]
      }
    }
  ]
});
```
