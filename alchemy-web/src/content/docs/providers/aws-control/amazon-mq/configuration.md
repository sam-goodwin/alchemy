---
title: Configuration
description: Learn how to create, update, and manage AWS AmazonMQ Configurations using Alchemy Cloud Control.
---


The Configuration resource lets you manage [AWS AmazonMQ Configurations](https://docs.aws.amazon.com/amazonmq/latest/userguide/) for creating and managing message brokers in the cloud.

## Minimal Example

Create a basic AmazonMQ configuration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const amazonMqConfig = await AWS.AmazonMQ.Configuration("basic-config", {
  name: "MyBasicConfig",
  engineType: "ActiveMQ",
  engineVersion: "5.15.14", 
  description: "A basic configuration for ActiveMQ"
});
```

## Advanced Configuration

Configure an AmazonMQ resource with advanced settings such as a custom authentication strategy.

```ts
const advancedMqConfig = await AWS.AmazonMQ.Configuration("advanced-config", {
  name: "MyAdvancedConfig",
  engineType: "RabbitMQ",
  engineVersion: "3.8.9",
  description: "An advanced configuration for RabbitMQ with authentication strategy",
  authenticationStrategy: "SIMPLE",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Configuration with Custom Data

Demonstrate creating a configuration with specific data settings.

```ts
const customDataConfig = await AWS.AmazonMQ.Configuration("custom-data-config", {
  name: "MyCustomDataConfig",
  engineType: "ActiveMQ",
  engineVersion: "5.15.14",
  data: JSON.stringify({
    "broker": {
      "type": "persistent",
      "maxConnections": 500
    }
  }),
  description: "Configuration with custom data settings"
});
```

## Configuration with Tags

Create a configuration that includes tagging for resource management.

```ts
const taggedConfig = await AWS.AmazonMQ.Configuration("tagged-config", {
  name: "MyTaggedConfig",
  engineType: "RabbitMQ",
  engineVersion: "3.8.9",
  description: "Configuration tagged for easy identification",
  tags: [
    { key: "Project", value: "MessagingService" },
    { key: "Owner", value: "TeamAlpha" }
  ]
});
```
