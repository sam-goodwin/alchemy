---
title: Managing AWS IoTFleetWise StateTemplates with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise StateTemplates using Alchemy Cloud Control.
---

# StateTemplate

The StateTemplate resource lets you create and manage [AWS IoTFleetWise StateTemplates](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-statetemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const statetemplate = await AWS.IoTFleetWise.StateTemplate("statetemplate-example", {
  StateTemplateProperties: ["example-statetemplateproperties-1"],
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "statetemplate-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A statetemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a statetemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStateTemplate = await AWS.IoTFleetWise.StateTemplate("advanced-statetemplate", {
  StateTemplateProperties: ["example-statetemplateproperties-1"],
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "statetemplate-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A statetemplate resource managed by Alchemy",
});
```

