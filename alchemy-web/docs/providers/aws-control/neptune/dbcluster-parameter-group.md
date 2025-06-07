---
title: Managing AWS Neptune DBClusterParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS Neptune DBClusterParameterGroups using Alchemy Cloud Control.
---

# DBClusterParameterGroup

The DBClusterParameterGroup resource lets you manage [AWS Neptune DBClusterParameterGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) which are used to define specific parameters and configuration settings for your Amazon Neptune database clusters.

## Minimal Example

Create a basic DBClusterParameterGroup with required properties and common optional values.

```ts
import AWS from "alchemy/aws/control";

const BasicDBClusterParameterGroup = await AWS.Neptune.DBClusterParameterGroup("BasicDBClusterParameterGroup", {
  Description: "Basic parameter group for Neptune",
  Parameters: {
    "max_connections": "100",
    "query_timeout": "300"
  },
  Family: "neptune1",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DBClusterParameterGroup with additional parameters for advanced settings.

```ts
const AdvancedDBClusterParameterGroup = await AWS.Neptune.DBClusterParameterGroup("AdvancedDBClusterParameterGroup", {
  Description: "Advanced parameter group for Neptune with optimized settings",
  Parameters: {
    "max_connections": "200",
    "query_timeout": "600",
    "neptune_query_timeout": "1200"
  },
  Family: "neptune1",
  Name: "AdvancedNeptuneParams",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataOps" }
  ]
});
```

## Custom Parameter Configuration

Create a DBClusterParameterGroup with custom parameters for specific use cases.

```ts
const CustomParameterGroup = await AWS.Neptune.DBClusterParameterGroup("CustomParameterGroup", {
  Description: "Custom parameter group for specialized configurations",
  Parameters: {
    "max_connections": "150",
    "query_timeout": "500",
    "neptune_enable_audit_logging": "true"
  },
  Family: "neptune1",
  Name: "CustomNeptuneParams",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```