---
title: Flow
description: Learn how to create, update, and manage AWS AppFlow Flows using Alchemy Cloud Control.
---


The Flow resource lets you manage [AWS AppFlow Flows](https://docs.aws.amazon.com/appflow/latest/userguide/) for transferring data between various services securely and efficiently.

## Minimal Example

Create a simple flow with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const simpleFlow = await AWS.AppFlow.Flow("simpleFlow", {
  FlowName: "CustomerDataFlow",
  Description: "A flow to transfer customer data from Salesforce to S3",
  Tasks: [
    {
      Source: {
        ConnectorType: "Salesforce",
        Object: "Contact"
      },
      Destination: {
        ConnectorType: "S3",
        BucketName: "customer-data-bucket",
        BucketPrefix: "salesforce/"
      }
    }
  ],
  TriggerConfig: {
    TriggerType: "OnDemand"
  },
  SourceFlowConfig: {
    ConnectorType: "Salesforce",
    Object: "Contact",
    SourceConnectorProperties: {
      EnableDynamicFieldUpdate: true
    }
  },
  DestinationFlowConfigList: [
    {
      ConnectorType: "S3",
      DestinationConnectorProperties: {
        BucketName: "customer-data-bucket",
        BucketPrefix: "salesforce/"
      }
    }
  ]
});
```

## Advanced Configuration

Configure a flow with custom KMS encryption and additional tasks for data transformation.

```ts
const advancedFlow = await AWS.AppFlow.Flow("advancedFlow", {
  FlowName: "OrderDataFlow",
  Description: "A flow to transfer order data from Shopify to Redshift",
  KMSArn: "arn:aws:kms:us-east-1:123456789012:key/abcd-1234-efgh-5678",
  Tasks: [
    {
      Source: {
        ConnectorType: "Shopify",
        Object: "Order"
      },
      Destination: {
        ConnectorType: "Redshift",
        ClusterIdentifier: "my-redshift-cluster",
        Database: "orders",
        Table: "shopify_orders"
      },
      TaskType: "Filter"
    },
    {
      Source: {
        ConnectorType: "Shopify",
        Object: "Order"
      },
      Destination: {
        ConnectorType: "S3",
        BucketName: "orders-data-bucket",
        BucketPrefix: "shopify/"
      },
      TaskType: "Map"
    }
  ],
  TriggerConfig: {
    TriggerType: "Scheduled",
    Schedule: "rate(5 minutes)"
  },
  SourceFlowConfig: {
    ConnectorType: "Shopify",
    Object: "Order",
    SourceConnectorProperties: {
      EnableDynamicFieldUpdate: false
    }
  },
  DestinationFlowConfigList: [
    {
      ConnectorType: "Redshift",
      DestinationConnectorProperties: {
        ClusterIdentifier: "my-redshift-cluster",
        Database: "orders",
        Table: "shopify_orders"
      }
    },
    {
      ConnectorType: "S3",
      DestinationConnectorProperties: {
        BucketName: "orders-data-bucket",
        BucketPrefix: "shopify/"
      }
    }
  ]
});
```

## Using Tags for Organization

Create a flow with tagging for better resource management.

```ts
const taggedFlow = await AWS.AppFlow.Flow("taggedFlow", {
  FlowName: "InventoryDataFlow",
  Description: "A flow to transfer inventory data from Dynamics 365 to S3",
  Tasks: [
    {
      Source: {
        ConnectorType: "Dynamics365",
        Object: "ProductInventory"
      },
      Destination: {
        ConnectorType: "S3",
        BucketName: "inventory-data-bucket",
        BucketPrefix: "dynamics365/"
      }
    }
  ],
  TriggerConfig: {
    TriggerType: "OnDemand"
  },
  SourceFlowConfig: {
    ConnectorType: "Dynamics365",
    Object: "ProductInventory",
    SourceConnectorProperties: {
      EnableDynamicFieldUpdate: true
    }
  },
  DestinationFlowConfigList: [
    {
      ConnectorType: "S3",
      DestinationConnectorProperties: {
        BucketName: "inventory-data-bucket",
        BucketPrefix: "dynamics365/"
      }
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "InventoryManagement"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```
