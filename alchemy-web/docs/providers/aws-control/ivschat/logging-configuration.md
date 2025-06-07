---
title: Managing AWS IVSChat LoggingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IVSChat LoggingConfigurations using Alchemy Cloud Control.
---

# LoggingConfiguration

The LoggingConfiguration resource lets you create and manage [AWS IVSChat LoggingConfigurations](https://docs.aws.amazon.com/ivschat/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivschat-loggingconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loggingconfiguration = await AWS.IVSChat.LoggingConfiguration(
  "loggingconfiguration-example",
  {
    DestinationConfiguration: "example-destinationconfiguration",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a loggingconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLoggingConfiguration = await AWS.IVSChat.LoggingConfiguration(
  "advanced-loggingconfiguration",
  {
    DestinationConfiguration: "example-destinationconfiguration",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

