---
title: Campaign
description: Learn how to create, update, and manage AWS ConnectCampaigns Campaigns using Alchemy Cloud Control.
---


The Campaign resource lets you manage [AWS ConnectCampaigns Campaigns](https://docs.aws.amazon.com/connectcampaigns/latest/userguide/) for outbound calling and communication with customers.

## Minimal Example

Create a basic campaign with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const campaign = await AWS.ConnectCampaigns.Campaign("basicCampaign", {
  Name: "Customer Outreach Campaign",
  ConnectInstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-abcd-ef00-0123456789ab",
  OutboundCallConfig: {
    // Define outbound call configuration
    ConnectContactFlowId: "abcdefg-1234-abcd-ef00-0123456789ab",
    // ... other outbound call config properties
  },
  DialerConfig: {
    // Define dialer configuration
    DialerType: "PREDICTIVE",
    // ... other dialer config properties
  },
  Tags: [
    { Key: "Department", Value: "Sales" },
    { Key: "CampaignType", Value: "Outbound" }
  ]
});
```

## Advanced Configuration

Configure a campaign with advanced settings for better outreach management.

```ts
const advancedCampaign = await AWS.ConnectCampaigns.Campaign("advancedCampaign", {
  Name: "Holiday Promotion Campaign",
  ConnectInstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-abcd-ef00-0123456789ab",
  OutboundCallConfig: {
    ConnectContactFlowId: "abcdefg-1234-abcd-ef00-0123456789ab",
    // Sample configuration for Outbound Call
    OutboundQueueId: "queue-id-123",
    // ... other outbound call config properties
  },
  DialerConfig: {
    DialerType: "POWER_DIALER",
    // Additional dialer settings
    MaxAttempts: 5
  },
  Tags: [
    { Key: "Season", Value: "Winter" },
    { Key: "CampaignFocus", Value: "Promotions" }
  ],
  adopt: true
});
```

## Using Existing Resources

Adopt an existing campaign resource instead of creating a new one.

```ts
const existingCampaign = await AWS.ConnectCampaigns.Campaign("existingCampaign", {
  Name: "Existing Campaign",
  ConnectInstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-abcd-ef00-0123456789ab",
  OutboundCallConfig: {
    ConnectContactFlowId: "abcdefg-1234-abcd-ef00-0123456789ab",
    // ... other outbound call config properties
  },
  DialerConfig: {
    DialerType: "PREDICTIVE",
    // ... other dialer config properties
  },
  adopt: true // This allows adopting an existing resource
});
```
