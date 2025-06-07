---
title: Managing AWS Pinpoint Campaigns with Alchemy
description: Learn how to create, update, and manage AWS Pinpoint Campaigns using Alchemy Cloud Control.
---

# Campaign

The Campaign resource lets you create and manage [AWS Pinpoint Campaigns](https://docs.aws.amazon.com/pinpoint/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpoint-campaign.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.Pinpoint.Campaign("campaign-example", {
  SegmentId: "example-segmentid",
  Name: "campaign-",
  Schedule: "example-schedule",
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A campaign resource managed by Alchemy",
});
```

## Advanced Configuration

Create a campaign with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCampaign = await AWS.Pinpoint.Campaign("advanced-campaign", {
  SegmentId: "example-segmentid",
  Name: "campaign-",
  Schedule: "example-schedule",
  ApplicationId: "example-applicationid",
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

