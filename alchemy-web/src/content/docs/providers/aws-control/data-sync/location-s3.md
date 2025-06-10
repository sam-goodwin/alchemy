---
title: LocationS3
description: Learn how to create, update, and manage AWS DataSync LocationS3s using Alchemy Cloud Control.
---


The LocationS3 resource allows you to manage [AWS DataSync LocationS3s](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data to and from Amazon S3 buckets securely and efficiently.

## Minimal Example

Create a basic S3 location with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const s3Location = await AWS.DataSync.LocationS3("myS3Location", {
  S3Config: {
    BucketArn: "arn:aws:s3:::my-data-bucket",
    // Other S3 configuration properties can be added here
  },
  S3StorageClass: "STANDARD",
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a LocationS3 with additional properties for more complex setups, such as specifying a subdirectory in the S3 bucket.

```ts
const advancedS3Location = await AWS.DataSync.LocationS3("advancedS3Location", {
  S3Config: {
    BucketArn: "arn:aws:s3:::my-data-bucket",
    // Additional S3 configuration properties
  },
  S3StorageClass: "GLACIER",
  Subdirectory: "/data/uploads",
  Tags: [{
    Key: "Project",
    Value: "DataSyncDemo"
  }]
});
```

## Example with Existing Resource Adoption

Create a LocationS3 resource that adopts an existing S3 bucket if it already exists.

```ts
const adoptS3Location = await AWS.DataSync.LocationS3("adoptS3Location", {
  S3Config: {
    BucketArn: "arn:aws:s3:::existing-data-bucket",
    // Additional configurations can be provided
  },
  S3StorageClass: "INTELLIGENT_TIERING",
  adopt: true,
  Tags: [{
    Key: "Status",
    Value: "Adopted"
  }]
});
```
