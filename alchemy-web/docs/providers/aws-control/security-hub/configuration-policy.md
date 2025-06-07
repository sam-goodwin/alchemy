---
title: Managing AWS SecurityHub ConfigurationPolicys with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub ConfigurationPolicys using Alchemy Cloud Control.
---

# ConfigurationPolicy

The ConfigurationPolicy resource lets you create and manage [AWS SecurityHub ConfigurationPolicys](https://docs.aws.amazon.com/securityhub/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securityhub-configurationpolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationpolicy = await AWS.SecurityHub.ConfigurationPolicy(
  "configurationpolicy-example",
  {
    ConfigurationPolicy: "example-configurationpolicy",
    Name: "configurationpolicy-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A configurationpolicy resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a configurationpolicy with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfigurationPolicy = await AWS.SecurityHub.ConfigurationPolicy(
  "advanced-configurationpolicy",
  {
    ConfigurationPolicy: "example-configurationpolicy",
    Name: "configurationpolicy-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A configurationpolicy resource managed by Alchemy",
  }
);
```

