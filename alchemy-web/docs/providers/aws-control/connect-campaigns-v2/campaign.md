---
title: Managing AWS ConnectCampaignsV2 Campaigns with Alchemy
description: Learn how to create, update, and manage AWS ConnectCampaignsV2 Campaigns using Alchemy Cloud Control.
---

# Campaign

The Campaign resource lets you create and manage [AWS ConnectCampaignsV2 Campaigns](https://docs.aws.amazon.com/connectcampaignsv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connectcampaignsv2-campaign.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.ConnectCampaignsV2.Campaign("campaign-example", {
  ChannelSubtypeConfig: "example-channelsubtypeconfig",
  ConnectInstanceId: "example-connectinstanceid",
  Name: "campaign-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a campaign with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCampaign = await AWS.ConnectCampaignsV2.Campaign("advanced-campaign", {
  ChannelSubtypeConfig: "example-channelsubtypeconfig",
  ConnectInstanceId: "example-connectinstanceid",
  Name: "campaign-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

