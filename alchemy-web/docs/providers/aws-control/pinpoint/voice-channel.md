---
title: Managing AWS Pinpoint VoiceChannels with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint VoiceChannels using Alchemy Cloud Control.
---

# VoiceChannel

The VoiceChannel resource lets you create and manage [AWS Pinpoint VoiceChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-voicechannel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const voicechannel = await AWS.Pinpoint.VoiceChannel("voicechannel-example", {
  ApplicationId: "example-applicationid",
});
```

