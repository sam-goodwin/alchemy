---
title: Policy
description: Learn how to create, update, and manage AWS IAM Policies using Alchemy Cloud Control.
---


The Policy resource allows you to manage [AWS IAM Policies](https://docs.aws.amazon.com/iam/latest/userguide/) that define permissions for AWS resources. This enables fine-grained control over who can do what in your AWS account.

## Minimal Example

Create a basic IAM policy attached to a user with necessary permissions.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.IAM.Policy("basicPolicy", {
  PolicyName: "BasicS3Access",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["s3:ListBucket", "s3:GetObject"],
        Resource: ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]
      }
    ]
  },
  Users: ["myUser"]
});
```

## Advanced Configuration

Configure an IAM policy for multiple groups and roles with more complex permissions.

```ts
const advancedPolicy = await AWS.IAM.Policy("advancedPolicy", {
  PolicyName: "FullS3Access",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "*"
      },
      {
        Effect: "Deny",
        Action: "s3:DeleteObject",
        Resource: ["arn:aws:s3:::my-bucket/*"],
        Condition: {
          StringEquals: {
            "s3:prefix": ["restricted/"]
          }
        }
      }
    ]
  },
  Groups: ["AdminGroup", "DevGroup"],
  Roles: ["S3FullAccessRole"]
});
```

## Policy for Lambda Execution

Create a policy specifically for allowing AWS Lambda to access DynamoDB.

```ts
const lambdaExecutionPolicy = await AWS.IAM.Policy("lambdaExecutionPolicy", {
  PolicyName: "LambdaDynamoDBAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ],
        Resource: ["arn:aws:dynamodb:us-west-2:123456789012:table/MyTable"]
      }
    ]
  },
  Roles: ["MyLambdaExecutionRole"]
});
```

## Policy for EC2 Instance

Define a policy that grants an EC2 instance access to specific S3 buckets.

```ts
const ec2Policy = await AWS.IAM.Policy("ec2Policy", {
  PolicyName: "EC2S3Access",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: ["arn:aws:s3:::my-bucket"]
      },
      {
        Effect: "Allow",
        Action: ["s3:GetObject", "s3:PutObject"],
        Resource: ["arn:aws:s3:::my-bucket/*"]
      }
    ]
  },
  Roles: ["MyEC2InstanceRole"]
});
```
