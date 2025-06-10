---
title: VoiceChannel
description: Learn how to create, update, and manage AWS Pinpoint VoiceChannels using Alchemy Cloud Control.
---


The VoiceChannel resource allows you to manage [AWS Pinpoint VoiceChannels](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for sending voice messages to your users through Amazon Pinpoint.

## Minimal Example

Create a basic VoiceChannel with the required properties.

```ts
import AWS from "alchemy/aws/control";

const voiceChannel = await AWS.Pinpoint.VoiceChannel("basicVoiceChannel", {
  ApplicationId: "my-pinpoint-app-id",
  Enabled: true // Optional: enable the voice channel
});
```

## Advanced Configuration

Configure a VoiceChannel with additional properties such as enabling or disabling the channel.

```ts
const advancedVoiceChannel = await AWS.Pinpoint.VoiceChannel("advancedVoiceChannel", {
  ApplicationId: "my-pinpoint-app-id",
  Enabled: false // Optional: disable the voice channel
});
```

## Adoption of Existing Resource

If you want to adopt an existing VoiceChannel instead of failing when it already exists, you can use the adopt property.

```ts
const adoptVoiceChannel = await AWS.Pinpoint.VoiceChannel("adoptVoiceChannel", {
  ApplicationId: "my-pinpoint-app-id",
  Enabled: true,
  adopt: true // Optional: adopt existing resource
});
```

## Resource Properties Overview

You can access properties such as the ARN and creation time of the voice channel after creation.

```ts
const voiceChannelDetails = await AWS.Pinpoint.VoiceChannel("detailsVoiceChannel", {
  ApplicationId: "my-pinpoint-app-id",
  Enabled: true
});

// Accessing properties after creation
console.log("Voice Channel ARN:", voiceChannelDetails.Arn);
console.log("Creation Time:", voiceChannelDetails.CreationTime);
```
