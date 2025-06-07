---
title: Managing AWS GameLift ContainerGroupDefinitions with Alchemy
description: Learn how to create, update, and manage AWS GameLift ContainerGroupDefinitions using Alchemy Cloud Control.
---

# ContainerGroupDefinition

The ContainerGroupDefinition resource lets you create and manage [AWS GameLift ContainerGroupDefinitions](https://docs.aws.amazon.com/gamelift/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-gamelift-containergroupdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const containergroupdefinition = await AWS.GameLift.ContainerGroupDefinition(
  "containergroupdefinition-example",
  {
    OperatingSystem: "example-operatingsystem",
    TotalMemoryLimitMebibytes: 1,
    TotalVcpuLimit: 1,
    Name: "containergroupdefinition-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a containergroupdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedContainerGroupDefinition = await AWS.GameLift.ContainerGroupDefinition(
  "advanced-containergroupdefinition",
  {
    OperatingSystem: "example-operatingsystem",
    TotalMemoryLimitMebibytes: 1,
    TotalVcpuLimit: 1,
    Name: "containergroupdefinition-",
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

