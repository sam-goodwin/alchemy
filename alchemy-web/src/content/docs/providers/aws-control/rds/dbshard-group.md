---
title: DBShardGroup
description: Learn how to create, update, and manage AWS RDS DBShardGroups using Alchemy Cloud Control.
---


The DBShardGroup resource allows you to manage [AWS RDS DBShardGroups](https://docs.aws.amazon.com/rds/latest/userguide/) for scalable database architectures that can distribute workloads across multiple shards.

## Minimal Example

Create a basic DBShardGroup with required properties and a couple of optional settings.

```ts
import AWS from "alchemy/aws/control";

const myDBShardGroup = await AWS.RDS.DBShardGroup("myDBShardGroup", {
  DBClusterIdentifier: "myDBCluster",
  MaxACU: 16,
  PubliclyAccessible: true
});
```

## Advanced Configuration

Configure a DBShardGroup with additional settings such as compute redundancy and minimum ACU.

```ts
const advancedDBShardGroup = await AWS.RDS.DBShardGroup("advancedDBShardGroup", {
  DBClusterIdentifier: "myAdvancedDBCluster",
  MaxACU: 32,
  MinACU: 8,
  ComputeRedundancy: 2,
  DBShardGroupIdentifier: "advanced-shard-group",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyProject"
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing DBShardGroup without failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptedDBShardGroup = await AWS.RDS.DBShardGroup("adoptedDBShardGroup", {
  DBClusterIdentifier: "existingDBCluster",
  MaxACU: 20,
  adopt: true
});
```

## Public Access Configuration

Create a DBShardGroup that is publicly accessible for development purposes.

```ts
const publicDBShardGroup = await AWS.RDS.DBShardGroup("publicDBShardGroup", {
  DBClusterIdentifier: "devDBCluster",
  MaxACU: 12,
  PubliclyAccessible: true,
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Resource Creation and Properties

When creating a DBShardGroup, you can specify various properties that define its behavior and configuration.

```ts
const resourceProperties = {
  DBClusterIdentifier: "resourceDBCluster",
  MaxACU: 24,
  MinACU: 10,
  ComputeRedundancy: 3,
  DBShardGroupIdentifier: "resource-shard-group",
  PubliclyAccessible: false,
  Tags: [
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ]
};

const resourceDBShardGroup = await AWS.RDS.DBShardGroup("resourceDBShardGroup", resourceProperties);
```
