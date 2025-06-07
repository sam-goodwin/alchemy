---
title: Managing AWS NetworkManager CustomerGatewayAssociations with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager CustomerGatewayAssociations using Alchemy Cloud Control.
---

# CustomerGatewayAssociation

The CustomerGatewayAssociation resource lets you create and manage [AWS NetworkManager CustomerGatewayAssociations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-customergatewayassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const customergatewayassociation = await AWS.NetworkManager.CustomerGatewayAssociation(
  "customergatewayassociation-example",
  {
    GlobalNetworkId: "example-globalnetworkid",
    DeviceId: "example-deviceid",
    CustomerGatewayArn: "example-customergatewayarn",
  }
);
```

