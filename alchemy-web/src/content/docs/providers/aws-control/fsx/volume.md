---
title: Volume
description: Learn how to create, update, and manage AWS FSx Volumes using Alchemy Cloud Control.
---


The Volume resource lets you manage [AWS FSx Volumes](https://docs.aws.amazon.com/fsx/latest/userguide/) for file storage solutions, allowing you to create, configure, and manage scalable file systems.

## Minimal Example

Create a basic FSx Volume with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicVolume = await AWS.FSx.Volume("basicVolume", {
  name: "my-basic-volume",
  volumeType: "FRONTEND",
  openZFSConfiguration: {
    userAndGroupQuotas: [
      {
        userId: "1001",
        quota: 1000000000 // Set a quota for the user
      }
    ],
    volumeQuota: 5000000000 // Set a quota for the volume
  }
});
```

## Advanced Configuration

Configure a volume with additional settings such as tags and backup options:

```ts
const advancedVolume = await AWS.FSx.Volume("advancedVolume", {
  name: "my-advanced-volume",
  volumeType: "FRONTEND",
  backupId: "backup-123456",
  tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "ProjectX"
    }
  ],
  ontapConfiguration: {
    storageEfficiencyEnabled: true,
    snapshotPolicy: "daily"
  }
});
```

## Adopting Existing Resources

Use the adopt option to manage an existing FSx Volume without failure:

```ts
const existingVolume = await AWS.FSx.Volume("existingVolume", {
  name: "my-existing-volume",
  adopt: true // This will adopt the existing resource instead of failing
});
```

## Custom Configuration with OpenZFS

Create a volume with a custom OpenZFS configuration:

```ts
const customOpenZFSVolume = await AWS.FSx.Volume("customOpenZFSVolume", {
  name: "my-custom-zfs-volume",
  volumeType: "OPENZFS",
  openZFSConfiguration: {
    userAndGroupQuotas: [
      {
        userId: "1002",
        quota: 2000000000 // Set a quota for the user
      }
    ],
    volumeQuota: 10000000000 // Set a quota for the volume
  },
  tags: [
    {
      Key: "Type",
      Value: "ZFS"
    }
  ]
});
```
