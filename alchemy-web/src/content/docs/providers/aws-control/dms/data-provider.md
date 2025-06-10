---
title: DataProvider
description: Learn how to create, update, and manage AWS DMS DataProviders using Alchemy Cloud Control.
---


The DataProvider resource allows you to manage [AWS DMS DataProviders](https://docs.aws.amazon.com/dms/latest/userguide/) for database migration tasks, enabling you to specify the source and target database connections.

## Minimal Example

Create a basic DataProvider with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDataProvider = await AWS.DMS.DataProvider("myDataProvider", {
  Engine: "mysql",
  DataProviderName: "MyMySQLDataProvider"
});
```

## Advanced Configuration

Configure a DataProvider with additional settings such as description and tags.

```ts
const advancedDataProvider = await AWS.DMS.DataProvider("advancedDataProvider", {
  Engine: "postgres",
  DataProviderName: "MyPostgresDataProvider",
  Description: "This is a data provider for PostgreSQL databases",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MigrationProject" }
  ]
});
```

## Using Exact Settings

Create a DataProvider with ExactSettings enabled to ensure that the settings are strictly applied.

```ts
const exactSettingsProvider = await AWS.DMS.DataProvider("exactSettingsDataProvider", {
  Engine: "oracle",
  DataProviderName: "MyOracleDataProvider",
  ExactSettings: true,
  Description: "Data provider with strict settings for Oracle"
});
```

## Adopting Existing Resources

Configure a DataProvider that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingProvider = await AWS.DMS.DataProvider("adoptDataProvider", {
  Engine: "sqlserver",
  DataProviderIdentifier: "existing-sqlserver-provider",
  adopt: true,
  DataProviderName: "AdoptedSQLServerProvider"
});
```

## Complete Configuration Example

Demonstrate a complete configuration with a variety of settings.

```ts
const completeDataProvider = await AWS.DMS.DataProvider("completeDataProvider", {
  Engine: "mongodb",
  DataProviderName: "MyMongoDBDataProvider",
  Description: "Full configuration for MongoDB",
  ExactSettings: true,
  Settings: {
    // Example settings structure, replace with actual settings as needed
    "MongodUri": "mongodb://username:password@host:port/dbname"
  },
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```
