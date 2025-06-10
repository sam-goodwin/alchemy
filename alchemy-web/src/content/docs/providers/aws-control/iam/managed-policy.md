---
title: ManagedPolicy
description: Learn how to create, update, and manage AWS IAM ManagedPolicys using Alchemy Cloud Control.
---


The ManagedPolicy resource lets you manage [AWS IAM ManagedPolicys](https://docs.aws.amazon.com/iam/latest/userguide/) which are used to define permissions for AWS resources.

## Minimal Example

Create a basic IAM ManagedPolicy with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.IAM.ManagedPolicy("basicPolicy", {
  ManagedPolicyName: "BasicS3Access",
  Description: "Allows read and write access to S3 buckets",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
      }
    ]
  }
});
```

## Advanced Configuration

Configure an IAM ManagedPolicy with specific groups, roles, and an optional path:

```ts
const advancedPolicy = await AWS.IAM.ManagedPolicy("advancedPolicy", {
  ManagedPolicyName: "AdvancedEC2Access",
  Path: "/admin/",
  Description: "Grants permissions to manage EC2 instances",
  Groups: ["AdminGroup"],
  Roles: ["EC2AdminRole"],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ec2:RunInstances",
          "ec2:TerminateInstances",
          "ec2:DescribeInstances"
        ],
        Resource: "*"
      }
    ]
  }
});
```

## Attaching to Users

Demonstrate how to attach the ManagedPolicy to specific users:

```ts
const userPolicy = await AWS.IAM.ManagedPolicy("userPolicy", {
  ManagedPolicyName: "UserS3Access",
  Description: "Allows users to access specified S3 buckets",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: [
          "arn:aws:s3:::user-bucket",
          "arn:aws:s3:::user-bucket/*"
        ]
      }
    ]
  },
  Users: ["UserA", "UserB"]
});
```

## Policy with Conditions

Create a ManagedPolicy that includes conditions for access control:

```ts
const conditionalPolicy = await AWS.IAM.ManagedPolicy("conditionalPolicy", {
  ManagedPolicyName: "ConditionalS3Access",
  Description: "Grants access to S3 buckets only if conditions are met",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::condition-bucket/*",
        Condition: {
          StringEquals: {
            "s3:prefix": "docs/"
          }
        }
      }
    ]
  }
});
```
