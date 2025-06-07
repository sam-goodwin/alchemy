---
title: Managing AWS S3Express DirectoryBuckets with Alchemy
description: Learn how to create, update, and manage AWS S3Express DirectoryBuckets using Alchemy Cloud Control.
---

# DirectoryBucket

The DirectoryBucket resource lets you manage [AWS S3Express DirectoryBuckets](https://docs.aws.amazon.com/s3express/latest/userguide/) for storing and retrieving large amounts of data in the cloud.

## Minimal Example

Create a basic DirectoryBucket with required properties and one optional property for bucket encryption.

```ts
import AWS from "alchemy/aws/control";

const basicDirectoryBucket = await AWS.S3Express.DirectoryBucket("BasicDirectoryBucket", {
  LocationName: "us-west-2",
  DataRedundancy: "HIGH",
  BucketEncryption: {
    ServerSideEncryptionConfiguration: [
      {
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: "AES256"
        }
      }
    ]
  }
});
```

## Advanced Configuration

Configure a DirectoryBucket with lifecycle rules and additional properties for enhanced data management.

```ts
const advancedDirectoryBucket = await AWS.S3Express.DirectoryBucket("AdvancedDirectoryBucket", {
  LocationName: "us-east-1",
  DataRedundancy: "LOW",
  LifecycleConfiguration: {
    Rules: [
      {
        Status: "Enabled",
        ExpirationInDays: 30,
        Prefix: "logs/"
      }
    ]
  }
});
```

## Adoption of Existing Resources

Adopt an existing DirectoryBucket instead of failing when the resource already exists.

```ts
const adoptedDirectoryBucket = await AWS.S3Express.DirectoryBucket("AdoptedDirectoryBucket", {
  LocationName: "eu-central-1",
  DataRedundancy: "HIGH",
  adopt: true
});
```

## Encrypted DirectoryBucket with Lifecycle Rules

Create a DirectoryBucket that includes both encryption and lifecycle management for better data security and compliance.

```ts
const secureDirectoryBucket = await AWS.S3Express.DirectoryBucket("SecureDirectoryBucket", {
  LocationName: "ap-south-1",
  DataRedundancy: "HIGH",
  BucketEncryption: {
    ServerSideEncryptionConfiguration: [
      {
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: "aws:kms",
          KMSMasterKeyID: "alias/my-key"
        }
      }
    ]
  },
  LifecycleConfiguration: {
    Rules: [
      {
        Status: "Enabled",
        ExpirationInDays: 90,
        Prefix: "temp/"
      }
    ]
  }
});
```