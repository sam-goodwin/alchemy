---
title: Managing AWS IoT DomainConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IoT DomainConfigurations using Alchemy Cloud Control.
---

# DomainConfiguration

The DomainConfiguration resource lets you create and manage [AWS IoT DomainConfigurations](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-domainconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domainconfiguration = await AWS.IoT.DomainConfiguration("domainconfiguration-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a domainconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomainConfiguration = await AWS.IoT.DomainConfiguration(
  "advanced-domainconfiguration",
  {
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

