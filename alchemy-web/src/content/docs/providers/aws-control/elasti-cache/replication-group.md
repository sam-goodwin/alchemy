---
title: ReplicationGroup
description: Learn how to create, update, and manage AWS ElastiCache ReplicationGroups using Alchemy Cloud Control.
---


The ReplicationGroup resource allows you to manage [AWS ElastiCache ReplicationGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) for high availability and fault tolerance in your caching layers.

## Minimal Example

Create a basic ReplicationGroup with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicReplicationGroup = await AWS.ElastiCache.ReplicationGroup("basicReplicationGroup", {
  ReplicationGroupDescription: "Basic replication group for caching",
  ReplicationGroupId: "basic-replication-group",
  CacheNodeType: "cache.t2.micro",
  Engine: "redis",
  NumCacheClusters: 2,
  AutomaticFailoverEnabled: true
});
```

## Advanced Configuration

Configure a ReplicationGroup with advanced settings such as encryption and preferred maintenance windows.

```ts
const advancedReplicationGroup = await AWS.ElastiCache.ReplicationGroup("advancedReplicationGroup", {
  ReplicationGroupDescription: "Advanced replication group with encryption",
  ReplicationGroupId: "advanced-replication-group",
  CacheNodeType: "cache.m5.large",
  Engine: "redis",
  NumCacheClusters: 3,
  AtRestEncryptionEnabled: true,
  TransitEncryptionEnabled: true,
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00",
  SnapshotRetentionLimit: 7,
  SnapshotWindow: "05:00-06:00"
});
```

## Multi-AZ Configuration

Create a ReplicationGroup designed for Multi-AZ deployment for better availability.

```ts
const multiAZReplicationGroup = await AWS.ElastiCache.ReplicationGroup("multiAZReplicationGroup", {
  ReplicationGroupDescription: "Multi-AZ replication group",
  ReplicationGroupId: "multi-az-replication-group",
  CacheNodeType: "cache.r5.large",
  Engine: "memcached",
  NumCacheClusters: 2,
  MultiAZEnabled: true,
  PreferredCacheClusterAZs: ["us-east-1a", "us-east-1b"]
});
```

## Using Node Group Configuration

Define a ReplicationGroup with specific node group configurations to control the number of replicas per node group.

```ts
const customNodeGroupReplicationGroup = await AWS.ElastiCache.ReplicationGroup("customNodeGroupReplicationGroup", {
  ReplicationGroupDescription: "Replication group with custom node group config",
  ReplicationGroupId: "custom-node-group-replication-group",
  CacheNodeType: "cache.r5.large",
  Engine: "redis",
  NodeGroupConfiguration: [{
    NodeGroupId: "0001",
    ReplicasPerNodeGroup: 2,
    PrimaryAvailabilityZone: "us-west-2a",
    ReplicaAvailabilityZones: ["us-west-2b", "us-west-2c"]
  }],
  AutomaticFailoverEnabled: true
});
``` 

These examples illustrate how to effectively manage AWS ElastiCache ReplicationGroups using Alchemy, enabling you to create scalable and resilient caching solutions.
