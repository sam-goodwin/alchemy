---
title: Managing AWS LakeFormation Permissionss with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation Permissionss using Alchemy Cloud Control.
---

# Permissions

The Permissions resource lets you create and manage [AWS LakeFormation Permissionss](https://docs.aws.amazon.com/lakeformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lakeformation-permissions.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const permissions = await AWS.LakeFormation.Permissions("permissions-example", {
  DataLakePrincipal: "example-datalakeprincipal",
  Resource: "example-resource",
});
```

