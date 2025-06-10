---
title: Campaign
description: Learn how to create, update, and manage AWS ConnectCampaignsV2 Campaigns using Alchemy Cloud Control.
---


The Campaign resource lets you manage [AWS ConnectCampaignsV2 Campaigns](https://docs.aws.amazon.com/connectcampaignsv2/latest/userguide/) for running and managing outreach campaigns in Amazon Connect.

## Minimal Example

Create a basic campaign with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.ConnectCampaignsV2.Campaign("basicCampaign", {
  name: "Customer Outreach Campaign",
  connectInstanceId: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  channelSubtypeConfig: {
    sms: {
      senderId: "MySenderId"
    }
  }
});
```

## Advanced Configuration

Configure a campaign with communication limits and a specific schedule.

```ts
const advancedCampaign = await AWS.ConnectCampaignsV2.Campaign("advancedCampaign", {
  name: "Sales Follow-Up Campaign",
  connectInstanceId: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  channelSubtypeConfig: {
    sms: {
      senderId: "SalesDept"
    },
    voice: {
      callerId: "9876543210"
    }
  },
  communicationLimitsOverride: {
    maxAttempts: 5,
    limitsPerHour: {
      sms: 100,
      voice: 50
    }
  },
  schedule: {
    startTime: "2023-10-01T09:00:00Z",
    endTime: "2023-10-31T17:00:00Z"
  }
});
```

## Tagging for Organization

Create a campaign with tags for better resource management.

```ts
const taggedCampaign = await AWS.ConnectCampaignsV2.Campaign("taggedCampaign", {
  name: "Feedback Collection Campaign",
  connectInstanceId: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  channelSubtypeConfig: {
    email: {
      from: "feedback@example.com"
    }
  },
  tags: [
    { key: "Project", value: "User Feedback" },
    { key: "Department", value: "Customer Service" }
  ]
});
```

## Communication Time Configuration

Set up a campaign with specific communication times and limits.

```ts
const timeConfiguredCampaign = await AWS.ConnectCampaignsV2.Campaign("timeConfiguredCampaign", {
  name: "Annual Review Campaign",
  connectInstanceId: "arn:aws:connect:us-east-1:123456789012:instance/abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  channelSubtypeConfig: {
    voice: {
      callerId: "1234567890"
    }
  },
  communicationTimeConfig: {
    timeZone: "America/New_York",
    startTime: "2023-10-01T08:00:00",
    endTime: "2023-10-31T20:00:00"
  },
  communicationLimitsOverride: {
    maxAttempts: 3,
    limitsPerHour: {
      voice: 20,
      email: 50
    }
  }
});
```
