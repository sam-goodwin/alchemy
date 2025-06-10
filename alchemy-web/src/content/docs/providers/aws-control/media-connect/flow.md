---
title: Flow
description: Learn how to create, update, and manage AWS MediaConnect Flows using Alchemy Cloud Control.
---


The Flow resource allows you to create and manage [AWS MediaConnect Flows](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) for transporting live video over the internet. This resource provides an efficient way to configure the flow of media from sources to destinations.

## Minimal Example

Create a basic MediaConnect Flow with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const mediaConnectFlow = await AWS.MediaConnect.Flow("myMediaFlow", {
  name: "MyLiveStreamFlow",
  source: {
    name: "MySource",
    url: "rtmp://my-source-url",
    protocol: "rtmp"
  },
  sourceMonitoringConfig: {
    clockRate: 90000,
    audioLevel: 0.5
  },
  availabilityZone: "us-west-2a"
});
```

## Advanced Configuration

Configure a MediaConnect Flow with advanced settings, including failover and VPC interfaces.

```ts
const advancedFlow = await AWS.MediaConnect.Flow("advancedMediaFlow", {
  name: "AdvancedLiveStreamFlow",
  source: {
    name: "MyAdvancedSource",
    url: "rtmp://my-advanced-source-url",
    protocol: "rtmp"
  },
  sourceFailoverConfig: {
    secondarySource: {
      name: "MySecondarySource",
      url: "rtmp://my-secondary-source-url",
      protocol: "rtmp"
    },
    failoverMode: "MANUAL"
  },
  vpcInterfaces: [
    {
      name: "VPCInterface1",
      subnetId: "subnet-12345678",
      securityGroupIds: ["sg-12345678"]
    }
  ]
});
```

## Configuring Media Streams

Create a MediaConnect Flow that includes multiple media streams for different content types.

```ts
const mediaStreamFlow = await AWS.MediaConnect.Flow("mediaStreamFlow", {
  name: "MediaStreamFlow",
  source: {
    name: "MyStreamSource",
    url: "rtmp://my-stream-source-url",
    protocol: "rtmp"
  },
  mediaStreams: [
    {
      name: "VideoStream",
      type: "video",
      sourceType: "embedded"
    },
    {
      name: "AudioStream",
      type: "audio",
      sourceType: "embedded"
    }
  ]
});
```

## Monitoring and Maintenance

Set up a MediaConnect Flow with monitoring and maintenance configurations.

```ts
const monitoredFlow = await AWS.MediaConnect.Flow("monitoredFlow", {
  name: "MonitoredFlow",
  source: {
    name: "MonitoredSource",
    url: "rtmp://my-monitored-source-url",
    protocol: "rtmp"
  },
  maintenance: {
    maintenanceWindowStart: "2023-10-01T00:00:00Z",
    maintenanceWindowEnd: "2023-10-01T04:00:00Z"
  },
  sourceMonitoringConfig: {
    clockRate: 90000,
    audioLevel: 0.8
  }
});
```
