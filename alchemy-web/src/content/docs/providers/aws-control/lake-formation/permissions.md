---
title: Permissions
description: Learn how to create, update, and manage AWS LakeFormation Permissions using Alchemy Cloud Control.
---


The Permissions resource allows you to manage [AWS LakeFormation Permissions](https://docs.aws.amazon.com/lakeformation/latest/userguide/) for data lake principals, enabling fine-grained access control to your data resources.

## Minimal Example

Create a basic permissions setup for a data lake principal with default permissions.

```ts
import AWS from "alchemy/aws/control";

const lakeFormationPermissions = await AWS.LakeFormation.Permissions("basicPermissions", {
  DataLakePrincipal: {
    DataLakePrincipalIdentifier: "user@example.com"
  },
  Resource: {
    Table: {
      DatabaseName: "myDatabase",
      Name: "myTable"
    }
  },
  Permissions: ["SELECT", "INSERT"],
  PermissionsWithGrantOption: ["SELECT"]
});
```

## Advanced Configuration

Configure advanced permissions with multiple resources and grant options.

```ts
const advancedLakeFormationPermissions = await AWS.LakeFormation.Permissions("advancedPermissions", {
  DataLakePrincipal: {
    DataLakePrincipalIdentifier: "role/MyDataLakeRole"
  },
  Resource: {
    Database: {
      Name: "myDatabase"
    }
  },
  Permissions: ["ALL"],
  PermissionsWithGrantOption: ["SELECT", "INSERT"],
  adopt: true // Adopt existing resource if it already exists
});
```

## Granting Permissions to Multiple Resources

Demonstrate granting permissions to multiple tables within a database.

```ts
const multiResourcePermissions = await AWS.LakeFormation.Permissions("multiResourcePermissions", {
  DataLakePrincipal: {
    DataLakePrincipalIdentifier: "group/DataAnalysts"
  },
  Resource: {
    Table: {
      DatabaseName: "myDatabase",
      Name: "salesData"
    }
  },
  Permissions: ["SELECT"],
  PermissionsWithGrantOption: ["SELECT"]
});

// Granting permissions to another table
const anotherTablePermissions = await AWS.LakeFormation.Permissions("anotherTablePermissions", {
  DataLakePrincipal: {
    DataLakePrincipalIdentifier: "group/DataAnalysts"
  },
  Resource: {
    Table: {
      DatabaseName: "myDatabase",
      Name: "customerData"
    }
  },
  Permissions: ["SELECT"],
  PermissionsWithGrantOption: ["SELECT"]
});
```
