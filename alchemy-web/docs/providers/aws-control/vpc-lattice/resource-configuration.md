---
title: Managing AWS VpcLattice ResourceConfigurations with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice ResourceConfigurations using Alchemy Cloud Control.
---

# ResourceConfiguration

The ResourceConfiguration resource lets you create and manage [AWS VpcLattice ResourceConfigurations](https://docs.aws.amazon.com/vpclattice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-vpclattice-resourceconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourceconfiguration = await AWS.VpcLattice.ResourceConfiguration(
  "resourceconfiguration-example",
  {
    ResourceConfigurationType: "example-resourceconfigurationtype",
    Name: "resourceconfiguration-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a resourceconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResourceConfiguration = await AWS.VpcLattice.ResourceConfiguration(
  "advanced-resourceconfiguration",
  {
    ResourceConfigurationType: "example-resourceconfigurationtype",
    Name: "resourceconfiguration-",
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

