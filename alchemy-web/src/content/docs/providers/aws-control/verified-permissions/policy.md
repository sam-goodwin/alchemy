---
title: Policy
description: Learn how to create, update, and manage AWS VerifiedPermissions Policys using Alchemy Cloud Control.
---


The Policy resource lets you manage [AWS VerifiedPermissions Policys](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic policy with required properties to define access control.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.VerifiedPermissions.Policy("basicPolicy", {
  Definition: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*",
        Condition: {
          StringEquals: {
            "s3:prefix": "protected/"
          }
        }
      }
    ]
  },
  PolicyStoreId: "myPolicyStoreId"
});
```

## Advanced Configuration

Define a policy with more complex rules, including multiple statements and conditions.

```ts
const advancedPolicy = await AWS.VerifiedPermissions.Policy("advancedPolicy", {
  Definition: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:::my-bucket/*",
        Condition: {
          StringEquals: {
            "s3:prefix": ["protected/", "private/"]
          }
        }
      },
      {
        Effect: "Deny",
        Action: "s3:DeleteObject",
        Resource: "arn:aws:s3:::my-bucket/private/*",
        Condition: {
          StringEquals: {
            "s3:prefix": "private/"
          }
        }
      }
    ]
  },
  PolicyStoreId: "myPolicyStoreId"
});
```

## Adoption of Existing Policy

Create a policy by adopting an existing resource instead of failing if it already exists.

```ts
const adoptedPolicy = await AWS.VerifiedPermissions.Policy("adoptedPolicy", {
  Definition: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "dynamodb:PutItem",
        Resource: "arn:aws:dynamodb:us-west-2:123456789012:table/myTable"
      }
    ]
  },
  PolicyStoreId: "myPolicyStoreId",
  adopt: true
});
```

## Policy with Multiple Conditions

Demonstrate a policy that combines multiple conditions for fine-grained access control.

```ts
const conditionalPolicy = await AWS.VerifiedPermissions.Policy("conditionalPolicy", {
  Definition: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "ec2:StartInstances",
        Resource: "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
        Condition: {
          StringEquals: {
            "aws:RequestTag/environment": "production"
          },
          NumericLessThanEquals: {
            "aws:ResourceTag/cpu": 4
          }
        }
      }
    ]
  },
  PolicyStoreId: "myPolicyStoreId"
});
```
