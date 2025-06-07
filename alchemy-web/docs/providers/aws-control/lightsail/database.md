---
title: Managing AWS Lightsail Databases with Alchemy
description: Learn how to create, update, and manage AWS Lightsail Databases using Alchemy Cloud Control.
---

# Database

The Database resource lets you create and manage [AWS Lightsail Databases](https://docs.aws.amazon.com/lightsail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lightsail-database.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const database = await AWS.Lightsail.Database("database-example", {
  RelationalDatabaseName: "database-relationaldatabase",
  RelationalDatabaseBlueprintId: "example-relationaldatabaseblueprintid",
  MasterDatabaseName: "database-masterdatabase",
  MasterUsername: "database-masteruser",
  RelationalDatabaseBundleId: "example-relationaldatabasebundleid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a database with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDatabase = await AWS.Lightsail.Database("advanced-database", {
  RelationalDatabaseName: "database-relationaldatabase",
  RelationalDatabaseBlueprintId: "example-relationaldatabaseblueprintid",
  MasterDatabaseName: "database-masterdatabase",
  MasterUsername: "database-masteruser",
  RelationalDatabaseBundleId: "example-relationaldatabasebundleid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

