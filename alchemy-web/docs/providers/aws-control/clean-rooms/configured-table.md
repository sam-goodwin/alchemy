---
title: Managing AWS CleanRooms ConfiguredTables with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms ConfiguredTables using Alchemy Cloud Control.
---

# ConfiguredTable

The ConfiguredTable resource lets you create and manage [AWS CleanRooms ConfiguredTables](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-configuredtable.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configuredtable = await AWS.CleanRooms.ConfiguredTable("configuredtable-example", {
  AnalysisMethod: "example-analysismethod",
  TableReference: "example-tablereference",
  AllowedColumns: ["example-allowedcolumns-1"],
  Name: "configuredtable-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A configuredtable resource managed by Alchemy",
});
```

## Advanced Configuration

Create a configuredtable with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfiguredTable = await AWS.CleanRooms.ConfiguredTable("advanced-configuredtable", {
  AnalysisMethod: "example-analysismethod",
  TableReference: "example-tablereference",
  AllowedColumns: ["example-allowedcolumns-1"],
  Name: "configuredtable-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A configuredtable resource managed by Alchemy",
});
```

