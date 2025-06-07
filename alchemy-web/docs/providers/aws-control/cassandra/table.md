---
title: Managing AWS Cassandra Tables with Alchemy
description: Learn how to create, update, and manage AWS Cassandra Tables using Alchemy Cloud Control.
---

# Table

The Table resource lets you create and manage [AWS Cassandra Tables](https://docs.aws.amazon.com/cassandra/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cassandra-table.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const table = await AWS.Cassandra.Table("table-example", {
  KeyspaceName: "table-keyspace",
  PartitionKeyColumns: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a table with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTable = await AWS.Cassandra.Table("advanced-table", {
  KeyspaceName: "table-keyspace",
  PartitionKeyColumns: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

