---
title: DBClusterParameterGroup
description: Learn how to create, update, and manage AWS RDS DBClusterParameterGroups using Alchemy Cloud Control.
---


The DBClusterParameterGroup resource lets you manage [AWS RDS DBClusterParameterGroups](https://docs.aws.amazon.com/rds/latest/userguide/) which define the parameters for a DB cluster. These groups allow you to configure database engine settings that apply to all the DB instances in the cluster.

## Minimal Example

Create a basic DBClusterParameterGroup with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const dbClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("myDbClusterParamGroup", {
  Description: "Parameter group for my RDS DB cluster",
  Parameters: {
    "max_connections": "100",
    "query_cache_size": "0"
  },
  Family: "aurora-mysql5.7",
  DBClusterParameterGroupName: "my-db-cluster-param-group"
});
```

## Advanced Configuration

Configure a DBClusterParameterGroup with additional parameters for advanced database settings:

```ts
const advancedDbClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("advancedDbClusterParamGroup", {
  Description: "Advanced parameter group for my RDS DB cluster",
  Parameters: {
    "max_connections": "200",
    "innodb_buffer_pool_size": "1G",
    "query_cache_size": "512M"
  },
  Family: "aurora-postgresql11",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "ECommerce"
    }
  ]
});
```

## Parameter Group for Read Replica

Create a DBClusterParameterGroup specifically for a read replica with custom settings:

```ts
const readReplicaDbClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("readReplicaParamGroup", {
  Description: "Parameter group for the read replica of my RDS DB cluster",
  Parameters: {
    "max_connections": "150",
    "innodb_flush_log_at_trx_commit": "2"
  },
  Family: "aurora-mysql5.7",
  DBClusterParameterGroupName: "my-read-replica-param-group"
});
```
