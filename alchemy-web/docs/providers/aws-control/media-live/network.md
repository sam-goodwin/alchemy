---
title: Managing AWS MediaLive Networks with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Networks using Alchemy Cloud Control.
---

# Network

The Network resource lets you create and manage [AWS MediaLive Networks](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-network.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const network = await AWS.MediaLive.Network("network-example", {
  IpPools: [],
  Name: "network-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a network with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNetwork = await AWS.MediaLive.Network("advanced-network", {
  IpPools: [],
  Name: "network-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

