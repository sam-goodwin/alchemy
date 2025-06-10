---
title: AssetModel
description: Learn how to create, update, and manage AWS IoTSiteWise AssetModels using Alchemy Cloud Control.
---


The AssetModel resource lets you manage [AWS IoTSiteWise AssetModels](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for modeling and organizing industrial assets in your IoT applications.

## Minimal Example

Create a basic AssetModel with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicAssetModel = await AWS.IoTSiteWise.AssetModel("basicAssetModel", {
  AssetModelName: "PumpModel",
  AssetModelDescription: "Model for monitoring industrial pumps",
  AssetModelType: "STANDARD"
});
```

## Advanced Configuration

Configure an AssetModel with composite models, properties, and hierarchies for a more complex structure.

```ts
const advancedAssetModel = await AWS.IoTSiteWise.AssetModel("advancedAssetModel", {
  AssetModelName: "ComplexAssetModel",
  AssetModelDescription: "Model representing a complex industrial asset",
  AssetModelType: "STANDARD",
  AssetModelCompositeModels: [
    {
      name: "CompositeModel1",
      properties: [
        {
          name: "Temperature",
          type: "DOUBLE",
          unit: "Celsius"
        }
      ]
    }
  ],
  AssetModelProperties: [
    {
      name: "Pressure",
      type: "DOUBLE",
      unit: "Pascal"
    }
  ],
  AssetModelHierarchies: [
    {
      name: "Hierarchy1",
      childAssetModelId: "ChildAssetModelId"
    }
  ]
});
```

## Create with Tags

Create an AssetModel while also tagging it for resource organization and management.

```ts
const taggedAssetModel = await AWS.IoTSiteWise.AssetModel("taggedAssetModel", {
  AssetModelName: "TaggedPumpModel",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Location",
      Value: "Plant1"
    }
  ]
});
```

## Adopt Existing Resource

Use the adopt feature to manage an existing AssetModel without failing if it already exists.

```ts
const adoptAssetModel = await AWS.IoTSiteWise.AssetModel("adoptedAssetModel", {
  AssetModelName: "ExistingAssetModel",
  adopt: true
});
```
