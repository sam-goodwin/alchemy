---
title: Managing AWS IoTSiteWise AssetModels with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise AssetModels using Alchemy Cloud Control.
---

# AssetModel

The AssetModel resource lets you create and manage [AWS IoTSiteWise AssetModels](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-assetmodel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const assetmodel = await AWS.IoTSiteWise.AssetModel("assetmodel-example", {
  AssetModelName: "assetmodel-assetmodel",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a assetmodel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAssetModel = await AWS.IoTSiteWise.AssetModel("advanced-assetmodel", {
  AssetModelName: "assetmodel-assetmodel",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

