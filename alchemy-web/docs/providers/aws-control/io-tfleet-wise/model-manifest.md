---
title: Managing AWS IoTFleetWise ModelManifests with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise ModelManifests using Alchemy Cloud Control.
---

# ModelManifest

The ModelManifest resource lets you create and manage [AWS IoTFleetWise ModelManifests](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-modelmanifest.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const modelmanifest = await AWS.IoTFleetWise.ModelManifest("modelmanifest-example", {
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "modelmanifest-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A modelmanifest resource managed by Alchemy",
});
```

## Advanced Configuration

Create a modelmanifest with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedModelManifest = await AWS.IoTFleetWise.ModelManifest("advanced-modelmanifest", {
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "modelmanifest-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A modelmanifest resource managed by Alchemy",
});
```

