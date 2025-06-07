---
title: Managing AWS NetworkManager TransitGatewayRouteTableAttachments with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager TransitGatewayRouteTableAttachments using Alchemy Cloud Control.
---

# TransitGatewayRouteTableAttachment

The TransitGatewayRouteTableAttachment resource lets you create and manage [AWS NetworkManager TransitGatewayRouteTableAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-transitgatewayroutetableattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transitgatewayroutetableattachment =
  await AWS.NetworkManager.TransitGatewayRouteTableAttachment(
    "transitgatewayroutetableattachment-example",
    {
      TransitGatewayRouteTableArn: "example-transitgatewayroutetablearn",
      PeeringId: "example-peeringid",
      Tags: { Environment: "production", ManagedBy: "Alchemy" },
    }
  );
```

## Advanced Configuration

Create a transitgatewayroutetableattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTransitGatewayRouteTableAttachment =
  await AWS.NetworkManager.TransitGatewayRouteTableAttachment(
    "advanced-transitgatewayroutetableattachment",
    {
      TransitGatewayRouteTableArn: "example-transitgatewayroutetablearn",
      PeeringId: "example-peeringid",
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

