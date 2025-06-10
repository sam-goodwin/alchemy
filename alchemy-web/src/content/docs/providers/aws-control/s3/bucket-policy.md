---
title: BucketPolicy
description: Learn how to create, update, and manage AWS S3 BucketPolicies using Alchemy Cloud Control.
---


The BucketPolicy resource allows you to manage [AWS S3 Bucket Policies](https://docs.aws.amazon.com/s3/latest/userguide/) to control access to your S3 buckets. This resource helps define the permissions for who can access the bucket and what actions they can perform.

## Minimal Example

Create a basic S3 bucket policy that grants read access to all users.

```ts
import AWS from "alchemy/aws/control";

const bucketPolicy = await AWS.S3.BucketPolicy("publicReadPolicy", {
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
  }
});
```

## Advanced Configuration

Configure a bucket policy that restricts access to specific IP addresses and allows both read and write actions.

```ts
const restrictedAccessPolicy = await AWS.S3.BucketPolicy("restrictedPolicy", {
  Bucket: "my-restricted-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject", "s3:PutObject"],
        Resource: "arn:aws:s3:::my-restricted-bucket/*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }
});
```

## Conditional Access Policy

Create a bucket policy that allows access only if a specific tag is present on the request.

```ts
const conditionalAccessPolicy = await AWS.S3.BucketPolicy("taggedAccessPolicy", {
  Bucket: "my-tagged-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-tagged-bucket/*",
        Condition: {
          StringEquals: {
            "s3:ExistingObjectTag/Access": "granted"
          }
        }
      }
    ]
  }
});
```

## Multi-Account Access

Set up a bucket policy that allows another AWS account to access your S3 bucket.

```ts
const crossAccountPolicy = await AWS.S3.BucketPolicy("crossAccountPolicy", {
  Bucket: "my-cross-account-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:root"
        },
        Action: "s3:*",
        Resource: [
          "arn:aws:s3:::my-cross-account-bucket",
          "arn:aws:s3:::my-cross-account-bucket/*"
        ]
      }
    ]
  }
});
```
