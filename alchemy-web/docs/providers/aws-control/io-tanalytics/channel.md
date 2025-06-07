---
title: Managing AWS IoTAnalytics Channels with Alchemy
description: Learn how to create, update, and manage AWS IoTAnalytics Channels using Alchemy Cloud Control.
---

# Channel

The Channel resource allows you to manage [AWS IoTAnalytics Channels](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) for collecting and storing IoT data.

## Minimal Example

Create a basic IoTAnalytics Channel with a name and retention period.

```ts
import AWS from "alchemy/aws/control";

const basicChannel = await AWS.IoTAnalytics.Channel("BasicIoTChannel", {
  ChannelName: "MyIoTChannel",
  RetentionPeriod: {
    NumberOfDays: 30,
    Unlimited: false
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Advanced Configuration

Configure a channel with specific storage settings and retention policies.

```ts
const advancedChannel = await AWS.IoTAnalytics.Channel("AdvancedIoTChannel", {
  ChannelName: "AdvancedIoTChannel",
  ChannelStorage: {
    CustomerManagedS3: {
      Bucket: "my-iot-data-bucket",
      KeyPrefix: "channels/advanced/",
      RoleArn: "arn:aws:iam::123456789012:role/myIoTAnalyticsRole"
    }
  },
  RetentionPeriod: {
    NumberOfDays: 60,
    Unlimited: false
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing channel instead of creating a new one, set the `adopt` property to true.

```ts
const adoptedChannel = await AWS.IoTAnalytics.Channel("AdoptedIoTChannel", {
  ChannelName: "ExistingIoTChannel",
  adopt: true
});
```

## Custom Retention Period

Create a channel with an unlimited retention period.

```ts
const unlimitedRetentionChannel = await AWS.IoTAnalytics.Channel("UnlimitedRetentionChannel", {
  ChannelName: "MyUnlimitedRetentionChannel",
  RetentionPeriod: {
    Unlimited: true
  },
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```