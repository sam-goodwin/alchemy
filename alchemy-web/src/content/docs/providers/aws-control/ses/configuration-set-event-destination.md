---
title: ConfigurationSetEventDestination
description: Learn how to create, update, and manage AWS SES ConfigurationSetEventDestinations using Alchemy Cloud Control.
---


The `ConfigurationSetEventDestination` resource lets you manage event destinations for AWS Simple Email Service (SES) configuration sets. This enables you to track events such as bounces, complaints, and deliveries. For more details, refer to the [AWS SES ConfigurationSetEventDestinations documentation](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic SES ConfigurationSetEventDestination with required properties.

```ts
import AWS from "alchemy/aws/control";

const eventDestination = await AWS.SES.ConfigurationSetEventDestination("basicEventDestination", {
  ConfigurationSetName: "myConfigurationSet",
  EventDestination: {
    Name: "myEventDestination",
    CloudWatchDestination: {
      DimensionConfigurations: [
        {
          DimensionName: "Sentiment",
          DimensionValueSource: "messageTag",
          DefaultDimensionValue: "neutral"
        }
      ]
    }
  }
});
```

## Advanced Configuration

Configure a SES ConfigurationSetEventDestination with additional options for Amazon Kinesis Data Firehose.

```ts
const advancedEventDestination = await AWS.SES.ConfigurationSetEventDestination("advancedEventDestination", {
  ConfigurationSetName: "myAdvancedConfigurationSet",
  EventDestination: {
    Name: "myAdvancedEventDestination",
    KinesisFirehoseDestination: {
      IamRoleArn: "arn:aws:iam::123456789012:role/myKinesisFirehoseRole",
      DeliveryStreamName: "myDeliveryStream",
      BufferingHints: {
        SizeInMBs: 5,
        IntervalInSeconds: 300
      }
    }
  }
});
```

## Using Multiple Event Destinations

Demonstrate creating multiple event destinations under the same configuration set.

```ts
const eventDestination1 = await AWS.SES.ConfigurationSetEventDestination("eventDestination1", {
  ConfigurationSetName: "myMultiDestinationSet",
  EventDestination: {
    Name: "firstEventDestination",
    SnsDestination: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:mySNSTopic"
    }
  }
});

const eventDestination2 = await AWS.SES.ConfigurationSetEventDestination("eventDestination2", {
  ConfigurationSetName: "myMultiDestinationSet",
  EventDestination: {
    Name: "secondEventDestination",
    CloudWatchDestination: {
      DimensionConfigurations: [
        {
          DimensionName: "EventType",
          DimensionValueSource: "emailHeader",
          DefaultDimensionValue: "Delivery"
        }
      ]
    }
  }
});
```
