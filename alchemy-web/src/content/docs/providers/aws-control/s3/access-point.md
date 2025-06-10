---
title: AccessPoint
description: Learn how to create, update, and manage AWS S3 AccessPoints using Alchemy Cloud Control.
---


The AccessPoint resource lets you manage [AWS S3 AccessPoints](https://docs.aws.amazon.com/s3/latest/userguide/) which simplify data access management for shared datasets in S3.

## Minimal Example

Create a basic S3 AccessPoint with required properties and a public access block configuration.

```ts
import AWS from "alchemy/aws/control";

const basicAccessPoint = await AWS.S3.AccessPoint("basicAccessPoint", {
  Bucket: "my-example-bucket",
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: true,
    IgnorePublicAcls: true,
    BlockPublicPolicy: true,
    RestrictPublicBuckets: true
  }
});
```

## Advanced Configuration

Configure an S3 AccessPoint with a specific VPC configuration and a policy to allow access only to certain AWS principals.

```ts
const advancedAccessPoint = await AWS.S3.AccessPoint("advancedAccessPoint", {
  Bucket: "my-example-bucket",
  VpcConfiguration: {
    VpcId: "vpc-123abc456",
    VpcEndpointId: "vpce-789xyz012"
  },
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/exampleUser"
        },
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint:advancedAccessPoint/object/*"
      }
    ]
  }
});
```

## Using BucketAccountId

Create an S3 AccessPoint specifying the bucket account ID for cross-account access.

```ts
const crossAccountAccessPoint = await AWS.S3.AccessPoint("crossAccountAccessPoint", {
  Bucket: "my-example-bucket",
  BucketAccountId: "123456789012",
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:*",
        Resource: "arn:aws:s3:us-east-1:123456789012:accesspoint:crossAccountAccessPoint"
      }
    ]
  }
});
```

## Adopting Existing Resources

Adopt an existing S3 AccessPoint rather than failing if the resource already exists.

```ts
const adoptExistingAccessPoint = await AWS.S3.AccessPoint("adoptExistingAccessPoint", {
  Bucket: "my-example-bucket",
  adopt: true
});
```
