---
title: Managing AWS NetworkManager ConnectPeers with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager ConnectPeers using Alchemy Cloud Control.
---

# ConnectPeer

The ConnectPeer resource lets you create and manage [AWS NetworkManager ConnectPeers](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-connectpeer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connectpeer = await AWS.NetworkManager.ConnectPeer("connectpeer-example", {
  ConnectAttachmentId: "example-connectattachmentid",
  PeerAddress: "example-peeraddress",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a connectpeer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnectPeer = await AWS.NetworkManager.ConnectPeer("advanced-connectpeer", {
  ConnectAttachmentId: "example-connectattachmentid",
  PeerAddress: "example-peeraddress",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

