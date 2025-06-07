---
title: Managing AWS SSMQuickSetup ConfigurationManagers with Alchemy
description: Learn how to create, update, and manage AWS SSMQuickSetup ConfigurationManagers using Alchemy Cloud Control.
---

# ConfigurationManager

The ConfigurationManager resource lets you create and manage [AWS SSMQuickSetup ConfigurationManagers](https://docs.aws.amazon.com/ssmquicksetup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmquicksetup-configurationmanager.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationmanager = await AWS.SSMQuickSetup.ConfigurationManager(
  "configurationmanager-example",
  {
    ConfigurationDefinitions: [],
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A configurationmanager resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a configurationmanager with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfigurationManager = await AWS.SSMQuickSetup.ConfigurationManager(
  "advanced-configurationmanager",
  {
    ConfigurationDefinitions: [],
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A configurationmanager resource managed by Alchemy",
  }
);
```

