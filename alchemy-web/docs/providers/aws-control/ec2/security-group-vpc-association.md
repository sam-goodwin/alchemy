---
title: Managing AWS EC2 SecurityGroupVpcAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 SecurityGroupVpcAssociations using Alchemy Cloud Control.
---

# SecurityGroupVpcAssociation

The SecurityGroupVpcAssociation resource lets you create and manage [AWS EC2 SecurityGroupVpcAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-securitygroupvpcassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securitygroupvpcassociation = await AWS.EC2.SecurityGroupVpcAssociation(
  "securitygroupvpcassociation-example",
  { VpcId: "example-vpcid", GroupId: "example-groupid" }
);
```

