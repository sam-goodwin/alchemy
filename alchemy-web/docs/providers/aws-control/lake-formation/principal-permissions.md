---
title: Managing AWS LakeFormation PrincipalPermissionss with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation PrincipalPermissionss using Alchemy Cloud Control.
---

# PrincipalPermissions

The PrincipalPermissions resource lets you create and manage [AWS LakeFormation PrincipalPermissionss](https://docs.aws.amazon.com/lakeformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-principalpermissions.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const principalpermissions = await AWS.LakeFormation.PrincipalPermissions(
  "principalpermissions-example",
  {
    Resource: "example-resource",
    Permissions: ["example-permissions-1"],
    Principal: "example-principal",
    PermissionsWithGrantOption: ["example-permissionswithgrantoption-1"],
  }
);
```

