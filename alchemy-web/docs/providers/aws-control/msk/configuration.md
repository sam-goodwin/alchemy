---
title: Managing AWS MSK Configurations with Alchemy
description: Learn how to create, update, and manage AWS MSK Configurations using Alchemy Cloud Control.
---

# Configuration

The Configuration resource lets you manage [AWS MSK Configurations](https://docs.aws.amazon.com/msk/latest/userguide/) for Apache Kafka, allowing you to specify server properties and tuning parameters for your clusters.

## Minimal Example

Create a basic MSK configuration with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicConfiguration = await AWS.MSK.Configuration("basic-msk-configuration", {
  Name: "BasicConfiguration",
  ServerProperties: JSON.stringify({
    "auto.create.topics.enable": "true",
    "log.retention.hours": "24"
  }),
  Description: "A basic configuration for MSK cluster"
});
```

## Advanced Configuration

Configure an MSK cluster with advanced settings such as multiple Kafka versions and specific server properties.

```ts
const advancedConfiguration = await AWS.MSK.Configuration("advanced-msk-configuration", {
  Name: "AdvancedConfiguration",
  ServerProperties: JSON.stringify({
    "auto.create.topics.enable": "true",
    "log.retention.hours": "168",
    "message.max.bytes": "1000000"
  }),
  KafkaVersionsList: ["2.6.0", "2.7.0"],
  Description: "An advanced configuration for MSK cluster"
});
```

## Adoption of Existing Configuration

Adopt an existing MSK configuration by setting the `adopt` property to true.

```ts
const adoptConfiguration = await AWS.MSK.Configuration("adopt-existing-configuration", {
  Name: "ExistingConfiguration",
  ServerProperties: JSON.stringify({
    "auto.create.topics.enable": "false",
    "log.retention.hours": "48"
  }),
  adopt: true // Adopt existing resource instead of failing
});
```