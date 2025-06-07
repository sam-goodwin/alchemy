---
title: Managing AWS ElastiCache ReplicationGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache ReplicationGroups using Alchemy Cloud Control.
---

# ReplicationGroup

The ReplicationGroup resource allows you to manage [AWS ElastiCache ReplicationGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for enhanced data availability and fault tolerance across multiple cache nodes.

## Minimal Example

Create a basic ElastiCache ReplicationGroup with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicReplicationGroup = await AWS.ElastiCache.ReplicationGroup("BasicReplicationGroup", {
  ReplicationGroupDescription: "My basic ElastiCache Replication Group",
  ReplicationGroupId: "basic-replication-group-01",
  NumCacheClusters: 2,
  CacheNodeType: "cache.t3.micro",
  Engine: "redis",
  AutomaticFailoverEnabled: true,
  AtRestEncryptionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "Demo" }
  ]
});
```

## Advanced Configuration

Configure a ReplicationGroup with advanced settings including multi-AZ support, data tiering, and specific maintenance windows.

```ts
const advancedReplicationGroup = await AWS.ElastiCache.ReplicationGroup("AdvancedReplicationGroup", {
  ReplicationGroupDescription: "My advanced ElastiCache Replication Group",
  ReplicationGroupId: "advanced-replication-group-01",
  NumNodeGroups: 2,
  ReplicasPerNodeGroup: 2,
  CacheNodeType: "cache.r5.large",
  Engine: "redis",
  MultiAZEnabled: true,
  DataTieringEnabled: true,
  PreferredMaintenanceWindow: "sun:23:00-mon:01:00",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Security Features

Setup a ReplicationGroup with enhanced security features including transit encryption and IAM authentication.

```ts
const secureReplicationGroup = await AWS.ElastiCache.ReplicationGroup("SecureReplicationGroup", {
  ReplicationGroupDescription: "My secure ElastiCache Replication Group",
  ReplicationGroupId: "secure-replication-group-01",
  NumCacheClusters: 3,
  CacheNodeType: "cache.m5.large",
  Engine: "redis",
  TransitEncryptionEnabled: true,
  AuthToken: "mySecureAuthToken123",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Compliance", Value: "GDPR" }
  ]
});
```

## Snapshot Management

Create a ReplicationGroup with snapshot settings to manage backups effectively.

```ts
const snapshotReplicationGroup = await AWS.ElastiCache.ReplicationGroup("SnapshotReplicationGroup", {
  ReplicationGroupDescription: "My snapshot capable ElastiCache Replication Group",
  ReplicationGroupId: "snapshot-replication-group-01",
  NumCacheClusters: 2,
  CacheNodeType: "cache.t3.medium",
  Engine: "redis",
  SnapshotRetentionLimit: 5,
  SnapshotWindow: "05:00-06:00",
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Backup", Value: "Enabled" }
  ]
});
```