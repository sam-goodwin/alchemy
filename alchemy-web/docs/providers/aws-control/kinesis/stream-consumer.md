---
title: Managing AWS Kinesis StreamConsumers with Alchemy
description: Learn how to create, update, and manage AWS Kinesis StreamConsumers using Alchemy Cloud Control.
---

# StreamConsumer

The StreamConsumer resource lets you create and manage [AWS Kinesis StreamConsumers](https://docs.aws.amazon.com/kinesis/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesis-streamconsumer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const streamconsumer = await AWS.Kinesis.StreamConsumer("streamconsumer-example", {
  ConsumerName: "streamconsumer-consumer",
  StreamARN: "example-streamarn",
});
```

