---
title: FlowSource
description: Learn how to create, update, and manage AWS MediaConnect FlowSources using Alchemy Cloud Control.
---


The FlowSource resource lets you manage [AWS MediaConnect FlowSources](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) and their configuration settings for media transport.

## Minimal Example

Create a basic FlowSource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicFlowSource = await AWS.MediaConnect.FlowSource("basic-flow-source", {
  description: "Basic FlowSource for live streaming",
  name: "LiveStreamSource",
  ingestPort: 9000,
  protocol: "RTP"
});
```

## Advanced Configuration

Configure a FlowSource with encryption and a specific network configuration.

```ts
const advancedFlowSource = await AWS.MediaConnect.FlowSource("advanced-flow-source", {
  description: "Advanced FlowSource with encryption",
  name: "SecureLiveStreamSource",
  ingestPort: 9000,
  protocol: "RTP",
  decryption: {
    roleArn: "arn:aws:iam::123456789012:role/MediaConnectRole",
    keyType: "static-key",
    staticKeyConfig: {
      key: "your-encryption-key",
      keyId: "your-key-id"
    }
  },
  senderIpAddress: "192.168.1.10",
  whitelistCidr: "192.168.1.0/24"
});
```

## Using Gateway Bridge Source

Create a FlowSource that utilizes a Gateway Bridge configuration.

```ts
const gatewayBridgeFlowSource = await AWS.MediaConnect.FlowSource("gateway-flow-source", {
  description: "FlowSource using Gateway Bridge",
  name: "GatewayBridgeSource",
  gatewayBridgeSource: {
    gatewayBridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:gateway-bridge:my-gateway-bridge"
  },
  protocol: "RTP",
  sourceListenerAddress: "192.168.1.20",
  sourceListenerPort: 9001
});
```

## Configuring Entitlements

Set up a FlowSource with an entitlement ARN for controlled access.

```ts
const entitledFlowSource = await AWS.MediaConnect.FlowSource("entitled-flow-source", {
  description: "FlowSource with entitlement",
  name: "EntitledLiveStreamSource",
  entitlementArn: "arn:aws:mediaconnect:us-west-2:123456789012:entitlement:my-entitlement",
  protocol: "RTP",
  senderIpAddress: "192.168.2.10"
});
```
