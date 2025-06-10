---
title: Channel
description: Learn how to create, update, and manage AWS IoTAnalytics Channels using Alchemy Cloud Control.
---


The Channel resource lets you manage [AWS IoTAnalytics Channels](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) for collecting and processing IoT data streams.

## Minimal Example

Create a basic IoTAnalytics Channel with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicChannel = await AWS.IoTAnalytics.Channel("basicChannel", {
  ChannelName: "TemperatureDataChannel",
  ChannelStorage: {
    Type: "S3",
    S3: {
      Bucket: "iotanalytics-data-bucket",
      KeyPrefix: "temperature-data/"
    }
  },
  RetentionPeriod: {
    NumberOfDays: 30,
    Unlimited: false
  }
});
```

## Advanced Configuration

Configure a channel with tags for better organization and management.

```ts
const taggedChannel = await AWS.IoTAnalytics.Channel("taggedChannel", {
  ChannelName: "HumidityDataChannel",
  ChannelStorage: {
    Type: "S3",
    S3: {
      Bucket: "iotanalytics-data-bucket",
      KeyPrefix: "humidity-data/"
    }
  },
  RetentionPeriod: {
    NumberOfDays: 60,
    Unlimited: false
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "WeatherMonitoring"
    }
  ]
});
```

## Adoption of Existing Channel

This example demonstrates how to adopt an existing channel instead of failing when it already exists.

```ts
const existingChannel = await AWS.IoTAnalytics.Channel("existingChannel", {
  ChannelName: "PressureDataChannel",
  ChannelStorage: {
    Type: "S3",
    S3: {
      Bucket: "iotanalytics-data-bucket",
      KeyPrefix: "pressure-data/"
    }
  },
  RetentionPeriod: {
    NumberOfDays: 90,
    Unlimited: false
  },
  adopt: true // Adopt the existing resource
});
```
