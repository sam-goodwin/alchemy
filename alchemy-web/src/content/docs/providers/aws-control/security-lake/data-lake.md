---
title: DataLake
description: Learn how to create, update, and manage AWS SecurityLake DataLakes using Alchemy Cloud Control.
---


The DataLake resource lets you manage [AWS SecurityLake DataLakes](https://docs.aws.amazon.com/securitylake/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DataLake with required properties and a few optional configurations.

```ts
import AWS from "alchemy/aws/control";

const securityLake = await AWS.SecurityLake.DataLake("myDataLake", {
  EncryptionConfiguration: {
    EncryptionEnabled: true,
    EncryptionType: "SSE-KMS",
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-12ab-34cd-56ef-1234567890ab"
  },
  LifecycleConfiguration: {
    ExpirationInDays: 30
  },
  MetaStoreManagerRoleArn: "arn:aws:iam::123456789012:role/MyMetaStoreManagerRole"
});
```

## Advanced Configuration

Configure a DataLake with advanced replication and lifecycle settings.

```ts
const advancedDataLake = await AWS.SecurityLake.DataLake("advancedDataLake", {
  EncryptionConfiguration: {
    EncryptionEnabled: true,
    EncryptionType: "SSE-S3"
  },
  LifecycleConfiguration: {
    ExpirationInDays: 60,
    TransitionToGlacier: {
      Days: 30
    }
  },
  ReplicationConfiguration: {
    RoleArn: "arn:aws:iam::123456789012:role/MyReplicationRole",
    Regions: ["us-east-1", "us-west-1"]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "SecurityLake" }
  ]
});
```

## Resource Adoption

If you want to adopt an existing DataLake instead of failing when it already exists, set the `adopt` property to true.

```ts
const adoptedDataLake = await AWS.SecurityLake.DataLake("existingDataLake", {
  adopt: true,
  MetaStoreManagerRoleArn: "arn:aws:iam::123456789012:role/MyExistingRole"
});
```
