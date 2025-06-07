---
title: Managing AWS DocDB DBClusterParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS DocDB DBClusterParameterGroups using Alchemy Cloud Control.
---

# DBClusterParameterGroup

The DBClusterParameterGroup resource allows you to manage [AWS DocumentDB DBClusterParameterGroups](https://docs.aws.amazon.com/docdb/latest/userguide/) to control the configuration settings for your DocumentDB clusters.

## Minimal Example

Create a basic DBClusterParameterGroup with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicDBClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("BasicDBClusterParameterGroup", {
  Description: "Basic parameter group for DocumentDB",
  Family: "docdb4.0",
  Parameters: {
    "max_connections": "100",
    "query_timeout": "30000"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DBClusterParameterGroup with more advanced parameter settings for performance tuning.

```ts
const AdvancedDBClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("AdvancedDBClusterParameterGroup", {
  Description: "Advanced parameter group for performance tuning",
  Family: "docdb4.0",
  Parameters: {
    "max_connections": "200",
    "query_timeout": "60000",
    "enable_audit_log": "true",
    "audit_log_retention": "7"
  },
  Name: "AdvancedDBCluster",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Custom Parameter Group for Testing

Create a custom DBClusterParameterGroup specifically designed for testing environments.

```ts
const TestDBClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("TestDBClusterParameterGroup", {
  Description: "Parameter group for testing DocumentDB",
  Family: "docdb4.0",
  Parameters: {
    "max_connections": "50",
    "query_timeout": "15000",
    "log_statement": "all"
  },
  Name: "TestDBCluster",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```