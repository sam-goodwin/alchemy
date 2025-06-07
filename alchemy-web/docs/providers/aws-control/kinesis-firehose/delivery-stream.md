---
title: Managing AWS KinesisFirehose DeliveryStreams with Alchemy
description: Learn how to create, update, and manage AWS KinesisFirehose DeliveryStreams using Alchemy Cloud Control.
---

# DeliveryStream

The DeliveryStream resource lets you create and manage [AWS KinesisFirehose DeliveryStreams](https://docs.aws.amazon.com/kinesisfirehose/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisfirehose-deliverystream.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deliverystream = await AWS.KinesisFirehose.DeliveryStream("deliverystream-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a deliverystream with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDeliveryStream = await AWS.KinesisFirehose.DeliveryStream("advanced-deliverystream", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

