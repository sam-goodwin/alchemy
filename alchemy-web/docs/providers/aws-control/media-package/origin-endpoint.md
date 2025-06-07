---
title: Managing AWS MediaPackage OriginEndpoints with Alchemy
description: Learn how to create, update, and manage AWS MediaPackage OriginEndpoints using Alchemy Cloud Control.
---

# OriginEndpoint

The OriginEndpoint resource lets you create and manage [AWS MediaPackage OriginEndpoints](https://docs.aws.amazon.com/mediapackage/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackage-originendpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const originendpoint = await AWS.MediaPackage.OriginEndpoint("originendpoint-example", {
  ChannelId: "example-channelid",
  Id: "example-id",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A originendpoint resource managed by Alchemy",
});
```

## Advanced Configuration

Create a originendpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedOriginEndpoint = await AWS.MediaPackage.OriginEndpoint("advanced-originendpoint", {
  ChannelId: "example-channelid",
  Id: "example-id",
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

