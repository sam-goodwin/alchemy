---
title: Managing AWS LakeFormation DataCellsFilters with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation DataCellsFilters using Alchemy Cloud Control.
---

# DataCellsFilter

The DataCellsFilter resource lets you create and manage [AWS LakeFormation DataCellsFilters](https://docs.aws.amazon.com/lakeformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-datacellsfilter.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datacellsfilter = await AWS.LakeFormation.DataCellsFilter("datacellsfilter-example", {
  TableName: "datacellsfilter-table",
  DatabaseName: "datacellsfilter-database",
  TableCatalogId: "example-tablecatalogid",
  Name: "datacellsfilter-",
});
```

