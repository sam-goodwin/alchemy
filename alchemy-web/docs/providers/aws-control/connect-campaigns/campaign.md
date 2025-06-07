---
title: Managing AWS ConnectCampaigns Campaigns with Alchemy
description: Learn how to create, update, and manage AWS ConnectCampaigns Campaigns using Alchemy Cloud Control.
---

# Campaign

The Campaign resource lets you create and manage [AWS ConnectCampaigns Campaigns](https://docs.aws.amazon.com/connectcampaigns/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connectcampaigns-campaign.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.ConnectCampaigns.Campaign("campaign-example", {
  OutboundCallConfig: "example-outboundcallconfig",
  ConnectInstanceArn: "example-connectinstancearn",
  DialerConfig: "example-dialerconfig",
  Name: "campaign-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a campaign with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCampaign = await AWS.ConnectCampaigns.Campaign("advanced-campaign", {
  OutboundCallConfig: "example-outboundcallconfig",
  ConnectInstanceArn: "example-connectinstancearn",
  DialerConfig: "example-dialerconfig",
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

