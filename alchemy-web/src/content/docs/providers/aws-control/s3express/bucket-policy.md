---
title: BucketPolicy
description: Learn how to create, update, and manage AWS S3Express BucketPolicys using Alchemy Cloud Control.
---


The BucketPolicy resource allows you to manage [AWS S3Express BucketPolicys](https://docs.aws.amazon.com/s3express/latest/userguide/) to control access to your S3 buckets.

## Minimal Example

Create a basic bucket policy that allows public read access to all objects in a specific bucket.

```ts
import AWS from "alchemy/aws/control";

const bucketPolicy = await AWS.S3Express.BucketPolicy("public-read-policy", {
  Bucket: "my-public-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-public-bucket/*"
      }
    ]
  },
  adopt: false // Default is false; set to true if you want to adopt existing resources
});
```

## Advanced Configuration

Set a more complex bucket policy that restricts access to a specific IP address range and grants permissions to a specific IAM user.

```ts
const advancedBucketPolicy = await AWS.S3Express.BucketPolicy("restricted-policy", {
  Bucket: "my-restricted-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/specific-user"
        },
        Action: "s3:PutObject",
        Resource: "arn:aws:s3:::my-restricted-bucket/*"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "s3:*",
        Resource: "arn:aws:s3:::my-restricted-bucket/*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "192.0.2.0/24"
          }
        }
      }
    ]
  }
});
```

## Example with Multiple Statements

Demonstrate a bucket policy containing multiple statements for different actions.

```ts
const multiStatementPolicy = await AWS.S3Express.BucketPolicy("multi-statement-policy", {
  Bucket: "my-multi-statement-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-multi-statement-bucket/*"
      },
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/my-role"
        },
        Action: "s3:PutObject",
        Resource: "arn:aws:s3:::my-multi-statement-bucket/*"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "s3:DeleteObject",
        Resource: "arn:aws:s3:::my-multi-statement-bucket/*",
        Condition: {
          StringEquals: {
            "aws:username": "forbidden-user"
          }
        }
      }
    ]
  }
});
```
