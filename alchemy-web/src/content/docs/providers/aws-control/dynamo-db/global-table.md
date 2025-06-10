---
title: GlobalTable
description: Learn how to create, update, and manage AWS DynamoDB GlobalTables using Alchemy Cloud Control.
---


The GlobalTable resource allows you to create and manage [AWS DynamoDB GlobalTables](https://docs.aws.amazon.com/dynamodb/latest/userguide/) for globally distributed applications with multi-region replication.

## Minimal Example

Create a basic DynamoDB GlobalTable with required properties and one optional setting.

```ts
import AWS from "alchemy/aws/control";

const globalTable = await AWS.DynamoDB.GlobalTable("myGlobalTable", {
  TableName: "MyGlobalTable",
  AttributeDefinitions: [
    { AttributeName: "UserID", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "UserID", KeyType: "HASH" }
  ],
  Replicas: [
    {
      RegionName: "us-east-1"
    },
    {
      RegionName: "eu-west-1"
    }
  ],
  StreamSpecification: {
    StreamViewType: "NEW_AND_OLD_IMAGES"
  }
});
```

## Advanced Configuration

Configure a GlobalTable with provisioned throughput settings and additional indexes.

```ts
const advancedGlobalTable = await AWS.DynamoDB.GlobalTable("advancedGlobalTable", {
  TableName: "AdvancedGlobalTable",
  AttributeDefinitions: [
    { AttributeName: "OrderID", AttributeType: "S" },
    { AttributeName: "CustomerID", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "OrderID", KeyType: "HASH" }
  ],
  Replicas: [
    {
      RegionName: "us-west-1",
      GlobalSecondaryIndexes: [
        {
          IndexName: "CustomerIndex",
          KeySchema: [
            { AttributeName: "CustomerID", KeyType: "HASH" }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ]
    }
  ],
  WriteProvisionedThroughputSettings: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
});
```

## Time to Live Configuration

Set up a GlobalTable with Time to Live (TTL) specification for automatic data expiration.

```ts
const ttlGlobalTable = await AWS.DynamoDB.GlobalTable("ttlGlobalTable", {
  TableName: "TTLGlobalTable",
  AttributeDefinitions: [
    { AttributeName: "SessionID", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "SessionID", KeyType: "HASH" }
  ],
  Replicas: [
    {
      RegionName: "ap-south-1"
    }
  ],
  TimeToLiveSpecification: {
    AttributeName: "ExpirationTime",
    Enabled: true
  }
});
```

## Using Write on Demand Settings

Configure a GlobalTable with write on demand settings to handle unpredictable workloads.

```ts
const onDemandGlobalTable = await AWS.DynamoDB.GlobalTable("onDemandGlobalTable", {
  TableName: "OnDemandGlobalTable",
  AttributeDefinitions: [
    { AttributeName: "ProductID", AttributeType: "S" }
  ],
  KeySchema: [
    { AttributeName: "ProductID", KeyType: "HASH" }
  ],
  Replicas: [
    {
      RegionName: "us-east-2"
    }
  ],
  WriteOnDemandThroughputSettings: {
    Enabled: true
  }
});
```
