---
title: TableOptimizer
description: Learn how to create, update, and manage AWS Glue TableOptimizers using Alchemy Cloud Control.
---


The TableOptimizer resource allows you to manage [AWS Glue TableOptimizers](https://docs.aws.amazon.com/glue/latest/userguide/) for optimizing table configurations in your Glue Data Catalog.

## Minimal Example

Create a basic TableOptimizer with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicTableOptimizer = await AWS.Glue.TableOptimizer("basicTableOptimizer", {
  TableName: "sales_data",
  Type: "AUTO",
  DatabaseName: "production_db",
  TableOptimizerConfiguration: {
    MaxPartitions: 1000,
    EnableAutoOptimization: true
  },
  CatalogId: "123456789012" // Your AWS account ID
});
```

## Advanced Configuration

Configure a TableOptimizer with advanced settings for more control over optimization behavior.

```ts
const advancedTableOptimizer = await AWS.Glue.TableOptimizer("advancedTableOptimizer", {
  TableName: "user_activity",
  Type: "MANUAL",
  DatabaseName: "analytics_db",
  TableOptimizerConfiguration: {
    MaxPartitions: 5000,
    EnableAutoOptimization: false,
    OptimizationStrategy: "COMPRESSION"
  },
  CatalogId: "123456789012", // Your AWS account ID
  adopt: true // Adopt existing resource if it exists
});
```

## Optimization for Large Tables

Set up a TableOptimizer specifically for large tables with specific optimization strategies.

```ts
const largeTableOptimizer = await AWS.Glue.TableOptimizer("largeTableOptimizer", {
  TableName: "transaction_records",
  Type: "AUTO",
  DatabaseName: "financial_db",
  TableOptimizerConfiguration: {
    MaxPartitions: 20000,
    EnableAutoOptimization: true,
    OptimizationStrategy: "SORT"
  },
  CatalogId: "123456789012" // Your AWS account ID
});
```
