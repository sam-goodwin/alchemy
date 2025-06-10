---
title: DBClusterParameterGroup
description: Learn how to create, update, and manage AWS Neptune DBClusterParameterGroups using Alchemy Cloud Control.
---


The DBClusterParameterGroup resource lets you manage [AWS Neptune DBClusterParameterGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DBClusterParameterGroup with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const dbClusterParameterGroup = await AWS.Neptune.DBClusterParameterGroup("myDbClusterParameterGroup", {
  Description: "Parameter group for my Neptune DB cluster",
  Parameters: {
    "neptune_query_timeout": "120"
  },
  Family: "neptune1",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Set up a DBClusterParameterGroup with additional parameters for enhanced performance.

```ts
const advancedDbClusterParameterGroup = await AWS.Neptune.DBClusterParameterGroup("advancedDbClusterParameterGroup", {
  Description: "Advanced parameter group for production Neptune DB cluster",
  Parameters: {
    "neptune_query_timeout": "300",
    "neptune_enable_audit_log": "true",
    "neptune_max_connections": "500"
  },
  Family: "neptune1"
});
```

## Custom Parameter Group for Read Replicas

Create a custom DBClusterParameterGroup specifically for read replicas with a unique configuration.

```ts
const readReplicaDbClusterParameterGroup = await AWS.Neptune.DBClusterParameterGroup("readReplicaDbClusterParameterGroup", {
  Description: "Parameter group for Neptune read replicas",
  Parameters: {
    "neptune_query_timeout": "180",
    "neptune_enable_audit_log": "false",
    "neptune_max_connections": "300"
  },
  Family: "neptune1",
  Name: "ReadReplicaGroup"
});
```
