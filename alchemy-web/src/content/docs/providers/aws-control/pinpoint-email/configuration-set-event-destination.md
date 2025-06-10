---
title: ConfigurationSetEventDestination
description: Learn how to create, update, and manage AWS PinpointEmail ConfigurationSetEventDestinations using Alchemy Cloud Control.
---


The ConfigurationSetEventDestination resource allows you to manage event destinations for AWS PinpointEmail configuration sets, enabling the tracking of email events such as bounces and complaints. For more details, refer to the [AWS PinpointEmail ConfigurationSetEventDestinations](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) documentation.

## Minimal Example

Create a basic configuration set event destination with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const eventDestination = await AWS.PinpointEmail.ConfigurationSetEventDestination("basicEventDestination", {
  EventDestinationName: "MyEventDestination",
  ConfigurationSetName: "MyConfigurationSet",
  EventDestination: {
    CloudWatchDestination: {
      DimensionConfigurations: [{
        DefaultDimensionValue: "default",
        DimensionName: "emailId",
        DimensionValueSource: "messageTag"
      }]
    },
    KinesisFirehoseDestination: {
      DeliveryStreamARN: "arn:aws:firehose:us-west-2:123456789012:deliverystream/my-delivery-stream",
      IAMRoleARN: "arn:aws:iam::123456789012:role/my-role"
    }
  }
});
```

## Advanced Configuration

Configure an event destination with multiple destinations for improved tracking capabilities:

```ts
const advancedEventDestination = await AWS.PinpointEmail.ConfigurationSetEventDestination("advancedEventDestination", {
  EventDestinationName: "AdvancedEventDestination",
  ConfigurationSetName: "MyConfigurationSet",
  EventDestination: {
    CloudWatchDestination: {
      DimensionConfigurations: [{
        DefaultDimensionValue: "default",
        DimensionName: "emailId",
        DimensionValueSource: "messageTag"
      }]
    },
    KinesisFirehoseDestination: {
      DeliveryStreamARN: "arn:aws:firehose:us-west-2:123456789012:deliverystream/my-delivery-stream",
      IAMRoleARN: "arn:aws:iam::123456789012:role/my-role"
    },
    SnsDestination: {
      TopicARN: "arn:aws:sns:us-west-2:123456789012:my-sns-topic"
    }
  }
});
```

## Using for Multiple Destinations

Set up event destinations to track different events across multiple platforms:

```ts
const multiDestinationEvent = await AWS.PinpointEmail.ConfigurationSetEventDestination("multiDestinationEvent", {
  EventDestinationName: "MultiDestinationEvent",
  ConfigurationSetName: "MyConfigurationSet",
  EventDestination: {
    CloudWatchDestination: {
      DimensionConfigurations: [{
        DefaultDimensionValue: "default",
        DimensionName: "emailId",
        DimensionValueSource: "messageTag"
      }]
    },
    SnsDestination: {
      TopicARN: "arn:aws:sns:us-west-2:123456789012:my-sns-topic"
    },
    KinesisFirehoseDestination: {
      DeliveryStreamARN: "arn:aws:firehose:us-west-2:123456789012:deliverystream/my-delivery-stream",
      IAMRoleARN: "arn:aws:iam::123456789012:role/my-role"
    }
  }
});
```
