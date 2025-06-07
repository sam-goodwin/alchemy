---
title: Managing AWS EC2 ClientVpnTargetNetworkAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 ClientVpnTargetNetworkAssociations using Alchemy Cloud Control.
---

# ClientVpnTargetNetworkAssociation

The ClientVpnTargetNetworkAssociation resource lets you create and manage [AWS EC2 ClientVpnTargetNetworkAssociations](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-clientvpntargetnetworkassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const clientvpntargetnetworkassociation = await AWS.EC2.ClientVpnTargetNetworkAssociation(
  "clientvpntargetnetworkassociation-example",
  { ClientVpnEndpointId: "example-clientvpnendpointid", SubnetId: "example-subnetid" }
);
```

