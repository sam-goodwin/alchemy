---
title: DirectoryBucket
description: Learn how to create, update, and manage AWS S3Express DirectoryBuckets using Alchemy Cloud Control.
---


The DirectoryBucket resource allows you to manage [AWS S3Express DirectoryBuckets](https://docs.aws.amazon.com/s3express/latest/userguide/) and configure various properties such as encryption and lifecycle management.

## Minimal Example

Create a basic DirectoryBucket with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDirectoryBucket = await AWS.S3Express.DirectoryBucket("basicDirectoryBucket", {
  LocationName: "us-west-2",
  DataRedundancy: "high",
  BucketName: "my-directory-bucket"
});
```

## Advanced Configuration

Configure a DirectoryBucket with encryption and lifecycle configuration for more robust data management.

```ts
const advancedDirectoryBucket = await AWS.S3Express.DirectoryBucket("advancedDirectoryBucket", {
  LocationName: "us-east-1",
  DataRedundancy: "standard",
  BucketName: "secure-directory-bucket",
  BucketEncryption: {
    ServerSideEncryptionConfiguration: [{
      ServerSideEncryptionByDefault: {
        SSEAlgorithm: "AES256"
      }
    }]
  },
  LifecycleConfiguration: {
    Rules: [{
      Status: "Enabled",
      ExpirationInDays: 30,
      Prefix: "temp/"
    }]
  }
});
```

## Data Redundancy Configuration

Set up a DirectoryBucket with specific data redundancy settings.

```ts
const redundancyConfiguredBucket = await AWS.S3Express.DirectoryBucket("redundancyConfiguredBucket", {
  LocationName: "eu-central-1",
  DataRedundancy: "low",
  BucketName: "my-redundant-bucket"
});
```

## Adoption of Existing Resources

Adopt an existing DirectoryBucket instead of failing if the resource already exists.

```ts
const adoptedDirectoryBucket = await AWS.S3Express.DirectoryBucket("adoptedDirectoryBucket", {
  LocationName: "ap-south-1",
  DataRedundancy: "standard",
  BucketName: "existing-bucket-name",
  adopt: true
});
```
