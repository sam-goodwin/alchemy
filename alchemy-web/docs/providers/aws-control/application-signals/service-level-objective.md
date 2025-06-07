---
title: Managing AWS ApplicationSignals ServiceLevelObjectives with Alchemy
description: Learn how to create, update, and manage AWS ApplicationSignals ServiceLevelObjectives using Alchemy Cloud Control.
---

# ServiceLevelObjective

The ServiceLevelObjective resource lets you create and manage [AWS ApplicationSignals ServiceLevelObjectives](https://docs.aws.amazon.com/applicationsignals/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-applicationsignals-servicelevelobjective.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const servicelevelobjective = await AWS.ApplicationSignals.ServiceLevelObjective(
  "servicelevelobjective-example",
  {
    Name: "servicelevelobjective-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A servicelevelobjective resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a servicelevelobjective with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServiceLevelObjective = await AWS.ApplicationSignals.ServiceLevelObjective(
  "advanced-servicelevelobjective",
  {
    Name: "servicelevelobjective-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A servicelevelobjective resource managed by Alchemy",
  }
);
```

