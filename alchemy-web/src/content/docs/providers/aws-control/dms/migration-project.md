---
title: MigrationProject
description: Learn how to create, update, and manage AWS DMS MigrationProjects using Alchemy Cloud Control.
---


The MigrationProject resource allows you to manage AWS Database Migration Service (DMS) migration projects, providing a framework for defining and controlling the migration of databases to AWS. For more information, refer to the [AWS DMS MigrationProjects documentation](https://docs.aws.amazon.com/dms/latest/userguide/).

## Minimal Example

Create a basic migration project with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicMigrationProject = await AWS.DMS.MigrationProject("basicMigrationProject", {
  MigrationProjectName: "CustomerDBMigration",
  Description: "Migration project for customer database",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Advanced Configuration

Configure a migration project with additional settings such as source and target data provider descriptors and transformation rules.

```ts
const advancedMigrationProject = await AWS.DMS.MigrationProject("advancedMigrationProject", {
  MigrationProjectName: "OrderDBMigration",
  Description: "Migration project for order database",
  SourceDataProviderDescriptors: [
    {
      DataProviderType: "RDS",
      DatabaseName: "OrderDB",
      Engine: "mysql"
    }
  ],
  TargetDataProviderDescriptors: [
    {
      DataProviderType: "S3",
      BucketName: "my-s3-bucket",
      Prefix: "migrations/"
    }
  ],
  TransformationRules: JSON.stringify([
    {
      RuleType: "AddColumn",
      SourceColumn: "oldColumn",
      TargetColumn: "newColumn",
      TransformationType: "string"
    }
  ])
});
```

## Using Schema Conversion Application Attributes

Create a migration project that specifies schema conversion application attributes for better control over schema transformations.

```ts
const schemaConversionProject = await AWS.DMS.MigrationProject("schemaConversionProject", {
  MigrationProjectName: "ProductDBMigration",
  Description: "Migration project for product database",
  SchemaConversionApplicationAttributes: {
    SchemaConversionApplicationVersion: "1.0",
    TargetDatabaseType: "PostgreSQL"
  }
});
```

## Adoption of Existing Resources

Create a migration project while adopting an existing resource if it already exists.

```ts
const adoptMigrationProject = await AWS.DMS.MigrationProject("adoptMigrationProject", {
  MigrationProjectIdentifier: "existingMigrationProjectId",
  MigrationProjectName: "AdoptedMigrationProject",
  adopt: true
});
```
