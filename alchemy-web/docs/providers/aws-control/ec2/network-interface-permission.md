---
title: Managing AWS EC2 NetworkInterfacePermissions with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkInterfacePermissions using Alchemy Cloud Control.
---

# NetworkInterfacePermission

The NetworkInterfacePermission resource lets you create and manage [AWS EC2 NetworkInterfacePermissions](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinterfacepermission.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkinterfacepermission = await AWS.EC2.NetworkInterfacePermission(
  "networkinterfacepermission-example",
  {
    AwsAccountId: "example-awsaccountid",
    NetworkInterfaceId: "example-networkinterfaceid",
    Permission: "example-permission",
  }
);
```

