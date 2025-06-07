---
title: Managing AWS Greengrass ConnectorDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass ConnectorDefinitions using Alchemy Cloud Control.
---

# ConnectorDefinition

The ConnectorDefinition resource lets you create and manage [AWS Greengrass ConnectorDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-connectordefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connectordefinition = await AWS.Greengrass.ConnectorDefinition(
  "connectordefinition-example",
  { Name: "connectordefinition-", Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a connectordefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnectorDefinition = await AWS.Greengrass.ConnectorDefinition(
  "advanced-connectordefinition",
  {
    Name: "connectordefinition-",
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

