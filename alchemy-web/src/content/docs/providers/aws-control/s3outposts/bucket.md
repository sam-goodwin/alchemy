---
title: Bucket
description: Learn how to create, update, and manage AWS S3Outposts Buckets using Alchemy Cloud Control.
---


The Bucket resource lets you manage [AWS S3Outposts Buckets](https://docs.aws.amazon.com/s3outposts/latest/userguide/) for storing data on AWS Outposts. This resource allows you to create and configure buckets for your applications running on the Outpost infrastructure.

## Minimal Example

Create a basic S3Outposts bucket with required properties.

```ts
import AWS from "alchemy/aws/control";

const s3OutpostsBucket = await AWS.S3Outposts.Bucket("myOutpostsBucket", {
  OutpostId: "op-1234567890abcdef0",
  BucketName: "my-s3outposts-bucket",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Alchemy" }
  ]
});
```

## Advanced Configuration

Configure a bucket with lifecycle management policies to automatically delete objects after a certain period.

```ts
import AWS from "alchemy/aws/control";

const lifecycleConfiguration = {
  Rules: [
    {
      Status: "Enabled",
      Expiration: {
        Days: 365
      },
      NoncurrentVersionExpiration: {
        NoncurrentDays: 30
      },
      Prefix: "logs/"
    }
  ]
};

const advancedS3OutpostsBucket = await AWS.S3Outposts.Bucket("advancedOutpostsBucket", {
  OutpostId: "op-1234567890abcdef0",
  BucketName: "my-advanced-s3outposts-bucket",
  LifecycleConfiguration: lifecycleConfiguration,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Alchemy" }
  ]
});
```

## Example with Adoption

Create a bucket while adopting an existing resource if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptedS3OutpostsBucket = await AWS.S3Outposts.Bucket("adoptedOutpostsBucket", {
  OutpostId: "op-1234567890abcdef0",
  BucketName: "my-adopted-s3outposts-bucket",
  adopt: true
});
```

## Example with Tags

Create a bucket specifically for storing temporary files and add relevant tags.

```ts
import AWS from "alchemy/aws/control";

const tempFilesBucket = await AWS.S3Outposts.Bucket("tempFilesOutpostsBucket", {
  OutpostId: "op-1234567890abcdef0",
  BucketName: "my-temp-files-s3outposts-bucket",
  Tags: [
    { Key: "Type", Value: "Temporary" },
    { Key: "Owner", Value: "Team Alpha" }
  ]
});
```
