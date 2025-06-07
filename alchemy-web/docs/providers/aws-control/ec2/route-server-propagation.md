---
title: Managing AWS EC2 RouteServerPropagations with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteServerPropagations using Alchemy Cloud Control.
---

# RouteServerPropagation

The RouteServerPropagation resource lets you create and manage [AWS EC2 RouteServerPropagations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-routeserverpropagation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routeserverpropagation = await AWS.EC2.RouteServerPropagation(
  "routeserverpropagation-example",
  { RouteTableId: "example-routetableid", RouteServerId: "example-routeserverid" }
);
```

