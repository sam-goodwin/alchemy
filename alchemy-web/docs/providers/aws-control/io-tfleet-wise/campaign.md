---
title: Managing AWS IoTFleetWise Campaigns with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise Campaigns using Alchemy Cloud Control.
---

# Campaign

The Campaign resource lets you create and manage [AWS IoTFleetWise Campaigns](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-campaign.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.IoTFleetWise.Campaign("campaign-example", {
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "campaign-",
  TargetArn: "example-targetarn",
  CollectionScheme: "example-collectionscheme",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A campaign resource managed by Alchemy",
});
```

## Advanced Configuration

Create a campaign with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCampaign = await AWS.IoTFleetWise.Campaign("advanced-campaign", {
  SignalCatalogArn: "example-signalcatalogarn",
  Name: "campaign-",
  TargetArn: "example-targetarn",
  CollectionScheme: "example-collectionscheme",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A campaign resource managed by Alchemy",
});
```

