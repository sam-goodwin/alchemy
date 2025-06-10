---
title: ServerlessCache
description: Learn how to create, update, and manage AWS ElastiCache ServerlessCaches using Alchemy Cloud Control.
---


The ServerlessCache resource lets you manage [AWS ElastiCache ServerlessCaches](https://docs.aws.amazon.com/elasticache/latest/userguide/) for scalable in-memory data storage.

## Minimal Example

Create a basic ServerlessCache with essential properties.

```ts
import AWS from "alchemy/aws/control";

const myServerlessCache = await AWS.ElastiCache.ServerlessCache("myCache", {
  ServerlessCacheName: "MyCache",
  Engine: "redis",
  Description: "A serverless cache for my application",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678", "subnet-87654321"]
});
```

## Advanced Configuration

Configure a ServerlessCache with additional settings like snapshot retention and usage limits.

```ts
const advancedCache = await AWS.ElastiCache.ServerlessCache("advancedCache", {
  ServerlessCacheName: "AdvancedCache",
  Engine: "redis",
  Description: "An advanced serverless cache",
  SnapshotRetentionLimit: 7, // Retain snapshots for 7 days
  CacheUsageLimits: {
    MaxMemory: "5GB",
    MaxConnections: 1000
  },
  DailySnapshotTime: "02:00:00", // Daily snapshots at 2 AM
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678", "subnet-87654321"]
});
```

## Restoring from Snapshot

Demonstrate how to restore a ServerlessCache from an existing snapshot.

```ts
const restoreCache = await AWS.ElastiCache.ServerlessCache("restoreCache", {
  ServerlessCacheName: "RestoredCache",
  Engine: "redis",
  SnapshotArnsToRestore: [
    "arn:aws:elasticache:us-west-2:123456789012:snapshot:my-snapshot-id"
  ],
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678", "subnet-87654321"]
});
```

## Configuring Read Endpoints

Set up a ServerlessCache with a reader endpoint for better read performance.

```ts
const cacheWithReadEndpoint = await AWS.ElastiCache.ServerlessCache("cacheWithReadEndpoint", {
  ServerlessCacheName: "CacheWithReadEndpoint",
  Engine: "redis",
  ReaderEndpoint: {
    Address: "reader-endpoint.example.com",
    Port: 6379
  },
  SecurityGroupIds: ["sg-12345678"],
  SubnetIds: ["subnet-12345678", "subnet-87654321"]
});
```
