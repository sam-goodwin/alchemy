---
title: StreamConsumer
description: Learn how to create, update, and manage AWS Kinesis StreamConsumers using Alchemy Cloud Control.
---


The StreamConsumer resource allows you to manage [AWS Kinesis StreamConsumers](https://docs.aws.amazon.com/kinesis/latest/userguide/) that provide a way to read and process data from Kinesis streams.

## Minimal Example

Create a basic Kinesis StreamConsumer with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicStreamConsumer = await AWS.Kinesis.StreamConsumer("basicStreamConsumer", {
  ConsumerName: "MyStreamConsumer",
  StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a Kinesis StreamConsumer with additional properties like specifying a unique consumer name.

```ts
const advancedStreamConsumer = await AWS.Kinesis.StreamConsumer("advancedStreamConsumer", {
  ConsumerName: "UniqueStreamConsumerName",
  StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
  adopt: false // Do not adopt if resource already exists
});
```

## Reading Data from the Stream

Implement a consumer application that reads data from the Kinesis stream using the created StreamConsumer.

```ts
import AWS from "alchemy/aws/control";

const consumerApplication = await AWS.Kinesis.StreamConsumer("dataReader", {
  ConsumerName: "DataReaderConsumer",
  StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream"
});

// Example code to process data would be added here
console.log(`Consumer ARN: ${consumerApplication.Arn}`);
```

## Updating an Existing StreamConsumer

Update an existing StreamConsumer to change its name or other properties.

```ts
const updatedStreamConsumer = await AWS.Kinesis.StreamConsumer("updateStreamConsumer", {
  ConsumerName: "UpdatedStreamConsumerName",
  StreamARN: "arn:aws:kinesis:us-east-1:123456789012:stream/MyKinesisStream",
  adopt: true // This will allow the update to proceed if the consumer already exists
});
```
