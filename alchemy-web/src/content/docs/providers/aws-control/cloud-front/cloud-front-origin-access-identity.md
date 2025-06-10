---
title: CloudFrontOriginAccessIdentity
description: Learn how to create, update, and manage AWS CloudFront CloudFrontOriginAccessIdentitys using Alchemy Cloud Control.
---


The CloudFrontOriginAccessIdentity resource allows you to create and manage [AWS CloudFront Origin Access Identitites](https://docs.aws.amazon.com/cloudfront/latest/userguide/) which are used to securely serve content from your Amazon S3 buckets through CloudFront.

## Minimal Example

Create a basic CloudFront Origin Access Identity with required properties:

```ts
import AWS from "alchemy/aws/control";

const originAccessIdentity = await AWS.CloudFront.CloudFrontOriginAccessIdentity("basicOriginAccessIdentity", {
  CloudFrontOriginAccessIdentityConfig: {
    Comment: "My origin access identity for secure content delivery"
  }
});
```

## Advanced Configuration

Configure a CloudFront Origin Access Identity with an optional comment for better management:

```ts
const advancedOriginAccessIdentity = await AWS.CloudFront.CloudFrontOriginAccessIdentity("advancedOriginAccessIdentity", {
  CloudFrontOriginAccessIdentityConfig: {
    Comment: "Origin access identity for my application resources"
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Usage with S3 Bucket Policy

Set up an S3 bucket policy that grants read permissions to the CloudFront Origin Access Identity:

```ts
import AWS from "alchemy/aws/control";

const myBucketPolicy = {
  Version: "2012-10-17",
  Statement: [{
    Effect: "Allow",
    Principal: {
      AWS: `arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${originAccessIdentity.Arn}`
    },
    Action: "s3:GetObject",
    Resource: "arn:aws:s3:::my-secure-bucket/*"
  }]
};

const s3BucketPolicy = await AWS.S3.BucketPolicy("myBucketPolicy", {
  Bucket: "my-secure-bucket",
  Policy: JSON.stringify(myBucketPolicy)
});
```

## Updating an Existing Identity

Update an existing CloudFront Origin Access Identity to modify its comment:

```ts
const updatedOriginAccessIdentity = await AWS.CloudFront.CloudFrontOriginAccessIdentity("updateOriginAccessIdentity", {
  CloudFrontOriginAccessIdentityConfig: {
    Comment: "Updated comment for origin access identity"
  },
  adopt: true // Ensure it adopts the existing resource
});
```

## Deleting an Identity

Delete a CloudFront Origin Access Identity when it is no longer needed:

```ts
const deleteOriginAccessIdentity = await AWS.CloudFront.CloudFrontOriginAccessIdentity("deleteOriginAccessIdentity", {
  CloudFrontOriginAccessIdentityConfig: {
    Comment: "Identity to be deleted"
  },
  adopt: false // Do not adopt existing resource; fail if it exists
});
```
