---
title: FileSystem
description: Learn how to create, update, and manage AWS EFS FileSystems using Alchemy Cloud Control.
---


The FileSystem resource allows you to manage [AWS EFS FileSystems](https://docs.aws.amazon.com/efs/latest/userguide/) for scalable file storage in the AWS cloud.

## Minimal Example

Create a basic EFS FileSystem with default settings and encryption enabled.

```ts
import AWS from "alchemy/aws/control";

const efsFileSystem = await AWS.EFS.FileSystem("myFileSystem", {
  Encrypted: true,
  PerformanceMode: "generalPurpose", // Options: "generalPurpose", "maxIO"
  ThroughputMode: "bursting", // Options: "bursting", "provisioned"
  ProvisionedThroughputInMibps: 1024 // Optional: Only for provisioned mode
});
```

## Advanced Configuration

Set up a FileSystem with a custom KMS key for encryption, lifecycle policies, and a backup policy.

```ts
const advancedEfsFileSystem = await AWS.EFS.FileSystem("advancedFileSystem", {
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrst",
  Encrypted: true,
  LifecyclePolicies: [{
    TransitionToIa: "AFTER_30_DAYS" // Transition files to Infrequent Access after 30 days
  }],
  BackupPolicy: {
    Status: "ENABLED" // Enable backup for the FileSystem
  }
});
```

## Adding Tags

Create an EFS FileSystem with custom tags for better resource management.

```ts
const taggedEfsFileSystem = await AWS.EFS.FileSystem("taggedFileSystem", {
  FileSystemTags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "AlchemyDemo" }
  ]
});
```

## Replication Configuration

Set up a FileSystem with a replication configuration for better durability.

```ts
const replicatedEfsFileSystem = await AWS.EFS.FileSystem("replicatedFileSystem", {
  ReplicationConfiguration: {
    Region: "us-west-2", // Target region for replication
    RoleArn: "arn:aws:iam::123456789012:role/EFSReplicationRole" // Role with permissions for replication
  }
});
```
