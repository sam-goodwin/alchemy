---
title: StreamProcessor
description: Learn how to create, update, and manage AWS Rekognition StreamProcessors using Alchemy Cloud Control.
---


The StreamProcessor resource allows you to create and manage [AWS Rekognition StreamProcessors](https://docs.aws.amazon.com/rekognition/latest/userguide/) for analyzing video streams in real-time.

## Minimal Example

Create a basic StreamProcessor with required properties and a simple S3 destination.

```ts
import AWS from "alchemy/aws/control";

const simpleStreamProcessor = await AWS.Rekognition.StreamProcessor("simpleStreamProcessor", {
  RoleArn: "arn:aws:iam::123456789012:role/RekognitionAccessRole",
  KinesisVideoStream: {
    Arn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisVideoStream"
  },
  S3Destination: {
    BucketName: "my-rekognition-output-bucket",
    OutputKeyPrefix: "rekognition-output/"
  }
});
```

## Advanced Configuration

Configure a StreamProcessor with advanced settings, such as face search and notification channels.

```ts
const advancedStreamProcessor = await AWS.Rekognition.StreamProcessor("advancedStreamProcessor", {
  RoleArn: "arn:aws:iam::123456789012:role/RekognitionAccessRole",
  KinesisVideoStream: {
    Arn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisVideoStream"
  },
  S3Destination: {
    BucketName: "my-rekognition-output-bucket",
    OutputKeyPrefix: "rekognition-output/"
  },
  FaceSearchSettings: {
    CollectionId: "my-face-collection",
    FaceMatchThreshold: 95
  },
  NotificationChannel: {
    SNSTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
    Status: "ENABLED"
  }
});
```

## Using Data Sharing Preferences

Create a StreamProcessor that specifies data sharing preferences for enhanced data management.

```ts
const dataSharingStreamProcessor = await AWS.Rekognition.StreamProcessor("dataSharingStreamProcessor", {
  RoleArn: "arn:aws:iam::123456789012:role/RekognitionAccessRole",
  KinesisVideoStream: {
    Arn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisVideoStream"
  },
  S3Destination: {
    BucketName: "my-rekognition-output-bucket",
    OutputKeyPrefix: "rekognition-output/"
  },
  DataSharingPreference: {
    Status: "ENABLED"
  }
});
```

## Configuring Regions of Interest

Set up a StreamProcessor with bounding box regions of interest for focused analysis.

```ts
const regionOfInterestStreamProcessor = await AWS.Rekognition.StreamProcessor("regionOfInterestStreamProcessor", {
  RoleArn: "arn:aws:iam::123456789012:role/RekognitionAccessRole",
  KinesisVideoStream: {
    Arn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisVideoStream"
  },
  S3Destination: {
    BucketName: "my-rekognition-output-bucket",
    OutputKeyPrefix: "rekognition-output/"
  },
  BoundingBoxRegionsOfInterest: [
    { 
      Width: 0.3, 
      Height: 0.3, 
      Left: 0.1, 
      Top: 0.1 
    }
  ]
});
```
