---
title: RolePolicy
description: Learn how to create, update, and manage AWS IAM RolePolicys using Alchemy Cloud Control.
---


The RolePolicy resource lets you manage [AWS IAM RolePolicys](https://docs.aws.amazon.com/iam/latest/userguide/) for fine-grained control over access to AWS resources.

## Minimal Example

Create a basic IAM RolePolicy with required properties and a common optional property for the policy document.

```ts
import AWS from "alchemy/aws/control";

const basicRolePolicy = await AWS.IAM.RolePolicy("basicRolePolicy", {
  RoleName: "myIAMRole",
  PolicyName: "myPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:::my-bucket"
      }
    ]
  }
});
```

## Advanced Configuration

Configure an IAM RolePolicy with additional permissions and a more complex policy document.

```ts
const advancedRolePolicy = await AWS.IAM.RolePolicy("advancedRolePolicy", {
  RoleName: "myIAMRole",
  PolicyName: "advancedPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:::my-bucket/*"
      },
      {
        Effect: "Allow",
        Action: "ec2:DescribeInstances",
        Resource: "*"
      }
    ]
  }
});
```

## Policy with Conditions

Create an IAM RolePolicy that includes conditions for more granular control.

```ts
const conditionalRolePolicy = await AWS.IAM.RolePolicy("conditionalRolePolicy", {
  RoleName: "myIAMRole",
  PolicyName: "conditionalPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*",
        Condition: {
          StringEquals: {
            "aws:SourceAccount": "123456789012"
          }
        }
      }
    ]
  }
});
```

## Policy with Multiple Statements

Define a RolePolicy with multiple statements to cover different actions and resources.

```ts
const multiStatementRolePolicy = await AWS.IAM.RolePolicy("multiStatementRolePolicy", {
  RoleName: "myIAMRole",
  PolicyName: "multiStatementPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "dynamodb:Scan",
        Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/my-table"
      },
      {
        Effect: "Allow",
        Action: "sqs:SendMessage",
        Resource: "arn:aws:sqs:us-east-1:123456789012:my-queue"
      }
    ]
  }
});
```
