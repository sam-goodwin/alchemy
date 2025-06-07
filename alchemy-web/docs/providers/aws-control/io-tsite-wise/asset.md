---
title: Managing AWS IoTSiteWise Assets with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Assets using Alchemy Cloud Control.
---

# Asset

The Asset resource lets you create and manage [AWS IoTSiteWise Assets](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-asset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const asset = await AWS.IoTSiteWise.Asset("asset-example", {
  AssetModelId: "example-assetmodelid",
  AssetName: "asset-asset",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a asset with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAsset = await AWS.IoTSiteWise.Asset("advanced-asset", {
  AssetModelId: "example-assetmodelid",
  AssetName: "asset-asset",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

