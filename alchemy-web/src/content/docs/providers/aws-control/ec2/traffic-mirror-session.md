---
title: TrafficMirrorSession
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorSessions using Alchemy Cloud Control.
---


The TrafficMirrorSession resource allows you to create, update, and manage Traffic Mirror sessions in Amazon EC2. Traffic Mirror sessions enable you to duplicate and inspect network traffic in real-time, facilitating monitoring and security analysis. For more details, refer to the [AWS EC2 TrafficMirrorSessions documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic TrafficMirrorSession with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTrafficMirrorSession = await AWS.EC2.TrafficMirrorSession("basicTrafficMirrorSession", {
  TrafficMirrorTargetId: "target-12345678",
  SessionNumber: 1,
  NetworkInterfaceId: "eni-abcdefgh",
  TrafficMirrorFilterId: "filter-12345678",
  Description: "Basic Traffic Mirror Session for monitoring"
});
```

## Advanced Configuration

Configure a TrafficMirrorSession with additional optional properties for enhanced functionality.

```ts
const advancedTrafficMirrorSession = await AWS.EC2.TrafficMirrorSession("advancedTrafficMirrorSession", {
  TrafficMirrorTargetId: "target-87654321",
  SessionNumber: 2,
  NetworkInterfaceId: "eni-hgfedcba",
  TrafficMirrorFilterId: "filter-87654321",
  Description: "Advanced Traffic Mirror Session with custom settings",
  PacketLength: 128, // Set packet length to 128 bytes
  VirtualNetworkId: 100 // Specify a virtual network ID
});
```

## Session with Tags

Create a TrafficMirrorSession that includes tags for better resource management.

```ts
const taggedTrafficMirrorSession = await AWS.EC2.TrafficMirrorSession("taggedTrafficMirrorSession", {
  TrafficMirrorTargetId: "target-34567890",
  SessionNumber: 3,
  NetworkInterfaceId: "eni-ijklmnop",
  TrafficMirrorFilterId: "filter-34567890",
  Description: "Traffic Mirror Session with tags",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Adopting Existing Resources

Create a TrafficMirrorSession that adopts an existing resource instead of failing.

```ts
const adoptTrafficMirrorSession = await AWS.EC2.TrafficMirrorSession("adoptTrafficMirrorSession", {
  TrafficMirrorTargetId: "target-12345678",
  SessionNumber: 4,
  NetworkInterfaceId: "eni-stuvwxyz",
  TrafficMirrorFilterId: "filter-12345678",
  adopt: true // Adopt existing resource if it exists
});
```
