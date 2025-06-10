---
title: Table
description: Learn how to create, update, and manage AWS DynamoDB Tables using Alchemy Cloud Control.
---


The Table resource lets you manage [AWS DynamoDB Tables](https://docs.aws.amazon.com/dynamodb/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DynamoDB table with required properties and a provisioned throughput configuration.

```ts
import AWS from "alchemy/aws/control";

const basicTable = await AWS.DynamoDB.Table("basicDynamoDBTable", {
  tableName: "Users",
  keySchema: [
    {
      attributeName: "UserId",
      keyType: "HASH" // Partition key
    }
  ],
  attributeDefinitions: [
    {
      attributeName: "UserId",
      attributeType: "S" // String
    }
  ],
  provisionedThroughput: {
    readCapacityUnits: 5,
    writeCapacityUnits: 5
  }
});
```

## Advanced Configuration

Configure a DynamoDB table with on-demand throughput and stream specification for change data capture.

```ts
const advancedTable = await AWS.DynamoDB.Table("advancedDynamoDBTable", {
  tableName: "Orders",
  keySchema: [
    {
      attributeName: "OrderId",
      keyType: "HASH" // Partition key
    }
  ],
  attributeDefinitions: [
    {
      attributeName: "OrderId",
      attributeType: "S" // String
    }
  ],
  onDemandThroughput: {},
  streamSpecification: {
    streamViewType: "NEW_AND_OLD_IMAGES"
  }
});
```

## Adding Global Secondary Indexes

Create a table with a global secondary index to support queries on an additional attribute.

```ts
const indexTable = await AWS.DynamoDB.Table("indexDynamoDBTable", {
  tableName: "Products",
  keySchema: [
    {
      attributeName: "ProductId",
      keyType: "HASH" // Partition key
    }
  ],
  attributeDefinitions: [
    {
      attributeName: "ProductId",
      attributeType: "S" // String
    },
    {
      attributeName: "Category",
      attributeType: "S" // String
    }
  ],
  globalSecondaryIndexes: [
    {
      indexName: "CategoryIndex",
      keySchema: [
        {
          attributeName: "Category",
          keyType: "HASH" // Partition key for index
        }
      ],
      projection: {
        projectionType: "ALL"
      },
      provisionedThroughput: {
        readCapacityUnits: 5,
        writeCapacityUnits: 5
      }
    }
  ],
  provisionedThroughput: {
    readCapacityUnits: 5,
    writeCapacityUnits: 5
  }
});
```

## Enabling Point-in-Time Recovery

Configure a table with point-in-time recovery to protect against accidental writes or deletes.

```ts
const recoveryTable = await AWS.DynamoDB.Table("recoveryDynamoDBTable", {
  tableName: "Sessions",
  keySchema: [
    {
      attributeName: "SessionId",
      keyType: "HASH" // Partition key
    }
  ],
  attributeDefinitions: [
    {
      attributeName: "SessionId",
      attributeType: "S" // String
    }
  ],
  pointInTimeRecoverySpecification: {
    pointInTimeRecoveryEnabled: true
  },
  provisionedThroughput: {
    readCapacityUnits: 10,
    writeCapacityUnits: 10
  }
});
```

## Configuring Tags and Resource Policy

Create a table with tags and a resource policy for access control.

```ts
const policyTable = await AWS.DynamoDB.Table("policyDynamoDBTable", {
  tableName: "Employees",
  keySchema: [
    {
      attributeName: "EmployeeId",
      keyType: "HASH" // Partition key
    }
  ],
  attributeDefinitions: [
    {
      attributeName: "EmployeeId",
      attributeType: "S" // String
    }
  ],
  tags: [
    {
      key: "Department",
      value: "HR"
    },
    {
      key: "Environment",
      value: "Production"
    }
  ],
  resourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "dynamodb:PutItem",
        Resource: "*"
      }
    ]
  },
  provisionedThroughput: {
    readCapacityUnits: 5,
    writeCapacityUnits: 5
  }
});
```
