---
title: Managing AWS ElastiCache CacheClusters with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache CacheClusters using Alchemy Cloud Control.
---

# CacheCluster

The CacheCluster resource lets you manage [AWS ElastiCache CacheClusters](https://docs.aws.amazon.com/elasticache/latest/userguide/) for caching data to improve application performance and scalability.

## Minimal Example

Create a basic CacheCluster with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicCacheCluster = await AWS.ElastiCache.CacheCluster("BasicCacheCluster", {
  CacheNodeType: "cache.t2.micro",
  Engine: "redis",
  NumCacheNodes: 1,
  CacheParameterGroupName: "default.redis5.0",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an advanced CacheCluster with additional settings like snapshot options and maintenance windows.

```ts
const AdvancedCacheCluster = await AWS.ElastiCache.CacheCluster("AdvancedCacheCluster", {
  CacheNodeType: "cache.m5.large",
  Engine: "redis",
  NumCacheNodes: 3,
  PreferredMaintenanceWindow: "sun:23:00-sun:23:30",
  SnapshotRetentionLimit: 7,
  SnapshotWindow: "02:00-03:00",
  CacheParameterGroupName: "default.redis5.0",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## High Availability Configuration

Set up a CacheCluster in a specific availability zone with enhanced security features.

```ts
const HighAvailabilityCacheCluster = await AWS.ElastiCache.CacheCluster("HighAvailabilityCacheCluster", {
  CacheNodeType: "cache.r5.large",
  Engine: "memcached",
  NumCacheNodes: 2,
  PreferredAvailabilityZones: ["us-west-2a", "us-west-2b"],
  CacheSubnetGroupName: "my-subnet-group",
  CacheSecurityGroupNames: ["my-security-group"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Snapshot and Backup Configuration

Create a CacheCluster with snapshot and backup settings to ensure data durability.

```ts
const SnapshotCacheCluster = await AWS.ElastiCache.CacheCluster("SnapshotCacheCluster", {
  CacheNodeType: "cache.t3.medium",
  Engine: "redis",
  NumCacheNodes: 1,
  SnapshotRetentionLimit: 30,
  SnapshotWindow: "04:00-05:00",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backup" }
  ]
});
```