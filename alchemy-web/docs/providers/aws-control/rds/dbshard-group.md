---
title: Managing AWS RDS DBShardGroups with Alchemy
description: Learn how to create, update, and manage AWS RDS DBShardGroups using Alchemy Cloud Control.
---

# DBShardGroup

The DBShardGroup resource lets you create and manage [AWS RDS DBShardGroups](https://docs.aws.amazon.com/rds/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbshardgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dbshardgroup = await AWS.RDS.DBShardGroup("dbshardgroup-example", {
  DBClusterIdentifier: "example-dbclusteridentifier",
  MaxACU: 1,
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a dbshardgroup with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDBShardGroup = await AWS.RDS.DBShardGroup("advanced-dbshardgroup", {
  DBClusterIdentifier: "example-dbclusteridentifier",
  MaxACU: 1,
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

