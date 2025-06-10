---
title: WorkerConfiguration
description: Learn how to create, update, and manage AWS KafkaConnect WorkerConfigurations using Alchemy Cloud Control.
---


The WorkerConfiguration resource lets you manage [AWS KafkaConnect WorkerConfigurations](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/) and their settings.

## Minimal Example

Create a basic WorkerConfiguration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const workerConfig = await AWS.KafkaConnect.WorkerConfiguration("basicWorkerConfig", {
  PropertiesFileContent: `
    bootstrap.servers=my-broker:9092
    group.id=my-group
  `,
  Description: "Basic worker configuration for Kafka Connect",
  Name: "basic-worker-configuration"
});
```

## Advanced Configuration

Configure a WorkerConfiguration with additional properties such as tags for better organization.

```ts
const advancedWorkerConfig = await AWS.KafkaConnect.WorkerConfiguration("advancedWorkerConfig", {
  PropertiesFileContent: `
    bootstrap.servers=my-broker:9092
    group.id=my-group
    key.converter=org.apache.kafka.connect.json.JsonConverter
    value.converter=org.apache.kafka.connect.json.JsonConverter
  `,
  Description: "Advanced worker configuration with converters",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataEngineering" }
  ],
  Name: "advanced-worker-configuration"
});
```

## Resource Adoption

Create a WorkerConfiguration that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptWorkerConfig = await AWS.KafkaConnect.WorkerConfiguration("adoptWorkerConfig", {
  PropertiesFileContent: `
    bootstrap.servers=my-broker:9092
    group.id=my-group
  `,
  Description: "Worker configuration that adopts existing resource",
  Name: "adopted-worker-configuration",
  adopt: true
});
``` 

## Version Management

Demonstrate how to handle version changes in your WorkerConfiguration.

```ts
const versionedWorkerConfig = await AWS.KafkaConnect.WorkerConfiguration("versionedWorkerConfig", {
  PropertiesFileContent: `
    bootstrap.servers=my-broker:9092
    group.id=my-group
    value.converter=org.apache.kafka.connect.avro.AvroConverter
  `,
  Description: "Worker configuration with Avro converter",
  Name: "versioned-worker-configuration"
});

// Update the configuration to a new version
const updatedWorkerConfig = await AWS.KafkaConnect.WorkerConfiguration("versionedWorkerConfig", {
  PropertiesFileContent: `
    bootstrap.servers=my-broker:9092
    group.id=my-group
    value.converter=org.apache.kafka.connect.json.JsonConverter
  `,
  Description: "Updated worker configuration with JSON converter",
  Name: "versioned-worker-configuration"
});
```
