---
title: EventSourceMapping
description: Learn how to create, update, and manage AWS Lambda EventSourceMappings using Alchemy Cloud Control.
---


The EventSourceMapping resource lets you manage the configuration for AWS Lambda event source mappings, allowing your Lambda function to process events from various sources such as Amazon Kinesis, DynamoDB, and SQS. For more information, refer to the [AWS Lambda EventSourceMappings documentation](https://docs.aws.amazon.com/lambda/latest/userguide/).

## Minimal Example

Create a basic event source mapping for an Amazon DynamoDB Stream.

```ts
import AWS from "alchemy/aws/control";

const eventSourceMapping = await AWS.Lambda.EventSourceMapping("dynamoDbMapping", {
  FunctionName: "processDynamoDBStream",
  EventSourceArn: "arn:aws:dynamodb:us-west-2:123456789012:table/myDynamoDBTable/stream/2021-01-01T00:00:00.000",
  StartingPosition: "LATEST",
  BatchSize: 100,
  Enabled: true
});
```

## Advanced Configuration

Configure an event source mapping with advanced options like filtering and custom error handling.

```ts
const advancedMapping = await AWS.Lambda.EventSourceMapping("advancedMapping", {
  FunctionName: "processSqsMessages",
  EventSourceArn: "arn:aws:sqs:us-west-2:123456789012:myQueue",
  BatchSize: 10,
  MaximumRetryAttempts: 2,
  BisectBatchOnFunctionError: true,
  FilterCriteria: {
    Filters: [
      {
        Pattern: '{"eventType": ["INSERT"]}'
      }
    ]
  },
  DestinationConfig: {
    OnFailure: {
      DestinationArn: "arn:aws:sns:us-west-2:123456789012:myFailureTopic"
    }
  },
  Enabled: true
});
```

## Using Self-Managed Event Sources

Create an event source mapping for a self-managed Apache Kafka cluster.

```ts
const kafkaMapping = await AWS.Lambda.EventSourceMapping("kafkaMapping", {
  FunctionName: "processKafkaMessages",
  SelfManagedEventSource: {
    Endpoints: [
      {
        Url: "my-kafka-cluster.example.com:9092"
      }
    ]
  },
  Topics: ["myTopic"],
  StartingPosition: "TRIM_HORIZON",
  BatchSize: 100,
  Enabled: true
});
```

## Configuring Metrics and Scaling

Set up an event source mapping with metrics configuration and scaling options.

```ts
const metricsMapping = await AWS.Lambda.EventSourceMapping("metricsMapping", {
  FunctionName: "processMetrics",
  EventSourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/myKinesisStream",
  BatchSize: 5,
  MaximumBatchingWindowInSeconds: 30,
  MetricsConfig: {
    Enabled: true,
    Destination: {
      OnSuccess: {
        DestinationArn: "arn:aws:sns:us-west-2:123456789012:mySuccessTopic"
      }
    }
  },
  ScalingConfig: {
    MaximumConcurrency: 10,
    MinimumConcurrency: 1
  },
  Enabled: true
});
```
