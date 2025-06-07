---
title: Managing AWS MediaLive Channels with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource lets you manage [AWS MediaLive Channels](https://docs.aws.amazon.com/medialive/latest/userguide/) for live video processing and broadcasting.

## Minimal Example

Create a basic MediaLive Channel with essential properties:

```ts
import AWS from "alchemy/aws/control";

const MediaLiveChannel = await AWS.MediaLive.Channel("basicChannel", {
  Name: "BasicLiveChannel",
  RoleArn: "arn:aws:iam::123456789012:role/MediaLiveAccessRole",
  EncoderSettings: {
    // Encoder settings would be placed here
  },
  Destinations: [
    {
      Id: "destination1",
      Settings: [
        {
          Url: "rtmp://destination-url/live"
        }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Advanced Configuration

Configure a MediaLive Channel with VPC settings and enhanced logging:

```ts
const AdvancedMediaLiveChannel = await AWS.MediaLive.Channel("advancedChannel", {
  Name: "AdvancedLiveChannel",
  RoleArn: "arn:aws:iam::123456789012:role/MediaLiveAccessRole",
  EncoderSettings: {
    // Encoder settings would be configured here
  },
  Destinations: [
    {
      Id: "destination2",
      Settings: [
        {
          Url: "rtmp://another-destination-url/live"
        }
      ]
    }
  ],
  Vpc: {
    SubnetIds: ["subnet-abc123", "subnet-def456"],
    SecurityGroupIds: ["sg-12345678"]
  },
  LogLevel: "INFO",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Media" }
  ]
});
```

## Input Attachments

Create a MediaLive Channel with input attachments for multiple video sources:

```ts
const InputAttachedMediaLiveChannel = await AWS.MediaLive.Channel("inputAttachedChannel", {
  Name: "InputAttachedChannel",
  RoleArn: "arn:aws:iam::123456789012:role/MediaLiveAccessRole",
  InputAttachments: [
    {
      InputId: "input1",
      InputSettings: {
        // Input settings would be defined here
      }
    },
    {
      InputId: "input2",
      InputSettings: {
        // Additional input settings would be defined here
      }
    }
  ],
  EncoderSettings: {
    // Encoder settings would be set here
  },
  Destinations: [
    {
      Id: "destination3",
      Settings: [
        {
          Url: "rtmp://multiple-inputs-url/live"
        }
      ]
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "Media" }
  ]
});
```