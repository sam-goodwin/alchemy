---
title: Managing AWS MediaPackageV2 ChannelPolicys with Alchemy
description: Learn how to create, update, and manage AWS MediaPackageV2 ChannelPolicys using Alchemy Cloud Control.
---

# ChannelPolicy

The ChannelPolicy resource lets you create and manage [AWS MediaPackageV2 ChannelPolicys](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediapackagev2-channelpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channelpolicy = await AWS.MediaPackageV2.ChannelPolicy("channelpolicy-example", {
  Policy: {},
  ChannelName: "channelpolicy-channel",
  ChannelGroupName: "channelpolicy-channelgroup",
});
```

