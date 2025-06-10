---
title: PrincipalPermissions
description: Learn how to create, update, and manage AWS LakeFormation PrincipalPermissionss using Alchemy Cloud Control.
---


The PrincipalPermissions resource lets you manage permissions for data lake principals in AWS LakeFormation. You can define granular access controls to your data lake resources. For more details, refer to the official AWS documentation: [AWS LakeFormation PrincipalPermissionss](https://docs.aws.amazon.com/lakeformation/latest/userguide/).

## Minimal Example

Create a basic PrincipalPermissions resource with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPermissions = await AWS.LakeFormation.PrincipalPermissions("basicPermissions", {
  Resource: {
    Table: {
      DatabaseName: "finance_db",
      Name: "transactions"
    }
  },
  Permissions: ["SELECT"],
  Principal: {
    DataLakePrincipalIdentifier: "user@example.com"
  },
  PermissionsWithGrantOption: ["SELECT"]
});
```

## Advanced Configuration

Configure advanced permissions including catalog-level permissions and multiple permissions.

```ts
const advancedPermissions = await AWS.LakeFormation.PrincipalPermissions("advancedPermissions", {
  Resource: {
    Catalog: {}
  },
  Permissions: ["ALL"],
  Catalog: "finance_catalog",
  Principal: {
    DataLakePrincipalIdentifier: "group:finance-team"
  },
  PermissionsWithGrantOption: ["SELECT", "INSERT"]
});
```

## Granting Permissions with Options

Demonstrate how to grant permissions with grant options on a specific table.

```ts
const tablePermissionsWithGrant = await AWS.LakeFormation.PrincipalPermissions("tablePermissionsWithGrant", {
  Resource: {
    Table: {
      DatabaseName: "sales_db",
      Name: "customer_data"
    }
  },
  Permissions: ["INSERT"],
  Principal: {
    DataLakePrincipalIdentifier: "role:analytics-role"
  },
  PermissionsWithGrantOption: ["INSERT"]
});
```

## Catalog-Level Permissions

Create a PrincipalPermissions resource that grants catalog-level permissions to a user.

```ts
const catalogPermissions = await AWS.LakeFormation.PrincipalPermissions("catalogPermissions", {
  Resource: {
    Catalog: {}
  },
  Permissions: ["CREATE_DATABASE"],
  Principal: {
    DataLakePrincipalIdentifier: "user:admin@example.com"
  },
  PermissionsWithGrantOption: []
});
```
