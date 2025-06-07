---
title: Managing AWS DynamoDB GlobalTables with Alchemy
description: Learn how to create, update, and manage AWS DynamoDB GlobalTables using Alchemy Cloud Control.
---

# GlobalTable

The GlobalTable resource lets you create and manage [AWS DynamoDB GlobalTables](https://docs.aws.amazon.com/dynamodb/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-globaltable.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const globaltable = await AWS.DynamoDB.GlobalTable("globaltable-example", {
  Replicas: [],
  AttributeDefinitions: [],
  KeySchema: [],
});
```

