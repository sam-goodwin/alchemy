---
title: Network
description: Learn how to create, update, and manage AWS MediaLive Networks using Alchemy Cloud Control.
---


The Network resource allows you to create and manage [AWS MediaLive Networks](https://docs.aws.amazon.com/medialive/latest/userguide/) for video streaming applications. This resource enables you to define IP pools, routes, and tags that are essential for your MediaLive channels.

## Minimal Example

Create a basic MediaLive network with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicNetwork = await AWS.MediaLive.Network("basicNetwork", {
  name: "BasicMediaLiveNetwork",
  ipPools: [
    {
      cidr: "192.168.1.0/24",
      name: "MainIPPool"
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a MediaLive network with additional routing options and multiple IP pools:

```ts
const advancedNetwork = await AWS.MediaLive.Network("advancedNetwork", {
  name: "AdvancedMediaLiveNetwork",
  ipPools: [
    {
      cidr: "192.168.1.0/24",
      name: "MainIPPool"
    },
    {
      cidr: "192.168.2.0/24",
      name: "SecondaryIPPool"
    }
  ],
  routes: [
    {
      destination: "10.0.0.0/16",
      ipPoolName: "MainIPPool",
      priority: 1
    },
    {
      destination: "10.1.0.0/16",
      ipPoolName: "SecondaryIPPool",
      priority: 2
    }
  ],
  tags: [
    {
      key: "Project",
      value: "StreamingService"
    }
  ]
});
```

## Custom Adoption of Existing Resources

Create a MediaLive network that adopts an existing resource if it already exists:

```ts
const adoptedNetwork = await AWS.MediaLive.Network("adoptedNetwork", {
  name: "ExistingMediaLiveNetwork",
  ipPools: [
    {
      cidr: "192.168.3.0/24",
      name: "AdoptedIPPool"
    }
  ],
  adopt: true // This allows adoption of existing resources
});
```
