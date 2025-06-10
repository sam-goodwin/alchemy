---
title: ReplicationInstance
description: Learn how to create, update, and manage AWS DMS ReplicationInstances using Alchemy Cloud Control.
---


The ReplicationInstance resource allows you to create and manage [AWS DMS ReplicationInstances](https://docs.aws.amazon.com/dms/latest/userguide/) that facilitate data replication across different data sources. This resource is essential for setting up data migration tasks and ensuring efficient data flow between databases.

## Minimal Example

Create a basic DMS ReplicationInstance with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const replicationInstance = await AWS.DMS.ReplicationInstance("myReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 100,
  DnsNameServers: "8.8.8.8,8.8.4.4" // Optional: Custom DNS name servers
});
```

## Advanced Configuration

Configure a DMS ReplicationInstance with additional options such as maintenance window and multi-AZ deployment.

```ts
const advancedReplicationInstance = await AWS.DMS.ReplicationInstance("myAdvancedReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.xlarge",
  AllocatedStorage: 200,
  MultiAZ: true, // Enable Multi-AZ for high availability
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00", // Set maintenance window
  EngineVersion: "3.4.6", // Specify engine version
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataMigration" }
  ]
});
```

## Public Access Configuration

Create a DMS ReplicationInstance that is publicly accessible.

```ts
const publicReplicationInstance = await AWS.DMS.ReplicationInstance("myPublicReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 150,
  PubliclyAccessible: true, // Make the replication instance publicly accessible
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"], // Security group for access control
  ReplicationSubnetGroupIdentifier: "myReplicationSubnetGroup" // Subnet group for VPC
});
```

## Encryption with KMS

Set up a DMS ReplicationInstance with KMS encryption for enhanced security.

```ts
const encryptedReplicationInstance = await AWS.DMS.ReplicationInstance("myEncryptedReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 100,
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key-id", // KMS key for encryption
  AllowMajorVersionUpgrade: true, // Allow major version upgrades
  AutoMinorVersionUpgrade: true // Automatically upgrade minor versions
});
```
