---
title: CustomPlugin
description: Learn how to create, update, and manage AWS KafkaConnect CustomPlugins using Alchemy Cloud Control.
---


The CustomPlugin resource enables you to manage [AWS KafkaConnect CustomPlugins](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/) for extending the functionality of your Kafka Connect deployments.

## Minimal Example

Create a basic CustomPlugin with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicCustomPlugin = await AWS.KafkaConnect.CustomPlugin("basicCustomPlugin", {
  name: "MyCustomPlugin",
  contentType: "application/java-archive",
  location: {
    s3: {
      bucketArn: "arn:aws:s3:::my-custom-plugin-bucket",
      objectKey: "plugins/my-plugin.jar"
    }
  },
  description: "A basic custom plugin for Kafka Connect"
});
```

## Advanced Configuration

Configure a CustomPlugin with tags for better resource management.

```ts
const advancedCustomPlugin = await AWS.KafkaConnect.CustomPlugin("advancedCustomPlugin", {
  name: "MyAdvancedCustomPlugin",
  contentType: "application/java-archive",
  location: {
    s3: {
      bucketArn: "arn:aws:s3:::my-advanced-plugin-bucket",
      objectKey: "plugins/my-advanced-plugin.jar"
    }
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "DataEngineering" }
  ],
  description: "An advanced custom plugin with tags for resource management"
});
```

## Plugin for Data Transformation

Create a CustomPlugin specifically for transforming data formats.

```ts
const transformationCustomPlugin = await AWS.KafkaConnect.CustomPlugin("transformationCustomPlugin", {
  name: "MyTransformationPlugin",
  contentType: "application/java-archive",
  location: {
    s3: {
      bucketArn: "arn:aws:s3:::my-transformation-plugin-bucket",
      objectKey: "plugins/my-transformation-plugin.jar"
    }
  },
  description: "A custom plugin for data transformation in Kafka Connect"
});
```

## Plugin with Adoption

Create a CustomPlugin that adopts an existing resource instead of failing.

```ts
const adoptCustomPlugin = await AWS.KafkaConnect.CustomPlugin("adoptCustomPlugin", {
  name: "MyAdoptedCustomPlugin",
  contentType: "application/java-archive",
  location: {
    s3: {
      bucketArn: "arn:aws:s3:::my-adopted-plugin-bucket",
      objectKey: "plugins/my-adopted-plugin.jar"
    }
  },
  adopt: true, // Adopt existing resource
  description: "A custom plugin that adopts an existing resource"
});
```
