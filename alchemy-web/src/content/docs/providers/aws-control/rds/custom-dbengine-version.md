---
title: CustomDBEngineVersion
description: Learn how to create, update, and manage AWS RDS CustomDBEngineVersions using Alchemy Cloud Control.
---


The CustomDBEngineVersion resource allows you to manage custom database engine versions for Amazon RDS. This enables you to deploy a custom version of a database engine, providing flexibility in your database environment. For more details, refer to the [AWS RDS CustomDBEngineVersions documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic custom database engine version with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const customDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("myCustomDBEngineVersion", {
  Engine: "mysql",
  EngineVersion: "8.0.26",
  DatabaseInstallationFilesS3BucketName: "my-custom-db-files",
  Description: "My custom MySQL engine version 8.0.26"
});
```

## Advanced Configuration

Configure a custom database engine version with additional options such as KMS key and manifest file.

```ts
const advancedCustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("myAdvancedCustomDBEngineVersion", {
  Engine: "postgres",
  EngineVersion: "13.3",
  DatabaseInstallationFilesS3BucketName: "my-custom-db-files",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  Manifest: "my-manifest.json",
  UseAwsProvidedLatestImage: true
});
```

## Using Tags for Resource Management

Create a custom database engine version while applying tags for better resource management.

```ts
const taggedCustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("myTaggedCustomDBEngineVersion", {
  Engine: "oracle",
  EngineVersion: "19.0.0.0",
  DatabaseInstallationFilesS3BucketName: "my-custom-db-files",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DatabaseMigration" }
  ]
});
```

## Adopting an Existing Resource

Attempt to adopt an existing custom database engine version without failing if it already exists.

```ts
const adoptExistingCustomDBEngineVersion = await AWS.RDS.CustomDBEngineVersion("myAdoptExistingCustomDBEngineVersion", {
  Engine: "mysql",
  EngineVersion: "8.0.26",
  adopt: true
});
```
