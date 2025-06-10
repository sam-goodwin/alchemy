---
title: Database
description: Learn how to create, update, and manage AWS Lightsail Databases using Alchemy Cloud Control.
---


The Database resource lets you manage [AWS Lightsail Databases](https://docs.aws.amazon.com/lightsail/latest/userguide/) including their configurations and settings.

## Minimal Example

Create a basic Lightsail database with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDatabase = await AWS.Lightsail.Database("basicDatabase", {
  RelationalDatabaseName: "myDatabase",
  RelationalDatabaseBlueprintId: "mysql_5_7",
  MasterDatabaseName: "primaryDB",
  MasterUsername: "adminUser",
  MasterUserPassword: "SecurePassword123",
  RelationalDatabaseBundleId: "medium_2_0",
  PubliclyAccessible: true
});
```

## Advanced Configuration

Configure a database with advanced settings including maintenance windows and backup options.

```ts
const advancedDatabase = await AWS.Lightsail.Database("advancedDatabase", {
  RelationalDatabaseName: "advancedDB",
  RelationalDatabaseBlueprintId: "mysql_5_7",
  MasterDatabaseName: "primaryDB",
  MasterUsername: "adminUser",
  MasterUserPassword: "AnotherSecurePassword456",
  RelationalDatabaseBundleId: "large_2_0",
  PreferredMaintenanceWindow: "Mon:04:00-Mon:05:00",
  PreferredBackupWindow: "Mon:02:00-Mon:03:00",
  BackupRetention: true
});
```

## Database with Custom Parameters

Create a database with specific relational database parameters.

```ts
const parameterDatabase = await AWS.Lightsail.Database("parameterDatabase", {
  RelationalDatabaseName: "paramDB",
  RelationalDatabaseBlueprintId: "mysql_5_7",
  MasterDatabaseName: "primaryDB",
  MasterUsername: "adminUser",
  MasterUserPassword: "PasswordWithSpecialChar!789",
  RelationalDatabaseBundleId: "medium_2_0",
  RelationalDatabaseParameters: [
    { parameterName: "max_connections", parameterValue: "200" },
    { parameterName: "query_cache_size", parameterValue: "1048576" }
  ]
});
```

## Adopt Existing Database Resource

If you want to adopt an existing database resource instead of creating a new one, you can specify the adopt option.

```ts
const adoptDatabase = await AWS.Lightsail.Database("adoptDatabase", {
  RelationalDatabaseName: "existingDB",
  RelationalDatabaseBlueprintId: "mysql_5_7",
  MasterDatabaseName: "primaryDB",
  MasterUsername: "adminUser",
  MasterUserPassword: "SecurePassword789",
  RelationalDatabaseBundleId: "medium_2_0",
  adopt: true
});
```
