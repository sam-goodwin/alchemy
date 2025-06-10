---
title: Role
description: Learn how to create, update, and manage AWS IAM Roles using Alchemy Cloud Control.
---


The Role resource allows you to create and manage [AWS IAM Roles](https://docs.aws.amazon.com/iam/latest/userguide/) which define a set of permissions for making AWS service requests. IAM roles can be assumed by AWS services, users, or applications.

## Minimal Example

Create a basic IAM Role with a trust policy that allows EC2 instances to assume it.

```ts
import AWS from "alchemy/aws/control";

const ec2Role = await AWS.IAM.Role("ec2Role", {
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "ec2.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  RoleName: "EC2InstanceRole",
  Description: "Role for EC2 instances to access S3 and DynamoDB",
  ManagedPolicyArns: [
    "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
    "arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess"
  ]
});
```

## Advanced Configuration

Define an IAM Role with a custom permissions boundary and session duration.

```ts
const advancedRole = await AWS.IAM.Role("advancedRole", {
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  RoleName: "AdvancedLambdaRole",
  Description: "Role for Lambda functions with custom permissions",
  PermissionsBoundary: "arn:aws:iam::123456789012:policy/CustomPermissionsBoundary",
  MaxSessionDuration: 3600, // 1 hour
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Role with Inline Policies

Create a role that includes inline policies for fine-grained access control.

```ts
const inlinePolicyRole = await AWS.IAM.Role("inlinePolicyRole", {
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        Service: "ecs-tasks.amazonaws.com"
      },
      Action: "sts:AssumeRole"
    }]
  },
  RoleName: "EcsTaskRole",
  Description: "Role for ECS tasks with inline policies",
  Policies: [{
    PolicyName: "EcsTaskPolicy",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "dynamodb:Query"
        ],
        Resource: [
          "arn:aws:s3:::my-bucket/*",
          "arn:aws:dynamodb:us-west-2:123456789012:table/MyTable"
        ]
      }]
    }
  }]
});
```
