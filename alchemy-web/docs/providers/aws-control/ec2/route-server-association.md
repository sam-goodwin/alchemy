---
title: Managing AWS EC2 RouteServerAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteServerAssociations using Alchemy Cloud Control.
---

# RouteServerAssociation

The RouteServerAssociation resource lets you create and manage [AWS EC2 RouteServerAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-routeserverassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routeserverassociation = await AWS.EC2.RouteServerAssociation(
  "routeserverassociation-example",
  { VpcId: "example-vpcid", RouteServerId: "example-routeserverid" }
);
```

