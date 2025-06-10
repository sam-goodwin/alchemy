---
title: Gateway
description: Learn how to create, update, and manage AWS MediaConnect Gateways using Alchemy Cloud Control.
---


The Gateway resource lets you manage [AWS MediaConnect Gateways](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) which serve as a bridge between your on-premises networks and AWS MediaConnect for transporting live video.

## Minimal Example

Create a basic MediaConnect Gateway with essential properties.

```ts
import AWS from "alchemy/aws/control";

const mediaConnectGateway = await AWS.MediaConnect.Gateway("myMediaConnectGateway", {
  Networks: [
    {
      NetworkName: "myNetwork",
      NetworkType: "VPC",
      NetworkId: "vpc-0abcd1234efgh5678"
    }
  ],
  EgressCidrBlocks: ["203.0.113.0/24"],
  Name: "MyMediaConnectGateway"
});
```

## Advanced Configuration

Configure a gateway with multiple networks and additional optional settings.

```ts
const advancedMediaConnectGateway = await AWS.MediaConnect.Gateway("advancedGateway", {
  Networks: [
    {
      NetworkName: "primaryNetwork",
      NetworkType: "VPC",
      NetworkId: "vpc-0abcd1234efgh5678"
    },
    {
      NetworkName: "backupNetwork",
      NetworkType: "VPC",
      NetworkId: "vpc-0ijkl1234mnop5678"
    }
  ],
  EgressCidrBlocks: ["203.0.113.0/24", "198.51.100.0/24"],
  Name: "AdvancedMediaConnectGateway",
  adopt: true // Allows adopting existing resource
});
```

## Multiple Networks Example

Create a gateway that connects to multiple networks for redundancy.

```ts
const multiNetworkGateway = await AWS.MediaConnect.Gateway("multiNetworkGateway", {
  Networks: [
    {
      NetworkName: "mainNetwork",
      NetworkType: "VPC",
      NetworkId: "vpc-0abcd1234efgh5678"
    },
    {
      NetworkName: "failoverNetwork",
      NetworkType: "VPC",
      NetworkId: "vpc-0mnop1234qrst5678"
    }
  ],
  EgressCidrBlocks: ["203.0.113.0/24"],
  Name: "MultiNetworkGateway"
});
```
