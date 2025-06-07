---
title: Managing AWS MediaTailor PlaybackConfigurations with Alchemy
description: Learn how to create, update, and manage AWS MediaTailor PlaybackConfigurations using Alchemy Cloud Control.
---

# PlaybackConfiguration

The PlaybackConfiguration resource lets you create and manage [AWS MediaTailor PlaybackConfigurations](https://docs.aws.amazon.com/mediatailor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-mediatailor-playbackconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const playbackconfiguration = await AWS.MediaTailor.PlaybackConfiguration(
  "playbackconfiguration-example",
  {
    VideoContentSourceUrl: "example-videocontentsourceurl",
    Name: "playbackconfiguration-",
    AdDecisionServerUrl: "example-addecisionserverurl",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a playbackconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPlaybackConfiguration = await AWS.MediaTailor.PlaybackConfiguration(
  "advanced-playbackconfiguration",
  {
    VideoContentSourceUrl: "example-videocontentsourceurl",
    Name: "playbackconfiguration-",
    AdDecisionServerUrl: "example-addecisionserverurl",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

