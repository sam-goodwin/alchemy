---
title: Partition
description: Learn how to create, update, and manage AWS Glue Partitions using Alchemy Cloud Control.
---


The Partition resource allows you to manage [AWS Glue Partitions](https://docs.aws.amazon.com/glue/latest/userguide/) within your data catalog, enabling efficient data organization and retrieval.

## Minimal Example

Create a basic Glue Partition using required properties along with an optional `adopt` property.

```ts
import AWS from "alchemy/aws/control";

const gluePartition = await AWS.Glue.Partition("myGluePartition", {
  TableName: "sales_data",
  DatabaseName: "ecommerce_db",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "Q1"],
    Parameters: {
      "created_by": "data_team"
    }
  },
  adopt: true // Optional: If true, adopts existing resource instead of failing if it already exists
});
```

## Advanced Configuration

Configure a Glue Partition with additional parameters to optimize for specific data structure.

```ts
const advancedGluePartition = await AWS.Glue.Partition("advancedGluePartition", {
  TableName: "user_activity",
  DatabaseName: "analytics_db",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "April"],
    Parameters: {
      "source": "web",
      "data_quality": "high"
    }
  }
});
```

## Creating Multiple Partitions

Demonstrate how to create multiple partitions for a single Glue Table.

```ts
const createMultiplePartitions = async () => {
  const partitions = ["2023", "March", "2023", "April", "2023", "May"];
  
  for (let i = 0; i < partitions.length; i += 2) {
    await AWS.Glue.Partition(`partition-${partitions[i + 1]}`, {
      TableName: "monthly_sales",
      DatabaseName: "sales_db",
      CatalogId: "123456789012",
      PartitionInput: {
        Values: [partitions[i], partitions[i + 1]],
        Parameters: {
          "created_by": "sales_team"
        }
      }
    });
  }
};

await createMultiplePartitions();
```

## Updating Existing Partitions

Show how to update an existing partition's parameters.

```ts
const updateExistingPartition = await AWS.Glue.Partition("updatePartition", {
  TableName: "inventory_data",
  DatabaseName: "warehouse_db",
  CatalogId: "123456789012",
  PartitionInput: {
    Values: ["2023", "February"],
    Parameters: {
      "modified_by": "inventory_team",
      "status": "archived"
    }
  }
});
```
