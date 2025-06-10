---
title: BucketPolicy
description: Learn how to create, update, and manage AWS S3Outposts BucketPolicys using Alchemy Cloud Control.
---


The BucketPolicy resource allows you to manage the access policies for [AWS S3Outposts Buckets](https://docs.aws.amazon.com/s3outposts/latest/userguide/). It helps define permissions for various actions on your S3Outposts resources.

## Minimal Example

Create a basic bucket policy that allows public read access to a specific bucket.

```ts
import AWS from "alchemy/aws/control";

const bucketPolicy = await AWS.S3Outposts.BucketPolicy("public-read-policy", {
  Bucket: "my-outposts-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/my-outposts-bucket/*"
    }]
  },
  adopt: false // Default is false
});
```

## Advanced Configuration

Configure a bucket policy that restricts access to a specific IP range.

```ts
const ipRestrictedPolicy = await AWS.S3Outposts.BucketPolicy("ip-restricted-policy", {
  Bucket: "my-outposts-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::123456789012:role/MyRole"
      },
      Action: "s3:PutObject",
      Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/my-outposts-bucket/*",
      Condition: {
        IpAddress: {
          "aws:SourceIp": "203.0.113.0/24"
        }
      }
    }]
  }
});
```

## Conditional Access

Create a bucket policy that allows access based on the request's source VPC.

```ts
const vpcPolicy = await AWS.S3Outposts.BucketPolicy("vpc-access-policy", {
  Bucket: "my-outposts-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/my-outposts-bucket/*",
      Condition: {
        StringEquals: {
          "aws:SourceVpc": "vpc-abcdef123"
        }
      }
    }]
  }
});
```

## Multi-Account Access

Establish a policy that allows cross-account access to a bucket.

```ts
const crossAccountPolicy = await AWS.S3Outposts.BucketPolicy("cross-account-policy", {
  Bucket: "my-outposts-bucket",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::098765432109:role/OtherAccountRole"
      },
      Action: "s3:ListBucket",
      Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/my-outposts-bucket"
    }]
  }
});
```
