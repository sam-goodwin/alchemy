---
title: RouteServerPeer
description: Learn how to create, update, and manage AWS EC2 RouteServerPeers using Alchemy Cloud Control.
---


The RouteServerPeer resource lets you manage [AWS EC2 RouteServerPeers](https://docs.aws.amazon.com/ec2/latest/userguide/) for establishing BGP peering connections with Route Servers.

## Minimal Example

Create a basic RouteServerPeer with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicPeer = await AWS.EC2.RouteServerPeer("basicPeer", {
  PeerAddress: "203.0.113.1",
  BgpOptions: {
    Asn: 65000,
    AuthKey: "myBgpAuthKey",
    HoldTime: 30
  },
  RouteServerEndpointId: "rs-12345678",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a RouteServerPeer with additional BGP options for secure connections.

```ts
const securePeer = await AWS.EC2.RouteServerPeer("securePeer", {
  PeerAddress: "203.0.113.2",
  BgpOptions: {
    Asn: 65100,
    AuthKey: "secureAuthKey",
    HoldTime: 60,
    Md5AuthKey: "md5Key123"
  },
  RouteServerEndpointId: "rs-87654321",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Creating with Resource Adoption

Create a RouteServerPeer while adopting an existing resource instead of failing if it already exists.

```ts
const adoptedPeer = await AWS.EC2.RouteServerPeer("adoptedPeer", {
  PeerAddress: "203.0.113.3",
  BgpOptions: {
    Asn: 65001,
    AuthKey: "adoptedAuthKey",
    HoldTime: 40
  },
  RouteServerEndpointId: "rs-12345678",
  adopt: true // Adopt existing resource if it exists
});
```
