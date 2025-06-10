---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS CloudTrail ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage [AWS CloudTrail ResourcePolicys](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) that define access to your CloudTrail resources. Resource policies are important for controlling which AWS accounts or IAM roles can access your CloudTrail logs.

## Minimal Example

Create a basic resource policy that allows specific AWS accounts to access CloudTrail logs.

```ts
import AWS from "alchemy/aws/control";

const resourcePolicy = await AWS.CloudTrail.ResourcePolicy("basicResourcePolicy", {
  ResourceArn: "arn:aws:cloudtrail:us-east-1:123456789012:trail/MyTrail",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::111122223333:role/ExampleRole"
          ]
        },
        Action: "cloudtrail:LookupEvents",
        Resource: "*"
      }
    ]
  },
  adopt: false // Default is false; adopt existing resource if true
});
```

## Advanced Configuration

Configure a resource policy that includes multiple principals and additional actions.

```ts
const advancedResourcePolicy = await AWS.CloudTrail.ResourcePolicy("advancedResourcePolicy", {
  ResourceArn: "arn:aws:cloudtrail:us-east-1:123456789012:trail/MyTrail",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::111122223333:role/ExampleRole",
            "arn:aws:iam::444455556666:user/AnotherUser"
          ]
        },
        Action: [
          "cloudtrail:LookupEvents",
          "cloudtrail:GetTrail"
        ],
        Resource: "*",
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

## Specific Use Case: Deny Access Based on Conditions

Demonstrate how to deny access to specific actions based on certain conditions.

```ts
const denyAccessPolicy = await AWS.CloudTrail.ResourcePolicy("denyAccessPolicy", {
  ResourceArn: "arn:aws:cloudtrail:us-east-1:123456789012:trail/MyTrail",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Principal: {
          AWS: "arn:aws:iam::999988887777:role/RestrictedRole"
        },
        Action: "cloudtrail:LookupEvents",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }
});
```
