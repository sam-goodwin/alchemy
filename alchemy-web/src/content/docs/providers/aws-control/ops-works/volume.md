---
title: Volume
description: Learn how to create, update, and manage AWS OpsWorks Volumes using Alchemy Cloud Control.
---


The Volume resource lets you manage [AWS OpsWorks Volumes](https://docs.aws.amazon.com/opsworks/latest/userguide/) for your applications, providing persistent storage options for your instances.

## Minimal Example

Create a basic OpsWorks Volume with required properties and a mount point.

```ts
import AWS from "alchemy/aws/control";

const volume = await AWS.OpsWorks.Volume("myVolume", {
  Ec2VolumeId: "vol-0abcdef1234567890",
  MountPoint: "/mnt/mydata",
  StackId: "stack-0abcdef1234567890"
});
```

## Advanced Configuration

Configure an OpsWorks Volume with additional options such as a name.

```ts
const advancedVolume = await AWS.OpsWorks.Volume("advancedVolume", {
  Ec2VolumeId: "vol-0abcdef0987654321",
  MountPoint: "/mnt/advanceddata",
  Name: "AdvancedVolume",
  StackId: "stack-1abcdef1234567890"
});
```

## Adoption of Existing Resources

Use the `adopt` property to adopt an existing volume instead of failing if it already exists.

```ts
const adoptedVolume = await AWS.OpsWorks.Volume("adoptedVolume", {
  Ec2VolumeId: "vol-0abcdef2345678901",
  MountPoint: "/mnt/adopteddata",
  StackId: "stack-2abcdef1234567890",
  adopt: true
});
```

## Updating Volume Properties

Demonstrate how to update an existing volume's properties.

```ts
const updatedVolume = await AWS.OpsWorks.Volume("updatedVolume", {
  Ec2VolumeId: "vol-0abcdef3456789012",
  MountPoint: "/mnt/updateddata",
  Name: "UpdatedVolume",
  StackId: "stack-3abcdef1234567890"
});
```
