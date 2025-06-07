---
title: Managing AWS IoTEvents DetectorModels with Alchemy
description: Learn how to create, update, and manage AWS IoTEvents DetectorModels using Alchemy Cloud Control.
---

# DetectorModel

The DetectorModel resource lets you create and manage [AWS IoTEvents DetectorModels](https://docs.aws.amazon.com/iotevents/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotevents-detectormodel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const detectormodel = await AWS.IoTEvents.DetectorModel("detectormodel-example", {
  DetectorModelDefinition: "example-detectormodeldefinition",
  RoleArn: "example-rolearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a detectormodel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDetectorModel = await AWS.IoTEvents.DetectorModel("advanced-detectormodel", {
  DetectorModelDefinition: "example-detectormodeldefinition",
  RoleArn: "example-rolearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

