---
title: Managing AWS DMS ReplicationInstances with Alchemy
description: Learn how to create, update, and manage AWS DMS ReplicationInstances using Alchemy Cloud Control.
---

# ReplicationInstance

The ReplicationInstance resource lets you create and manage [AWS DMS ReplicationInstances](https://docs.aws.amazon.com/dms/latest/userguide/), which are used to facilitate data migrations between various databases.

## Minimal Example

Create a basic DMS ReplicationInstance with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicReplicationInstance = await AWS.DMS.ReplicationInstance("BasicReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 100,
  ReplicationInstanceIdentifier: "basic-replication-instance",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataMigration" }
  ]
});
```

## Advanced Configuration

Configure a DMS ReplicationInstance with additional settings such as KMS key, Multi-AZ configuration, and maintenance window.

```ts
const AdvancedReplicationInstance = await AWS.DMS.ReplicationInstance("AdvancedReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.2xlarge",
  AllocatedStorage: 200,
  ReplicationInstanceIdentifier: "advanced-replication-instance",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-efgh-5678-ijkl-9012mnopqrst",
  MultiAZ: true,
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataMigration" }
  ]
});
```

## Network Configuration

Set up a DMS ReplicationInstance within a specific VPC and subnet group, allowing public access.

```ts
const NetworkedReplicationInstance = await AWS.DMS.ReplicationInstance("NetworkedReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 100,
  ReplicationInstanceIdentifier: "networked-replication-instance",
  ReplicationSubnetGroupIdentifier: "my-subnet-group",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  PubliclyAccessible: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataMigration" }
  ]
});
```

## Custom Maintenance Configuration

Create a ReplicationInstance that auto-upgrades minor versions and has a specific maintenance window.

```ts
const MaintenanceConfiguredReplicationInstance = await AWS.DMS.ReplicationInstance("MaintenanceConfiguredReplicationInstance", {
  ReplicationInstanceClass: "dms.r5.large",
  AllocatedStorage: 150,
  ReplicationInstanceIdentifier: "maintenance-configured-instance",
  AutoMinorVersionUpgrade: true,
  PreferredMaintenanceWindow: "mon:03:00-mon:04:00",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "DataMigration" }
  ]
});
```