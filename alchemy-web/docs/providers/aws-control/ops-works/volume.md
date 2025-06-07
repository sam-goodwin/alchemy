---
title: Managing AWS OpsWorks Volumes with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks Volumes using Alchemy Cloud Control.
---

# Volume

The Volume resource allows you to manage [AWS OpsWorks Volumes](https://docs.aws.amazon.com/opsworks/latest/userguide/) that can be attached to instances in your OpsWorks stacks.

## Minimal Example

Create a basic OpsWorks Volume with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicVolume = await AWS.OpsWorks.Volume("BasicVolume", {
  Ec2VolumeId: "vol-1234567890abcdef0",
  MountPoint: "/mnt/data",
  StackId: "stack-abc123"
});
```

## Advanced Configuration

Configure a volume with additional settings such as a name.

```ts
const advancedVolume = await AWS.OpsWorks.Volume("AdvancedVolume", {
  Ec2VolumeId: "vol-0987654321fedcba0",
  MountPoint: "/mnt/app-data",
  Name: "AppDataVolume",
  StackId: "stack-abc123"
});
```

## Adoption of Existing Resources

If you want to adopt an existing volume instead of failing when it already exists, you can set the `adopt` property to true.

```ts
const existingVolume = await AWS.OpsWorks.Volume("ExistingVolume", {
  Ec2VolumeId: "vol-1122334455667788",
  MountPoint: "/mnt/existing-data",
  StackId: "stack-abc123",
  adopt: true
});
```