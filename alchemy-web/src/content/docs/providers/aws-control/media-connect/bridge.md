---
title: Bridge
description: Learn how to create, update, and manage AWS MediaConnect Bridges using Alchemy Cloud Control.
---


The Bridge resource lets you manage [AWS MediaConnect Bridges](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) which facilitate reliable transport of video across the cloud.

## Minimal Example

Create a basic MediaConnect Bridge with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const mediaConnectBridge = await AWS.MediaConnect.Bridge("myMediaConnectBridge", {
  name: "MyFirstBridge",
  placementArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridges:my-bridge",
  sources: [
    {
      name: "Source1",
      streamId: "stream1",
      protocol: "rist",
      uri: "rist://source1.example.com:5000"
    }
  ],
  outputs: [
    {
      name: "Output1",
      streamId: "output1",
      protocol: "rist",
      uri: "rist://output1.example.com:6000"
    }
  ],
  adopt: true  // If true, adopts existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Configure a bridge with additional failover settings and ingress gateway.

```ts
const advancedBridge = await AWS.MediaConnect.Bridge("advancedBridge", {
  name: "AdvancedBridge",
  placementArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridges:advanced-bridge",
  sources: [
    {
      name: "PrimarySource",
      streamId: "primaryStream",
      protocol: "rist",
      uri: "rist://primary.example.com:5000"
    }
  ],
  sourceFailoverConfig: {
    failoverMode: "MERGE",
    recoveryWindow: 15
  },
  ingressGatewayBridge: {
    name: "IngressGateway",
    protocol: "rist"
  }
});
```

## Egress Gateway Bridge Example

Set up an egress gateway bridge to manage outputs effectively.

```ts
const egressBridge = await AWS.MediaConnect.Bridge("egressBridge", {
  name: "EgressBridge",
  placementArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridges:egress-bridge",
  sources: [
    {
      name: "SourceForEgress",
      streamId: "sourceEgress",
      protocol: "rist",
      uri: "rist://source-egress.example.com:5001"
    }
  ],
  egressGatewayBridge: {
    name: "EgressGateway",
    protocol: "rist"
  },
  outputs: [
    {
      name: "EgressOutput",
      streamId: "egressOutput",
      protocol: "rist",
      uri: "rist://egress-output.example.com:6001"
    }
  ]
});
```
