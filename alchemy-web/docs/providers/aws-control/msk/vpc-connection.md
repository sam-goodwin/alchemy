---
title: Managing AWS MSK VpcConnections with Alchemy
description: Learn how to create, update, and manage AWS MSK VpcConnections using Alchemy Cloud Control.
---

# VpcConnection

The VpcConnection resource lets you create and manage [AWS MSK VpcConnections](https://docs.aws.amazon.com/msk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-msk-vpcconnection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcconnection = await AWS.MSK.VpcConnection("vpcconnection-example", {
  SecurityGroups: ["example-securitygroups-1"],
  TargetClusterArn: "example-targetclusterarn",
  ClientSubnets: ["example-clientsubnets-1"],
  VpcId: "example-vpcid",
  Authentication: "example-authentication",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vpcconnection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVpcConnection = await AWS.MSK.VpcConnection("advanced-vpcconnection", {
  SecurityGroups: ["example-securitygroups-1"],
  TargetClusterArn: "example-targetclusterarn",
  ClientSubnets: ["example-clientsubnets-1"],
  VpcId: "example-vpcid",
  Authentication: "example-authentication",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

