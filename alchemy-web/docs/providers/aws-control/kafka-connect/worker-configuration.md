---
title: Managing AWS KafkaConnect WorkerConfigurations with Alchemy
description: Learn how to create, update, and manage AWS KafkaConnect WorkerConfigurations using Alchemy Cloud Control.
---

# WorkerConfiguration

The WorkerConfiguration resource allows you to manage AWS KafkaConnect WorkerConfigurations, which are essential for defining the execution environment for your connectors. For more information, refer to the [AWS KafkaConnect WorkerConfigurations documentation](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/).

## Minimal Example

Create a basic WorkerConfiguration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicWorkerConfiguration = await AWS.KafkaConnect.WorkerConfiguration("BasicWorkerConfig", {
  PropertiesFileContent: JSON.stringify({
    "bootstrap.servers": "my.kafka.broker:9092",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
  }),
  Name: "BasicWorkerConfig",
  Description: "A basic worker configuration for Kafka Connect",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a WorkerConfiguration with additional settings for enhanced functionality and performance.

```ts
const AdvancedWorkerConfiguration = await AWS.KafkaConnect.WorkerConfiguration("AdvancedWorkerConfig", {
  PropertiesFileContent: JSON.stringify({
    "bootstrap.servers": "my.kafka.broker:9092",
    "group.id": "my-consumer-group",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "offset.flush.interval.ms": "10000"
  }),
  Name: "AdvancedWorkerConfig",
  Description: "An advanced worker configuration with custom settings",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Configuration with Custom Properties

Demonstrate how to set up a WorkerConfiguration with unique properties tailored for a specific use case.

```ts
const CustomPropertiesWorkerConfiguration = await AWS.KafkaConnect.WorkerConfiguration("CustomPropertiesWorkerConfig", {
  PropertiesFileContent: JSON.stringify({
    "bootstrap.servers": "my.kafka.broker:9092",
    "key.converter": "org.apache.kafka.connect.avro.AvroConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "schema.registry.url": "http://my.schema.registry:8081"
  }),
  Name: "CustomPropertiesWorkerConfig",
  Description: "Worker configuration using Avro converter with schema registry",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```