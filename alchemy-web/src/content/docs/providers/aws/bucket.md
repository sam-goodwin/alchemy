---
title: Bucket
description: Learn how to create, configure, and manage AWS S3 Buckets using Alchemy for object storage in your cloud applications.
---


The Bucket resource lets you create and manage [Amazon S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) for object storage.

## Minimal Example

Create a basic S3 bucket with default settings:

```ts
import { Bucket } from "alchemy/aws";

const bucket = await Bucket("storage", {
  bucketName: "my-app-storage",
  tags: {
    Environment: "production"
  }
});
```

## Bucket with Versioning

Create a bucket with versioning enabled for change tracking:

```ts
import { Bucket } from "alchemy/aws";

const versionedBucket = await Bucket("document-archive", {
  bucketName: "document-archive",
  tags: {
    Environment: "production",
    Purpose: "document-storage",
    Versioning: "enabled"
  }
});
```

## Development Bucket

Create a temporary bucket for development/testing:

```ts
import { Bucket } from "alchemy/aws";

const devBucket = await Bucket("dev-testing", {
  bucketName: "dev-testing",
  tags: {
    Environment: "development",
    Temporary: "true"
  }
});
```
