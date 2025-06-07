---
title: Managing AWS Greengrass FunctionDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass FunctionDefinitions using Alchemy Cloud Control.
---

# FunctionDefinition

The FunctionDefinition resource lets you create and manage [AWS Greengrass FunctionDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-functiondefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const functiondefinition = await AWS.Greengrass.FunctionDefinition("functiondefinition-example", {
  Name: "functiondefinition-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a functiondefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFunctionDefinition = await AWS.Greengrass.FunctionDefinition(
  "advanced-functiondefinition",
  {
    Name: "functiondefinition-",
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

