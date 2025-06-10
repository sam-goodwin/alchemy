---
title: BridgeOutput
description: Learn how to create, update, and manage AWS MediaConnect BridgeOutputs using Alchemy Cloud Control.
---


The BridgeOutput resource allows you to manage [AWS MediaConnect BridgeOutputs](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic BridgeOutput with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicBridgeOutput = await AWS.MediaConnect.BridgeOutput("basicBridgeOutput", {
  bridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:example-bridge",
  networkOutput: {
    protocol: "RTP",
    port: 1234,
    address: "192.0.2.0/24"
  },
  name: "BasicBridgeOutput"
});
```

## Advanced Configuration

Configure a BridgeOutput with additional settings for enhanced functionality.

```ts
const advancedBridgeOutput = await AWS.MediaConnect.BridgeOutput("advancedBridgeOutput", {
  bridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:advanced-bridge",
  networkOutput: {
    protocol: "RTP",
    port: 5678,
    address: "192.0.2.0/24",
    streamId: "stream-1234"
  },
  name: "AdvancedBridgeOutput",
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Network Output Configuration

Create a BridgeOutput with a custom network output setup for specific use cases.

```ts
const customNetworkBridgeOutput = await AWS.MediaConnect.BridgeOutput("customNetworkBridgeOutput", {
  bridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:custom-bridge",
  networkOutput: {
    protocol: "RTP",
    port: 8080,
    address: "203.0.113.0/24",
    streamId: "custom-stream-id"
  },
  name: "CustomNetworkBridgeOutput"
});
```

## Using with Multiple Outputs

Demonstrate how to create multiple BridgeOutputs associated with a single bridge.

```ts
const firstBridgeOutput = await AWS.MediaConnect.BridgeOutput("firstBridgeOutput", {
  bridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:multi-output-bridge",
  networkOutput: {
    protocol: "RTP",
    port: 9000,
    address: "198.51.100.0/24"
  },
  name: "FirstBridgeOutput"
});

const secondBridgeOutput = await AWS.MediaConnect.BridgeOutput("secondBridgeOutput", {
  bridgeArn: "arn:aws:mediaconnect:us-west-2:123456789012:bridge:multi-output-bridge",
  networkOutput: {
    protocol: "RTP",
    port: 9001,
    address: "198.51.100.0/24"
  },
  name: "SecondBridgeOutput"
});
```
