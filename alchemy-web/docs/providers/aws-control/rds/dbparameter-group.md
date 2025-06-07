---
title: Managing AWS RDS DBParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBParameterGroups using Alchemy Cloud Control.
---

# DBParameterGroup

The DBParameterGroup resource lets you manage [AWS RDS DBParameterGroups](https://docs.aws.amazon.com/rds/latest/userguide/) for fine-tuning your database configurations.

## Minimal Example

Create a basic DBParameterGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicDBParameterGroup = await AWS.RDS.DBParameterGroup("BasicDBParameterGroup", {
  Description: "Basic parameter group for MySQL",
  Family: "mysql8.0",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure a DBParameterGroup with specific parameters and multiple tags.

```ts
const advancedDBParameterGroup = await AWS.RDS.DBParameterGroup("AdvancedDBParameterGroup", {
  Description: "Advanced parameter group for MySQL with custom parameters",
  Family: "mysql8.0",
  Parameters: {
    max_connections: "150",
    innodb_buffer_pool_size: "536870912" // 512 MB
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "DatabaseTeam" }
  ]
});
```

## Using Custom Parameters

Create a DBParameterGroup with additional custom parameters suited for specific use cases.

```ts
const customParametersDBParameterGroup = await AWS.RDS.DBParameterGroup("CustomParametersDBParameterGroup", {
  Description: "Custom parameter group with specialized settings",
  Family: "postgres12",
  Parameters: {
    work_mem: "65536", // 64 MB
    effective_cache_size: "2097152" // 2 GB
  },
  Tags: [{ Key: "Project", Value: "AnalyticsApp" }]
});
```