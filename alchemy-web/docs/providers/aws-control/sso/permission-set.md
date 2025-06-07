---
title: Managing AWS SSO PermissionSets with Alchemy
description: Learn how to create, update, and manage AWS SSO PermissionSets using Alchemy Cloud Control.
---

# PermissionSet

The PermissionSet resource lets you create and manage [AWS SSO PermissionSets](https://docs.aws.amazon.com/sso/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sso-permissionset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const permissionset = await AWS.SSO.PermissionSet("permissionset-example", {
  InstanceArn: "example-instancearn",
  Name: "permissionset-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A permissionset resource managed by Alchemy",
});
```

## Advanced Configuration

Create a permissionset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPermissionSet = await AWS.SSO.PermissionSet("advanced-permissionset", {
  InstanceArn: "example-instancearn",
  Name: "permissionset-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A permissionset resource managed by Alchemy",
});
```

