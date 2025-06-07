---
title: Managing AWS EC2 RouteServerPeers with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteServerPeers using Alchemy Cloud Control.
---

# RouteServerPeer

The RouteServerPeer resource lets you create and manage [AWS EC2 RouteServerPeers](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-routeserverpeer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routeserverpeer = await AWS.EC2.RouteServerPeer("routeserverpeer-example", {
  PeerAddress: "example-peeraddress",
  BgpOptions: "example-bgpoptions",
  RouteServerEndpointId: "example-routeserverendpointid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a routeserverpeer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRouteServerPeer = await AWS.EC2.RouteServerPeer("advanced-routeserverpeer", {
  PeerAddress: "example-peeraddress",
  BgpOptions: "example-bgpoptions",
  RouteServerEndpointId: "example-routeserverendpointid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

