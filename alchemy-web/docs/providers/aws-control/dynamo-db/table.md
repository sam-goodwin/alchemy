---
title: Managing AWS DynamoDB Tables with Alchemy
description: Learn how to create, update, and manage AWS DynamoDB Tables using Alchemy Cloud Control.
---

# Table

The Table resource lets you create and manage [AWS DynamoDB Tables](https://docs.aws.amazon.com/dynamodb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const table = await AWS.DynamoDB.Table("table-example", {
  KeySchema: [],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a table with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTable = await AWS.DynamoDB.Table("advanced-table", {
  KeySchema: [],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

