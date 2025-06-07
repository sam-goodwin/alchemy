---
title: Managing AWS Rekognition StreamProcessors with Alchemy
description: Learn how to create, update, and manage AWS Rekognition StreamProcessors using Alchemy Cloud Control.
---

# StreamProcessor

The StreamProcessor resource lets you create and manage [AWS Rekognition StreamProcessors](https://docs.aws.amazon.com/rekognition/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-streamprocessor.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const streamprocessor = await AWS.Rekognition.StreamProcessor("streamprocessor-example", {
  RoleArn: "example-rolearn",
  KinesisVideoStream: "example-kinesisvideostream",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a streamprocessor with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStreamProcessor = await AWS.Rekognition.StreamProcessor("advanced-streamprocessor", {
  RoleArn: "example-rolearn",
  KinesisVideoStream: "example-kinesisvideostream",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

