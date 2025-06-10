---
title: PreparedStatement
description: Learn how to create, update, and manage AWS Athena PreparedStatements using Alchemy Cloud Control.
---


The PreparedStatement resource allows you to manage [AWS Athena PreparedStatements](https://docs.aws.amazon.com/athena/latest/userguide/) for executing SQL queries with predefined parameters in a specified workgroup.

## Minimal Example

Create a basic prepared statement with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const preparedStatement = await AWS.Athena.PreparedStatement("basicPreparedStatement", {
  StatementName: "GetUserDetails",
  WorkGroup: "primary",
  Description: "A prepared statement for fetching user details",
  QueryStatement: "SELECT * FROM users WHERE user_id = ?"
});
```

## Advanced Configuration

Create a prepared statement with additional properties such as adopting an existing resource:

```ts
const advancedPreparedStatement = await AWS.Athena.PreparedStatement("advancedPreparedStatement", {
  StatementName: "FetchOrders",
  WorkGroup: "analytics",
  Description: "A prepared statement for fetching order details",
  QueryStatement: "SELECT * FROM orders WHERE status = ?",
  adopt: true
});
```

## Using Prepared Statements in Queries

You can utilize prepared statements in your SQL queries by binding parameters:

```ts
const userId = 12345;
const userQueryExecution = await AWS.Athena.StartQueryExecution("userQueryExecution", {
  QueryString: "EXECUTE GetUserDetails USING ?",
  QueryExecutionContext: {
    Database: "user_database"
  },
  WorkGroup: "primary",
  Parameters: [userId]
});
```

## Updating a Prepared Statement

You can also update an existing prepared statement if needed:

```ts
const updatedPreparedStatement = await AWS.Athena.PreparedStatement("updatedPreparedStatement", {
  StatementName: "GetUserDetails",
  WorkGroup: "primary",
  Description: "Updated prepared statement for fetching user details",
  QueryStatement: "SELECT * FROM users WHERE user_email = ?",
  adopt: true
});
```
