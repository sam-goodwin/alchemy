---
title: ConfiguredTable
description: Learn how to create, update, and manage AWS CleanRooms ConfiguredTables using Alchemy Cloud Control.
---


The ConfiguredTable resource lets you manage [AWS CleanRooms ConfiguredTables](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) that facilitate collaborative data analysis while ensuring data privacy and compliance.

## Minimal Example

Create a basic ConfiguredTable with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicConfiguredTable = await AWS.CleanRooms.ConfiguredTable("basicConfiguredTable", {
  Name: "SalesDataAnalysis",
  AnalysisMethod: "SQL",
  AllowedColumns: ["CustomerID", "OrderDate", "SalesAmount"],
  SelectedAnalysisMethods: ["AVG", "SUM"]
});
```

## Advanced Configuration

Configure a more advanced ConfiguredTable with detailed analysis rules and tagging.

```ts
import AWS from "alchemy/aws/control";

const advancedConfiguredTable = await AWS.CleanRooms.ConfiguredTable("advancedConfiguredTable", {
  Name: "AdvancedSalesData",
  AnalysisMethod: "SQL",
  AllowedColumns: ["CustomerID", "OrderDate", "SalesAmount", "ProductID"],
  AnalysisRules: [
    {
      RuleName: "SalesAmountLimit",
      RuleCondition: "SalesAmount > 1000"
    }
  ],
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "Region", Value: "North America" }
  ]
});
```

## Example with Description and Adoption

Create a ConfiguredTable that includes a description and adopts an existing resource if found.

```ts
import AWS from "alchemy/aws/control";

const describedConfiguredTable = await AWS.CleanRooms.ConfiguredTable("describedConfiguredTable", {
  Name: "CustomerLifetimeValue",
  AnalysisMethod: "SQL",
  TableReference: {
    TableName: "CustomerData",
    DatabaseName: "SalesDB"
  },
  Description: "ConfiguredTable for analyzing customer lifetime value.",
  AllowedColumns: ["CustomerID", "TotalSpent"],
  adopt: true
});
```
