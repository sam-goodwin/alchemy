---
title: StorageProfile
description: Learn how to create, update, and manage AWS Deadline StorageProfiles using Alchemy Cloud Control.
---


The StorageProfile resource lets you manage [AWS Deadline StorageProfiles](https://docs.aws.amazon.com/deadline/latest/userguide/) to define storage configurations for your rendering jobs.

## Minimal Example

Create a basic StorageProfile with required properties and one optional FileSystemLocation.

```ts
import AWS from "alchemy/aws/control";

const basicStorageProfile = await AWS.Deadline.StorageProfile("basicStorageProfile", {
  DisplayName: "Basic Storage Profile",
  FarmId: "default-farm",
  OsFamily: "Windows",
  FileSystemLocations: [{
    Path: "//myserver/myshare",
    Type: "Nfs"
  }]
});
```

## Advanced Configuration

Configure a StorageProfile with multiple FileSystemLocations to support different storage needs.

```ts
const advancedStorageProfile = await AWS.Deadline.StorageProfile("advancedStorageProfile", {
  DisplayName: "Advanced Storage Profile",
  FarmId: "render-farm-01",
  OsFamily: "Linux",
  FileSystemLocations: [
    {
      Path: "//nfs-server/path/to/storage",
      Type: "Nfs"
    },
    {
      Path: "s3://my-bucket/render-jobs",
      Type: "S3"
    }
  ]
});
```

## Adoption of Existing Resource

Create or adopt an existing StorageProfile without failing if it already exists.

```ts
const adoptedStorageProfile = await AWS.Deadline.StorageProfile("adoptedStorageProfile", {
  DisplayName: "Adopted Storage Profile",
  FarmId: "existing-farm",
  OsFamily: "Linux",
  adopt: true
});
```
