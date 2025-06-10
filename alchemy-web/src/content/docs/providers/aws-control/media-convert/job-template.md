---
title: JobTemplate
description: Learn how to create, update, and manage AWS MediaConvert JobTemplates using Alchemy Cloud Control.
---


The JobTemplate resource allows you to manage [AWS MediaConvert JobTemplates](https://docs.aws.amazon.com/mediaconvert/latest/userguide/) for video transcoding workflows. JobTemplates define the settings used for transcoding video files, enabling consistent processing and output.

## Minimal Example

Create a basic JobTemplate with required properties and one optional property for category.

```ts
import AWS from "alchemy/aws/control";

const basicJobTemplate = await AWS.MediaConvert.JobTemplate("basicJobTemplate", {
  settingsJson: {
    // Example settings for video transcoding
    Version: "2019-06-01",
    JobTemplate: "Basic",
    Outputs: [{
      ContainerSettings: {
        Container: "MP4"
      },
      VideoDescription: {
        CodecSettings: {
          Codec: "H.264"
        }
      }
    }]
  },
  Category: "Standard Transcoding"
});
```

## Advanced Configuration

Configure a JobTemplate with acceleration settings and multiple output specifications for enhanced performance.

```ts
const advancedJobTemplate = await AWS.MediaConvert.JobTemplate("advancedJobTemplate", {
  settingsJson: {
    // Example settings for video transcoding with multiple outputs
    Version: "2019-06-01",
    JobTemplate: "Advanced",
    Outputs: [{
      ContainerSettings: {
        Container: "MP4"
      },
      VideoDescription: {
        CodecSettings: {
          Codec: "H.264"
        }
      }
    },
    {
      ContainerSettings: {
        Container: "MKV"
      },
      VideoDescription: {
        CodecSettings: {
          Codec: "H.265"
        }
      }
    }]
  },
  AccelerationSettings: {
    Mode: "TRANSCODE"
  },
  Priority: 1
});
```

## Custom Settings with Tags

Create a JobTemplate that includes custom settings and tags for better organization.

```ts
const taggedJobTemplate = await AWS.MediaConvert.JobTemplate("taggedJobTemplate", {
  settingsJson: {
    // Example settings for video transcoding with specific configurations
    Version: "2019-06-01",
    JobTemplate: "Tagged",
    Outputs: [{
      ContainerSettings: {
        Container: "MP4"
      },
      VideoDescription: {
        CodecSettings: {
          Codec: "H.264"
        }
      }
    }]
  },
  Tags: {
    Project: "Video Production",
    Environment: "Production"
  }
});
```

## JobTemplate with Queue and Status Update Interval

Define a JobTemplate that specifies a queue for job processing and a status update interval for monitoring.

```ts
const queuedJobTemplate = await AWS.MediaConvert.JobTemplate("queuedJobTemplate", {
  settingsJson: {
    // Example settings for video transcoding with specified queue
    Version: "2019-06-01",
    JobTemplate: "Queued",
    Outputs: [{
      ContainerSettings: {
        Container: "MP4"
      },
      VideoDescription: {
        CodecSettings: {
          Codec: "H.264"
        }
      }
    }]
  },
  Queue: "arn:aws:mediaconvert:us-east-1:123456789012:queues/Default",
  StatusUpdateInterval: "SECONDS_15"
});
```
