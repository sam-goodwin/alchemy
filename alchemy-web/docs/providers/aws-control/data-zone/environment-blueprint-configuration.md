---
title: Managing AWS DataZone EnvironmentBlueprintConfigurations with Alchemy
description: Learn how to create, update, and manage AWS DataZone EnvironmentBlueprintConfigurations using Alchemy Cloud Control.
---

# EnvironmentBlueprintConfiguration

The EnvironmentBlueprintConfiguration resource lets you create and manage [AWS DataZone EnvironmentBlueprintConfigurations](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-environmentblueprintconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environmentblueprintconfiguration = await AWS.DataZone.EnvironmentBlueprintConfiguration(
  "environmentblueprintconfiguration-example",
  {
    EnabledRegions: ["example-enabledregions-1"],
    EnvironmentBlueprintIdentifier: "example-environmentblueprintidentifier",
    DomainIdentifier: "example-domainidentifier",
  }
);
```

