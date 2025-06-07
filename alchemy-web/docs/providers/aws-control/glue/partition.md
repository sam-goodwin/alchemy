---
title: Managing AWS Glue Partitions with Alchemy
description: Learn how to create, update, and manage AWS Glue Partitions using Alchemy Cloud Control.
---

# Partition

The Partition resource allows you to manage [AWS Glue Partitions](https://docs.aws.amazon.com/glue/latest/userguide/) and their configurations within a specified database and table.

## Minimal Example

Create a basic AWS Glue Partition with required properties.

```ts
import AWS from "alchemy/aws/control";

const GluePartition = await AWS.Glue.Partition("MyPartition", {
  TableName: "SalesData",
  DatabaseName: "SalesDatabase",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "Q1"],
    Parameters: {
      "source": "internal"
    }
  },
  adopt: true // Default is false, set to true to adopt an existing resource
});
```

## Advanced Configuration

Configuring a partition with additional parameters for better metadata management.

```ts
const AdvancedGluePartition = await AWS.Glue.Partition("AdvancedPartition", {
  TableName: "SalesData",
  DatabaseName: "SalesDatabase",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "Q2"],
    Parameters: {
      "source": "external",
      "owner": "data-team"
    }
  }
});
```

## Managing Multiple Partitions

Demonstrate managing multiple partitions by creating several partitions at once.

```ts
const QuarterlyPartitions = ["Q1", "Q2", "Q3", "Q4"].map(quarter => 
  AWS.Glue.Partition(`PartitionFor${quarter}`, {
    TableName: "SalesData",
    DatabaseName: "SalesDatabase",
    CatalogId: "123456789012",
    PartitionInput: {
      Values: ["2023", quarter],
      Parameters: {
        "source": "quarterly-report"
      }
    }
  })
);
```

## Updating an Existing Partition

Show how to update an existing partition with new values.

```ts
const UpdateGluePartition = await AWS.Glue.Partition("UpdatePartition", {
  TableName: "SalesData",
  DatabaseName: "SalesDatabase",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "Q1"],
    Parameters: {
      "source": "internal",
      "lastUpdated": "2023-04-01"
    }
  }
});
```