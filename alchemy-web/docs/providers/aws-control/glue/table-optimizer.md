---
title: Managing AWS Glue TableOptimizers with Alchemy
description: Learn how to create, update, and manage AWS Glue TableOptimizers using Alchemy Cloud Control.
---

# TableOptimizer

The TableOptimizer resource lets you create and manage [AWS Glue TableOptimizers](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-tableoptimizer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tableoptimizer = await AWS.Glue.TableOptimizer("tableoptimizer-example", {
  TableName: "tableoptimizer-table",
  Type: "example-type",
  DatabaseName: "tableoptimizer-database",
  TableOptimizerConfiguration: "example-tableoptimizerconfiguration",
  CatalogId: "example-catalogid",
});
```

