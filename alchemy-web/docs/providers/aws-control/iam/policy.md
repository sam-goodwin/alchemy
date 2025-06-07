---
title: Managing AWS IAM Policies with Alchemy
description: Learn how to create, update, and manage AWS IAM Policies using Alchemy Cloud Control.
---

# Policy

The Policy resource lets you manage [AWS IAM Policies](https://docs.aws.amazon.com/iam/latest/userguide/) which define permissions for actions and resources in AWS.

## Minimal Example

Create a basic IAM Policy with required properties and a few common optional ones.

```ts
import AWS from "alchemy/aws/control";

const BasicPolicy = await AWS.IAM.Policy("BasicPolicy", {
  PolicyName: "BasicS3Access",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::example-bucket/*"
      }
    ]
  },
  Users: ["JohnDoe"]
});
```

## Advanced Configuration

Configure an IAM Policy with a more complex policy document that includes multiple statements and conditions for enhanced security.

```ts
const AdvancedPolicy = await AWS.IAM.Policy("AdvancedPolicy", {
  PolicyName: "AdvancedS3AndDynamoDBAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:ListBucket",
          "s3:GetObject"
        ],
        Resource: [
          "arn:aws:s3:::example-bucket",
          "arn:aws:s3:::example-bucket/*"
        ],
        Condition: {
          StringEquals: {
            "aws:sourceVpce": "vpce-12345678"
          }
        }
      },
      {
        Effect: "Allow",
        Action: "dynamodb:Query",
        Resource: "arn:aws:dynamodb:us-west-2:123456789012:table/ExampleTable"
      }
    ]
  },
  Roles: ["ExampleRole"]
});
```

## Group Assignment

Assign an IAM Policy to multiple IAM Groups to manage access collectively.

```ts
const GroupPolicy = await AWS.IAM.Policy("GroupPolicy", {
  PolicyName: "DatabaseAccessPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "rds:DescribeDBInstances",
          "rds:DescribeDBClusters"
        ],
        Resource: "*"
      }
    ]
  },
  Groups: ["DatabaseAdmins", "DevTeam"]
});
```

## Role Assignment

Create an IAM Policy that can be attached to a specific IAM Role for granting permissions.

```ts
const RolePolicy = await AWS.IAM.Policy("RolePolicy", {
  PolicyName: "LambdaExecutionPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource: "arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/*"
      }
    ]
  },
  Roles: ["LambdaExecutionRole"]
});
```