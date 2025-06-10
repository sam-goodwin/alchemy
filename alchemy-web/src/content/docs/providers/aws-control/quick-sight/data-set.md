---
title: DataSet
description: Learn how to create, update, and manage AWS QuickSight DataSets using Alchemy Cloud Control.
---


The DataSet resource lets you manage [AWS QuickSight DataSets](https://docs.aws.amazon.com/quicksight/latest/userguide/) for data analysis and visualization.

## Minimal Example

Create a basic QuickSight DataSet with essential properties and a performance configuration.

```ts
import AWS from "alchemy/aws/control";

const quickSightDataSet = await AWS.QuickSight.DataSet("basic-data-set", {
  AwsAccountId: "123456789012",
  DataSetId: "sales-data",
  Name: "Sales Data",
  PhysicalTableMap: {
    "SalesTable": {
      "S3Source": {
        "DataSourceArn": "arn:aws:quicksight:us-east-1:123456789012:data-source/sales-data-source",
        "UploadSettings": {
          "Format": "CSV",
          "StartFromRow": 1,
          "ContainsHeader": true
        }
      }
    }
  },
  PerformanceConfiguration: {
    EnableColumnarStorage: true
  }
});
```

## Advanced Configuration

Configure a DataSet with row-level permissions and tags for better control and organization.

```ts
const advancedDataSet = await AWS.QuickSight.DataSet("advanced-data-set", {
  AwsAccountId: "123456789012",
  DataSetId: "customer-data",
  Name: "Customer Data",
  PhysicalTableMap: {
    "CustomerTable": {
      "RdsSource": {
        "DataSourceArn": "arn:aws:quicksight:us-east-1:123456789012:data-source/customer-data-source",
        "InputColumns": [
          {
            "Name": "customer_id",
            "Type": "STRING"
          },
          {
            "Name": "customer_name",
            "Type": "STRING"
          }
        ]
      }
    }
  },
  RowLevelPermissionDataSet: {
    DataSetArn: "arn:aws:quicksight:us-east-1:123456789012:dataset/permission-data-set",
    PermissionRules: [{
      "DataPermission": JSON.stringify({
        "Effect": "Allow",
        "Action": "quicksight:DescribeDataSet",
        "Resource": "*"
      })
    }],
  },
  Tags: [{
    Key: "Project",
    Value: "SalesAnalysis"
  }]
});
```

## DataSet with Folder Organization

Create a DataSet organized into folders for better management.

```ts
const folderedDataSet = await AWS.QuickSight.DataSet("foldered-data-set", {
  AwsAccountId: "123456789012",
  DataSetId: "inventory-data",
  Name: "Inventory Data",
  PhysicalTableMap: {
    "InventoryTable": {
      "AthenaSource": {
        "DataSourceArn": "arn:aws:quicksight:us-east-1:123456789012:data-source/inventory-data-source",
        "InputColumns": [
          {
            "Name": "item_id",
            "Type": "STRING"
          },
          {
            "Name": "quantity",
            "Type": "INTEGER"
          }
        ]
      }
    }
  },
  FolderArns: [
    "arn:aws:quicksight:us-east-1:123456789012:folder/inventory-reports"
  ]
});
```
