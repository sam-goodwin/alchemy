---
title: Channel
description: Learn how to create, update, and manage AWS MediaPackageV2 Channels using Alchemy Cloud Control.
---


The Channel resource lets you manage [AWS MediaPackageV2 Channels](https://docs.aws.amazon.com/mediapackagev2/latest/userguide/) for streaming video content reliably and securely.

## Minimal Example

Create a basic MediaPackageV2 Channel with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicChannel = await AWS.MediaPackageV2.Channel("basicChannel", {
  ChannelName: "liveStreamingChannel",
  ChannelGroupName: "myChannelGroup",
  Description: "A channel for live streaming events"
});
```

## Advanced Configuration

Configure a channel with input type and output header settings for more control.

```ts
const advancedChannel = await AWS.MediaPackageV2.Channel("advancedChannel", {
  ChannelName: "highQualityStream",
  ChannelGroupName: "myChannelGroup",
  InputType: "RTMP",
  OutputHeaderConfiguration: {
    // Example of output header configuration
    headers: [
      { name: "X-My-Custom-Header", value: "MyValue" }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "Streaming" }
  ]
});
```

## Input Switch Configuration

Set up an input switch configuration for failover capabilities.

```ts
const failoverChannel = await AWS.MediaPackageV2.Channel("failoverChannel", {
  ChannelName: "failoverStream",
  ChannelGroupName: "myChannelGroup",
  InputSwitchConfiguration: {
    // Example of input switch configuration
    inputSwitches: [
      { 
        inputId: "input1",
        priority: 1 
      },
      { 
        inputId: "input2",
        priority: 2 
      }
    ]
  }
});
```

## Using Tags for Organization

Demonstrate how to use tags to organize channels effectively.

```ts
const taggedChannel = await AWS.MediaPackageV2.Channel("taggedChannel", {
  ChannelName: "taggedContentChannel",
  ChannelGroupName: "myChannelGroup",
  Tags: [
    { Key: "Team", Value: "Media" },
    { Key: "Status", Value: "Active" }
  ]
});
```
