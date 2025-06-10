---
title: AccessPointPolicy
description: Learn how to create, update, and manage AWS S3ObjectLambda AccessPointPolicys using Alchemy Cloud Control.
---


The AccessPointPolicy resource lets you manage access point policies for [AWS S3ObjectLambda](https://docs.aws.amazon.com/s3objectlambda/latest/userguide/). This allows you to define permissions for actions on your S3ObjectLambda access points.

## Minimal Example

Create a basic access point policy with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicAccessPointPolicy = await AWS.S3ObjectLambda.AccessPointPolicy("basicPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint/my-access-point",
        Condition: {
          "StringEquals": {
            "s3:DataAccessPoint": "my-access-point"
          }
        }
      }
    ]
  },
  ObjectLambdaAccessPoint: "my-access-point"
});
```

## Advanced Configuration

Configure an advanced access point policy with multiple statements and conditions:

```ts
const advancedAccessPointPolicy = await AWS.S3ObjectLambda.AccessPointPolicy("advancedPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/Alice"
        },
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint/my-access-point",
        Condition: {
          "StringEquals": {
            "s3:DataAccessPoint": "my-access-point"
          }
        }
      },
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint/my-access-point",
        Condition: {
          "IpAddress": {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  },
  ObjectLambdaAccessPoint: "my-access-point"
});
```

## Custom IAM Policy Example

Demonstrate a custom IAM policy for an access point with a specific user:

```ts
const customIamPolicy = await AWS.S3ObjectLambda.AccessPointPolicy("customPolicy", {
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/Bob"
        },
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint/my-access-point",
        Condition: {
          "StringLike": {
            "s3:prefix": ["uploads/", "uploads/*"]
          }
        }
      }
    ]
  },
  ObjectLambdaAccessPoint: "my-access-point"
});
```
