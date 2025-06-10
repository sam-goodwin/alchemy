---
title: Configuration
description: Learn how to create, update, and manage AWS MSK Configurations using Alchemy Cloud Control.
---


The Configuration resource lets you manage [AWS MSK Configurations](https://docs.aws.amazon.com/msk/latest/userguide/) for your Apache Kafka clusters. This resource allows you to define and customize the settings used by your Kafka brokers.

## Minimal Example

Create a basic MSK configuration with essential properties.

```ts
import AWS from "alchemy/aws/control";

const mskConfiguration = await AWS.MSK.Configuration("basic-msk-configuration", {
  name: "basic-configuration",
  serverProperties: `
    auto.create.topics.enable = true
    log.retention.hours = 168
  `,
  description: "Basic configuration for MSK cluster",
  kafkaVersionsList: ["2.8.0"]
});
```

## Advanced Configuration

Define an MSK configuration with more advanced settings for performance tuning.

```ts
const advancedMskConfiguration = await AWS.MSK.Configuration("advanced-msk-configuration", {
  name: "advanced-configuration",
  serverProperties: `
    num.partitions = 3
    compression.type = gzip
    log.retention.bytes = 1073741824
  `,
  description: "Advanced configuration settings for better performance",
  kafkaVersionsList: ["2.8.0", "2.7.0"]
});
```

## Custom Configuration for Specific Use Case

Create a configuration tailored for a specific use case, such as enabling log compaction.

```ts
const compactMskConfiguration = await AWS.MSK.Configuration("compact-msk-configuration", {
  name: "compact-configuration",
  serverProperties: `
    log.cleaner.enable = true
    log.cleanup.policy = compact
    retention.ms = 86400000
  `,
  description: "Configuration that enables log compaction",
  kafkaVersionsList: ["2.8.0"]
});
``` 

## Configuration with Latest Revision

You can also specify the latest revision when creating a configuration.

```ts
const latestRevisionMskConfiguration = await AWS.MSK.Configuration("latest-revision-msk-configuration", {
  name: "latest-revision-configuration",
  serverProperties: `
    auto.create.topics.enable = true
    log.retention.hours = 24
  `,
  description: "Configuration with the latest revision specified",
  latestRevision: {
    revision: 1 // Assuming this is the desired latest revision
  }
});
```
