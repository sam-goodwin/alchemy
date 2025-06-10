---
title: TableBucketPolicy
description: Learn how to create, update, and manage AWS S3Tables TableBucketPolicys using Alchemy Cloud Control.
---


The TableBucketPolicy resource allows you to manage bucket policies for Amazon S3 Tables, providing fine-grained control over access to your S3 data. For more information, refer to the [AWS S3Tables TableBucketPolicys documentation](https://docs.aws.amazon.com/s3tables/latest/userguide/).

## Minimal Example

Create a basic TableBucketPolicy with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.S3Tables.TableBucketPolicy("basicBucketPolicy", {
  TableBucketARN: "arn:aws:s3:us-west-2:123456789012:bucketName",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:us-west-2:123456789012:bucketName/*",
        Condition: {
          StringEquals: {
            "s3:prefix": "public/"
          }
        }
      }
    ]
  },
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a TableBucketPolicy with a more complex resource policy, allowing multiple actions and specifying conditions.

```ts
const advancedPolicy = await AWS.S3Tables.TableBucketPolicy("advancedBucketPolicy", {
  TableBucketARN: "arn:aws:s3:us-east-1:123456789012:mySecureBucket",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:us-east-1:123456789012:mySecureBucket/*",
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

## Use Case: Restricting Access by IP

This example demonstrates how to restrict access to a specific IP range.

```ts
const ipRestrictedPolicy = await AWS.S3Tables.TableBucketPolicy("ipRestrictedPolicy", {
  TableBucketARN: "arn:aws:s3:us-west-1:123456789012:restrictedBucket",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:us-west-1:123456789012:restrictedBucket/*",
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

## Use Case: Allowing Access to Specific IAM Roles

This example shows how to allow access to certain IAM roles.

```ts
const roleBasedPolicy = await AWS.S3Tables.TableBucketPolicy("roleBasedPolicy", {
  TableBucketARN: "arn:aws:s3:us-east-1:123456789012:roleSpecificBucket",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::123456789012:role/AccessRole1",
            "arn:aws:iam::123456789012:role/AccessRole2"
          ]
        },
        Action: "s3:ListBucket",
        Resource: "arn:aws:s3:us-east-1:123456789012:roleSpecificBucket"
      }
    ]
  }
});
```
