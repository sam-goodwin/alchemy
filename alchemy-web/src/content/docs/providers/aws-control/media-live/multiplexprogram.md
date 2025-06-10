---
title: Multiplexprogram
description: Learn how to create, update, and manage AWS MediaLive Multiplexprograms using Alchemy Cloud Control.
---


The Multiplexprogram resource allows you to manage [AWS MediaLive Multiplex programs](https://docs.aws.amazon.com/medialive/latest/userguide/) for streaming video content. This resource lets you define program settings, multiplex ID, and pipeline details for efficient media streaming.

## Minimal Example

This example demonstrates how to create a basic Multiplex program with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const multiplexProgram = await AWS.MediaLive.Multiplexprogram("myMultiplexProgram", {
  multiplexId: "multiplex-123456",
  programName: "MyFirstProgram",
  preferredChannelPipeline: "PIPELINE_0",
  multiplexProgramSettings: {
    // Define settings as required
    videoSelector: {
      colorSpace: "FOLLOW"
    },
    audioSelector: {
      name: "audio1"
    }
  }
});
```

## Advanced Configuration

In this example, we include additional properties such as packet identifiers map and pipeline details to enhance the multiplex program configuration.

```ts
const advancedMultiplexProgram = await AWS.MediaLive.Multiplexprogram("advancedMultiplexProgram", {
  multiplexId: "multiplex-123456",
  programName: "MyAdvancedProgram",
  preferredChannelPipeline: "PIPELINE_1",
  packetIdentifiersMap: {
    audio: [100, 101],
    video: [200]
  },
  pipelineDetails: [
    {
      channelId: "channel-1",
      inputAttachmentName: "input1"
    },
    {
      channelId: "channel-2",
      inputAttachmentName: "input2"
    }
  ],
  multiplexProgramSettings: {
    videoSelector: {
      colorSpace: "FOLLOW"
    },
    audioSelector: {
      name: "audio1"
    }
  }
});
```

## Specific Use Case: Live Event Streaming

This example shows how to set up a Multiplex program specifically for live event streaming with detailed settings.

```ts
const liveEventMultiplexProgram = await AWS.MediaLive.Multiplexprogram("liveEventMultiplexProgram", {
  multiplexId: "multiplex-78910",
  programName: "LiveEventProgram",
  preferredChannelPipeline: "PIPELINE_2",
  packetIdentifiersMap: {
    audio: [150, 151],
    video: [250]
  },
  pipelineDetails: [
    {
      channelId: "eventChannel-1",
      inputAttachmentName: "eventInput1"
    }
  ],
  multiplexProgramSettings: {
    videoSelector: {
      colorSpace: "FOLLOW"
    },
    audioSelector: {
      name: "eventAudio"
    }
  }
});
```

This documentation outlines the essential configurations for the AWS MediaLive Multiplexprogram resource, allowing users to efficiently manage their live streaming setups.
