---
title: CacheCluster
description: Learn how to create, update, and manage AWS ElastiCache CacheClusters using Alchemy Cloud Control.
---


The CacheCluster resource lets you manage [AWS ElastiCache CacheClusters](https://docs.aws.amazon.com/elasticache/latest/userguide/) for in-memory data storage and caching.

## Minimal Example

Create a basic CacheCluster with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCacheCluster = await AWS.ElastiCache.CacheCluster("basicCacheCluster", {
  CacheNodeType: "cache.t2.micro", 
  Engine: "redis",
  NumCacheNodes: 1,
  ClusterName: "my-basic-cache-cluster",
  PreferredMaintenanceWindow: "sun:05:00-sun:06:00" // Maintenance window
});
```

## Advanced Configuration

Configure a CacheCluster with additional options for enhanced functionality.

```ts
const advancedCacheCluster = await AWS.ElastiCache.CacheCluster("advancedCacheCluster", {
  CacheNodeType: "cache.m5.large",
  Engine: "redis",
  NumCacheNodes: 3,
  ClusterName: "my-advanced-cache-cluster",
  SnapshotRetentionLimit: 5,
  AutoMinorVersionUpgrade: true,
  PreferredAvailabilityZones: ["us-west-2a", "us-west-2b"],
  CacheParameterGroupName: "default.redis5.0",
  LogDeliveryConfigurations: [{
    DestinationType: "cloudwatch-logs",
    LogFormat: "text",
    DestinationDetails: {
      LogGroup: "my-cache-cluster-logs"
    }
  }]
});
```

## High Availability Configuration

Set up a CacheCluster for high availability with multiple availability zones.

```ts
const highAvailabilityCacheCluster = await AWS.ElastiCache.CacheCluster("highAvailabilityCacheCluster", {
  CacheNodeType: "cache.r5.large",
  Engine: "redis",
  NumCacheNodes: 3,
  ClusterName: "my-ha-cache-cluster",
  PreferredAvailabilityZones: ["us-east-1a", "us-east-1b", "us-east-1c"],
  TransitEncryptionEnabled: true,
  CacheSubnetGroupName: "my-cache-subnet-group",
  VpcSecurityGroupIds: ["sg-0abcd1234efgh5678"]
});
```

## Snapshot Configuration

Configure a CacheCluster with snapshot features for data durability.

```ts
const snapshotCacheCluster = await AWS.ElastiCache.CacheCluster("snapshotCacheCluster", {
  CacheNodeType: "cache.t3.medium",
  Engine: "redis",
  NumCacheNodes: 2,
  ClusterName: "my-snapshot-cache-cluster",
  SnapshotWindow: "03:00-04:00", // Time range for snapshot
  SnapshotRetentionLimit: 7
});
```
