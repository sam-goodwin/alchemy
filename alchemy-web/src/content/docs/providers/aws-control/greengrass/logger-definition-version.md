---
title: LoggerDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass LoggerDefinitionVersions using Alchemy Cloud Control.
---


The LoggerDefinitionVersion resource allows you to manage logger definitions for AWS Greengrass, enabling you to control logging configurations for your Greengrass components. For more details, refer to the [AWS Greengrass LoggerDefinitionVersions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic LoggerDefinitionVersion with required properties.

```ts
import AWS from "alchemy/aws/control";

const loggerDefinitionVersion = await AWS.Greengrass.LoggerDefinitionVersion("basicLoggerDefinitionVersion", {
  LoggerDefinitionId: "myLoggerDefinitionId",
  Loggers: [
    {
      LoggerId: "myLogger",
      Level: "INFO",
      Space: 1024,
      Type: "File"
    }
  ]
});
```

## Advanced Configuration

Configure a LoggerDefinitionVersion with multiple loggers and an optional adoption flag.

```ts
const advancedLoggerDefinitionVersion = await AWS.Greengrass.LoggerDefinitionVersion("advancedLoggerDefinitionVersion", {
  LoggerDefinitionId: "myAdvancedLoggerDefinitionId",
  Loggers: [
    {
      LoggerId: "myFileLogger",
      Level: "DEBUG",
      Space: 2048,
      Type: "File"
    },
    {
      LoggerId: "myStreamLogger",
      Level: "ERROR",
      Space: 512,
      Type: "Stream"
    }
  ],
  adopt: true // Indicates to adopt existing resources instead of failing
});
```

## Custom Logger Example

Create a LoggerDefinitionVersion with a custom logger configuration for a stream logger.

```ts
const customLoggerDefinitionVersion = await AWS.Greengrass.LoggerDefinitionVersion("customLoggerDefinitionVersion", {
  LoggerDefinitionId: "myCustomLoggerDefinitionId",
  Loggers: [
    {
      LoggerId: "myCustomStreamLogger",
      Level: "WARN",
      Space: 512,
      Type: "Stream"
    }
  ]
});
```

## Multiple Loggers Example

Define a LoggerDefinitionVersion with multiple loggers for different log levels.

```ts
const multipleLoggersDefinitionVersion = await AWS.Greengrass.LoggerDefinitionVersion("multipleLoggersDefinitionVersion", {
  LoggerDefinitionId: "myMultipleLoggersId",
  Loggers: [
    {
      LoggerId: "infoLogger",
      Level: "INFO",
      Space: 1024,
      Type: "File"
    },
    {
      LoggerId: "errorLogger",
      Level: "ERROR",
      Space: 2048,
      Type: "File"
    },
    {
      LoggerId: "debugLogger",
      Level: "DEBUG",
      Space: 1024,
      Type: "Stream"
    }
  ]
});
```
