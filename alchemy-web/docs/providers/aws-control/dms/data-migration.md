---
title: Managing AWS DMS DataMigrations with Alchemy
description: Learn how to create, update, and manage AWS DMS DataMigrations using Alchemy Cloud Control.
---

# DataMigration

The DataMigration resource lets you create and manage [AWS DMS DataMigrations](https://docs.aws.amazon.com/dms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dms-datamigration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datamigration = await AWS.DMS.DataMigration("datamigration-example", {
  DataMigrationType: "example-datamigrationtype",
  MigrationProjectIdentifier: "example-migrationprojectidentifier",
  ServiceAccessRoleArn: "example-serviceaccessrolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a datamigration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataMigration = await AWS.DMS.DataMigration("advanced-datamigration", {
  DataMigrationType: "example-datamigrationtype",
  MigrationProjectIdentifier: "example-migrationprojectidentifier",
  ServiceAccessRoleArn: "example-serviceaccessrolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

