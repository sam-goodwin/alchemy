---
title: UserPolicy
description: Learn how to create, update, and manage AWS IAM UserPolicys using Alchemy Cloud Control.
---


The UserPolicy resource allows you to manage [AWS IAM User Policies](https://docs.aws.amazon.com/iam/latest/userguide/) that grant permissions to AWS IAM users. This resource enables you to define fine-grained access control to AWS services and resources.

## Minimal Example

Create a basic IAM User Policy that grants permissions to list S3 buckets.

```ts
import AWS from "alchemy/aws/control";

const userPolicy = await AWS.IAM.UserPolicy("basicUserPolicy", {
  UserName: "johnDoe",
  PolicyName: "S3ListPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:ListAllMyBuckets",
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

Configure an IAM User Policy with multiple permissions for S3 and DynamoDB.

```ts
const advancedUserPolicy = await AWS.IAM.UserPolicy("advancedUserPolicy", {
  UserName: "janeDoe",
  PolicyName: "S3AndDynamoDBPolicy",
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
        Action: "dynamodb:Query",
        Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"
      }
    ]
  }
});
```

## Policy with Conditions

Create a policy that restricts access based on request conditions, such as IP address.

```ts
const conditionalUserPolicy = await AWS.IAM.UserPolicy("conditionalUserPolicy", {
  UserName: "aliceSmith",
  PolicyName: "RestrictedAccessPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }
});
```

## Policy with Multiple Statements

Define a policy that allows multiple actions across different services.

```ts
const multiStatementUserPolicy = await AWS.IAM.UserPolicy("multiStatementUserPolicy", {
  UserName: "bobJohnson",
  PolicyName: "MultiServiceAccessPolicy",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "arn:aws:s3:::my-bucket/*"
      },
      {
        Effect: "Allow",
        Action: "dynamodb:*",
        Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"
      }
    ]
  }
});
```
