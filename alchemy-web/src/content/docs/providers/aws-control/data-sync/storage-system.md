---
title: StorageSystem
description: Learn how to create, update, and manage AWS DataSync StorageSystems using Alchemy Cloud Control.
---


The StorageSystem resource lets you manage [AWS DataSync StorageSystems](https://docs.aws.amazon.com/datasync/latest/userguide/) which enable you to automate the transfer of data between on-premises storage and AWS storage services.

## Minimal Example

Create a basic StorageSystem with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicStorageSystem = await AWS.DataSync.StorageSystem("basic-storage-system", {
  serverConfiguration: {
    // Configuration details depending on the system type
    type: "NFS",
    serverHostname: "nfs-server.example.com",
    subdirectory: "/data"
  },
  systemType: "NFS",
  agentArns: [
    "arn:aws:datasync:us-west-2:123456789012:agent/agent-id"
  ],
  cloudWatchLogGroupArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group"
});
```

## Advanced Configuration

Configure a StorageSystem with server credentials and tags for better organization:

```ts
const advancedStorageSystem = await AWS.DataSync.StorageSystem("advanced-storage-system", {
  serverConfiguration: {
    type: "S3",
    serverHostname: "s3-bucket.example.com",
    subdirectory: "/data"
  },
  systemType: "S3",
  agentArns: [
    "arn:aws:datasync:us-west-2:123456789012:agent/agent-id"
  ],
  serverCredentials: {
    // Use IAM role for better security
    secretAccessKey: alchemy.secret(process.env.S3_SECRET_ACCESS_KEY!),
    accessKeyId: alchemy.secret(process.env.S3_ACCESS_KEY_ID!)
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "DataSyncMigration" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing StorageSystem instead of failing if it already exists:

```ts
const adoptExistingStorageSystem = await AWS.DataSync.StorageSystem("adopt-storage-system", {
  serverConfiguration: {
    type: "EFS",
    serverHostname: "efs-server.example.com",
    subdirectory: "/data"
  },
  systemType: "EFS",
  agentArns: [
    "arn:aws:datasync:us-west-2:123456789012:agent/agent-id"
  ],
  adopt: true // Adopt existing resource
});
```
