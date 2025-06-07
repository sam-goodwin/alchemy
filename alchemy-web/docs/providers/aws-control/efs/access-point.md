---
title: Managing AWS EFS AccessPoints with Alchemy
description: Learn how to create, update, and manage AWS EFS AccessPoints using Alchemy Cloud Control.
---

# AccessPoint

The AccessPoint resource lets you manage [AWS EFS AccessPoints](https://docs.aws.amazon.com/efs/latest/userguide/) which provide applications with a specific entry point to an Amazon EFS file system.

## Minimal Example

Create a basic EFS AccessPoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicAccessPoint = await AWS.EFS.AccessPoint("BasicAccessPoint", {
  FileSystemId: "fs-12345678",
  RootDirectory: {
    Path: "/data",
    CreationInfo: {
      OwnerUid: "1001",
      OwnerGid: "1001",
      Permissions: "750"
    }
  }
});
```

## Advanced Configuration

Configure an AccessPoint with additional settings such as client token and POSIX user.

```ts
const AdvancedAccessPoint = await AWS.EFS.AccessPoint("AdvancedAccessPoint", {
  FileSystemId: "fs-87654321",
  RootDirectory: {
    Path: "/app",
    CreationInfo: {
      OwnerUid: "1000",
      OwnerGid: "1000",
      Permissions: "750"
    }
  },
  ClientToken: "unique-client-token-123",
  PosixUser: {
    Gid: "1000",
    Uid: "1000",
    SecondaryGids: ["1001", "1002"]
  }
});
```

## Custom Tags

Create an AccessPoint with custom tags to manage resources effectively.

```ts
const TaggedAccessPoint = await AWS.EFS.AccessPoint("TaggedAccessPoint", {
  FileSystemId: "fs-11223344",
  RootDirectory: {
    Path: "/uploads",
    CreationInfo: {
      OwnerUid: "1002",
      OwnerGid: "1002",
      Permissions: "755"
    }
  },
  AccessPointTags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```