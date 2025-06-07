---
title: Managing AWS MediaPackageV2 OriginEndpoints with Alchemy
description: Learn how to create, update, and manage AWS MediaPackageV2 OriginEndpoints using Alchemy Cloud Control.
---

# OriginEndpoint

The OriginEndpoint resource lets you create and manage [AWS MediaPackageV2 OriginEndpoints](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-originendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const originendpoint = await AWS.MediaPackageV2.OriginEndpoint("originendpoint-example", {
  ChannelName: "originendpoint-channel",
  ContainerType: "example-containertype",
  OriginEndpointName: "originendpoint-originendpoint",
  ChannelGroupName: "originendpoint-channelgroup",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A originendpoint resource managed by Alchemy",
});
```

## Advanced Configuration

Create a originendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedOriginEndpoint = await AWS.MediaPackageV2.OriginEndpoint("advanced-originendpoint", {
  ChannelName: "originendpoint-channel",
  ContainerType: "example-containertype",
  OriginEndpointName: "originendpoint-originendpoint",
  ChannelGroupName: "originendpoint-channelgroup",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A originendpoint resource managed by Alchemy",
});
```

