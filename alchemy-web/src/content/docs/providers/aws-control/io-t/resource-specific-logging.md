---
title: ResourceSpecificLogging
description: Learn how to create, update, and manage AWS IoT ResourceSpecificLoggings using Alchemy Cloud Control.
---


The ResourceSpecificLogging resource allows you to configure logging settings for specific AWS IoT resources, enabling you to manage logging levels for better observability and troubleshooting. For more details, refer to the [AWS IoT ResourceSpecificLoggings documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic ResourceSpecificLogging with required properties to enable logging for a specific AWS IoT resource.

```ts
import AWS from "alchemy/aws/control";

const resourceSpecificLogging = await AWS.IoT.ResourceSpecificLogging("basicLogging", {
  TargetType: "Thing",
  TargetName: "MyIoTDevice",
  LogLevel: "INFO"
});
```

## Advanced Configuration

Configure ResourceSpecificLogging with additional optional properties such as adopting an existing resource.

```ts
const advancedLogging = await AWS.IoT.ResourceSpecificLogging("advancedLogging", {
  TargetType: "Topic",
  TargetName: "MyIoTTopic",
  LogLevel: "ERROR",
  adopt: true // Adopts the existing resource if it already exists
});
```

## Debugging Logs Configuration

Set up ResourceSpecificLogging to capture detailed debugging logs for an IoT resource.

```ts
const debugLogging = await AWS.IoT.ResourceSpecificLogging("debugLogging", {
  TargetType: "Rule",
  TargetName: "MyIoTRule",
  LogLevel: "DEBUG"
});
```

## Multi-Resource Logging Setup

Create multiple ResourceSpecificLoggings for different types of resources to manage logging centrally.

```ts
const thingLogging = await AWS.IoT.ResourceSpecificLogging("thingLogging", {
  TargetType: "Thing",
  TargetName: "MyIoTDevice",
  LogLevel: "INFO"
});

const topicLogging = await AWS.IoT.ResourceSpecificLogging("topicLogging", {
  TargetType: "Topic",
  TargetName: "MyIoTTopic",
  LogLevel: "WARN"
});
```
