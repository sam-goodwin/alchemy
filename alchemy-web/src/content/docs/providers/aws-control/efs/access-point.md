---
title: AccessPoint
description: Learn how to create, update, and manage AWS EFS AccessPoints using Alchemy Cloud Control.
---


The AccessPoint resource allows you to manage [AWS EFS AccessPoints](https://docs.aws.amazon.com/efs/latest/userguide/) that simplify the management of file system permissions and access for your applications.

## Minimal Example

Create a basic EFS AccessPoint with required properties and one optional root directory.

```ts
import AWS from "alchemy/aws/control";

const basicAccessPoint = await AWS.EFS.AccessPoint("basicAccessPoint", {
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

Configure an AccessPoint with advanced settings like POSIX user and tags.

```ts
const advancedAccessPoint = await AWS.EFS.AccessPoint("advancedAccessPoint", {
  FileSystemId: "fs-12345678",
  PosixUser: {
    Gid: "1001",
    Uid: "1001",
    SecondaryGid: ["1002"]
  },
  AccessPointTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

Demonstrate how to adopt an existing EFS AccessPoint if it already exists.

```ts
const adoptExistingAccessPoint = await AWS.EFS.AccessPoint("existingAccessPoint", {
  FileSystemId: "fs-12345678",
  adopt: true
});
```

## Client Token Usage

Create an AccessPoint while using a client token for idempotency.

```ts
const accessPointWithClientToken = await AWS.EFS.AccessPoint("clientTokenAccessPoint", {
  FileSystemId: "fs-12345678",
  ClientToken: "unique-client-token-12345"
});
```
