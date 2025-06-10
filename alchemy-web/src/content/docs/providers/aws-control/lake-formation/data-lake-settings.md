---
title: DataLakeSettings
description: Learn how to create, update, and manage AWS LakeFormation DataLakeSettingss using Alchemy Cloud Control.
---


The DataLakeSettings resource allows you to manage [AWS LakeFormation DataLakeSettings](https://docs.aws.amazon.com/lakeformation/latest/userguide/) which provide the configuration settings for your data lake, including permissions and data access policies.

## Minimal Example

Create a basic DataLakeSettings resource with essential properties and some optional configurations.

```ts
import AWS from "alchemy/aws/control";

const dataLakeSettings = await AWS.LakeFormation.DataLakeSettings("basicDataLakeSettings", {
  AllowExternalDataFiltering: true,
  ExternalDataFilteringAllowList: {
    DataSources: ["s3://my-data-lake-source"],
  },
  CreateTableDefaultPermissions: [
    {
      Principal: { DataLakePrincipalIdentifier: "user:admin@example.com" },
      Resource: { Table: { DatabaseName: "myDatabase", Name: "myTable" } },
      Permissions: ["ALL"],
    },
  ],
});
```

## Advanced Configuration

Configure the DataLakeSettings resource with additional options such as mutation type and trusted resource owners.

```ts
const advancedDataLakeSettings = await AWS.LakeFormation.DataLakeSettings("advancedDataLakeSettings", {
  AllowFullTableExternalDataAccess: true,
  MutationType: "ALLOW_MUTATION",
  TrustedResourceOwners: ["arn:aws:iam::123456789012:role/MyTrustedRole"],
  Admins: {
    DataLakePrincipalIdentifiers: ["user:admin@example.com", "role:DataLakeAdmin"],
  },
  CreateDatabaseDefaultPermissions: [
    {
      Principal: { DataLakePrincipalIdentifier: "role:DatabaseAdmin" },
      Resource: { Database: { Name: "myDatabase" } },
      Permissions: ["ALL"],
    },
  ],
});
```

## Configuring Session Tags

Set up authorized session tags to manage access control based on user attributes.

```ts
const sessionTagDataLakeSettings = await AWS.LakeFormation.DataLakeSettings("sessionTagDataLakeSettings", {
  AuthorizedSessionTagValueList: ["environment:production", "team:data"],
  AllowExternalDataFiltering: true,
});
```

## Full Configuration Example

Demonstrate a complete configuration of DataLakeSettings with all properties included.

```ts
const completeDataLakeSettings = await AWS.LakeFormation.DataLakeSettings("completeDataLakeSettings", {
  AllowExternalDataFiltering: true,
  ExternalDataFilteringAllowList: {
    DataSources: ["s3://my-data-lake-source", "s3://another-data-source"],
  },
  CreateTableDefaultPermissions: [
    {
      Principal: { DataLakePrincipalIdentifier: "user:tableAdmin@example.com" },
      Resource: { Table: { DatabaseName: "myDatabase", Name: "myTable" } },
      Permissions: ["SELECT", "INSERT"],
    },
  ],
  MutationType: "ALLOW_MUTATION",
  Parameters: {
    CustomParameter: "value",
  },
  AllowFullTableExternalDataAccess: false,
  Admins: {
    DataLakePrincipalIdentifiers: ["user:admin@example.com", "role:DataLakeAdmin"],
  },
  CreateDatabaseDefaultPermissions: [
    {
      Principal: { DataLakePrincipalIdentifier: "role:DatabaseAdmin" },
      Resource: { Database: { Name: "myDatabase" } },
      Permissions: ["ALL"],
    },
  ],
  AuthorizedSessionTagValueList: ["environment:production"],
  TrustedResourceOwners: ["arn:aws:iam::123456789012:role/MyTrustedRole"],
});
```
