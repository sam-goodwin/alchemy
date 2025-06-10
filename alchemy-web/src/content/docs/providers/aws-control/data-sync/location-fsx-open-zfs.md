---
title: LocationFSxOpenZFS
description: Learn how to create, update, and manage AWS DataSync LocationFSxOpenZFSs using Alchemy Cloud Control.
---


The LocationFSxOpenZFS resource lets you create and manage [AWS DataSync LocationFSxOpenZFSs](https://docs.aws.amazon.com/datasync/latest/userguide/) for transferring data between on-premises storage and AWS.

## Minimal Example

Create a basic DataSync LocationFSxOpenZFS with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicLocation = await AWS.DataSync.LocationFSxOpenZFS("basicLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-01234567",
  Protocol: {
    Nfs: {
      MountOptions: {
        Version: "NFSv4"
      }
    }
  },
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data"
});
```

## Advanced Configuration

Configure a DataSync LocationFSxOpenZFS with multiple optional settings, including tags for resource management.

```ts
const advancedLocation = await AWS.DataSync.LocationFSxOpenZFS("advancedLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-01234567",
  Protocol: {
    Nfs: {
      MountOptions: {
        Version: "NFSv4"
      }
    }
  },
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data",
  Tags: [
    { Key: "Project", Value: "DataSyncDemo" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resources

Demonstrate how to adopt an existing DataSync LocationFSxOpenZFS if it already exists.

```ts
const adoptedLocation = await AWS.DataSync.LocationFSxOpenZFS("adoptedLocation", {
  FsxFilesystemArn: "arn:aws:fsx:us-west-2:123456789012:file-system/fs-01234567",
  Protocol: {
    Nfs: {
      MountOptions: {
        Version: "NFSv4"
      }
    }
  },
  SecurityGroupArns: [
    "arn:aws:ec2:us-west-2:123456789012:security-group/sg-0123456789abcdef0"
  ],
  Subdirectory: "/data",
  adopt: true // Adopt existing resource instead of failing
});
```
