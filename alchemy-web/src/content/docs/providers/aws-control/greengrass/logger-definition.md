---
title: LoggerDefinition
description: Learn how to create, update, and manage AWS Greengrass LoggerDefinitions using Alchemy Cloud Control.
---


The LoggerDefinition resource allows you to define and manage logging configurations for AWS Greengrass, enabling you to control the log levels of your Greengrass components. For more information, visit the [AWS Greengrass LoggerDefinitions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic LoggerDefinition with a default log level and a name.

```ts
import AWS from "alchemy/aws/control";

const loggerDefinition = await AWS.Greengrass.LoggerDefinition("basicLoggerDefinition", {
  name: "BasicLogger",
  initialVersion: {
    loggers: [
      {
        name: "MyComponentLogger",
        level: "DEBUG",
        type: "AWS",
        component: "MyGreengrassComponent"
      }
    ]
  },
  tags: {
    Environment: "Development"
  }
});
```

## Advanced Configuration

Configure a LoggerDefinition with multiple loggers, each with distinct log levels.

```ts
const advancedLoggerDefinition = await AWS.Greengrass.LoggerDefinition("advancedLoggerDefinition", {
  name: "AdvancedLogger",
  initialVersion: {
    loggers: [
      {
        name: "ComponentALogger",
        level: "INFO",
        type: "AWS",
        component: "ComponentA"
      },
      {
        name: "ComponentBLogger",
        level: "ERROR",
        type: "AWS",
        component: "ComponentB"
      }
    ]
  },
  tags: {
    Environment: "Production",
    Application: "GreengrassApp"
  }
});
```

## Logger with Custom Tags

Create a LoggerDefinition that includes additional tags for resource management.

```ts
const taggedLoggerDefinition = await AWS.Greengrass.LoggerDefinition("taggedLoggerDefinition", {
  name: "TaggedLogger",
  initialVersion: {
    loggers: [
      {
        name: "SpecialLogger",
        level: "WARN",
        type: "AWS",
        component: "SpecialComponent"
      }
    ]
  },
  tags: {
    Project: "GreengrassProject",
    Owner: "DevTeam"
  }
});
```

## Logger Definition with Adoption

Create a LoggerDefinition that adopts an existing resource instead of failing if it already exists.

```ts
const adoptiveLoggerDefinition = await AWS.Greengrass.LoggerDefinition("adoptiveLoggerDefinition", {
  name: "AdoptedLogger",
  initialVersion: {
    loggers: [
      {
        name: "AdoptedLogger",
        level: "INFO",
        type: "AWS",
        component: "AdoptedComponent"
      }
    ]
  },
  adopt: true
});
```
