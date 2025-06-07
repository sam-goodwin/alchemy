---
title: Managing AWS Timestream Tables with Alchemy
description: Learn how to create, update, and manage AWS Timestream Tables using Alchemy Cloud Control.
---

# Table

The Table resource lets you create and manage [AWS Timestream Tables](https://docs.aws.amazon.com/timestream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-timestream-table.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const table = await AWS.Timestream.Table("table-example", {
  DatabaseName: "table-database",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a table with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTable = await AWS.Timestream.Table("advanced-table", {
  DatabaseName: "table-database",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

