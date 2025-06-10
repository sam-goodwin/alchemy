---
title: FileSystem
description: Learn how to create, update, and manage AWS FSx FileSystems using Alchemy Cloud Control.
---


The FileSystem resource lets you manage [AWS FSx FileSystems](https://docs.aws.amazon.com/fsx/latest/userguide/) for your applications, providing fully managed file storage solutions that can be accessed via common file protocols.

## Minimal Example

Create a basic FSx FileSystem with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const fsxFileSystem = await AWS.FSx.FileSystem("myFsxFileSystem", {
  FileSystemType: "LUSTRE",
  StorageCapacity: 1200, // Storage capacity in GiB
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Advanced Configuration

Configure a FileSystem with additional advanced settings, such as KMS key and Lustre configuration.

```ts
const advancedFsxFileSystem = await AWS.FSx.FileSystem("advancedFsxFileSystem", {
  FileSystemType: "LUSTRE",
  StorageCapacity: 2400,
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd-1234-efgh-5678-ijkl",
  LustreConfiguration: {
    DeploymentType: "PERSISTENT_1",
    PerUnitStorageThroughput: 200, // MiB/s
  },
  Tags: [{ Key: "Project", Value: "AI-Model" }]
});
```

## Using Windows Configuration

Create an FSx FileSystem with Windows configuration settings.

```ts
const windowsFsxFileSystem = await AWS.FSx.FileSystem("windowsFsxFileSystem", {
  FileSystemType: "WINDOWS",
  StorageCapacity: 3000,
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  WindowsConfiguration: {
    ActiveDirectoryId: "d-1234567890",
    ThroughputCapacity: 1024,
    WeeklyMaintenanceStartTime: "1:00:00",
  },
  Tags: [{ Key: "Department", Value: "Finance" }]
});
```

## OpenZFS Configuration

Deploy an FSx FileSystem with OpenZFS configuration.

```ts
const openZfsFsxFileSystem = await AWS.FSx.FileSystem("openZfsFsxFileSystem", {
  FileSystemType: "OPENZFS",
  StorageCapacity: 500,
  SubnetIds: ["subnet-0abcd1234efgh5678"],
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  OpenZFSConfiguration: {
    RootVolume: {
      Name: "rootVolume",
      Quota: 400, // in GiB
      RecordSize: 128 // in KiB
    },
    UserAndGroupQuotas: [
      {
        UserId: "1001",
        Quota: 100 // in GiB
      }
    ]
  },
  Tags: [{ Key: "Application", Value: "WebService" }]
});
```
