---
title: Managing AWS QuickSight CustomPermissionss with Alchemy
description: Learn how to create, update, and manage AWS QuickSight CustomPermissionss using Alchemy Cloud Control.
---

# CustomPermissions

The CustomPermissions resource lets you create and manage [AWS QuickSight CustomPermissionss](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-custompermissions.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const custompermissions = await AWS.QuickSight.CustomPermissions("custompermissions-example", {
  CustomPermissionsName: "custompermissions-custompermissions",
  AwsAccountId: "example-awsaccountid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a custompermissions with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCustomPermissions = await AWS.QuickSight.CustomPermissions(
  "advanced-custompermissions",
  {
    CustomPermissionsName: "custompermissions-custompermissions",
    AwsAccountId: "example-awsaccountid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

