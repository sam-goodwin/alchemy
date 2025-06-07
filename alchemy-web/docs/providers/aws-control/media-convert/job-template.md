---
title: Managing AWS MediaConvert JobTemplates with Alchemy
description: Learn how to create, update, and manage AWS MediaConvert JobTemplates using Alchemy Cloud Control.
---

# JobTemplate

The JobTemplate resource allows you to define and manage [AWS MediaConvert JobTemplates](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) which can be used to automate the transcoding of media files.

## Minimal Example

Create a basic JobTemplate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicJobTemplate = await AWS.MediaConvert.JobTemplate("BasicJobTemplate", {
  SettingsJson: JSON.stringify({
    Version: "1.0",
    OutputGroups: [{
      Name: "File Group",
      Outputs: [{
        Preset: "System-Avc_16x9_1080p_30fps_16x9",
        ContainerSettings: {
          Container: "MP4"
        }
      }]
    }]
  }),
  Name: "BasicJobTemplate",
  Category: "Default",
  Priority: 1
});
```

## Advanced Configuration

Configure a JobTemplate with advanced settings including acceleration and tags.

```ts
const advancedJobTemplate = await AWS.MediaConvert.JobTemplate("AdvancedJobTemplate", {
  SettingsJson: JSON.stringify({
    Version: "1.0",
    OutputGroups: [{
      Name: "File Group",
      Outputs: [{
        Preset: "System-Avc_16x9_1080p_30fps_16x9",
        ContainerSettings: {
          Container: "MP4"
        }
      }]
    }]
  }),
  Name: "AdvancedJobTemplate",
  AccelerationSettings: {
    Mode: "TRANSCODE_ON_DEMAND"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "media-team" }
  ]
});
```

## Custom Queue Example

Create a JobTemplate that specifies a custom queue for processing jobs.

```ts
const queueJobTemplate = await AWS.MediaConvert.JobTemplate("QueueJobTemplate", {
  SettingsJson: JSON.stringify({
    Version: "1.0",
    OutputGroups: [{
      Name: "File Group",
      Outputs: [{
        Preset: "System-Avc_16x9_1080p_30fps_16x9",
        ContainerSettings: {
          Container: "MP4"
        }
      }]
    }]
  }),
  Name: "QueueJobTemplate",
  Queue: "arn:aws:mediaconvert:us-west-2:123456789012:queues/CustomQueue"
});
```

## JobTemplate with Status Updates

Configure a JobTemplate that enables status updates at specific intervals.

```ts
const statusUpdateJobTemplate = await AWS.MediaConvert.JobTemplate("StatusUpdateJobTemplate", {
  SettingsJson: JSON.stringify({
    Version: "1.0",
    OutputGroups: [{
      Name: "File Group",
      Outputs: [{
        Preset: "System-Avc_16x9_1080p_30fps_16x9",
        ContainerSettings: {
          Container: "MP4"
        }
      }]
    }]
  }),
  Name: "StatusUpdateJobTemplate",
  StatusUpdateInterval: "SECONDS_30"
});
```