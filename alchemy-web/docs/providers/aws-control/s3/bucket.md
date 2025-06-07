---
title: Managing AWS S3 Buckets with Alchemy
description: Learn how to create, update, and manage AWS S3 Buckets using Alchemy Cloud Control.
---

# Bucket

The Bucket resource allows you to manage [AWS S3 Buckets](https://docs.aws.amazon.com/s3/latest/userguide/) and their configuration settings, including encryption, versioning, and lifecycle management.

## Minimal Example

Create a basic S3 bucket with a specified name and default settings.

```ts
import AWS from "alchemy/aws/control";

const MyBucket = await AWS.S3.Bucket("MyUniqueBucketId", {
  BucketName: "my-unique-bucket-name"
});
```

## Enhanced Security with Bucket Encryption

Configure a bucket with server-side encryption for enhanced security.

```ts
const SecureBucket = await AWS.S3.Bucket("SecureBucketId", {
  BucketName: "my-secure-bucket",
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

## Lifecycle Management

Set up a bucket with a lifecycle configuration to automatically transition objects to different storage classes.

```ts
const LifecycleBucket = await AWS.S3.Bucket("LifecycleBucketId", {
  BucketName: "my-lifecycle-bucket",
  LifecycleConfiguration: {
    Rules: [
      {
        Status: "Enabled",
        ExpirationInDays: 30,
        Prefix: "logs/",
        NoncurrentVersionExpirationInDays: 7
      }
    ]
  }
});
```

## Website Hosting Configuration

Create a bucket configured to host a static website.

```ts
const WebsiteBucket = await AWS.S3.Bucket("WebsiteBucketId", {
  BucketName: "my-website-bucket",
  WebsiteConfiguration: {
    IndexDocument: "index.html",
    ErrorDocument: "error.html"
  }
});
```

## Tags for Resource Management

Add tags to categorize and manage your S3 bucket.

```ts
const TaggedBucket = await AWS.S3.Bucket("TaggedBucketId", {
  BucketName: "my-tagged-bucket",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```