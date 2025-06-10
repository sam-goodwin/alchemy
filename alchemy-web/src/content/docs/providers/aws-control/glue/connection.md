---
title: Connection
description: Learn how to create, update, and manage AWS Glue Connections using Alchemy Cloud Control.
---


The Connection resource allows you to manage [AWS Glue Connections](https://docs.aws.amazon.com/glue/latest/userguide/) that enable AWS Glue to connect to data stores. This includes specifying connection properties, such as JDBC parameters and other relevant information for connecting to your data sources.

## Minimal Example

Create a basic AWS Glue Connection with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const glueConnection = await AWS.Glue.Connection("myGlueConnection", {
  ConnectionInput: {
    Name: "myDatabaseConnection",
    ConnectionType: "JDBC",
    ConnectionProperties: {
      JDBC_CONNECTION_URL: "jdbc:mysql://my-database-instance:3306/mydatabase",
      USERNAME: "dbUser",
      PASSWORD: "mySecurePassword"
    }
  },
  CatalogId: "123456789012"
});
```

## Advanced Configuration

Configure an AWS Glue Connection with additional properties, including physical connection requirements:

```ts
const advancedGlueConnection = await AWS.Glue.Connection("advancedGlueConnection", {
  ConnectionInput: {
    Name: "advancedDatabaseConnection",
    ConnectionType: "JDBC",
    ConnectionProperties: {
      JDBC_CONNECTION_URL: "jdbc:postgresql://my-advanced-db-instance:5432/myadvanceddb",
      USERNAME: "advancedUser",
      PASSWORD: "myAdvancedPassword",
      CONNECTION_TIMEOUT: "30",
      MAX_CONNECTIONS: "5"
    },
    PhysicalConnectionRequirements: {
      AvailabilityZone: "us-east-1a",
      SecurityGroupIdList: ["sg-0123456789abcdef0"],
      SubnetId: "subnet-0123456789abcdef0"
    }
  },
  CatalogId: "123456789012"
});
```

## Using Existing Connections

If you want to adopt an existing AWS Glue Connection instead of failing, you can set the `adopt` property to true:

```ts
const adoptExistingConnection = await AWS.Glue.Connection("adoptExistingConnection", {
  ConnectionInput: {
    Name: "existingDatabaseConnection",
    ConnectionType: "JDBC",
    ConnectionProperties: {
      JDBC_CONNECTION_URL: "jdbc:sqlserver://my-existing-db-instance:1433;databaseName=mydatabase",
      USERNAME: "existingUser",
      PASSWORD: "existingPassword"
    }
  },
  CatalogId: "123456789012",
  adopt: true
});
```
