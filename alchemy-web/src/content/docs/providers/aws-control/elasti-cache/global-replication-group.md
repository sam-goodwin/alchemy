---
title: GlobalReplicationGroup
description: Learn how to create, update, and manage AWS ElastiCache GlobalReplicationGroups using Alchemy Cloud Control.
---


The GlobalReplicationGroup resource allows you to manage [AWS ElastiCache GlobalReplicationGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/), which enable you to replicate your data across different AWS regions for better performance and disaster recovery.

## Minimal Example

Create a basic GlobalReplicationGroup with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const globalReplicationGroup = await AWS.ElastiCache.GlobalReplicationGroup("myGlobalReplicationGroup", {
  Members: [{
    GlobalReplicationGroupId: "myReplicationGroup-1",
    CacheNodeType: "cache.t2.micro",
    Engine: "redis"
  }],
  GlobalReplicationGroupDescription: "My Global Replication Group",
  GlobalReplicationGroupIdSuffix: "dev"
});
```

## Advanced Configuration

Configure a GlobalReplicationGroup with advanced settings, including automatic failover and regional configurations.

```ts
const advancedGlobalReplicationGroup = await AWS.ElastiCache.GlobalReplicationGroup("advancedGlobalReplicationGroup", {
  Members: [{
    GlobalReplicationGroupId: "myReplicationGroup-1",
    CacheNodeType: "cache.t2.micro",
    Engine: "redis"
  }],
  GlobalReplicationGroupDescription: "Advanced Global Replication Group with failover",
  AutomaticFailoverEnabled: true,
  RegionalConfigurations: [{
    Region: "us-west-2",
    ReplicaCount: 3,
    CacheNodeType: "cache.t3.medium"
  }, {
    Region: "eu-central-1",
    ReplicaCount: 2,
    CacheNodeType: "cache.t3.medium"
  }]
});
```

## Adding Cache Parameter Group

Create a GlobalReplicationGroup and specify a cache parameter group for customized settings.

```ts
const parameterGroupGlobalReplicationGroup = await AWS.ElastiCache.GlobalReplicationGroup("parameterGroupGlobalReplicationGroup", {
  Members: [{
    GlobalReplicationGroupId: "myReplicationGroup-1",
    CacheNodeType: "cache.t2.micro",
    Engine: "redis"
  }],
  CacheParameterGroupName: "myCacheParameterGroup",
  GlobalReplicationGroupDescription: "Global Replication Group with Cache Parameter Group"
});
```
