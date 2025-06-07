---
title: Managing AWS NetworkManager DirectConnectGatewayAttachments with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager DirectConnectGatewayAttachments using Alchemy Cloud Control.
---

# DirectConnectGatewayAttachment

The DirectConnectGatewayAttachment resource lets you create and manage [AWS NetworkManager DirectConnectGatewayAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-directconnectgatewayattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const directconnectgatewayattachment = await AWS.NetworkManager.DirectConnectGatewayAttachment(
  "directconnectgatewayattachment-example",
  {
    CoreNetworkId: "example-corenetworkid",
    EdgeLocations: ["example-edgelocations-1"],
    DirectConnectGatewayArn: "example-directconnectgatewayarn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a directconnectgatewayattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDirectConnectGatewayAttachment =
  await AWS.NetworkManager.DirectConnectGatewayAttachment(
    "advanced-directconnectgatewayattachment",
    {
      CoreNetworkId: "example-corenetworkid",
      EdgeLocations: ["example-edgelocations-1"],
      DirectConnectGatewayArn: "example-directconnectgatewayarn",
      Tags: {
        Environment: "production",
        Team: "DevOps",
        Project: "MyApp",
        CostCenter: "Engineering",
        ManagedBy: "Alchemy",
      },
    }
  );
```

