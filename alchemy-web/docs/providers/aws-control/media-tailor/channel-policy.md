---
title: Managing AWS MediaTailor ChannelPolicys with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor ChannelPolicys using Alchemy Cloud Control.
---

# ChannelPolicy

The ChannelPolicy resource lets you create and manage [AWS MediaTailor ChannelPolicys](https://docs.aws.amazon.com/mediatailor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-channelpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const channelpolicy = await AWS.MediaTailor.ChannelPolicy("channelpolicy-example", {
  Policy: {},
  ChannelName: "channelpolicy-channel",
});
```

