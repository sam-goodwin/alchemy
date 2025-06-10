---
title: BridgeSource
description: Learn how to create, update, and manage AWS MediaConnect BridgeSources using Alchemy Cloud Control.
---


The BridgeSource resource lets you manage [AWS MediaConnect BridgeSources](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) for streaming video content across various networks.

## Minimal Example

Create a basic BridgeSource with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const bridgeSource = await AWS.MediaConnect.BridgeSource("myBridgeSource", {
  BridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:my-bridge",
  Name: "MyBridgeSource",
  NetworkSource: {
    Protocol: "RTP",
    Port: 5000,
    Address: "192.0.2.0/24"
  }
});
```

## Advanced Configuration

Configure a BridgeSource with additional settings, including a FlowSource:

```ts
const advancedBridgeSource = await AWS.MediaConnect.BridgeSource("advancedBridgeSource", {
  BridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:my-advanced-bridge",
  Name: "AdvancedBridgeSource",
  NetworkSource: {
    Protocol: "RTP",
    Port: 6000,
    Address: "192.0.2.0/24"
  },
  FlowSource: {
    FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:my-flow",
    MaxBitrate: 10000000, // 10 Mbps
    StreamId: "stream-1"
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing BridgeSource instead of creating a new one, you can set the `adopt` property to `true`:

```ts
const adoptedBridgeSource = await AWS.MediaConnect.BridgeSource("adoptedBridgeSource", {
  BridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:existing-bridge",
  Name: "AdoptedBridgeSource",
  adopt: true
});
```

## Flow Source Configuration

Create a BridgeSource specifically configured to link to an existing flow:

```ts
const flowBridgeSource = await AWS.MediaConnect.BridgeSource("flowBridgeSource", {
  BridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:flow-bridge",
  Name: "FlowBridgeSource",
  FlowSource: {
    FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:flow-1",
    MaxBitrate: 5000000 // 5 Mbps
  }
});
```
