---
title: Managing AWS GroundStation Configs with Alchemy
description: Learn how to create, update, and manage AWS GroundStation Configs using Alchemy Cloud Control.
---

# Config

The Config resource lets you create and manage [AWS GroundStation Configs](https://docs.aws.amazon.com/groundstation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-config.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const config = await AWS.GroundStation.Config("config-example", {
  ConfigData: "example-configdata",
  Name: "config-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a config with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfig = await AWS.GroundStation.Config("advanced-config", {
  ConfigData: "example-configdata",
  Name: "config-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

