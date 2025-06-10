---
title: MountTarget
description: Learn how to create, update, and manage AWS EFS MountTargets using Alchemy Cloud Control.
---


The MountTarget resource lets you manage [AWS EFS MountTargets](https://docs.aws.amazon.com/efs/latest/userguide/) for your Elastic File System (EFS). A mount target is an entry point that allows clients to access the filesystem.

## Minimal Example

Create a basic mount target for an EFS filesystem with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicMountTarget = await AWS.EFS.MountTarget("basicMountTarget", {
  SecurityGroups: ["sg-0123456789abcdef0"],
  FileSystemId: "fs-01234567",
  SubnetId: "subnet-0123456789abcdef0"
});
```

## Advanced Configuration

Configure a mount target with an optional IP address and multiple security groups:

```ts
const advancedMountTarget = await AWS.EFS.MountTarget("advancedMountTarget", {
  SecurityGroups: ["sg-0123456789abcdef0", "sg-0fedcba9876543210"],
  FileSystemId: "fs-01234567",
  IpAddress: "192.168.1.10",
  SubnetId: "subnet-0123456789abcdef0"
});
```

## Adopt Existing Resource

Create a mount target that adopts an existing resource instead of failing if it already exists:

```ts
const adoptMountTarget = await AWS.EFS.MountTarget("adoptMountTarget", {
  SecurityGroups: ["sg-0123456789abcdef0"],
  FileSystemId: "fs-01234567",
  SubnetId: "subnet-0123456789abcdef0",
  adopt: true // This will adopt the resource if it exists
});
```

## Using Multiple Mount Targets

Create multiple mount targets for high availability across different subnets:

```ts
const mountTarget1 = await AWS.EFS.MountTarget("mountTarget1", {
  SecurityGroups: ["sg-0123456789abcdef0"],
  FileSystemId: "fs-01234567",
  SubnetId: "subnet-0123456789abcdef0"
});

const mountTarget2 = await AWS.EFS.MountTarget("mountTarget2", {
  SecurityGroups: ["sg-0123456789abcdef0"],
  FileSystemId: "fs-01234567",
  SubnetId: "subnet-0fedcba9876543210"
});
```
