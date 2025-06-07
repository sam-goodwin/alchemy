---
title: Managing AWS Greengrass CoreDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass CoreDefinitions using Alchemy Cloud Control.
---

# CoreDefinition

The CoreDefinition resource lets you create and manage [AWS Greengrass CoreDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-coredefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const coredefinition = await AWS.Greengrass.CoreDefinition("coredefinition-example", {
  Name: "coredefinition-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a coredefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCoreDefinition = await AWS.Greengrass.CoreDefinition("advanced-coredefinition", {
  Name: "coredefinition-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

