---
title: Managing AWS MediaConnect FlowVpcInterfaces with Alchemy
description: Learn how to create, update, and manage AWS MediaConnect FlowVpcInterfaces using Alchemy Cloud Control.
---

# FlowVpcInterface

The FlowVpcInterface resource lets you create and manage [AWS MediaConnect FlowVpcInterfaces](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediaconnect-flowvpcinterface.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowvpcinterface = await AWS.MediaConnect.FlowVpcInterface("flowvpcinterface-example", {
  SubnetId: "example-subnetid",
  FlowArn: "example-flowarn",
  SecurityGroupIds: ["example-securitygroupids-1"],
  RoleArn: "example-rolearn",
  Name: "flowvpcinterface-",
});
```

