---
title: DataCellsFilter
description: Learn how to create, update, and manage AWS LakeFormation DataCellsFilters using Alchemy Cloud Control.
---


The DataCellsFilter resource in AWS LakeFormation allows you to manage fine-grained access control for data stored in tables. By creating data cell filters, you can specify which data users can see, enhancing security and compliance. For more detailed information, refer to the [AWS LakeFormation DataCellsFilters documentation](https://docs.aws.amazon.com/lakeformation/latest/userguide/).

## Minimal Example

Create a basic DataCellsFilter with required properties and one optional column name.

```ts
import AWS from "alchemy/aws/control";

const simpleDataCellsFilter = await AWS.LakeFormation.DataCellsFilter("simpleDataCellsFilter", {
  TableName: "sales_data",
  DatabaseName: "financials_db",
  TableCatalogId: "123456789012",
  Name: "sales_data_filter",
  ColumnNames: ["customer_id"]
});
```

## Advanced Configuration

Create a DataCellsFilter with a specified row filter and multiple column names.

```ts
import AWS from "alchemy/aws/control";

const advancedDataCellsFilter = await AWS.LakeFormation.DataCellsFilter("advancedDataCellsFilter", {
  TableName: "employee_data",
  DatabaseName: "hr_db",
  TableCatalogId: "123456789012",
  Name: "employee_data_filter",
  ColumnNames: ["salary", "bonus"],
  RowFilter: {
    // Example of a RowFilter structure (replace with actual filter logic)
    "FilterExpression": "department = :dept",
    "FilterParameters": {
      ":dept": "Sales"
    }
  }
});
```

## Specific Use Case: Column Wildcard Filter

Create a DataCellsFilter using a column wildcard to apply filters to all columns in the table.

```ts
import AWS from "alchemy/aws/control";

const wildcardDataCellsFilter = await AWS.LakeFormation.DataCellsFilter("wildcardDataCellsFilter", {
  TableName: "project_data",
  DatabaseName: "projects_db",
  TableCatalogId: "123456789012",
  Name: "project_data_filter",
  ColumnWildcard: {
    // This wildcard applies to all columns in the table
    "ExcludedColumnNames": ["sensitive_info"]
  }
});
```
