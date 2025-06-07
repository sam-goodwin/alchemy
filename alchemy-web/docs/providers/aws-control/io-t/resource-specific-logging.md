---
title: Managing AWS IoT ResourceSpecificLoggings with Alchemy
description: Learn how to create, update, and manage AWS IoT ResourceSpecificLoggings using Alchemy Cloud Control.
---

# ResourceSpecificLogging

The ResourceSpecificLogging resource allows you to manage logging configurations for specific AWS IoT resources. This enables you to control the logging level of your IoT resources, facilitating better debugging and monitoring. For more detailed information, visit the [AWS IoT ResourceSpecificLoggings documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic ResourceSpecificLogging configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicLogging = await AWS.IoT.ResourceSpecificLogging("BasicLogging", {
  TargetType: "Thing",
  TargetName: "MyIoTDevice",
  LogLevel: "INFO",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Update logging settings with additional properties such as adopting existing configurations.

```ts
const AdvancedLogging = await AWS.IoT.ResourceSpecificLogging("AdvancedLogging", {
  TargetType: "Policy",
  TargetName: "MyIoTPolicy",
  LogLevel: "DEBUG",
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Logging for Multiple Resource Types

Configure logging for multiple resource types by creating separate ResourceSpecificLogging instances.

```ts
const ThingLogging = await AWS.IoT.ResourceSpecificLogging("ThingLogging", {
  TargetType: "Thing",
  TargetName: "MyIoTDevice",
  LogLevel: "ERROR",
  adopt: false // Do not adopt existing resource, fail if it exists
});

const PolicyLogging = await AWS.IoT.ResourceSpecificLogging("PolicyLogging", {
  TargetType: "Policy",
  TargetName: "MyIoTPolicy",
  LogLevel: "WARN",
  adopt: false // Do not adopt existing resource, fail if it exists
});
```

## Conditional Logging Based on Environment

Set up logging based on different environments (e.g., development, production).

```ts
const Environment = process.env.NODE_ENV || "development";

const EnvironmentLogging = await AWS.IoT.ResourceSpecificLogging("EnvLogging", {
  TargetType: "Thing",
  TargetName: Environment === "production" ? "ProductionDevice" : "DevelopmentDevice",
  LogLevel: Environment === "production" ? "ERROR" : "DEBUG",
  adopt: true // Adopt existing resource if it already exists
});
```