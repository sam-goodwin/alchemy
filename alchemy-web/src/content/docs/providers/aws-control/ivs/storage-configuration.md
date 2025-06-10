---
title: StorageConfiguration
description: Learn how to create, update, and manage AWS IVS StorageConfigurations using Alchemy Cloud Control.
---


The StorageConfiguration resource lets you manage [AWS IVS StorageConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) for storing video stream data in S3.

## Minimal Example

Create a basic StorageConfiguration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const storageConfig = await AWS.IVS.StorageConfiguration("basicStorageConfig", {
  S3: {
    bucketName: "my-video-storage-bucket",
    roleArn: "arn:aws:iam::123456789012:role/MyIVSRole"
  },
  Name: "MyBasicStorageConfig"
});
```

## Advanced Configuration

Configure a StorageConfiguration with additional options such as tags.

```ts
const advancedStorageConfig = await AWS.IVS.StorageConfiguration("advancedStorageConfig", {
  S3: {
    bucketName: "my-advanced-video-bucket",
    roleArn: "arn:aws:iam::123456789012:role/MyIVSAdvancedRole"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "IVS" }
  ],
  Name: "MyAdvancedStorageConfig"
});
```

## Adoption of Existing Resource

Adopt an existing StorageConfiguration instead of failing if it already exists.

```ts
const adoptedStorageConfig = await AWS.IVS.StorageConfiguration("adoptedStorageConfig", {
  S3: {
    bucketName: "my-existing-video-bucket",
    roleArn: "arn:aws:iam::123456789012:role/MyIVSAdoptRole"
  },
  adopt: true
});
```

## Example with Tags and Custom Names

Create a StorageConfiguration with specific tags and a custom name.

```ts
const taggedStorageConfig = await AWS.IVS.StorageConfiguration("taggedStorageConfig", {
  S3: {
    bucketName: "my-tagged-video-bucket",
    roleArn: "arn:aws:iam::123456789012:role/MyIVSTaggedRole"
  },
  Tags: [
    { Key: "Department", Value: "Media" },
    { Key: "Compliance", Value: "GDPR" }
  ],
  Name: "MyTaggedStorageConfig"
});
```
