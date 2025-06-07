---
title: Managing AWS Greengrass LoggerDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass LoggerDefinitionVersions using Alchemy Cloud Control.
---

# LoggerDefinitionVersion

The LoggerDefinitionVersion resource lets you create and manage [AWS Greengrass LoggerDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-loggerdefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loggerdefinitionversion = await AWS.Greengrass.LoggerDefinitionVersion(
  "loggerdefinitionversion-example",
  { LoggerDefinitionId: "example-loggerdefinitionid", Loggers: [] }
);
```

