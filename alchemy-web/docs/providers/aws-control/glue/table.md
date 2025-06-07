---
title: Managing AWS Glue Tables with Alchemy
description: Learn how to create, update, and manage AWS Glue Tables using Alchemy Cloud Control.
---

# Table

The Table resource lets you create and manage [AWS Glue Tables](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-table.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const table = await AWS.Glue.Table("table-example", {
  TableInput: "example-tableinput",
  DatabaseName: "table-database",
  CatalogId: "example-catalogid",
});
```

