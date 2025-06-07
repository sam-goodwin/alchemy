---
title: Managing AWS SSM ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS SSM ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource lets you manage [AWS SSM ResourcePolicies](https://docs.aws.amazon.com/ssm/latest/userguide/) for Systems Manager, providing fine-grained access control to your resources.

## Minimal Example

Create a basic ResourcePolicy with required properties and a common optional property for adoption.

```ts
import AWS from "alchemy/aws/control";

const basicResourcePolicy = await AWS.SSM.ResourcePolicy("BasicResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "ssm:PutParameter",
        Resource: "arn:aws:ssm:us-east-1:123456789012:parameter/my-parameter"
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:parameter/my-parameter",
  adopt: true
});
```

## Advanced Configuration

Configure a ResourcePolicy with a more complex policy allowing multiple actions and specifying conditions.

```ts
const advancedResourcePolicy = await AWS.SSM.ResourcePolicy("AdvancedResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Action: [
          "ssm:GetParameter",
          "ssm:PutParameter"
        ],
        Resource: "arn:aws:ssm:us-east-1:123456789012:parameter/my-parameter",
        Condition: {
          StringEquals: {
            "ssm:ResourceTag/Environment": "production"
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:parameter/my-parameter"
});
```

## Custom Conditions

Create a ResourcePolicy that specifies conditions based on tags for fine-grained access control.

```ts
const taggedResourcePolicy = await AWS.SSM.ResourcePolicy("TaggedResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "ssm:DeleteParameter",
        Resource: "arn:aws:ssm:us-east-1:123456789012:parameter/my-sensitive-parameter",
        Condition: {
          StringEquals: {
            "ssm:ResourceTag/Confidential": "true"
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:parameter/my-sensitive-parameter"
});
```