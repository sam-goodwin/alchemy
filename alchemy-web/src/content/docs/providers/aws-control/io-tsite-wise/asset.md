---
title: Asset
description: Learn how to create, update, and manage AWS IoTSiteWise Assets using Alchemy Cloud Control.
---


The Asset resource lets you manage [AWS IoTSiteWise Assets](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) and their properties, enabling you to model physical assets in your IoT applications.

## Minimal Example

Create a basic IoTSiteWise Asset with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAsset = await AWS.IoTSiteWise.Asset("basicAsset", {
  assetModelId: "assetModel123",
  assetName: "Plant01",
  assetDescription: "Primary production plant asset",
  assetExternalId: "plant-01-external",
  tags: [
    { key: "location", value: "factory" }
  ]
});
```

## Advanced Configuration

Configure an Asset with additional properties including custom asset properties and hierarchies.

```ts
const advancedAsset = await AWS.IoTSiteWise.Asset("advancedAsset", {
  assetModelId: "assetModel456",
  assetName: "Pump01",
  assetDescription: "High-efficiency water pump",
  assetProperties: [
    {
      name: "OperationalStatus",
      dataType: "STRING",
      type: { type: "PROPERTY" }
    },
    {
      name: "FlowRate",
      dataType: "DOUBLE",
      type: { type: "PROPERTY" }
    }
  ],
  assetHierarchies: [
    {
      hierarchyId: "PlantHierarchy",
      childAssetId: "advancedAsset"
    }
  ]
});
```

## Adoption of Existing Resource

If you need to adopt an existing Asset instead of creating a new one, you can set the adopt property to true.

```ts
const adoptingExistingAsset = await AWS.IoTSiteWise.Asset("existingAsset", {
  assetModelId: "assetModel789",
  assetName: "ExistingAsset01",
  adopt: true
});
```

## Using Tags for Organization

Create an Asset with multiple tags to help with organization and management.

```ts
const taggedAsset = await AWS.IoTSiteWise.Asset("taggedAsset", {
  assetModelId: "assetModel321",
  assetName: "Sensor01",
  tags: [
    { key: "sensorType", value: "temperature" },
    { key: "location", value: "warehouse" },
    { key: "status", value: "active" }
  ]
});
```
