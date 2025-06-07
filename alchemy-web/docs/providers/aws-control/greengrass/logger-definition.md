---
title: Managing AWS Greengrass LoggerDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass LoggerDefinitions using Alchemy Cloud Control.
---

# LoggerDefinition

The LoggerDefinition resource lets you create and manage [AWS Greengrass LoggerDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-loggerdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loggerdefinition = await AWS.Greengrass.LoggerDefinition("loggerdefinition-example", {
  Name: "loggerdefinition-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a loggerdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLoggerDefinition = await AWS.Greengrass.LoggerDefinition(
  "advanced-loggerdefinition",
  {
    Name: "loggerdefinition-",
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

