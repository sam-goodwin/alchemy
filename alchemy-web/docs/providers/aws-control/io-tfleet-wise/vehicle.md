---
title: Managing AWS IoTFleetWise Vehicles with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise Vehicles using Alchemy Cloud Control.
---

# Vehicle

The Vehicle resource lets you create and manage [AWS IoTFleetWise Vehicles](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-vehicle.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vehicle = await AWS.IoTFleetWise.Vehicle("vehicle-example", {
  DecoderManifestArn: "example-decodermanifestarn",
  ModelManifestArn: "example-modelmanifestarn",
  Name: "vehicle-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a vehicle with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVehicle = await AWS.IoTFleetWise.Vehicle("advanced-vehicle", {
  DecoderManifestArn: "example-decodermanifestarn",
  ModelManifestArn: "example-modelmanifestarn",
  Name: "vehicle-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

