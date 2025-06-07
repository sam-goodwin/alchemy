---
title: Managing AWS RDS CustomDBEngineVersions with Alchemy
description: Learn how to create, update, and manage AWS RDS CustomDBEngineVersions using Alchemy Cloud Control.
---

# CustomDBEngineVersion

The `CustomDBEngineVersion` resource allows you to create and manage custom database engine versions for Amazon RDS. This resource provides flexibility in defining custom configurations and installation files for your database engines. For more details, refer to the [AWS RDS CustomDBEngineVersions documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic custom database engine version with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const CustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("MyCustomDBEngineVersion", {
  Engine: "mysql",
  EngineVersion: "8.0.26",
  DatabaseInstallationFilesS3BucketName: "my-db-install-files",
  DatabaseInstallationFilesS3Prefix: "mysql-install",
  Description: "My custom MySQL DB Engine Version",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a custom database engine version with advanced settings, including KMS Key for encryption and a custom image ID.

```ts
const AdvancedCustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("AdvancedCustomDBEngineVersion", {
  Engine: "postgres",
  EngineVersion: "13.3",
  DatabaseInstallationFilesS3BucketName: "my-db-install-files",
  DatabaseInstallationFilesS3Prefix: "postgres-install",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  ImageId: "ami-1234567890abcdef0",
  UseAwsProvidedLatestImage: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Source Custom DB Engine Version

Create a custom database engine version based on an existing source custom DB engine version identifier.

```ts
const SourceCustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("SourceCustomDBEngineVersion", {
  Engine: "oracle",
  EngineVersion: "19.0.0",
  DatabaseInstallationFilesS3BucketName: "my-db-install-files",
  DatabaseInstallationFilesS3Prefix: "oracle-install",
  SourceCustomDbEngineVersionIdentifier: "source-db-engine-id",
  Description: "Oracle Custom DB Engine Version based on source",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing custom DB engine version rather than failing, you can set the adopt property to true.

```ts
const AdoptExistingResource = await AWS.RDS.CustomDBEngineVersion("AdoptExistingResource", {
  Engine: "mariadb",
  EngineVersion: "10.5.9",
  DatabaseInstallationFilesS3BucketName: "my-db-install-files",
  DatabaseInstallationFilesS3Prefix: "mariadb-install",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Research" }
  ]
});
```