---
title: Managing AWS Greengrass ResourceDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass ResourceDefinitions using Alchemy Cloud Control.
---

# ResourceDefinition

The ResourceDefinition resource lets you create and manage [AWS Greengrass ResourceDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-resourcedefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcedefinition = await AWS.Greengrass.ResourceDefinition("resourcedefinition-example", {
  Name: "resourcedefinition-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a resourcedefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResourceDefinition = await AWS.Greengrass.ResourceDefinition(
  "advanced-resourcedefinition",
  {
    Name: "resourcedefinition-",
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

