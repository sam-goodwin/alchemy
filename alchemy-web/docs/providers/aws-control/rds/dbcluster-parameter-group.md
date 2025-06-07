---
title: Managing AWS RDS DBClusterParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBClusterParameterGroups using Alchemy Cloud Control.
---

# DBClusterParameterGroup

The DBClusterParameterGroup resource allows you to manage [AWS RDS DBClusterParameterGroups](https://docs.aws.amazon.com/rds/latest/userguide/) for Amazon RDS clusters, enabling you to customize database settings and configurations easily.

## Minimal Example

Create a basic DBClusterParameterGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicDBClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("BasicDBClusterParameterGroup", {
  Description: "Basic parameter group for my database cluster",
  Parameters: {
    "max_connections": "100",
    "query_cache_size": "0"
  },
  Family: "aurora-mysql5.7",
  DBClusterParameterGroupName: "my-basic-dbclusterparametergroup",
  Tags: [
    { Key: "Environment", Value: "development" }
  ]
});
```

## Advanced Configuration

Configure a DBClusterParameterGroup with advanced settings for performance tuning and additional parameters.

```ts
const AdvancedDBClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("AdvancedDBClusterParameterGroup", {
  Description: "Advanced settings for performance tuning",
  Parameters: {
    "max_connections": "300",
    "innodb_buffer_pool_size": "1G",
    "innodb_log_file_size": "256M",
    "query_cache_type": "ON"
  },
  Family: "aurora-mysql5.7",
  DBClusterParameterGroupName: "my-advanced-dbclusterparametergroup",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DatabaseOps" }
  ]
});
```

## Custom Parameters Example

Create a DBClusterParameterGroup with custom parameters specific to your database engine.

```ts
const CustomParametersDBClusterParameterGroup = await AWS.RDS.DBClusterParameterGroup("CustomParametersDBClusterParameterGroup", {
  Description: "Custom parameters for PostgreSQL cluster",
  Parameters: {
    "work_mem": "64MB",
    "maintenance_work_mem": "256MB",
    "shared_buffers": "1GB"
  },
  Family: "aurora-postgresql11",
  DBClusterParameterGroupName: "my-custom-params-dbclusterparametergroup"
});
```