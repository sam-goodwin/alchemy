---
title: DBParameterGroup
description: Learn how to create, update, and manage AWS RDS DBParameterGroups using Alchemy Cloud Control.
---


The DBParameterGroup resource lets you manage [AWS RDS DBParameterGroups](https://docs.aws.amazon.com/rds/latest/userguide/) and their configuration settings. This resource allows you to define database engine-specific parameters that control the behavior of your RDS instances.

## Minimal Example

Create a basic DBParameterGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const dbParameterGroup = await AWS.RDS.DBParameterGroup("myDbParameterGroup", {
  DBParameterGroupName: "custom-db-parameters",
  Description: "Custom parameter group for my database",
  Family: "mysql8.0"
});
```

## Advanced Configuration

Configure a DBParameterGroup with custom parameters for performance tuning.

```ts
const advancedDbParameterGroup = await AWS.RDS.DBParameterGroup("advancedDbParameterGroup", {
  DBParameterGroupName: "high-performance-parameters",
  Description: "High performance parameter group for optimized settings",
  Family: "postgres12",
  Parameters: {
    "max_connections": "200",
    "work_mem": "64MB",
    "shared_buffers": "512MB"
  }
});
```

## Using Tags for Resource Management

Add tags to your DBParameterGroup for improved resource management.

```ts
const taggedDbParameterGroup = await AWS.RDS.DBParameterGroup("taggedDbParameterGroup", {
  DBParameterGroupName: "tagged-db-parameters",
  Description: "DB parameter group with tags",
  Family: "oracle-se2",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DatabaseOptimization" }
  ]
});
```

## Modifying an Existing DBParameterGroup

Adopt an existing parameter group instead of creating a new one.

```ts
const existingDbParameterGroup = await AWS.RDS.DBParameterGroup("existingDbParameterGroup", {
  DBParameterGroupName: "existing-db-parameters",
  Description: "Existing parameter group to be adopted",
  Family: "mysql8.0",
  adopt: true
});
```
