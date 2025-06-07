---
title: Managing AWS EC2 NetworkAcls with Alchemy
description: Learn how to create, update, and manage AWS EC2 NetworkAcls using Alchemy Cloud Control.
---

# NetworkAcl

The NetworkAcl resource lets you create and manage [AWS EC2 NetworkAcls](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkacl.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkacl = await AWS.EC2.NetworkAcl("networkacl-example", {
  VpcId: "example-vpcid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a networkacl with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkAcl = await AWS.EC2.NetworkAcl("advanced-networkacl", {
  VpcId: "example-vpcid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

