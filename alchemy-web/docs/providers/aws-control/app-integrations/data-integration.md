---
title: Managing AWS AppIntegrations DataIntegrations with Alchemy
description: Learn how to create, update, and manage AWS AppIntegrations DataIntegrations using Alchemy Cloud Control.
---

# DataIntegration

The DataIntegration resource lets you create and manage [AWS AppIntegrations DataIntegrations](https://docs.aws.amazon.com/appintegrations/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appintegrations-dataintegration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const dataintegration = await AWS.AppIntegrations.DataIntegration("dataintegration-example", {
  SourceURI: "example-sourceuri",
  KmsKey: "example-kmskey",
  Name: "dataintegration-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A dataintegration resource managed by Alchemy",
});
```

## Advanced Configuration

Create a dataintegration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataIntegration = await AWS.AppIntegrations.DataIntegration(
  "advanced-dataintegration",
  {
    SourceURI: "example-sourceuri",
    KmsKey: "example-kmskey",
    Name: "dataintegration-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A dataintegration resource managed by Alchemy",
  }
);
```

