---
title: ConnectPeer
description: Learn how to create, update, and manage AWS NetworkManager ConnectPeers using Alchemy Cloud Control.
---


The ConnectPeer resource lets you manage [AWS NetworkManager ConnectPeers](https://docs.aws.amazon.com/networkmanager/latest/userguide/) which enable connectivity between two networks using an existing Connect Attachment.

## Minimal Example

Create a basic ConnectPeer with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConnectPeer = await AWS.NetworkManager.ConnectPeer("basicConnectPeer", {
  ConnectAttachmentId: "ca-12345678",
  PeerAddress: "192.168.1.1",
  SubnetArn: "arn:aws:ec2:us-west-2:123456789012:subnet/subnet-0123456789abcdef0"
});
```

## Advanced Configuration

Configure a ConnectPeer with additional BGP options and inside CIDR blocks for more advanced networking needs.

```ts
const advancedConnectPeer = await AWS.NetworkManager.ConnectPeer("advancedConnectPeer", {
  ConnectAttachmentId: "ca-87654321",
  PeerAddress: "10.0.0.1",
  BgpOptions: {
    PeerAsn: 65000,
    CoreNetworkAddress: "10.0.0.0/16"
  },
  InsideCidrBlocks: ["10.0.1.0/24", "10.0.2.0/24"]
});
```

## Tagging for Resource Management

Create a ConnectPeer with tags for better resource management and tracking.

```ts
const taggedConnectPeer = await AWS.NetworkManager.ConnectPeer("taggedConnectPeer", {
  ConnectAttachmentId: "ca-11223344",
  PeerAddress: "172.16.0.1",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NetworkMigration" }
  ]
});
```

## Adopting Existing Resources

Create a ConnectPeer while adopting an existing resource if it already exists.

```ts
const adoptConnectPeer = await AWS.NetworkManager.ConnectPeer("adoptConnectPeer", {
  ConnectAttachmentId: "ca-99887766",
  PeerAddress: "192.168.2.1",
  adopt: true
});
```
