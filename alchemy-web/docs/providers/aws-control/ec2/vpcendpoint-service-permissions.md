---
title: Managing AWS EC2 VPCEndpointServicePermissionss with Alchemy
description: Learn how to create, update, and manage AWS EC2 VPCEndpointServicePermissionss using Alchemy Cloud Control.
---

# VPCEndpointServicePermissions

The VPCEndpointServicePermissions resource lets you create and manage [AWS EC2 VPCEndpointServicePermissionss](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpcendpointservicepermissions.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcendpointservicepermissions = await AWS.EC2.VPCEndpointServicePermissions(
  "vpcendpointservicepermissions-example",
  { ServiceId: "example-serviceid" }
);
```

