---
title: Channel
description: Learn how to create, update, and manage AWS MediaLive Channels using Alchemy Cloud Control.
---


The Channel resource allows you to create and manage [AWS MediaLive Channels](https://docs.aws.amazon.com/medialive/latest/userguide/) for live video streaming. This resource provides various configurations to adapt to different streaming requirements.

## Minimal Example

This example demonstrates how to create a basic MediaLive Channel with required properties and some common optional ones.

```ts
import AWS from "alchemy/aws/control";

const mediaLiveChannel = await AWS.MediaLive.Channel("basicChannel", {
  InputAttachments: [{
    InputId: "input-12345",
    InputSettings: {
      SourceEndBehavior: "CONTINUE",
      InputFilter: "AUTO",
      // Additional input settings can be specified here
    }
  }],
  Destinations: [{
    Id: "destination-1",
    Settings: [{
      Url: "rtmp://example.com/live",
      Username: "user",
      PasswordParam: alchemy.secret(process.env.STREAM_PASSWORD!)
    }]
  }],
  EncoderSettings: {
    OutputGroups: [{
      Name: "streamingGroup",
      Outputs: [{
        VideoDescriptionName: "video_1",
        AudioDescriptionNames: ["audio_1"],
        Destination: {
          DestinationRefId: "destination-1"
        }
      }]
    }],
    // Additional encoder settings can be specified here
  },
  Name: "MyMediaLiveChannel"
});
```

## Advanced Configuration

In this example, we configure a MediaLive Channel with advanced settings including VPC configuration and logging.

```ts
const advancedMediaLiveChannel = await AWS.MediaLive.Channel("advancedChannel", {
  InputAttachments: [{
    InputId: "input-54321"
  }],
  Destinations: [{
    Id: "destination-2",
    Settings: [{
      Url: "rtmp://another-example.com/live",
      Username: "admin",
      PasswordParam: alchemy.secret(process.env.STREAM_PASSWORD!)
    }]
  }],
  EncoderSettings: {
    OutputGroups: [{
      Name: "advancedGroup",
      Outputs: [{
        VideoDescriptionName: "video_advanced",
        AudioDescriptionNames: ["audio_advanced"],
        Destination: {
          DestinationRefId: "destination-2"
        }
      }]
    }]
  },
  Vpc: {
    SubnetIds: ["subnet-12345678", "subnet-87654321"],
    SecurityGroupIds: ["sg-12345678"]
  },
  LogLevel: "INFO",
  Name: "AdvancedMediaLiveChannel"
});
```

## Multi-Input Channel Configuration

This example illustrates how to set up a MediaLive Channel with multiple input attachments.

```ts
const multiInputChannel = await AWS.MediaLive.Channel("multiInputChannel", {
  InputAttachments: [{
    InputId: "input-11111"
  }, {
    InputId: "input-22222"
  }],
  Destinations: [{
    Id: "destination-3",
    Settings: [{
      Url: "rtmp://multi-input-example.com/live",
      Username: "streamer",
      PasswordParam: alchemy.secret(process.env.STREAM_PASSWORD!)
    }]
  }],
  EncoderSettings: {
    OutputGroups: [{
      Name: "multiOutputGroup",
      Outputs: [{
        VideoDescriptionName: "multi_video",
        AudioDescriptionNames: ["multi_audio"],
        Destination: {
          DestinationRefId: "destination-3"
        }
      }]
    }]
  },
  Name: "MultiInputMediaLiveChannel"
});
```
