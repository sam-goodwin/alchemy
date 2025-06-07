---
title: Managing AWS EC2 SubnetRouteTableAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 SubnetRouteTableAssociations using Alchemy Cloud Control.
---

# SubnetRouteTableAssociation

The SubnetRouteTableAssociation resource lets you create and manage [AWS EC2 SubnetRouteTableAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnetroutetableassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subnetroutetableassociation = await AWS.EC2.SubnetRouteTableAssociation(
  "subnetroutetableassociation-example",
  { RouteTableId: "example-routetableid", SubnetId: "example-subnetid" }
);
```

