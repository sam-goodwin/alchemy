---
title: DataMigration
description: Learn how to create, update, and manage AWS DMS DataMigrations using Alchemy Cloud Control.
---


The DataMigration resource allows you to manage [AWS DMS DataMigrations](https://docs.aws.amazon.com/dms/latest/userguide/) for migrating data between different database engines and ensuring minimal downtime.

## Minimal Example

Create a basic data migration with required properties and one optional setting.

```ts
import AWS from "alchemy/aws/control";

const basicDataMigration = await AWS.DMS.DataMigration("basicMigration", {
  DataMigrationType: "full-load",
  MigrationProjectIdentifier: "myMigrationProject",
  ServiceAccessRoleArn: "arn:aws:iam::123456789012:role/myDMSRole",
  DataMigrationName: "MyFirstDataMigration"
});
```

## Advanced Configuration

Configure a data migration with additional settings for source data and tags.

```ts
const advancedDataMigration = await AWS.DMS.DataMigration("advancedMigration", {
  DataMigrationType: "cdc",
  MigrationProjectIdentifier: "myAdvancedMigrationProject",
  ServiceAccessRoleArn: "arn:aws:iam::123456789012:role/myDMSRole",
  SourceDataSettings: [
    {
      SourceType: "mysql",
      EndpointArn: "arn:aws:dms:us-west-2:123456789012:endpoint:example-endpoint",
      DatabaseName: "source_database"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "Migration"
    }
  ]
});
```

## Using Existing Resources

Create a data migration while adopting existing resources if they already exist.

```ts
const adoptExistingDataMigration = await AWS.DMS.DataMigration("adoptMigration", {
  DataMigrationType: "full-load",
  MigrationProjectIdentifier: "adoptMigrationProject",
  ServiceAccessRoleArn: "arn:aws:iam::123456789012:role/myDMSRole",
  DataMigrationName: "AdoptedMigration",
  adopt: true
});
```

## Error Handling Example

Set up a data migration with detailed settings for error handling.

```ts
const errorHandlingMigration = await AWS.DMS.DataMigration("errorHandlingMigration", {
  DataMigrationType: "full-load-and-cdc",
  MigrationProjectIdentifier: "errorHandlingProject",
  ServiceAccessRoleArn: "arn:aws:iam::123456789012:role/myDMSRole",
  DataMigrationSettings: {
    TargetMetadata: {
      TargetSchema: "target_schema",
      SupportLobs: true,
      FullLoadSettings: {
        TargetTablePrep: "DROP_AND_CREATE"
      }
    },
    ErrorHandling: {
      ErrorBehavior: "LOG",
      MaxErrors: 10
    }
  }
});
```
