---
title: Managing AWS MediaPackageV2 OriginEndpointPolicys with Alchemy
description: Learn how to create, update, and manage AWS MediaPackageV2 OriginEndpointPolicys using Alchemy Cloud Control.
---

# OriginEndpointPolicy

The OriginEndpointPolicy resource lets you create and manage [AWS MediaPackageV2 OriginEndpointPolicys](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-originendpointpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const originendpointpolicy = await AWS.MediaPackageV2.OriginEndpointPolicy(
  "originendpointpolicy-example",
  {
    Policy: {},
    ChannelName: "originendpointpolicy-channel",
    OriginEndpointName: "originendpointpolicy-originendpoint",
    ChannelGroupName: "originendpointpolicy-channelgroup",
  }
);
```

