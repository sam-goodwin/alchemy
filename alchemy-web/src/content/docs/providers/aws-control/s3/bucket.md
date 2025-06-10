---
title: Bucket
description: Learn how to create, update, and manage AWS S3 Buckets using Alchemy Cloud Control.
---


The Bucket resource lets you manage [AWS S3 Buckets](https://docs.aws.amazon.com/s3/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic S3 bucket with a specified name and versioning enabled.

```ts
import AWS from "alchemy/aws/control";

const myBucket = await AWS.S3.Bucket("myUniqueBucketId", {
  BucketName: "my-unique-bucket-name",
  VersioningConfiguration: {
    Status: "Enabled"
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Alchemy" }
  ]
});
```

## Advanced Configuration

Configure an S3 bucket with encryption, lifecycle policies, and notification settings.

```ts
const advancedBucket = await AWS.S3.Bucket("advancedBucketId", {
  BucketName: "advanced-bucket-name",
  BucketEncryption: {
    ServerSideEncryptionConfiguration: [
      {
        ServerSideEncryptionByDefault: {
          SSEAlgorithm: "AES256"
        }
      }
    ]
  },
  LifecycleConfiguration: {
    Rules: [
      {
        Status: "Enabled",
        ExpirationInDays: 365,
        Prefix: "logs/",
        Transitions: [
          {
            TransitionInDays: 30,
            StorageClass: "GLACIER"
          }
        ]
      }
    ]
  },
  NotificationConfiguration: {
    LambdaConfigurations: [
      {
        Events: ["s3:ObjectCreated:*"],
        Function: "arn:aws:lambda:us-east-1:123456789012:function:myLambdaFunction",
        Filter: {
          Key: {
            FilterRules: [
              {
                Name: "prefix",
                Value: "uploads/"
              }
            ]
          }
        }
      }
    ]
  }
});
```

## Static Website Hosting

Set up an S3 bucket for static website hosting with custom error and index documents.

```ts
const websiteBucket = await AWS.S3.Bucket("websiteBucketId", {
  BucketName: "my-website-bucket",
  WebsiteConfiguration: {
    IndexDocument: "index.html",
    ErrorDocument: "error.html"
  }
});
```

## Cross-Origin Resource Sharing (CORS)

Configure CORS settings for an S3 bucket to allow specific origins.

```ts
const corsBucket = await AWS.S3.Bucket("corsBucketId", {
  BucketName: "my-cors-bucket",
  CorsConfiguration: {
    CorsRules: [
      {
        AllowedOrigins: ["https://example.com"],
        AllowedMethods: ["GET", "POST"],
        AllowedHeaders: ["*"],
        MaxAgeSeconds: 3000
      }
    ]
  }
});
```
