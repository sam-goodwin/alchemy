---
title: DBClusterParameterGroup
description: Learn how to create, update, and manage AWS DocDB DBClusterParameterGroups using Alchemy Cloud Control.
---


The `DBClusterParameterGroup` resource allows you to manage Amazon DocumentDB (with MongoDB compatibility) cluster parameter groups, which are used to manage configuration settings for your DocumentDB clusters. For more information, refer to the [AWS DocDB DBClusterParameterGroups documentation](https://docs.aws.amazon.com/docdb/latest/userguide/).

## Minimal Example

Create a basic `DBClusterParameterGroup` with essential properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const dbClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("myDbClusterParamGroup", {
  Description: "Parameter group for my DocumentDB cluster",
  Parameters: {
    "maxConnections": "200",
    "timeout": "30"
  },
  Family: "docdb4.0",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a `DBClusterParameterGroup` with more complex parameters settings for performance tuning.

```ts
const advancedDbClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("advancedDbClusterParamGroup", {
  Description: "Advanced parameter group for optimizing DocumentDB performance",
  Parameters: {
    "maxConnections": "300",
    "readPreference": "primaryPreferred",
    "enableSharding": "true",
    "slowQueryLog": "true"
  },
  Family: "docdb4.0",
  Name: "advanced-docdb-param-group"
});
```

## Custom Parameters Example

Create a `DBClusterParameterGroup` with customized parameters for specific application needs.

```ts
const customParamsDbClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("customParamsDbClusterParamGroup", {
  Description: "Custom parameter group for specific application settings",
  Parameters: {
    "maxIdleTime": "60",
    "enableAutoBackup": "true",
    "preferredBackupWindow": "03:00-04:00"
  },
  Family: "docdb4.0",
  Name: "custom-docdb-param-group"
});
```

## Tagging for Organization

Demonstrate how to categorize `DBClusterParameterGroup` resources using multiple tags for better organization.

```ts
const taggedDbClusterParameterGroup = await AWS.DocDB.DBClusterParameterGroup("taggedDbClusterParamGroup", {
  Description: "Parameter group with multiple tags for categorization",
  Parameters: {
    "maxConnections": "250"
  },
  Family: "docdb4.0",
  Tags: [
    {
      Key: "Project",
      Value: "MyProject"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    },
    {
      Key: "Environment",
      Value: "Staging"
    }
  ]
});
```
